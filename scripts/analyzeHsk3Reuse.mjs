import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const SRC_DATA_DIR = path.join(ROOT, 'src', 'data');
const HSK3_VOCAB_PATH = path.join(SRC_DATA_DIR, 'hsk3', 'officialVocabulary.json');

const RAW_LEVELS = [2, 3, 4, 5, 6];
const HSK3_LEVELS = [1, 2, 3, 4, 5, 6, '7-9'];

function parseArgs(argv) {
  const args = { level: 'all', samples: 12 };

  for (const entry of argv) {
    if (entry.startsWith('--level=')) {
      args.level = entry.slice('--level='.length);
      continue;
    }

    if (entry.startsWith('--samples=')) {
      const parsed = Number.parseInt(entry.slice('--samples='.length), 10);
      if (Number.isFinite(parsed) && parsed > 0) {
        args.samples = parsed;
      }
    }
  }

  return args;
}

function normalizePinyin(value) {
  return value
    .normalize('NFC')
    .toLowerCase()
    .replace(/[\s'’·-]+/g, '')
    .trim();
}

function normalizeHsk3HanziForMatch(value) {
  const match = value.match(/^(?<displayHanzi>.*\p{Script=Han})(?<senseMarker>[1-9]\d*)$/u);
  return match?.groups?.displayHanzi ?? value;
}

function makeMatchKey(hanzi, pinyin) {
  return `${hanzi}::${normalizePinyin(pinyin)}`;
}

function slugifyClassicPinyin(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ü/g, 'v')
    .replace(/Ü/g, 'V')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

async function readText(filePath) {
  return readFile(filePath, 'utf8');
}

function extractAssignedArray(source, exportName) {
  const match = source.match(
    new RegExp(`export const ${exportName}:[^=]+=(\\s*\\[[\\s\\S]*?\\]);`, 'm'),
  );

  if (!match) {
    throw new Error(`Could not find array export ${exportName}`);
  }

  return Function(`return ${match[1]};`)();
}

function extractAssignedTemplateLiteral(source, exportName) {
  const match = source.match(
    new RegExp(`export const ${exportName}\\s*=\\s*\`([\\s\\S]*?)\`;`, 'm'),
  );

  if (!match) {
    throw new Error(`Could not find template literal export ${exportName}`);
  }

  return match[1];
}

function extractAssignedStringArray(source, exportName) {
  const match = source.match(
    new RegExp(`export const ${exportName}(?::[^=]+)?\\s*=\\s*(\\[[\\s\\S]*?\\])(?:\\.join\\([^)]*\\))?;`, 'm'),
  );

  if (!match) {
    throw new Error(`Could not find array export ${exportName}`);
  }

  return Function(`return ${match[1]};`)();
}

async function loadClassicLevel1Words() {
  const source = await readText(path.join(SRC_DATA_DIR, 'hsk1.ts'));
  const words = extractAssignedArray(source, 'HSK1_WORDS');

  return words.map((word) => ({
    id: word.id,
    level: 1,
    hanzi: word.hanzi,
    pinyin: word.pinyin,
    meaning: word.meaning,
  }));
}

async function loadClassicRawLevelWords(level) {
  const source = await readText(path.join(SRC_DATA_DIR, `hsk${level}Raw.ts`));
  let lines;

  try {
    const raw = extractAssignedTemplateLiteral(source, `HSK${level}_RAW`);
    lines = raw
      .trim()
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  } catch {
    lines = extractAssignedStringArray(source, `HSK${level}_RAW`)
      .map((line) => String(line).trim())
      .filter(Boolean);
  }

  return lines.map((line, index) => {
    const [hanzi, pinyin, meaning] = line.split('|');

    return {
      id: `hsk${level}-${slugifyClassicPinyin(pinyin || hanzi)}-${index + 1}`,
      level,
      hanzi,
      pinyin,
      meaning,
    };
  });
}

async function loadClassicVocabulary() {
  const level1 = await loadClassicLevel1Words();
  const remaining = await Promise.all(RAW_LEVELS.map((level) => loadClassicRawLevelWords(level)));
  return [...level1, ...remaining.flat()];
}

async function loadHsk3Vocabulary() {
  const payload = JSON.parse(await readText(HSK3_VOCAB_PATH));

  if (payload.status !== 'imported') {
    throw new Error('HSK 3.0 vocabulary has not been imported yet.');
  }

  return payload.entries;
}

function indexClassicVocabulary(words) {
  const byKey = new Map();

  for (const word of words) {
    const key = makeMatchKey(word.hanzi, word.pinyin);
    const existing = byKey.get(key) ?? [];
    existing.push(word);
    byKey.set(key, existing);
  }

  return byKey;
}

function analyzeLevel(entries, classicByKey) {
  const exactMatches = [];
  const unmatched = [];
  const matchesByClassicLevel = new Map();

  for (const entry of entries) {
    const matches =
      classicByKey.get(makeMatchKey(normalizeHsk3HanziForMatch(entry.hanzi), entry.pinyin)) ?? [];

    if (!matches.length) {
      unmatched.push(entry);
      continue;
    }

    exactMatches.push({ entry, matches });

    for (const match of matches) {
      matchesByClassicLevel.set(match.level, (matchesByClassicLevel.get(match.level) ?? 0) + 1);
    }
  }

  return {
    total: entries.length,
    exactMatchCount: exactMatches.length,
    unmatchedCount: unmatched.length,
    exactMatchRate: entries.length ? exactMatches.length / entries.length : 0,
    exactMatches,
    unmatched,
    matchesByClassicLevel,
  };
}

function formatPercent(value) {
  return `${(value * 100).toFixed(1)}%`;
}

function formatMatchSummary(match) {
  const classicRefs = match.matches
    .map(
      (entry) =>
        `classic HSK ${entry.level} -> ${entry.hanzi} (${entry.pinyin}) [${entry.id}] = ${entry.meaning}`,
    )
    .join(' | ');

  return `${match.entry.hanzi} (${match.entry.pinyin}) => ${classicRefs}`;
}

function formatUnmatchedSummary(entry) {
  return `${entry.hanzi} (${entry.pinyin})`;
}

function printLevelReport(level, result, sampleCount) {
  console.log(`HSK 3.0 ${level === '7-9' ? '7-9' : `Level ${level}`}`);
  console.log(`- Total words: ${result.total}`);
  console.log(`- Exact classic match by hanzi+pinyin: ${result.exactMatchCount} (${formatPercent(result.exactMatchRate)})`);
  console.log(`- Needs new meaning/sentence review: ${result.unmatchedCount}`);

  const classicLevelSummary = [...result.matchesByClassicLevel.entries()]
    .sort((left, right) => left[0] - right[0])
    .map(([classicLevel, count]) => `HSK ${classicLevel}: ${count}`)
    .join(', ');

  console.log(`- Matched classic levels: ${classicLevelSummary || 'none'}`);

  if (result.exactMatches.length) {
    console.log('- Sample reusable matches:');
    for (const match of result.exactMatches.slice(0, sampleCount)) {
      console.log(`  ${formatMatchSummary(match)}`);
    }
  }

  if (result.unmatched.length) {
    console.log('- Sample new or moved words:');
    for (const entry of result.unmatched.slice(0, sampleCount)) {
      console.log(`  ${formatUnmatchedSummary(entry)}`);
    }
  }
}

function parseRequestedLevel(levelArg) {
  if (levelArg === 'all') {
    return 'all';
  }

  if (levelArg === '7-9') {
    return '7-9';
  }

  const parsed = Number.parseInt(levelArg, 10);
  if ([1, 2, 3, 4, 5, 6].includes(parsed)) {
    return parsed;
  }

  throw new Error(`Unsupported level "${levelArg}". Use 1-6, 7-9, or all.`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const requestedLevel = parseRequestedLevel(args.level);

  const [classicWords, hsk3Entries] = await Promise.all([
    loadClassicVocabulary(),
    loadHsk3Vocabulary(),
  ]);

  const classicByKey = indexClassicVocabulary(classicWords);
  const levelsToAnalyze =
    requestedLevel === 'all' ? HSK3_LEVELS : HSK3_LEVELS.filter((level) => level === requestedLevel);

  for (const level of levelsToAnalyze) {
    const entries = hsk3Entries.filter((entry) => entry.level === level);
    const result = analyzeLevel(entries, classicByKey);
    printLevelReport(level, result, args.samples);
    console.log('');
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});

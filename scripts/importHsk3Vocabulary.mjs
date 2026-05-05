import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const projectRoot = process.cwd();
const manifestPath = path.join(projectRoot, 'src', 'data', 'hsk3', 'sourceManifest.json');
const inputPath = path.join(projectRoot, 'src', 'data', 'hsk3', 'source', 'officialVocabulary.tsv');
const outputPath = path.join(projectRoot, 'src', 'data', 'hsk3', 'officialVocabulary.json');
const levelOrder = ['1', '2', '3', '4', '5', '6', '7-9'];

function normalizeHeader(value) {
  return value.replace(/\s+/g, '').replace(/[_-]/g, '').toLowerCase();
}

function getHeaderIndex(header, candidates) {
  for (const candidate of candidates) {
    const index = header.indexOf(candidate);
    if (index !== -1) {
      return index;
    }
  }

  return -1;
}

function toLevelKey(value) {
  const normalized = String(value).trim();
  if (!levelOrder.includes(normalized)) {
    throw new Error(`Unsupported HSK 3.0 level "${value}". Expected one of: ${levelOrder.join(', ')}.`);
  }

  return normalized;
}

function parseArgs(argv) {
  const args = {
    validateOnly: false,
    inputFile: inputPath,
  };

  for (const arg of argv) {
    if (arg === '--validate') {
      args.validateOnly = true;
      continue;
    }

    if (arg.startsWith('--input=')) {
      const candidate = arg.slice('--input='.length);
      args.inputFile = path.isAbsolute(candidate)
        ? candidate
        : path.join(projectRoot, candidate);
    }
  }

  return args;
}

function validateEntries(entries, manifest) {
  const countsByLevel = Object.fromEntries(levelOrder.map((level) => [level, 0]));

  entries.forEach((entry, index) => {
    const expectedSequence = index + 1;
    if (entry.sequence !== expectedSequence) {
      throw new Error(
        `Sequence mismatch at row ${index + 1}: expected ${expectedSequence}, received ${entry.sequence}.`,
      );
    }

    countsByLevel[String(entry.level)] += 1;
  });

  let runningTotal = 0;
  for (const level of levelOrder) {
    const band = manifest.bands[level];
    const actualAdded = countsByLevel[level];
    if (actualAdded !== band.addedCount) {
      throw new Error(
        `Level ${level} count mismatch: expected ${band.addedCount}, received ${actualAdded}.`,
      );
    }

    runningTotal += actualAdded;
    if (runningTotal !== band.cumulativeTotal) {
      throw new Error(
        `Level ${level} cumulative mismatch: expected ${band.cumulativeTotal}, received ${runningTotal}.`,
      );
    }
  }
}

function parseTsv(tsvText) {
  const lines = tsvText
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean);

  if (lines.length === 0) {
    throw new Error('The TSV file is empty.');
  }

  const header = lines.shift().split('\t').map((value) => normalizeHeader(value));
  const sequenceIndex = getHeaderIndex(header, ['sequence', 'index', 'serialnumber', '序号']);
  const levelIndex = getHeaderIndex(header, ['level', '等级']);
  const levelLabelIndex = getHeaderIndex(header, ['levellabel']);
  const additionalLevelsIndex = getHeaderIndex(header, ['additionallevels']);
  const hanziIndex = getHeaderIndex(header, ['hanzi', 'word', '词语']);
  const pinyinIndex = getHeaderIndex(header, ['pinyin', '拼音']);
  const posIndex = getHeaderIndex(header, ['partofspeech', 'pos', '词性']);

  if ([sequenceIndex, levelIndex, hanziIndex, pinyinIndex, posIndex].some((index) => index === -1)) {
    throw new Error(
      'Missing required TSV headers. Expected sequence/level/hanzi/pinyin/partOfSpeech or the documented Chinese header equivalents.',
    );
  }

  return lines.map((line, lineIndex) => {
    const columns = line.split('\t');
    const sequence = Number(columns[sequenceIndex]?.trim());
    if (!Number.isInteger(sequence) || sequence <= 0) {
      throw new Error(`Invalid sequence on TSV data row ${lineIndex + 2}.`);
    }

    const levelKey = toLevelKey(columns[levelIndex] ?? '');
    const levelLabel = columns[levelLabelIndex]?.trim() || levelKey;
    const additionalLevels = (columns[additionalLevelsIndex]?.trim() || '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => toLevelKey(value));
    const hanzi = columns[hanziIndex]?.trim();
    const pinyin = columns[pinyinIndex]?.trim();
    const partOfSpeech = columns[posIndex]?.trim() ?? '';

    if (!hanzi || !pinyin) {
      throw new Error(`Missing hanzi or pinyin on TSV data row ${lineIndex + 2}.`);
    }

    return {
      sequence,
      level: levelKey === '7-9' ? '7-9' : Number(levelKey),
      levelLabel,
      additionalLevels: additionalLevels.map((value) => (value === '7-9' ? '7-9' : Number(value))),
      hanzi,
      pinyin,
      partOfSpeech,
    };
  });
}

async function loadManifest() {
  const raw = await fs.readFile(manifestPath, 'utf8');
  return JSON.parse(raw);
}

async function importVocabulary(inputFile, manifest) {
  const raw = await fs.readFile(inputFile, 'utf8');
  const entries = parseTsv(raw);
  validateEntries(entries, manifest);

  const payload = {
    status: 'imported',
    generatedAt: new Date().toISOString(),
    inputFile: path.relative(projectRoot, inputFile).replace(/\\/g, '/'),
    entries,
  };

  await fs.writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(
    `Imported ${entries.length.toLocaleString('en')} official HSK 3.0 vocabulary entries into ${path.relative(projectRoot, outputPath)}.`,
  );
}

async function validateImportedVocabulary(manifest) {
  const raw = await fs.readFile(outputPath, 'utf8');
  const payload = JSON.parse(raw);
  if (payload.status !== 'imported') {
    throw new Error('HSK 3.0 vocabulary has not been imported yet.');
  }

  validateEntries(payload.entries, manifest);
  console.log(
    `Validated ${payload.entries.length.toLocaleString('en')} imported HSK 3.0 vocabulary entries in ${path.relative(projectRoot, outputPath)}.`,
  );
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const manifest = await loadManifest();

  if (args.validateOnly) {
    await validateImportedVocabulary(manifest);
    return;
  }

  await importVocabulary(args.inputFile, manifest);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});

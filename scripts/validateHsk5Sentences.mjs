import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function parseArrayRaw(text, constName) {
  const startMarker = `export const ${constName} = [`;
  const start = text.indexOf(startMarker);
  if (start === -1) {
    throw new Error(`Could not find ${constName}`);
  }
  const bodyStart = start + startMarker.length;
  const endCandidates = [text.indexOf('].join', bodyStart), text.indexOf('];', bodyStart)].filter(
    (index) => index !== -1,
  );
  const end = Math.min(...endCandidates);
  const body = text.slice(bodyStart, end);

  return [...body.matchAll(/"([^"|]+)\|([^"|]*)\|([^"]*)"/g)].map((entry) => ({
    hanzi: entry[1],
    pinyin: entry[2],
    meaning: entry[3],
  }));
}

function parseTemplateRaw(text, constName) {
  const match = text.match(new RegExp(`const ${constName} = \`([\\s\\S]*?)\`;`));
  if (!match) {
    throw new Error(`Could not find ${constName}`);
  }

  return match[1]
    .trim()
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [hanzi, pinyin, meaning] = line.split('|');
      return { hanzi, pinyin, meaning };
    });
}

function parseHsk1Words(text) {
  return [...text.matchAll(/hanzi: '([^']+)'/g)].map((entry) => ({ hanzi: entry[1] }));
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ü/g, 'v')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function expectedHsk5Words() {
  const hsk56 = read('src/data/hsk56.ts');
  return parseArrayRaw(hsk56, 'HSK5_RAW').map((word, index) => ({
    ...word,
    id: `hsk5-${slugify(word.pinyin || word.hanzi)}-${index + 1}`,
  }));
}

function lexicon() {
  const hskTs = read('src/data/hsk.ts');
  const words = [
    ...parseHsk1Words(read('src/data/hsk1.ts')),
    ...parseTemplateRaw(hskTs, 'HSK2_RAW'),
    ...parseTemplateRaw(hskTs, 'HSK3_RAW'),
    ...parseTemplateRaw(hskTs, 'HSK4_RAW'),
    ...parseArrayRaw(read('src/data/hsk56.ts'), 'HSK5_RAW'),
  ];

  const terms = new Set();
  for (const word of words) {
    for (const term of word.hanzi.split(/[……\s]+/).filter(Boolean)) {
      terms.add(term);
    }
  }

  return [...terms].sort((a, b) => b.length - a.length);
}

function parseSentenceFiles() {
  const dataDir = path.join(root, 'src/data');
  const files = fs
    .readdirSync(dataDir)
    .filter((name) => /^hsk5SentencesPart\d+\.ts$/.test(name))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));

  const entries = new Map();
  const duplicateKeys = [];

  for (const file of files) {
    const text = read(`src/data/${file}`);
    const entryPattern =
      /'([^']+)':\s*\{\s*hanzi:\s*(['"])((?:\\.|(?!\2)[\s\S])*)\2,\s*pinyin:\s*(['"])((?:\\.|(?!\4)[\s\S])*)\4,\s*meaning:\s*(['"])((?:\\.|(?!\6)[\s\S])*)\6\s*\}/g;
    const matches = [...text.matchAll(entryPattern)];
    for (const match of matches) {
      const key = match[1];
      if (entries.has(key)) {
        duplicateKeys.push(key);
      }
      entries.set(key, {
        file,
        hanzi: match[3].replace(/\\'/g, "'"),
        pinyin: match[5].replace(/\\'/g, "'"),
        meaning: match[7].replace(/\\'/g, "'"),
      });
    }
  }

  return { entries, files, duplicateKeys };
}

function chineseOnly(sentence) {
  return sentence.match(/[\u3400-\u9fff]+/gu) ?? [];
}

function unknownSegments(sentence, terms) {
  const unknown = [];

  for (const block of chineseOnly(sentence)) {
    let index = 0;
    while (index < block.length) {
      const match = terms.find((term) => block.startsWith(term, index));
      if (match) {
        index += match.length;
      } else {
        unknown.push(block[index]);
        index += 1;
      }
    }
  }

  return unknown;
}

const expected = expectedHsk5Words();
const expectedById = new Map(expected.map((word) => [word.id, word]));
const terms = lexicon();
const { entries, files, duplicateKeys } = parseSentenceFiles();

const issues = [];
const forbiddenStudyPatterns = [
  /学习[“"']?[^，。？！]*[”"']?这个词/,
  /知道[“"']?[^，。？！]*[”"']?的意思/,
  /老师教我/,
  /这个词很重要/,
  /词语/,
  /单词/,
];

for (const word of expected) {
  const sentence = entries.get(word.id);
  if (!sentence) {
    issues.push(`missing ${word.id} (${word.hanzi})`);
    continue;
  }

  if (!sentence.hanzi.includes(word.hanzi)) {
    issues.push(`${sentence.file}: target not included ${word.id}: ${word.hanzi} not in ${sentence.hanzi}`);
  }

  if (/[“”"']/.test(sentence.hanzi)) {
    issues.push(`${sentence.file}: quoted text ${word.id}: ${sentence.hanzi}`);
  }

  if (forbiddenStudyPatterns.some((pattern) => pattern.test(sentence.hanzi))) {
    issues.push(`${sentence.file}: forbidden study-style wording ${word.id}: ${sentence.hanzi}`);
  }

  if (/[词]/.test(sentence.hanzi) && !word.hanzi.includes('词') && !['成语'].includes(word.hanzi)) {
    issues.push(`${sentence.file}: forbidden language word ${word.id}: ${sentence.hanzi}`);
  }

  const unknown = unknownSegments(sentence.hanzi, terms);
  if (unknown.length) {
    issues.push(
      `${sentence.file}: unknown chars ${word.id}: ${[...new Set(unknown)].join('')} in ${sentence.hanzi}`,
    );
  }
}

for (const key of entries.keys()) {
  if (!expectedById.has(key)) {
    issues.push(`unexpected key ${key}`);
  }
}

for (const key of duplicateKeys) {
  issues.push(`duplicate key ${key}`);
}

console.log(`files: ${files.join(', ') || '(none)'}`);
console.log(`expected: ${expected.length}`);
console.log(`actual: ${entries.size}`);
console.log(`issues: ${issues.length}`);

for (const issue of issues.slice(0, 200)) {
  console.log(`- ${issue}`);
}

if (issues.length > 200) {
  console.log(`...and ${issues.length - 200} more`);
}

process.exitCode = issues.length ? 1 : 0;

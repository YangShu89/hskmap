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
  return [...text.matchAll(/hanzi:\s*'([^']+)'/g)].map((entry) => ({ hanzi: entry[1] }));
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

function expectedHsk6Words() {
  return parseArrayRaw(read('src/data/hsk6Raw.ts'), 'HSK6_RAW').map((word, index) => ({
    ...word,
    id: `hsk6-${slugify(word.pinyin || word.hanzi)}-${index + 1}`,
  }));
}

function lexicon() {
  const words = [
    ...parseHsk1Words(read('src/data/hsk1.ts')),
    ...parseTemplateRaw(read('src/data/hsk2Raw.ts'), 'HSK2_RAW'),
    ...parseTemplateRaw(read('src/data/hsk3Raw.ts'), 'HSK3_RAW'),
    ...parseTemplateRaw(read('src/data/hsk4Raw.ts'), 'HSK4_RAW'),
    ...parseArrayRaw(read('src/data/hsk5Raw.ts'), 'HSK5_RAW'),
    ...parseArrayRaw(read('src/data/hsk6Raw.ts'), 'HSK6_RAW'),
  ];

  const terms = new Set();
  for (const word of words) {
    terms.add(word.hanzi);
    for (const term of word.hanzi.split(/[……（）\s]+/).filter(Boolean)) {
      terms.add(term);
    }
  }

  return [...terms].sort((a, b) => b.length - a.length);
}

function unescapeTsString(value) {
  return value.replace(/\\(['"\\])/g, '$1');
}

function parseSentenceFiles() {
  const dataDir = path.join(root, 'src/data');
  const files = fs
    .readdirSync(dataDir)
    .filter((name) => /^hsk6SentencesPart\d+\.ts$/.test(name))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));

  const entries = new Map();
  const duplicateKeys = [];
  const pattern =
    /(['"])((?:\\.|(?!\1).)+)\1:\s*\{\s*hanzi:\s*(['"])((?:\\.|(?!\3).)*)\3,\s*pinyin:\s*(['"])((?:\\.|(?!\5).)*)\5,\s*meaning:\s*(['"])((?:\\.|(?!\7).)*)\7\s*\}/g;

  for (const file of files) {
    const text = read(`src/data/${file}`);
    for (const match of text.matchAll(pattern)) {
      const key = unescapeTsString(match[2]);
      if (entries.has(key)) {
        duplicateKeys.push(key);
      }
      entries.set(key, {
        file,
        hanzi: unescapeTsString(match[4]),
        pinyin: unescapeTsString(match[6]),
        meaning: unescapeTsString(match[8]),
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

const expected = expectedHsk6Words();
const expectedById = new Map(expected.map((word) => [word.id, word]));
const terms = lexicon();
const { entries, files, duplicateKeys } = parseSentenceFiles();

const issues = [];
const sentenceTexts = new Map();
const skeletons = new Map();
const forbiddenStudyPatterns = [
  /学习[“"']?[^，。？！]*[”"']?这个词/u,
  /知道[“"']?[^，。？！]*[”"']?的意思/u,
  /老师教我/u,
  /这个词很重要/u,
  /词语/u,
  /单词/u,
  /意思/u,
];

for (const word of expected) {
  const sentence = entries.get(word.id);
  if (!sentence) {
    issues.push(`missing ${word.id} (${word.hanzi})`);
    continue;
  }

  if (!sentence.hanzi.includes(word.hanzi)) {
    issues.push(`target not included ${word.id}: ${word.hanzi} not in ${sentence.hanzi}`);
  }

  if (!sentence.pinyin || !sentence.meaning) {
    issues.push(`missing pinyin or meaning ${word.id}`);
  }

  const targetAllowsMeta = /词|词语|单词|意思/.test(word.hanzi);
  if (!targetAllowsMeta && forbiddenStudyPatterns.some((pattern) => pattern.test(sentence.hanzi))) {
    issues.push(`forbidden study-style wording ${word.id}: ${sentence.hanzi}`);
  }

  if (!targetAllowsMeta && /词|词语|单词|意思/.test(sentence.hanzi)) {
    issues.push(`forbidden language word ${word.id}: ${sentence.hanzi}`);
  }

  const sentenceKey = sentence.hanzi;
  const sentenceMatches = sentenceTexts.get(sentenceKey) ?? [];
  sentenceMatches.push(word.id);
  sentenceTexts.set(sentenceKey, sentenceMatches);

  const skeleton = sentence.hanzi.split(word.hanzi).join('{H}');
  const skeletonMatches = skeletons.get(skeleton) ?? [];
  skeletonMatches.push(word.id);
  skeletons.set(skeleton, skeletonMatches);

  const unknown = unknownSegments(sentence.hanzi, terms);
  if (unknown.length) {
    issues.push(`unknown chars ${word.id}: ${[...new Set(unknown)].join('')} in ${sentence.hanzi}`);
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

for (const [sentence, ids] of sentenceTexts.entries()) {
  if (ids.length > 1) {
    issues.push(`duplicate sentence text (${ids.length}): ${ids.join(', ')} => ${sentence}`);
  }
}

for (const [skeleton, ids] of skeletons.entries()) {
  if (ids.length > 25) {
    issues.push(`overused sentence pattern (${ids.length}): ${skeleton}`);
  }
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

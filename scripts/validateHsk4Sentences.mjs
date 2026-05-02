import fs from 'node:fs';

const hskSource = fs.readFileSync('src/data/hsk.ts', 'utf8');
const hsk1Source = fs.readFileSync('src/data/hsk1.ts', 'utf8');
const sentenceFiles = [1, 2, 3, 4].map((part) => `src/data/hsk4SentencesPart${part}.ts`);

function rawBlock(level) {
  const tick = String.fromCharCode(96);
  const startMarker = `const HSK${level}_RAW = ${tick}`;
  const start = hskSource.indexOf(startMarker);
  const end = hskSource.indexOf(`${tick};`, start + startMarker.length);

  if (start === -1 || end === -1) {
    throw new Error(`Could not find HSK${level}_RAW`);
  }

  return hskSource.slice(start + startMarker.length, end);
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

function parseRaw(level) {
  return rawBlock(level)
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line, index) => {
      const [hanzi, pinyin, meaning] = line.split('|');
      return {
        hanzi,
        id: `hsk${level}-${slugify(pinyin || hanzi)}-${index + 1}`,
        meaning,
        pinyin,
      };
    });
}

const hsk1Words = [...hsk1Source.matchAll(/hanzi:\s*'([^']+)'/g)].map((match) => match[1]);
const allowedWords = new Set([...hsk1Words, ...parseRaw(2).map((word) => word.hanzi), ...parseRaw(3).map((word) => word.hanzi), ...parseRaw(4).map((word) => word.hanzi)]);
const allowedByLength = [...allowedWords].sort((left, right) => right.length - left.length);
const expectedHsk4 = parseRaw(4);
const expectedById = new Map(expectedHsk4.map((word) => [word.id, word]));
const sentenceEntries = new Map();

for (const file of sentenceFiles) {
  const source = fs.readFileSync(file, 'utf8');
  for (const match of source.matchAll(/'([^']+)':\s*\{\s*hanzi:\s*'([^']*)'/g)) {
    sentenceEntries.set(match[1], { file, hanzi: match[2] });
  }
}

function unmatchedSpans(sentence) {
  const spans = [];
  const text = sentence.replace(/[^\u3400-\u9fff]/gu, '');
  let index = 0;

  while (index < text.length) {
    const match = allowedByLength.find((word) => text.startsWith(word, index));
    if (match) {
      index += match.length;
      continue;
    }

    spans.push(text[index]);
    index += 1;
  }

  return spans;
}

const issues = [];

for (const expected of expectedHsk4) {
  const entry = sentenceEntries.get(expected.id);
  if (!entry) {
    issues.push(`missing: ${expected.id}`);
    continue;
  }

  if (!entry.hanzi.includes(expected.hanzi)) {
    issues.push(`target missing: ${expected.id} ${expected.hanzi} :: ${entry.hanzi}`);
  }

  const hasForbiddenQuote = /[“”"「」『』]/u.test(entry.hanzi);
  if (hasForbiddenQuote) {
    issues.push(`quote mark: ${expected.id} :: ${entry.hanzi}`);
  }

  const usesMetaWord = /(词语|单词|意思|这个词)/u.test(entry.hanzi) && !expected.hanzi.includes('词') && !expected.hanzi.includes('意思');
  if (usesMetaWord) {
    issues.push(`meta word: ${expected.id} :: ${entry.hanzi}`);
  }

  const unmatched = unmatchedSpans(entry.hanzi);
  if (unmatched.length) {
    issues.push(`outside HSK1-4: ${expected.id} ${[...new Set(unmatched)].join('')} :: ${entry.hanzi}`);
  }
}

for (const id of sentenceEntries.keys()) {
  if (!expectedById.has(id)) {
    issues.push(`extra: ${id}`);
  }
}

console.log(`HSK4 expected: ${expectedHsk4.length}`);
console.log(`HSK4 sentence entries: ${sentenceEntries.size}`);

if (issues.length) {
  console.log(`Issues: ${issues.length}`);
  console.log(issues.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Issues: 0');
}

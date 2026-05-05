import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const inputPdfPath = path.join(projectRoot, 'src', 'data', 'hsk3', 'source', 'official-syllabus.pdf');
const outputTsvPath = path.join(projectRoot, 'src', 'data', 'hsk3', 'source', 'officialVocabulary.tsv');
const cmapsPath = path.join(projectRoot, 'node_modules', 'pdfjs-dist', 'cmaps');
const standardFontsPath = path.join(projectRoot, 'node_modules', 'pdfjs-dist', 'standard_fonts');
const VOCABULARY_START_PAGE = 80;
const VOCABULARY_END_PAGE = 354;
const Y_TOLERANCE = 2;
const MANUAL_HANZI_FIXES = new Map([
  [4134, '好容易'],
  [6616, '缝'],
  [8180, '蒙'],
]);

function directoryUrl(directoryPath) {
  const url = pathToFileURL(directoryPath);
  return url.href.endsWith('/') ? url.href : `${url.href}/`;
}

function normalizeLevel(levelLabel) {
  const primaryMatch = levelLabel.match(/(7-9|[1-6])/);
  if (!primaryMatch) {
    throw new Error(`Could not determine primary level from "${levelLabel}".`);
  }

  const level = primaryMatch[1];
  const additionalLevels = [...levelLabel.matchAll(/[（(](7-9|[1-6])[）)]/g)].map((match) => match[1]);

  return {
    level: level === '7-9' ? '7-9' : Number(level),
    additionalLevels,
  };
}

function classifyColumn(x) {
  if (x < 120) {
    return 'sequence';
  }

  if (x < 210) {
    return 'levelLabel';
  }

  if (x < 300) {
    return 'hanzi';
  }

  if (x < 430) {
    return 'pinyin';
  }

  return 'partOfSpeech';
}

function joinColumn(items, separator = '') {
  return items
    .sort((left, right) => left.x - right.x)
    .map((item) => item.str)
    .join(separator)
    .trim();
}

function groupItemsIntoRows(items) {
  const rows = [];

  for (const item of items.sort((left, right) => right.y - left.y || left.x - right.x)) {
    let row = rows.find((candidate) => Math.abs(candidate.y - item.y) <= Y_TOLERANCE);
    if (!row) {
      row = { y: item.y, items: [] };
      rows.push(row);
    }

    row.items.push(item);
  }

  return rows.sort((left, right) => right.y - left.y);
}

function parseRow(row) {
  const columns = {
    sequence: [],
    levelLabel: [],
    hanzi: [],
    pinyin: [],
    partOfSpeech: [],
  };

  for (const item of row.items) {
    columns[classifyColumn(item.x)].push(item);
  }

  const sequence = Number(joinColumn(columns.sequence));
  if (!Number.isInteger(sequence) || sequence <= 0) {
    return null;
  }

  const levelLabel = joinColumn(columns.levelLabel);
  const hanzi = joinColumn(columns.hanzi) || MANUAL_HANZI_FIXES.get(sequence) || '';
  const pinyin = joinColumn(columns.pinyin, ' ');
  const partOfSpeech = joinColumn(columns.partOfSpeech);

  if (!levelLabel || !hanzi || !pinyin) {
    return null;
  }

  const { level, additionalLevels } = normalizeLevel(levelLabel);

  return {
    sequence,
    level,
    levelLabel,
    additionalLevels,
    hanzi,
    pinyin,
    partOfSpeech,
  };
}

async function extractEntries(pdfPath) {
  const loadingTask = getDocument({
    url: pdfPath,
    cMapUrl: directoryUrl(cmapsPath),
    cMapPacked: true,
    standardFontDataUrl: directoryUrl(standardFontsPath),
  });
  const pdf = await loadingTask.promise;
  const entriesBySequence = new Map();

  for (let pageNumber = VOCABULARY_START_PAGE; pageNumber <= Math.min(VOCABULARY_END_PAGE, pdf.numPages); pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const text = await page.getTextContent();
    const items = text.items
      .map((item) => ({
        str: item.str.trim(),
        x: item.transform[4],
        y: item.transform[5],
      }))
      .filter((item) => item.str);

    for (const row of groupItemsIntoRows(items)) {
      const parsed = parseRow(row);
      if (!parsed) {
        continue;
      }

      if (!entriesBySequence.has(parsed.sequence)) {
        entriesBySequence.set(parsed.sequence, parsed);
      }
    }
  }

  const entries = [...entriesBySequence.values()].sort((left, right) => left.sequence - right.sequence);

  if (entries.length === 0) {
    throw new Error('No HSK 3.0 vocabulary entries were extracted from the PDF.');
  }

  return entries;
}

function toTsv(entries) {
  const header = ['sequence', 'level', 'levelLabel', 'additionalLevels', 'hanzi', 'pinyin', 'partOfSpeech'];
  const lines = entries.map((entry) =>
    [
      entry.sequence,
      entry.level,
      entry.levelLabel,
      entry.additionalLevels.join(','),
      entry.hanzi,
      entry.pinyin,
      entry.partOfSpeech,
    ].join('\t'),
  );

  return `${header.join('\t')}\n${lines.join('\n')}\n`;
}

async function main() {
  await fs.access(inputPdfPath);
  const entries = await extractEntries(inputPdfPath);
  await fs.writeFile(outputTsvPath, toTsv(entries), 'utf8');
  console.log(
    `Extracted ${entries.length.toLocaleString('en')} HSK 3.0 vocabulary entries from ${path.relative(projectRoot, inputPdfPath)} to ${path.relative(projectRoot, outputTsvPath)}.`,
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});

import { promises as fs } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
export const projectRoot = path.resolve(scriptsDir, '..');
const srcDataDir = path.join(projectRoot, 'src', 'data');

export const HSK6_TRANSLATION_LANGUAGES = {
  ar: {
    languageName: 'Arabic',
    fileName: 'hsk6ArabicTranslations.ts',
    wordExport: 'HSK6_AR_WORD_MEANINGS',
    sentenceExport: 'HSK6_AR_SENTENCE_MEANINGS',
  },
  de: {
    languageName: 'German',
    fileName: 'hsk6GermanTranslations.ts',
    wordExport: 'HSK6_DE_WORD_MEANINGS',
    sentenceExport: 'HSK6_DE_SENTENCE_MEANINGS',
  },
  es: {
    languageName: 'Spanish',
    fileName: 'hsk6SpanishTranslations.ts',
    wordExport: 'HSK6_ES_WORD_MEANINGS',
    sentenceExport: 'HSK6_ES_SENTENCE_MEANINGS',
  },
  fr: {
    languageName: 'French',
    fileName: 'hsk6FrenchTranslations.ts',
    wordExport: 'HSK6_FR_WORD_MEANINGS',
    sentenceExport: 'HSK6_FR_SENTENCE_MEANINGS',
  },
  id: {
    languageName: 'Indonesian',
    fileName: 'hsk6IndonesianTranslations.ts',
    wordExport: 'HSK6_ID_WORD_MEANINGS',
    sentenceExport: 'HSK6_ID_SENTENCE_MEANINGS',
  },
  ja: {
    languageName: 'Japanese',
    fileName: 'hsk6JapaneseTranslations.ts',
    wordExport: 'HSK6_JA_WORD_MEANINGS',
    sentenceExport: 'HSK6_JA_SENTENCE_MEANINGS',
  },
  ko: {
    languageName: 'Korean',
    fileName: 'hsk6KoreanTranslations.ts',
    wordExport: 'HSK6_KO_WORD_MEANINGS',
    sentenceExport: 'HSK6_KO_SENTENCE_MEANINGS',
  },
  'pt-BR': {
    languageName: 'Brazilian Portuguese',
    fileName: 'hsk6PortugueseTranslations.ts',
    wordExport: 'HSK6_PT_BR_WORD_MEANINGS',
    sentenceExport: 'HSK6_PT_BR_SENTENCE_MEANINGS',
  },
  ru: {
    languageName: 'Russian',
    fileName: 'hsk6RussianTranslations.ts',
    wordExport: 'HSK6_RU_WORD_MEANINGS',
    sentenceExport: 'HSK6_RU_SENTENCE_MEANINGS',
  },
  vi: {
    languageName: 'Vietnamese',
    fileName: 'hsk6VietnameseTranslations.ts',
    wordExport: 'HSK6_VI_WORD_MEANINGS',
    sentenceExport: 'HSK6_VI_SENTENCE_MEANINGS',
  },
};

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ü/g, 'v')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function extractArrayLiteral(source, exportName) {
  const match = source.match(
    new RegExp(`export\\s+const\\s+${exportName}\\s*=\\s*(\\[[\\s\\S]*?\\])(?:\\.join\\([^)]*\\))?;`),
  );
  if (!match) {
    throw new Error(`Could not find array export ${exportName}.`);
  }
  return match[1];
}

function extractObjectLiteral(source, exportName) {
  const match = source.match(
    new RegExp(`export\\s+const\\s+${exportName}(?:\\s*:[^=]+)?\\s*=\\s*(\\{[\\s\\S]*?\\});`),
  );
  if (!match) {
    throw new Error(`Could not find object export ${exportName}.`);
  }
  return match[1];
}

function evaluateLiteral(literal) {
  return vm.runInNewContext(`(${literal})`, Object.create(null), { timeout: 1000 });
}

function splitRawWord(rawWord) {
  const [hanzi, pinyin, ...rest] = rawWord.split('|');
  return {
    hanzi: hanzi.trim(),
    pinyin: pinyin.trim(),
    meaning: rest.join('|').trim(),
  };
}

export function resolveLanguageConfig(language) {
  const config = HSK6_TRANSLATION_LANGUAGES[language];
  if (!config) {
    throw new Error(
      `Unsupported language "${language}". Expected one of: ${Object.keys(HSK6_TRANSLATION_LANGUAGES).join(', ')}.`,
    );
  }
  return config;
}

export function getHsk6TranslationFilePath(language) {
  const config = resolveLanguageConfig(language);
  return path.join(srcDataDir, config.fileName);
}

export async function loadHsk6WordEntries() {
  const source = await fs.readFile(path.join(srcDataDir, 'hsk6Raw.ts'), 'utf8');
  const rawWords = evaluateLiteral(extractArrayLiteral(source, 'HSK6_RAW'));

  return rawWords.map((rawWord, index) => {
    const word = splitRawWord(rawWord);
    return {
      id: `hsk6-${slugify(word.pinyin || word.hanzi)}-${index + 1}`,
      hanzi: word.hanzi,
      pinyin: word.pinyin,
      englishWordMeaning: word.meaning,
    };
  });
}

export async function loadHsk6SentenceEntries() {
  const files = (await fs.readdir(srcDataDir))
    .filter((name) => /^hsk6SentencesPart\d+\.ts$/.test(name))
    .sort((left, right) => left.localeCompare(right, 'en', { numeric: true }));

  const merged = {};

  for (const fileName of files) {
    const exportName = fileName.replace('.ts', '').replace('hsk6SentencesPart', 'HSK6_SENTENCES_PART_');
    const source = await fs.readFile(path.join(srcDataDir, fileName), 'utf8');
    const record = evaluateLiteral(extractObjectLiteral(source, exportName));
    Object.assign(merged, record);
  }

  return merged;
}

export async function loadHsk6TranslationSource() {
  const [words, sentences] = await Promise.all([loadHsk6WordEntries(), loadHsk6SentenceEntries()]);

  return words.map((word) => {
    const sentence = sentences[word.id];
    if (!sentence) {
      throw new Error(`Missing sentence for ${word.id}.`);
    }

    return {
      id: word.id,
      hanzi: word.hanzi,
      pinyin: word.pinyin,
      englishWordMeaning: word.englishWordMeaning,
      sentenceHanzi: sentence.hanzi,
      sentencePinyin: sentence.pinyin,
      englishSentenceMeaning: sentence.meaning,
    };
  });
}

function escapeSingleQuotedString(value) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function renderRecord(exportName, sourceEntries, values) {
  const lines = [`export const ${exportName}: Record<string, string> = {`];

  for (const entry of sourceEntries) {
    lines.push(`  '${entry.id}': '${escapeSingleQuotedString(values[entry.id])}',`);
  }

  lines.push('};');
  return lines.join('\n');
}

export function renderTranslationModule(language, sourceEntries, wordMeanings, sentenceMeanings) {
  const config = resolveLanguageConfig(language);

  return [
    renderRecord(config.wordExport, sourceEntries, wordMeanings),
    '',
    renderRecord(config.sentenceExport, sourceEntries, sentenceMeanings),
    '',
  ].join('\n');
}

export function validateTranslationMaps(sourceEntries, wordMeanings, sentenceMeanings) {
  const expectedIds = new Set(sourceEntries.map((entry) => entry.id));
  const wordIds = new Set(Object.keys(wordMeanings));
  const sentenceIds = new Set(Object.keys(sentenceMeanings));

  const missingWords = [];
  const missingSentences = [];
  const emptyWords = [];
  const emptySentences = [];
  const unchangedWords = [];
  const unchangedSentences = [];

  for (const entry of sourceEntries) {
    const wordMeaning = wordMeanings[entry.id];
    const sentenceMeaning = sentenceMeanings[entry.id];

    if (!wordIds.has(entry.id)) {
      missingWords.push(entry.id);
    } else if (!wordMeaning?.trim()) {
      emptyWords.push(entry.id);
    } else if (wordMeaning.trim().toLowerCase() === entry.englishWordMeaning.trim().toLowerCase()) {
      unchangedWords.push(entry.id);
    }

    if (!sentenceIds.has(entry.id)) {
      missingSentences.push(entry.id);
    } else if (!sentenceMeaning?.trim()) {
      emptySentences.push(entry.id);
    } else if (sentenceMeaning.trim().toLowerCase() === entry.englishSentenceMeaning.trim().toLowerCase()) {
      unchangedSentences.push(entry.id);
    }
  }

  const extraWords = Object.keys(wordMeanings).filter((id) => !expectedIds.has(id));
  const extraSentences = Object.keys(sentenceMeanings).filter((id) => !expectedIds.has(id));

  return {
    expectedCount: sourceEntries.length,
    wordCount: Object.keys(wordMeanings).length,
    sentenceCount: Object.keys(sentenceMeanings).length,
    missingWords,
    missingSentences,
    extraWords,
    extraSentences,
    emptyWords,
    emptySentences,
    unchangedWords,
    unchangedSentences,
  };
}

export async function loadTranslationModule(language, filePath = getHsk6TranslationFilePath(language)) {
  const config = resolveLanguageConfig(language);
  const source = await fs.readFile(filePath, 'utf8');

  return {
    words: evaluateLiteral(extractObjectLiteral(source, config.wordExport)),
    sentences: evaluateLiteral(extractObjectLiteral(source, config.sentenceExport)),
  };
}

export async function ensureDirectory(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

export async function readJsonFile(filePath) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

function parseEnvLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) {
    return null;
  }

  const separatorIndex = trimmed.indexOf('=');
  if (separatorIndex === -1) {
    return null;
  }

  const key = trimmed.slice(0, separatorIndex).trim();
  if (!key) {
    return null;
  }

  let value = trimmed.slice(separatorIndex + 1).trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  return { key, value };
}

export async function loadLocalEnv() {
  const envPath = path.join(projectRoot, '.env.local');

  try {
    const source = await fs.readFile(envPath, 'utf8');
    for (const line of source.split(/\r?\n/)) {
      const parsed = parseEnvLine(line);
      if (!parsed) {
        continue;
      }
      if (!(parsed.key in process.env)) {
        process.env[parsed.key] = parsed.value;
      }
    }
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return;
    }
    throw error;
  }
}

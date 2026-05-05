import { promises as fs } from 'node:fs';
import path from 'node:path';
import {
  ensureDirectory,
  getHsk6TranslationFilePath,
  loadHsk6TranslationSource,
  loadLocalEnv,
  projectRoot,
  renderTranslationModule,
  resolveLanguageConfig,
  validateTranslationMaps,
  readJsonFile,
} from './hskTranslationUtils.mjs';

function parseArgs(argv) {
  const args = {
    language: 'ru',
    batchSize: 80,
    maxBatches: null,
    maxRetries: 3,
    dryRun: false,
    renderOnly: false,
  };

  for (const arg of argv) {
    if (arg === '--dry-run') {
      args.dryRun = true;
      continue;
    }
    if (arg === '--render-only') {
      args.renderOnly = true;
      continue;
    }
    if (!arg.startsWith('--')) {
      throw new Error(`Unexpected argument "${arg}".`);
    }

    const [flag, rawValue] = arg.slice(2).split('=');
    const value = rawValue ?? '';

    switch (flag) {
      case 'lang':
        args.language = value;
        break;
      case 'batch-size':
        args.batchSize = Number(value);
        break;
      case 'max-batches':
        args.maxBatches = Number(value);
        break;
      case 'max-retries':
        args.maxRetries = Number(value);
        break;
      case 'model':
        args.model = value;
        break;
      case 'output':
        args.output = value;
        break;
      case 'checkpoint':
        args.checkpoint = value;
        break;
      default:
        throw new Error(`Unknown flag "--${flag}".`);
    }
  }

  if (!Number.isInteger(args.batchSize) || args.batchSize <= 0) {
    throw new Error(`Invalid --batch-size "${args.batchSize}".`);
  }
  if (args.maxBatches !== null && (!Number.isInteger(args.maxBatches) || args.maxBatches <= 0)) {
    throw new Error(`Invalid --max-batches "${args.maxBatches}".`);
  }
  if (!Number.isInteger(args.maxRetries) || args.maxRetries < 0) {
    throw new Error(`Invalid --max-retries "${args.maxRetries}".`);
  }

  return args;
}

function buildPrompt(languageName, batch) {
  return [
    `Translate the following HSK 6 vocabulary data into ${languageName}.`,
    'Return JSON only.',
    'Requirements:',
    '- Keep ids exactly unchanged.',
    '- word_meaning must be a concise glossary translation in the target language.',
    '- Use semicolons to separate multiple senses when needed.',
    '- sentence_meaning must be a natural translation of the English sentence meaning.',
    '- Use the Chinese hanzi and pinyin to resolve ambiguity.',
    '- Do not leave items in English unless they are fixed proper nouns.',
    '- Prefer accurate register over literal word-for-word phrasing.',
    '',
    JSON.stringify(
      batch.map((entry) => ({
        id: entry.id,
        hanzi: entry.hanzi,
        pinyin: entry.pinyin,
        english_word_meaning: entry.englishWordMeaning,
        sentence_hanzi: entry.sentenceHanzi,
        sentence_pinyin: entry.sentencePinyin,
        english_sentence_meaning: entry.englishSentenceMeaning,
      })),
      null,
      2,
    ),
  ].join('\n');
}

function buildSchema() {
  return {
    type: 'object',
    additionalProperties: false,
    required: ['entries'],
    properties: {
      entries: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['id', 'word_meaning', 'sentence_meaning'],
          properties: {
            id: { type: 'string' },
            word_meaning: { type: 'string' },
            sentence_meaning: { type: 'string' },
          },
        },
      },
    },
  };
}

function extractResponseText(body) {
  if (typeof body.output_text === 'string' && body.output_text.trim()) {
    return body.output_text;
  }

  for (const item of body.output ?? []) {
    for (const content of item.content ?? []) {
      if (typeof content.text === 'string' && content.text.trim()) {
        return content.text;
      }
    }
  }

  throw new Error(`Could not extract model output. Response id: ${body.id ?? 'unknown'}`);
}

async function translateBatch({ apiKey, model, languageName, batch }) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: 'system',
          content: [
            {
              type: 'input_text',
              text: `You are a careful Chinese vocabulary translator working into ${languageName}.`,
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: buildPrompt(languageName, batch),
            },
          ],
        },
      ],
      max_output_tokens: 6000,
      text: {
        format: {
          type: 'json_schema',
          name: 'hsk6_translation_batch',
          schema: buildSchema(),
          strict: true,
        },
      },
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`OpenAI API request failed (${response.status}): ${details}`);
  }

  const body = await response.json();
  const parsed = JSON.parse(extractResponseText(body));

  if (!Array.isArray(parsed.entries)) {
    throw new Error('Model response is missing the entries array.');
  }

  const expectedIds = new Set(batch.map((entry) => entry.id));
  const receivedIds = new Set(parsed.entries.map((entry) => entry.id));

  if (receivedIds.size !== expectedIds.size || [...expectedIds].some((id) => !receivedIds.has(id))) {
    throw new Error('Model response ids did not match the requested batch.');
  }

  return parsed.entries;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function translateBatchWithRetry({ apiKey, model, languageName, batch, maxRetries }) {
  let attempt = 0;
  let lastError = null;

  while (attempt <= maxRetries) {
    try {
      return await translateBatch({ apiKey, model, languageName, batch });
    } catch (error) {
      lastError = error;

      if (attempt === maxRetries) {
        break;
      }

      const waitMs = 2000 * 2 ** attempt;
      console.warn(
        `Batch failed on attempt ${attempt + 1}/${maxRetries + 1}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      console.warn(`Retrying batch in ${Math.round(waitMs / 1000)}s...`);
      await sleep(waitMs);
      attempt += 1;
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

async function writeCheckpoint(checkpointPath, checkpoint) {
  await ensureDirectory(path.dirname(checkpointPath));
  await fs.writeFile(checkpointPath, `${JSON.stringify(checkpoint, null, 2)}\n`, 'utf8');
}

async function main() {
  await loadLocalEnv();
  const args = parseArgs(process.argv.slice(2));
  const config = resolveLanguageConfig(args.language);
  const sourceEntries = await loadHsk6TranslationSource();
  const outputPath = args.output
    ? path.resolve(projectRoot, args.output)
    : getHsk6TranslationFilePath(args.language);
  const checkpointPath = args.checkpoint
    ? path.resolve(projectRoot, args.checkpoint)
    : path.join(projectRoot, '.translation-cache', `hsk6-${args.language}.json`);

  const checkpoint =
    (await readJsonFile(checkpointPath)) ?? {
      language: args.language,
      model: args.model ?? process.env.OPENAI_MODEL ?? 'gpt-5.2',
      wordMeanings: {},
      sentenceMeanings: {},
    };

  const pending = sourceEntries.filter(
    (entry) => !checkpoint.wordMeanings[entry.id] || !checkpoint.sentenceMeanings[entry.id],
  );

  console.log(
    `HSK 6 ${config.languageName} translation source loaded: ${sourceEntries.length} words, ${pending.length} pending.`,
  );
  console.log(`Output: ${path.relative(projectRoot, outputPath)}`);
  console.log(`Checkpoint: ${path.relative(projectRoot, checkpointPath)}`);

  if (args.dryRun) {
    return;
  }

  if (args.renderOnly) {
    const report = validateTranslationMaps(sourceEntries, checkpoint.wordMeanings, checkpoint.sentenceMeanings);
    if (
      report.missingWords.length ||
      report.missingSentences.length ||
      report.extraWords.length ||
      report.extraSentences.length ||
      report.emptyWords.length ||
      report.emptySentences.length
    ) {
      throw new Error('Checkpoint is incomplete; cannot render-only.');
    }

    const moduleSource = renderTranslationModule(
      args.language,
      sourceEntries,
      checkpoint.wordMeanings,
      checkpoint.sentenceMeanings,
    );
    await fs.writeFile(outputPath, moduleSource, 'utf8');
    console.log(`Rendered ${path.relative(projectRoot, outputPath)} from checkpoint.`);
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is required to generate translations. Use --dry-run to inspect without calling the API.');
  }

  const model = args.model ?? process.env.OPENAI_MODEL ?? 'gpt-5.2';
  let completedBatches = 0;

  for (let index = 0; index < pending.length; index += args.batchSize) {
    if (args.maxBatches !== null && completedBatches >= args.maxBatches) {
      break;
    }

    const batch = pending.slice(index, index + args.batchSize);
    const rangeStart = index + 1;
    const rangeEnd = index + batch.length;
    console.log(`Translating batch ${completedBatches + 1}: pending items ${rangeStart}-${rangeEnd}.`);

    const translations = await translateBatchWithRetry({
      apiKey,
      model,
      languageName: config.languageName,
      batch,
      maxRetries: args.maxRetries,
    });

    for (const translation of translations) {
      checkpoint.wordMeanings[translation.id] = translation.word_meaning.trim();
      checkpoint.sentenceMeanings[translation.id] = translation.sentence_meaning.trim();
    }

    checkpoint.language = args.language;
    checkpoint.model = model;
    checkpoint.updatedAt = new Date().toISOString();
    await writeCheckpoint(checkpointPath, checkpoint);
    completedBatches += 1;
  }

  const report = validateTranslationMaps(sourceEntries, checkpoint.wordMeanings, checkpoint.sentenceMeanings);
  if (
    report.missingWords.length ||
    report.missingSentences.length ||
    report.extraWords.length ||
    report.extraSentences.length ||
    report.emptyWords.length ||
    report.emptySentences.length
  ) {
    console.log('Checkpoint saved, but translation set is still incomplete.');
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  const moduleSource = renderTranslationModule(
    args.language,
    sourceEntries,
    checkpoint.wordMeanings,
    checkpoint.sentenceMeanings,
  );
  await fs.writeFile(outputPath, moduleSource, 'utf8');
  console.log(`Wrote ${path.relative(projectRoot, outputPath)}.`);

  if (report.unchangedWords.length || report.unchangedSentences.length) {
    console.log('Warning: some entries still match the English source exactly.');
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log('Validation passed with no exact English carryover detected.');
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

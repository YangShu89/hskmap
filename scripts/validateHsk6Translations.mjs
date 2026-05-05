import path from 'node:path';
import {
  getHsk6TranslationFilePath,
  loadHsk6TranslationSource,
  loadTranslationModule,
  projectRoot,
  resolveLanguageConfig,
  validateTranslationMaps,
} from './hskTranslationUtils.mjs';

function parseArgs(argv) {
  const args = { language: 'ru' };

  for (const arg of argv) {
    if (!arg.startsWith('--')) {
      throw new Error(`Unexpected argument "${arg}".`);
    }

    const [flag, rawValue] = arg.slice(2).split('=');
    const value = rawValue ?? '';

    switch (flag) {
      case 'lang':
        args.language = value;
        break;
      case 'file':
        args.file = value;
        break;
      default:
        throw new Error(`Unknown flag "--${flag}".`);
    }
  }

  return args;
}

function printList(label, values) {
  if (!values.length) {
    return;
  }
  console.log(`${label} (${values.length}): ${values.slice(0, 20).join(', ')}${values.length > 20 ? ', ...' : ''}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const config = resolveLanguageConfig(args.language);
  const filePath = args.file ? path.resolve(projectRoot, args.file) : getHsk6TranslationFilePath(args.language);
  const sourceEntries = await loadHsk6TranslationSource();
  const module = await loadTranslationModule(args.language, filePath);
  const report = validateTranslationMaps(sourceEntries, module.words, module.sentences);

  console.log(`Validated ${config.languageName}: ${path.relative(projectRoot, filePath)}`);
  console.log(`Expected ${report.expectedCount} entries.`);
  console.log(`Words: ${report.wordCount}`);
  console.log(`Sentences: ${report.sentenceCount}`);

  printList('Missing word ids', report.missingWords);
  printList('Missing sentence ids', report.missingSentences);
  printList('Extra word ids', report.extraWords);
  printList('Extra sentence ids', report.extraSentences);
  printList('Empty word ids', report.emptyWords);
  printList('Empty sentence ids', report.emptySentences);
  printList('Word meanings identical to English source', report.unchangedWords);
  printList('Sentence meanings identical to English source', report.unchangedSentences);

  if (
    report.missingWords.length ||
    report.missingSentences.length ||
    report.extraWords.length ||
    report.extraSentences.length ||
    report.emptyWords.length ||
    report.emptySentences.length
  ) {
    process.exitCode = 1;
    return;
  }

  if (report.unchangedWords.length || report.unchangedSentences.length) {
    console.log('Validation passed with warnings for source-identical entries.');
    return;
  }

  console.log('Validation passed.');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

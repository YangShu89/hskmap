import { buildWords } from './hskBuild';
import { HSK5_RAW } from './hsk5Raw';
import { HSK5_SENTENCES } from './hsk5Sentences';

export const HSK5_WORDS = buildWords(5, HSK5_RAW).map((word) => ({
  ...word,
  exampleSentence: HSK5_SENTENCES[word.id],
}));

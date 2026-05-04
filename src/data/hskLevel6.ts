import { buildWords } from './hskBuild';
import { HSK6_RAW } from './hsk6Raw';
import { HSK6_SENTENCES } from './hsk6Sentences';

export const HSK6_WORDS = buildWords(6, HSK6_RAW).map((word) => ({
  ...word,
  exampleSentence: HSK6_SENTENCES[word.id],
}));

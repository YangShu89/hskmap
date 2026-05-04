import { buildWords } from './hskBuild';
import { HSK3_RAW } from './hsk3Raw';
import { HSK3_SENTENCES } from './hsk3Sentences';

export const HSK3_WORDS = buildWords(3, HSK3_RAW).map((word) => ({
  ...word,
  exampleSentence: HSK3_SENTENCES[word.id],
}));

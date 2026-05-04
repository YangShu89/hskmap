import { buildWords } from './hskBuild';
import { HSK4_RAW } from './hsk4Raw';
import { HSK4_SENTENCES } from './hsk4Sentences';

export const HSK4_WORDS = buildWords(4, HSK4_RAW).map((word) => ({
  ...word,
  exampleSentence: HSK4_SENTENCES[word.id],
}));

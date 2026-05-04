import { buildWords } from './hskBuild';
import { HSK2_RAW } from './hsk2Raw';
import { HSK2_SENTENCES } from './hsk2Sentences';

export const HSK2_WORDS = buildWords(2, HSK2_RAW).map((word) => ({
  ...word,
  exampleSentence: HSK2_SENTENCES[word.id],
}));

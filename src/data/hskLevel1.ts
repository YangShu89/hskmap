import { HSK1_WORDS } from './hsk1';
import { HSK1_SENTENCES } from './hsk1Sentences';
import type { HskWord } from '../types';

export const HSK1_LEVEL_WORDS: HskWord[] = HSK1_WORDS.map((word) => ({
  ...word,
  exampleSentence: HSK1_SENTENCES[word.id],
  level: 1,
}));

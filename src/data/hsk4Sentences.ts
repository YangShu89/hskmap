import type { ExampleSentence } from '../types';
import { HSK4_SENTENCES_PART_1 } from './hsk4SentencesPart1';
import { HSK4_SENTENCES_PART_2 } from './hsk4SentencesPart2';
import { HSK4_SENTENCES_PART_3 } from './hsk4SentencesPart3';
import { HSK4_SENTENCES_PART_4 } from './hsk4SentencesPart4';

export const HSK4_SENTENCES: Record<string, ExampleSentence> = {
  ...HSK4_SENTENCES_PART_1,
  ...HSK4_SENTENCES_PART_2,
  ...HSK4_SENTENCES_PART_3,
  ...HSK4_SENTENCES_PART_4,
};

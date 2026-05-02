import type { ExampleSentence } from '../types';
import { HSK6_SENTENCES_PART_1 } from './hsk6SentencesPart1';
import { HSK6_SENTENCES_PART_2 } from './hsk6SentencesPart2';
import { HSK6_SENTENCES_PART_3 } from './hsk6SentencesPart3';
import { HSK6_SENTENCES_PART_4 } from './hsk6SentencesPart4';
import { HSK6_SENTENCES_PART_5 } from './hsk6SentencesPart5';

export const HSK6_SENTENCES: Record<string, ExampleSentence> = {
  ...HSK6_SENTENCES_PART_1,
  ...HSK6_SENTENCES_PART_2,
  ...HSK6_SENTENCES_PART_3,
  ...HSK6_SENTENCES_PART_4,
  ...HSK6_SENTENCES_PART_5,
};

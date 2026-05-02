import type { ExampleSentence } from '../types';
import { HSK5_SENTENCES_PART_1 } from './hsk5SentencesPart1';
import { HSK5_SENTENCES_PART_2 } from './hsk5SentencesPart2';
import { HSK5_SENTENCES_PART_3 } from './hsk5SentencesPart3';
import { HSK5_SENTENCES_PART_4 } from './hsk5SentencesPart4';
import { HSK5_SENTENCES_PART_5 } from './hsk5SentencesPart5';
import { HSK5_SENTENCES_PART_6 } from './hsk5SentencesPart6';
import { HSK5_SENTENCES_PART_7 } from './hsk5SentencesPart7';
import { HSK5_SENTENCES_PART_8 } from './hsk5SentencesPart8';
import { HSK5_SENTENCES_PART_9 } from './hsk5SentencesPart9';
import { HSK5_SENTENCES_PART_10 } from './hsk5SentencesPart10';

export const HSK5_SENTENCES: Record<string, ExampleSentence> = {
  ...HSK5_SENTENCES_PART_1,
  ...HSK5_SENTENCES_PART_2,
  ...HSK5_SENTENCES_PART_3,
  ...HSK5_SENTENCES_PART_4,
  ...HSK5_SENTENCES_PART_5,
  ...HSK5_SENTENCES_PART_6,
  ...HSK5_SENTENCES_PART_7,
  ...HSK5_SENTENCES_PART_8,
  ...HSK5_SENTENCES_PART_9,
  ...HSK5_SENTENCES_PART_10,
};

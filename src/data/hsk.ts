import { HSK1_LEVEL_WORDS } from './hskLevel1';
import { HSK2_WORDS } from './hskLevel2';
import { HSK3_WORDS } from './hskLevel3';
import { HSK4_WORDS } from './hskLevel4';
import { HSK5_WORDS } from './hskLevel5';
import { HSK6_WORDS } from './hskLevel6';
import type { HskLevel, HskWord } from '../types';

export {
  CLUSTERS,
  HSK_LEVEL_OPTIONS,
  HSK_LEVEL_WORD_COUNTS,
  HSK_LEVELS,
} from './hskMetadata';
export { HSK1_LEVEL_WORDS } from './hskLevel1';
export { HSK2_WORDS } from './hskLevel2';
export { HSK3_WORDS } from './hskLevel3';
export { HSK4_WORDS } from './hskLevel4';
export { HSK5_WORDS } from './hskLevel5';
export { HSK6_WORDS } from './hskLevel6';

export const HSK_WORDS_BY_LEVEL: Record<HskLevel, HskWord[]> = {
  1: HSK1_LEVEL_WORDS,
  2: HSK2_WORDS,
  3: HSK3_WORDS,
  4: HSK4_WORDS,
  5: HSK5_WORDS,
  6: HSK6_WORDS,
};

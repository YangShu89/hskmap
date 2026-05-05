import officialVocabulary from './officialVocabulary.json';
import { HSK3_LEVELS } from './metadata';
import { HSK3_SOURCE_MANIFEST } from './sourceManifest';
import type { Hsk3Level, Hsk3OfficialVocabularyEntry } from '../../types';

type Hsk3OfficialVocabularyPayload = {
  status: 'not_imported' | 'imported';
  generatedAt: string | null;
  inputFile: string | null;
  entries: Hsk3OfficialVocabularyEntry[];
};

export {
  HSK3_LEVEL_NEW_WORD_COUNTS,
  HSK3_LEVEL_OPTIONS,
  HSK3_LEVEL_STAGES,
  HSK3_LEVEL_TOTAL_WORD_COUNTS,
  HSK3_LEVELS,
  HSK3_OFFICIAL_TOTAL_WORD_COUNT,
} from './metadata';
export { HSK3_SOURCE_MANIFEST } from './sourceManifest';

export const HSK3_OFFICIAL_VOCABULARY = officialVocabulary as Hsk3OfficialVocabularyPayload;
export const HSK3_HAS_IMPORTED_OFFICIAL_VOCABULARY =
  HSK3_OFFICIAL_VOCABULARY.status === 'imported' && HSK3_OFFICIAL_VOCABULARY.entries.length > 0;

const EMPTY_BY_LEVEL: Record<Hsk3Level, Hsk3OfficialVocabularyEntry[]> = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  '7-9': [],
};

export const HSK3_OFFICIAL_VOCABULARY_BY_LEVEL = HSK3_OFFICIAL_VOCABULARY.entries.reduce(
  (accumulator, entry) => {
    accumulator[entry.level].push(entry);
    return accumulator;
  },
  HSK3_LEVELS.reduce(
    (accumulator, level) => {
      accumulator[level] = [...EMPTY_BY_LEVEL[level]];
      return accumulator;
    },
    { ...EMPTY_BY_LEVEL },
  ),
);

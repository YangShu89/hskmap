import officialVocabulary from './officialVocabulary.json';
import { HSK3_LEVELS } from './metadata';
import { HSK3_SOURCE_MANIFEST } from './sourceManifest';
import { normalizeHsk3OfficialVocabularyPayload } from './normalize';
import type {
  Hsk3Level,
  Hsk3NormalizedOfficialVocabularyEntry,
  Hsk3OfficialVocabularyEntry,
  Hsk3OfficialVocabularyPayload,
} from '../../types';

export { normalizeHsk3Entries, normalizeHsk3Entry, normalizeHsk3Hanzi } from './normalize';

export {
  HSK3_LEVEL_NEW_WORD_COUNTS,
  HSK3_LEVEL_OPTIONS,
  HSK3_LEVEL_STAGES,
  HSK3_LEVEL_TOTAL_WORD_COUNTS,
  HSK3_LEVELS,
  HSK3_OFFICIAL_TOTAL_WORD_COUNT,
} from './metadata';
export { HSK3_SOURCE_MANIFEST } from './sourceManifest';

export const HSK3_OFFICIAL_VOCABULARY =
  officialVocabulary as Hsk3OfficialVocabularyPayload<Hsk3OfficialVocabularyEntry>;
export const HSK3_NORMALIZED_OFFICIAL_VOCABULARY =
  normalizeHsk3OfficialVocabularyPayload(HSK3_OFFICIAL_VOCABULARY);
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
const EMPTY_NORMALIZED_BY_LEVEL: Record<Hsk3Level, Hsk3NormalizedOfficialVocabularyEntry[]> = {
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

export const HSK3_NORMALIZED_OFFICIAL_VOCABULARY_BY_LEVEL =
  HSK3_NORMALIZED_OFFICIAL_VOCABULARY.entries.reduce(
    (accumulator, entry) => {
      accumulator[entry.level].push(entry);
      return accumulator;
    },
    HSK3_LEVELS.reduce(
      (accumulator, level) => {
        accumulator[level] = [...EMPTY_NORMALIZED_BY_LEVEL[level]];
        return accumulator;
      },
      { ...EMPTY_NORMALIZED_BY_LEVEL },
    ),
  );

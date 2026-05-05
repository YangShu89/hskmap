import { HSK3_LEVEL1_CLASSIC_REUSE_ENTRIES } from './level1Reuse';
import type {
  Hsk3Level1ClassicReuseCandidate,
  Hsk3Level1ClassicReuseEntry,
} from './level1Reuse';
import type { Hsk3NormalizedOfficialVocabularyEntry } from '../../types';

export type Hsk3Level1EnglishMeaningSource = 'classic_reuse' | 'authored' | 'missing';

export interface Hsk3Level1EnglishAuthoredMeaningRecord {
  meaning: string;
}

export type Hsk3Level1EnglishAuthoredMeaningValue =
  | string
  | Hsk3Level1EnglishAuthoredMeaningRecord;

export type Hsk3Level1EnglishAuthoredMeaningMap = Record<
  number,
  Hsk3Level1EnglishAuthoredMeaningValue
>;

export interface Hsk3Level1EnglishEntry {
  official: Hsk3NormalizedOfficialVocabularyEntry;
  sequence: number;
  matchKey: string;
  meaning: string | null;
  meaningSource: Hsk3Level1EnglishMeaningSource;
  reusedMeaning: string | null;
  authoredMeaning: string | null;
  preferredReuseCandidate: Hsk3Level1ClassicReuseCandidate | null;
  reuse: Hsk3Level1ClassicReuseEntry;
}

export interface Hsk3Level1EnglishSummary {
  level: 1;
  totalEntryCount: number;
  reusedMeaningCount: number;
  authoredMeaningCount: number;
  missingMeaningCount: number;
  coveredEntryCount: number;
  coverageRate: number;
  unmatchedEntryCount: number;
  authoredMappingEntryCount: number;
  unusedAuthoredMeaningCount: number;
}

export interface Hsk3Level1EnglishPayload {
  level: 1;
  entries: Hsk3Level1EnglishEntry[];
  summary: Hsk3Level1EnglishSummary;
}

type Hsk3Level1EnglishMeaningModule = Record<string, unknown>;

const LEVEL1_ENGLISH_MEANING_MODULES = import.meta.glob('./level1EnglishMeanings.ts', {
  eager: true,
}) as Record<string, Hsk3Level1EnglishMeaningModule>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeMeaning(value: unknown) {
  if (typeof value === 'string') {
    const normalized = value.trim();
    return normalized.length > 0 ? normalized : null;
  }

  if (!isRecord(value)) {
    return null;
  }

  if (typeof value.meaning === 'string') {
    const normalized = value.meaning.trim();
    return normalized.length > 0 ? normalized : null;
  }

  return null;
}

function isMeaningMap(value: unknown): value is Record<string, Hsk3Level1EnglishAuthoredMeaningValue> {
  return isRecord(value);
}

function resolveAuthoredMeaningMap() {
  const module = Object.values(LEVEL1_ENGLISH_MEANING_MODULES)[0];

  if (!module) {
    return {} as Hsk3Level1EnglishAuthoredMeaningMap;
  }

  const candidates = [
    module.HSK3_LEVEL1_ENGLISH_MEANINGS,
    module.LEVEL1_ENGLISH_MEANINGS,
    module.level1EnglishMeanings,
    module.default,
    module,
  ];

  for (const candidate of candidates) {
    if (!isMeaningMap(candidate)) {
      continue;
    }

    const mapping = Object.entries(candidate).reduce(
      (accumulator, [sequenceKey, meaningValue]) => {
        const sequence = Number(sequenceKey);

        if (!Number.isInteger(sequence)) {
          return accumulator;
        }

        if (normalizeMeaning(meaningValue) === null) {
          return accumulator;
        }

        accumulator[sequence] = meaningValue;
        return accumulator;
      },
      {} as Hsk3Level1EnglishAuthoredMeaningMap,
    );

    if (Object.keys(mapping).length > 0) {
      return mapping;
    }
  }

  return {} as Hsk3Level1EnglishAuthoredMeaningMap;
}

function resolveEntryMeaningSource(
  reuseEntry: Hsk3Level1ClassicReuseEntry,
  reusedMeaning: string | null,
  authoredMeaning: string | null,
) {
  if (reuseEntry.availability.meaning && reusedMeaning !== null) {
    return 'classic_reuse' as const;
  }

  if (authoredMeaning !== null) {
    return 'authored' as const;
  }

  return 'missing' as const;
}

const HSK3_LEVEL1_AUTHORED_MEANINGS = resolveAuthoredMeaningMap();

export const HSK3_LEVEL1_ENGLISH_ENTRIES: Hsk3Level1EnglishEntry[] = [];
export const HSK3_LEVEL1_ENGLISH_BY_SEQUENCE: Record<number, Hsk3Level1EnglishEntry> = {};
export const HSK3_LEVEL1_ENGLISH_SUMMARY: Hsk3Level1EnglishSummary = {
  level: 1,
  totalEntryCount: 0,
  reusedMeaningCount: 0,
  authoredMeaningCount: 0,
  missingMeaningCount: 0,
  coveredEntryCount: 0,
  coverageRate: 0,
  unmatchedEntryCount: 0,
  authoredMappingEntryCount: 0,
  unusedAuthoredMeaningCount: 0,
};

const usedAuthoredSequences = new Set<number>();

for (const reuseEntry of HSK3_LEVEL1_CLASSIC_REUSE_ENTRIES) {
  const sequence = reuseEntry.official.sequence;
  const reusedMeaning = normalizeMeaning(reuseEntry.preferredCandidate?.meaning ?? null);
  const authoredMeaning = normalizeMeaning(HSK3_LEVEL1_AUTHORED_MEANINGS[sequence]);
  const meaningSource = resolveEntryMeaningSource(reuseEntry, reusedMeaning, authoredMeaning);

  if (meaningSource === 'authored') {
    usedAuthoredSequences.add(sequence);
  }

  const meaning = meaningSource === 'classic_reuse' ? reusedMeaning : authoredMeaning;
  const entry: Hsk3Level1EnglishEntry = {
    official: reuseEntry.official,
    sequence,
    matchKey: reuseEntry.matchKey,
    meaning,
    meaningSource,
    reusedMeaning,
    authoredMeaning,
    preferredReuseCandidate: reuseEntry.preferredCandidate,
    reuse: reuseEntry,
  };

  HSK3_LEVEL1_ENGLISH_ENTRIES.push(entry);
  HSK3_LEVEL1_ENGLISH_BY_SEQUENCE[sequence] = entry;
}

HSK3_LEVEL1_ENGLISH_SUMMARY.totalEntryCount = HSK3_LEVEL1_ENGLISH_ENTRIES.length;
HSK3_LEVEL1_ENGLISH_SUMMARY.unmatchedEntryCount = HSK3_LEVEL1_ENGLISH_ENTRIES.reduce(
  (count, entry) => count + Number(!entry.reuse.availability.meaning),
  0,
);
HSK3_LEVEL1_ENGLISH_SUMMARY.authoredMappingEntryCount = Object.keys(
  HSK3_LEVEL1_AUTHORED_MEANINGS,
).length;

for (const entry of HSK3_LEVEL1_ENGLISH_ENTRIES) {
  if (entry.meaningSource === 'classic_reuse') {
    HSK3_LEVEL1_ENGLISH_SUMMARY.reusedMeaningCount += 1;
  } else if (entry.meaningSource === 'authored') {
    HSK3_LEVEL1_ENGLISH_SUMMARY.authoredMeaningCount += 1;
  } else {
    HSK3_LEVEL1_ENGLISH_SUMMARY.missingMeaningCount += 1;
  }
}

HSK3_LEVEL1_ENGLISH_SUMMARY.coveredEntryCount =
  HSK3_LEVEL1_ENGLISH_SUMMARY.reusedMeaningCount + HSK3_LEVEL1_ENGLISH_SUMMARY.authoredMeaningCount;
HSK3_LEVEL1_ENGLISH_SUMMARY.coverageRate =
  HSK3_LEVEL1_ENGLISH_SUMMARY.totalEntryCount === 0
    ? 0
    : HSK3_LEVEL1_ENGLISH_SUMMARY.coveredEntryCount /
      HSK3_LEVEL1_ENGLISH_SUMMARY.totalEntryCount;
HSK3_LEVEL1_ENGLISH_SUMMARY.unusedAuthoredMeaningCount = Object.keys(
  HSK3_LEVEL1_AUTHORED_MEANINGS,
).reduce((count, sequenceKey) => count + Number(!usedAuthoredSequences.has(Number(sequenceKey))), 0);

export const HSK3_LEVEL1_ENGLISH_PAYLOAD: Hsk3Level1EnglishPayload = {
  level: 1,
  entries: HSK3_LEVEL1_ENGLISH_ENTRIES,
  summary: HSK3_LEVEL1_ENGLISH_SUMMARY,
};

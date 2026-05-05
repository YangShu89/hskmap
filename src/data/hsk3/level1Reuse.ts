import { HSK1_LEVEL_WORDS } from '../hskLevel1';
import { HSK2_WORDS } from '../hskLevel2';
import { HSK3_WORDS } from '../hskLevel3';
import { HSK4_WORDS } from '../hskLevel4';
import { HSK5_WORDS } from '../hskLevel5';
import { HSK6_WORDS } from '../hskLevel6';
import { HSK3_NORMALIZED_OFFICIAL_VOCABULARY_BY_LEVEL } from './index';
import type {
  ClassicHskLevel,
  ClusterId,
  ExampleSentence,
  Hsk3NormalizedOfficialVocabularyEntry,
  HskWord,
} from '../../types';

const CLASSIC_HSK_LEVELS = [1, 2, 3, 4, 5, 6] as const satisfies readonly ClassicHskLevel[];

export interface Hsk3Level1ClassicReuseAudioCandidate {
  wordId: string;
  src: string;
}

export interface Hsk3Level1ClassicReuseCandidate {
  classicId: string;
  classicLevel: ClassicHskLevel;
  hanzi: string;
  pinyin: string;
  meaning: string;
  cluster: ClusterId;
  exampleSentence: ExampleSentence | null;
  audio: Hsk3Level1ClassicReuseAudioCandidate | null;
}

export interface Hsk3Level1ClassicReuseAvailability {
  exactMatch: boolean;
  meaning: boolean;
  audio: boolean;
  exampleSentence: boolean;
}

export interface Hsk3Level1ClassicReuseEntry {
  official: Hsk3NormalizedOfficialVocabularyEntry;
  matchKey: string;
  candidates: Hsk3Level1ClassicReuseCandidate[];
  preferredCandidate: Hsk3Level1ClassicReuseCandidate | null;
  availability: Hsk3Level1ClassicReuseAvailability;
}

export interface Hsk3Level1ClassicReuseSummary {
  level: 1;
  officialEntryCount: number;
  exactMatchEntryCount: number;
  unmatchedEntryCount: number;
  meaningCandidateEntryCount: number;
  audioCandidateEntryCount: number;
  exampleSentenceCandidateEntryCount: number;
  multipleCandidateEntryCount: number;
  matchedClassicCandidateCount: number;
  exactMatchRate: number;
  meaningCandidateRate: number;
  audioCandidateRate: number;
  exampleSentenceCandidateRate: number;
  matchedOfficialEntryCountByClassicLevel: Record<ClassicHskLevel, number>;
  matchedCandidateCountByClassicLevel: Record<ClassicHskLevel, number>;
  preferredCandidateCountByClassicLevel: Record<ClassicHskLevel, number>;
}

export interface Hsk3Level1ClassicReusePayload {
  level: 1;
  entries: Hsk3Level1ClassicReuseEntry[];
  summary: Hsk3Level1ClassicReuseSummary;
}

function normalizePinyin(value: string) {
  return value
    .normalize('NFC')
    .toLowerCase()
    .replace(/[\s'’·-]+/g, '')
    .trim();
}

function normalizeHanzi(value: string) {
  return value.normalize('NFC').trim();
}

function makeMatchKey(hanzi: string, pinyin: string) {
  return `${normalizeHanzi(hanzi)}::${normalizePinyin(pinyin)}`;
}

function createClassicLevelCountRecord() {
  return CLASSIC_HSK_LEVELS.reduce(
    (counts, level) => {
      counts[level] = 0;
      return counts;
    },
    {} as Record<ClassicHskLevel, number>,
  );
}

function hasClassicLevel(word: HskWord): word is HskWord & { level: ClassicHskLevel } {
  return typeof word.level === 'number' && CLASSIC_HSK_LEVELS.includes(word.level as ClassicHskLevel);
}

function resolveClassicAudioCandidate(word: HskWord & { level: ClassicHskLevel }) {
  return {
    wordId: word.id,
    src: `/audio/words/${word.id}.mp3`,
  } satisfies Hsk3Level1ClassicReuseAudioCandidate;
}

function toReuseCandidate(word: HskWord & { level: ClassicHskLevel }): Hsk3Level1ClassicReuseCandidate {
  return {
    classicId: word.id,
    classicLevel: word.level,
    hanzi: word.hanzi,
    pinyin: word.pinyin,
    meaning: word.meaning,
    cluster: word.cluster,
    exampleSentence: word.exampleSentence ?? null,
    audio: resolveClassicAudioCandidate(word),
  };
}

function compareCandidates(
  left: Hsk3Level1ClassicReuseCandidate,
  right: Hsk3Level1ClassicReuseCandidate,
) {
  const leftHasSentence = Number(Boolean(left.exampleSentence));
  const rightHasSentence = Number(Boolean(right.exampleSentence));

  if (leftHasSentence !== rightHasSentence) {
    return rightHasSentence - leftHasSentence;
  }

  if (left.classicLevel !== right.classicLevel) {
    return left.classicLevel - right.classicLevel;
  }

  return left.classicId.localeCompare(right.classicId);
}

const CLASSIC_WORDS = [
  ...HSK1_LEVEL_WORDS,
  ...HSK2_WORDS,
  ...HSK3_WORDS,
  ...HSK4_WORDS,
  ...HSK5_WORDS,
  ...HSK6_WORDS,
].filter(hasClassicLevel);

const CLASSIC_WORDS_BY_MATCH_KEY = CLASSIC_WORDS.reduce(
  (matchesByKey, word) => {
    const matchKey = makeMatchKey(word.hanzi, word.pinyin);
    const existing = matchesByKey.get(matchKey) ?? [];
    existing.push(word);
    matchesByKey.set(matchKey, existing);
    return matchesByKey;
  },
  new Map<string, (HskWord & { level: ClassicHskLevel })[]>(),
);

export const HSK3_LEVEL1_OFFICIAL_VOCABULARY = HSK3_NORMALIZED_OFFICIAL_VOCABULARY_BY_LEVEL[1];

export const HSK3_LEVEL1_CLASSIC_REUSE_ENTRIES: Hsk3Level1ClassicReuseEntry[] =
  HSK3_LEVEL1_OFFICIAL_VOCABULARY.map((official) => {
    const matchKey = makeMatchKey(official.displayHanzi, official.pinyin);
    const candidates = (CLASSIC_WORDS_BY_MATCH_KEY.get(matchKey) ?? [])
      .map(toReuseCandidate)
      .sort(compareCandidates);
    const preferredCandidate = candidates[0] ?? null;

    return {
      official,
      matchKey,
      candidates,
      preferredCandidate,
      availability: {
        exactMatch: candidates.length > 0,
        meaning: candidates.length > 0,
        audio: candidates.some((candidate) => candidate.audio !== null),
        exampleSentence: candidates.some((candidate) => candidate.exampleSentence !== null),
      },
    };
  });

export const HSK3_LEVEL1_CLASSIC_REUSE_BY_MATCH_KEY = HSK3_LEVEL1_CLASSIC_REUSE_ENTRIES.reduce(
  (entriesByKey, entry) => {
    const existing = entriesByKey[entry.matchKey] ?? [];
    existing.push(entry);
    entriesByKey[entry.matchKey] = existing;
    return entriesByKey;
  },
  {} as Record<string, Hsk3Level1ClassicReuseEntry[]>,
);

export const HSK3_LEVEL1_CLASSIC_REUSE_SUMMARY: Hsk3Level1ClassicReuseSummary =
  HSK3_LEVEL1_CLASSIC_REUSE_ENTRIES.reduce(
    (summary, entry) => {
      const matchedClassicLevels = new Set<ClassicHskLevel>();

      for (const candidate of entry.candidates) {
        summary.matchedClassicCandidateCount += 1;
        summary.matchedCandidateCountByClassicLevel[candidate.classicLevel] += 1;
        matchedClassicLevels.add(candidate.classicLevel);
      }

      for (const classicLevel of matchedClassicLevels) {
        summary.matchedOfficialEntryCountByClassicLevel[classicLevel] += 1;
      }

      if (entry.preferredCandidate) {
        summary.preferredCandidateCountByClassicLevel[entry.preferredCandidate.classicLevel] += 1;
      }

      if (entry.availability.exactMatch) {
        summary.exactMatchEntryCount += 1;
      } else {
        summary.unmatchedEntryCount += 1;
      }

      if (entry.availability.meaning) {
        summary.meaningCandidateEntryCount += 1;
      }

      if (entry.availability.audio) {
        summary.audioCandidateEntryCount += 1;
      }

      if (entry.availability.exampleSentence) {
        summary.exampleSentenceCandidateEntryCount += 1;
      }

      if (entry.candidates.length > 1) {
        summary.multipleCandidateEntryCount += 1;
      }

      return summary;
    },
    {
      level: 1,
      officialEntryCount: HSK3_LEVEL1_CLASSIC_REUSE_ENTRIES.length,
      exactMatchEntryCount: 0,
      unmatchedEntryCount: 0,
      meaningCandidateEntryCount: 0,
      audioCandidateEntryCount: 0,
      exampleSentenceCandidateEntryCount: 0,
      multipleCandidateEntryCount: 0,
      matchedClassicCandidateCount: 0,
      exactMatchRate: 0,
      meaningCandidateRate: 0,
      audioCandidateRate: 0,
      exampleSentenceCandidateRate: 0,
      matchedOfficialEntryCountByClassicLevel: createClassicLevelCountRecord(),
      matchedCandidateCountByClassicLevel: createClassicLevelCountRecord(),
      preferredCandidateCountByClassicLevel: createClassicLevelCountRecord(),
    } satisfies Hsk3Level1ClassicReuseSummary,
  );

HSK3_LEVEL1_CLASSIC_REUSE_SUMMARY.exactMatchRate =
  HSK3_LEVEL1_CLASSIC_REUSE_SUMMARY.officialEntryCount === 0
    ? 0
    : HSK3_LEVEL1_CLASSIC_REUSE_SUMMARY.exactMatchEntryCount /
      HSK3_LEVEL1_CLASSIC_REUSE_SUMMARY.officialEntryCount;
HSK3_LEVEL1_CLASSIC_REUSE_SUMMARY.meaningCandidateRate =
  HSK3_LEVEL1_CLASSIC_REUSE_SUMMARY.officialEntryCount === 0
    ? 0
    : HSK3_LEVEL1_CLASSIC_REUSE_SUMMARY.meaningCandidateEntryCount /
      HSK3_LEVEL1_CLASSIC_REUSE_SUMMARY.officialEntryCount;
HSK3_LEVEL1_CLASSIC_REUSE_SUMMARY.audioCandidateRate =
  HSK3_LEVEL1_CLASSIC_REUSE_SUMMARY.officialEntryCount === 0
    ? 0
    : HSK3_LEVEL1_CLASSIC_REUSE_SUMMARY.audioCandidateEntryCount /
      HSK3_LEVEL1_CLASSIC_REUSE_SUMMARY.officialEntryCount;
HSK3_LEVEL1_CLASSIC_REUSE_SUMMARY.exampleSentenceCandidateRate =
  HSK3_LEVEL1_CLASSIC_REUSE_SUMMARY.officialEntryCount === 0
    ? 0
    : HSK3_LEVEL1_CLASSIC_REUSE_SUMMARY.exampleSentenceCandidateEntryCount /
      HSK3_LEVEL1_CLASSIC_REUSE_SUMMARY.officialEntryCount;

export const HSK3_LEVEL1_CLASSIC_REUSE_PAYLOAD: Hsk3Level1ClassicReusePayload = {
  level: 1,
  entries: HSK3_LEVEL1_CLASSIC_REUSE_ENTRIES,
  summary: HSK3_LEVEL1_CLASSIC_REUSE_SUMMARY,
};

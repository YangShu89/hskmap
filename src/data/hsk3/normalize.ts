import type {
  Hsk3NormalizedEntry,
  Hsk3NormalizedHanziFields,
  Hsk3NormalizedOfficialVocabularyEntry,
  Hsk3OfficialVocabularyEntry,
  Hsk3OfficialVocabularyPayload,
  Hsk3SenseMarker,
} from '../../types';

// Official HSK 3.0 imports use a trailing ASCII digit to distinguish senses like 本1 / 本2.
const HSK3_SENSE_MARKER_PATTERN = /^(?<displayHanzi>.*\p{Script=Han})(?<senseMarker>[1-9]\d*)$/u;

export function normalizeHsk3Hanzi(hanzi: string): Hsk3NormalizedHanziFields {
  const match = HSK3_SENSE_MARKER_PATTERN.exec(hanzi);
  const displayHanzi = match?.groups?.displayHanzi ?? hanzi;
  const senseMarker = (match?.groups?.senseMarker as Hsk3SenseMarker | undefined) ?? null;

  return {
    rawHanzi: hanzi,
    displayHanzi,
    senseMarker,
    hasSenseMarker: senseMarker !== null,
  };
}

export function normalizeHsk3Entry<TEntry extends { hanzi: string }>(
  entry: TEntry,
): Hsk3NormalizedEntry<TEntry> {
  return {
    ...entry,
    ...normalizeHsk3Hanzi(entry.hanzi),
  };
}

export function normalizeHsk3Entries<TEntry extends { hanzi: string }>(
  entries: readonly TEntry[],
): Hsk3NormalizedEntry<TEntry>[] {
  return entries.map((entry) => normalizeHsk3Entry(entry));
}

export function normalizeHsk3OfficialVocabularyEntry(
  entry: Hsk3OfficialVocabularyEntry,
): Hsk3NormalizedOfficialVocabularyEntry {
  return normalizeHsk3Entry(entry);
}

export function normalizeHsk3OfficialVocabularyPayload(
  payload: Hsk3OfficialVocabularyPayload,
): Hsk3OfficialVocabularyPayload<Hsk3NormalizedOfficialVocabularyEntry> {
  return {
    ...payload,
    entries: normalizeHsk3Entries(payload.entries),
  };
}

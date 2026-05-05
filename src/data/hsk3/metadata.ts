import type { Hsk3Level, Hsk3Stage } from '../../types';
import { HSK3_SOURCE_MANIFEST } from './sourceManifest';

export const HSK3_LEVELS = [1, 2, 3, 4, 5, 6, '7-9'] as const satisfies readonly Hsk3Level[];

export const HSK3_LEVEL_STAGES: Record<Hsk3Level, Hsk3Stage> = {
  1: HSK3_SOURCE_MANIFEST.bands['1'].stage,
  2: HSK3_SOURCE_MANIFEST.bands['2'].stage,
  3: HSK3_SOURCE_MANIFEST.bands['3'].stage,
  4: HSK3_SOURCE_MANIFEST.bands['4'].stage,
  5: HSK3_SOURCE_MANIFEST.bands['5'].stage,
  6: HSK3_SOURCE_MANIFEST.bands['6'].stage,
  '7-9': HSK3_SOURCE_MANIFEST.bands['7-9'].stage,
};

export const HSK3_LEVEL_NEW_WORD_COUNTS: Record<Hsk3Level, number> = {
  1: HSK3_SOURCE_MANIFEST.bands['1'].addedCount,
  2: HSK3_SOURCE_MANIFEST.bands['2'].addedCount,
  3: HSK3_SOURCE_MANIFEST.bands['3'].addedCount,
  4: HSK3_SOURCE_MANIFEST.bands['4'].addedCount,
  5: HSK3_SOURCE_MANIFEST.bands['5'].addedCount,
  6: HSK3_SOURCE_MANIFEST.bands['6'].addedCount,
  '7-9': HSK3_SOURCE_MANIFEST.bands['7-9'].addedCount,
};

export const HSK3_LEVEL_TOTAL_WORD_COUNTS: Record<Hsk3Level, number> = {
  1: HSK3_SOURCE_MANIFEST.bands['1'].cumulativeTotal,
  2: HSK3_SOURCE_MANIFEST.bands['2'].cumulativeTotal,
  3: HSK3_SOURCE_MANIFEST.bands['3'].cumulativeTotal,
  4: HSK3_SOURCE_MANIFEST.bands['4'].cumulativeTotal,
  5: HSK3_SOURCE_MANIFEST.bands['5'].cumulativeTotal,
  6: HSK3_SOURCE_MANIFEST.bands['6'].cumulativeTotal,
  '7-9': HSK3_SOURCE_MANIFEST.bands['7-9'].cumulativeTotal,
};

export const HSK3_LEVEL_OPTIONS: {
  id: Hsk3Level;
  label: string;
  stage: Hsk3Stage;
  description: string;
}[] = HSK3_LEVELS.map((level) => {
  const label = level === '7-9' ? 'HSK 7-9' : `HSK ${level}`;
  const newWords = HSK3_LEVEL_NEW_WORD_COUNTS[level].toLocaleString('en');
  const totalWords = HSK3_LEVEL_TOTAL_WORD_COUNTS[level].toLocaleString('en');

  return {
    id: level,
    label,
    stage: HSK3_LEVEL_STAGES[level],
    description: `${newWords} new words - ${totalWords} cumulative`,
  };
});

export const HSK3_OFFICIAL_TOTAL_WORD_COUNT = HSK3_LEVEL_TOTAL_WORD_COUNTS['7-9'];

import type { ClusterMeta, HskLevel } from '../types';

export const HSK_LEVELS = [1, 2, 3, 4, 5, 6] as const satisfies readonly HskLevel[];

export const HSK_LEVEL_WORD_COUNTS: Record<HskLevel, number> = {
  1: 150,
  2: 150,
  3: 300,
  4: 600,
  5: 1300,
  6: 2500,
};

export const HSK_LEVEL_OPTIONS: { id: HskLevel; label: string; description: string }[] = [
  { id: 1, label: 'HSK 1', description: '150 words' },
  { id: 2, label: 'HSK 2', description: '150 new words' },
  { id: 3, label: 'HSK 3', description: '300 new words' },
  { id: 4, label: 'HSK 4', description: '600 new words' },
  { id: 5, label: 'HSK 5', description: '1,300 new words' },
  { id: 6, label: 'HSK 6', description: '2,500 new words' },
];

export const CLUSTERS: ClusterMeta[] = [
  {
    id: 'people',
    title: 'People & Pronouns',
    subtitle: 'Family, classmates, identity',
    accent: '#f97316',
  },
  {
    id: 'time',
    title: 'Numbers & Time',
    subtitle: 'Counting, dates, parts of day',
    accent: '#0ea5e9',
  },
  {
    id: 'places',
    title: 'Places & School',
    subtitle: 'Locations, directions, school life',
    accent: '#22c55e',
  },
  {
    id: 'verbs',
    title: 'Common Verbs',
    subtitle: 'Actions for everyday sentences',
    accent: '#8b5cf6',
  },
  {
    id: 'questions',
    title: 'Questions & Particles',
    subtitle: 'Glue words and sentence endings',
    accent: '#ec4899',
  },
  {
    id: 'daily',
    title: 'Food, Objects & Daily Life',
    subtitle: 'Things you can point to',
    accent: '#f59e0b',
  },
  {
    id: 'descriptors',
    title: 'Descriptors & Adverbs',
    subtitle: 'Size, feeling, degree',
    accent: '#14b8a6',
  },
];

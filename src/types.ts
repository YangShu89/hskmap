export type ClusterId =
  | 'people'
  | 'time'
  | 'places'
  | 'verbs'
  | 'questions'
  | 'daily'
  | 'descriptors';

export type HskLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type WordStatus = 'learning' | 'know';

export interface HskWord {
  id: string;
  level?: HskLevel;
  hanzi: string;
  pinyin: string;
  meaning: string;
  cluster: ClusterId;
  examples?: string[];
}

export interface ClusterMeta {
  id: ClusterId;
  title: string;
  subtitle: string;
  accent: string;
}

export type ProgressMap = Record<string, WordStatus>;

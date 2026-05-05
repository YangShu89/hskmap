export type ClusterId =
  | 'people'
  | 'time'
  | 'places'
  | 'verbs'
  | 'questions'
  | 'daily'
  | 'descriptors';

export type ClassicHskLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HskLevel = ClassicHskLevel;
export type HskStandard = 'classic' | 'hsk3';
export type Hsk3Level = 1 | 2 | 3 | 4 | 5 | 6 | '7-9';
export type Hsk3Stage = 'elementary' | 'intermediate' | 'advanced';

export type WordStatus = 'learning' | 'know';

export interface ExampleSentence {
  hanzi: string;
  pinyin: string;
  meaning: string;
}

export interface HskWord {
  id: string;
  level?: HskLevel;
  hanzi: string;
  pinyin: string;
  meaning: string;
  cluster: ClusterId;
  exampleSentence?: ExampleSentence;
  examples?: string[];
}

export interface ClusterMeta {
  id: ClusterId;
  title: string;
  subtitle: string;
  accent: string;
}

export type ProgressMap = Record<string, WordStatus>;

export interface Hsk3OfficialVocabularyEntry {
  sequence: number;
  level: Hsk3Level;
  levelLabel: string;
  additionalLevels: Hsk3Level[];
  hanzi: string;
  pinyin: string;
  partOfSpeech: string;
}

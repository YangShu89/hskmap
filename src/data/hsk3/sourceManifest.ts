import manifest from './sourceManifest.json';
import type { Hsk3Stage } from '../../types';

export type Hsk3BandKey = '1' | '2' | '3' | '4' | '5' | '6' | '7-9';

export interface Hsk3BandSummary {
  stage: Hsk3Stage;
  addedCount: number;
  cumulativeTotal: number;
}

export interface Hsk3SourceManifest {
  standard: 'HSK 3.0';
  publisher: string;
  canonicalSource: {
    title: string;
    url: string;
    released: string;
    implemented: string;
  };
  referencePages: {
    vocabularyStart: number;
    levelStarts: Record<Hsk3BandKey, number>;
  };
  supportingSources: {
    overviewUrl: string;
    syllabusPortalUrl: string;
    pilotNoticeUrl: string;
    pilotNoticeObservedOn: string;
  };
  bands: Record<Hsk3BandKey, Hsk3BandSummary>;
}

export const HSK3_SOURCE_MANIFEST = manifest as Hsk3SourceManifest;

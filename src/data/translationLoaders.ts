import type { HskLevel } from '../types';
import { HSK5_LOCALIZED_WORD_MEANING_OVERRIDES } from './hsk5LocalizedMeaningOverrides';

export type TranslationLanguage =
  | 'en'
  | 'es'
  | 'fr'
  | 'ru'
  | 'pt-BR'
  | 'de'
  | 'ja'
  | 'ko'
  | 'vi'
  | 'id'
  | 'ar';
export type LocalizedLanguage = Exclude<TranslationLanguage, 'en'>;

export type LocalizedMeaningMap = {
  words: Record<string, string>;
  sentences: Record<string, string>;
};

export type LoadedLocalizedMeanings = Partial<
  Record<HskLevel, Partial<Record<LocalizedLanguage, LocalizedMeaningMap>>>
>;

type TranslationLoader = () => Promise<LocalizedMeaningMap>;

function bundle<T extends Record<string, unknown>>(
  loader: () => Promise<T>,
  wordExport: keyof T,
  sentenceExport: keyof T,
): TranslationLoader {
  return async () => {
    const module = await loader();

    return {
      words: module[wordExport] as Record<string, string>,
      sentences: module[sentenceExport] as Record<string, string>,
    };
  };
}

function withWordMeaningOverrides(
  loader: TranslationLoader,
  wordOverrides: Record<string, string>,
): TranslationLoader {
  return async () => {
    const localizedMeanings = await loader();

    return {
      ...localizedMeanings,
      words: {
        ...localizedMeanings.words,
        ...wordOverrides,
      },
    };
  };
}

const TRANSLATION_LOADERS: Partial<Record<HskLevel, Partial<Record<LocalizedLanguage, TranslationLoader>>>> = {
  1: {
    ar: bundle(
      () => import('./hsk1ArabicTranslations'),
      'HSK1_AR_WORD_MEANINGS',
      'HSK1_AR_SENTENCE_MEANINGS',
    ),
    de: bundle(
      () => import('./hsk1GermanTranslations'),
      'HSK1_DE_WORD_MEANINGS',
      'HSK1_DE_SENTENCE_MEANINGS',
    ),
    es: bundle(
      () => import('./hsk1SpanishTranslations'),
      'HSK1_ES_WORD_MEANINGS',
      'HSK1_ES_SENTENCE_MEANINGS',
    ),
    fr: bundle(
      () => import('./hsk1FrenchTranslations'),
      'HSK1_FR_WORD_MEANINGS',
      'HSK1_FR_SENTENCE_MEANINGS',
    ),
    id: bundle(
      () => import('./hsk1IndonesianTranslations'),
      'HSK1_ID_WORD_MEANINGS',
      'HSK1_ID_SENTENCE_MEANINGS',
    ),
    ja: bundle(
      () => import('./hsk1JapaneseTranslations'),
      'HSK1_JA_WORD_MEANINGS',
      'HSK1_JA_SENTENCE_MEANINGS',
    ),
    ko: bundle(
      () => import('./hsk1KoreanTranslations'),
      'HSK1_KO_WORD_MEANINGS',
      'HSK1_KO_SENTENCE_MEANINGS',
    ),
    'pt-BR': bundle(
      () => import('./hsk1PortugueseTranslations'),
      'HSK1_PT_BR_WORD_MEANINGS',
      'HSK1_PT_BR_SENTENCE_MEANINGS',
    ),
    ru: bundle(
      () => import('./hsk1Translations'),
      'HSK1_RU_WORD_MEANINGS',
      'HSK1_RU_SENTENCE_MEANINGS',
    ),
    vi: bundle(
      () => import('./hsk1VietnameseTranslations'),
      'HSK1_VI_WORD_MEANINGS',
      'HSK1_VI_SENTENCE_MEANINGS',
    ),
  },
  2: {
    ar: bundle(
      () => import('./hsk2ArabicTranslations'),
      'HSK2_AR_WORD_MEANINGS',
      'HSK2_AR_SENTENCE_MEANINGS',
    ),
    de: bundle(
      () => import('./hsk2GermanTranslations'),
      'HSK2_DE_WORD_MEANINGS',
      'HSK2_DE_SENTENCE_MEANINGS',
    ),
    es: bundle(
      () => import('./hsk2SpanishTranslations'),
      'HSK2_ES_WORD_MEANINGS',
      'HSK2_ES_SENTENCE_MEANINGS',
    ),
    fr: bundle(
      () => import('./hsk2FrenchTranslations'),
      'HSK2_FR_WORD_MEANINGS',
      'HSK2_FR_SENTENCE_MEANINGS',
    ),
    id: bundle(
      () => import('./hsk2IndonesianTranslations'),
      'HSK2_ID_WORD_MEANINGS',
      'HSK2_ID_SENTENCE_MEANINGS',
    ),
    ja: bundle(
      () => import('./hsk2JapaneseTranslations'),
      'HSK2_JA_WORD_MEANINGS',
      'HSK2_JA_SENTENCE_MEANINGS',
    ),
    ko: bundle(
      () => import('./hsk2KoreanTranslations'),
      'HSK2_KO_WORD_MEANINGS',
      'HSK2_KO_SENTENCE_MEANINGS',
    ),
    'pt-BR': bundle(
      () => import('./hsk2PortugueseTranslations'),
      'HSK2_PT_BR_WORD_MEANINGS',
      'HSK2_PT_BR_SENTENCE_MEANINGS',
    ),
    ru: bundle(
      () => import('./hsk2RussianTranslations'),
      'HSK2_RU_WORD_MEANINGS',
      'HSK2_RU_SENTENCE_MEANINGS',
    ),
    vi: bundle(
      () => import('./hsk2VietnameseTranslations'),
      'HSK2_VI_WORD_MEANINGS',
      'HSK2_VI_SENTENCE_MEANINGS',
    ),
  },
  3: {
    ar: bundle(
      () => import('./hsk3ArabicTranslations'),
      'HSK3_AR_WORD_MEANINGS',
      'HSK3_AR_SENTENCE_MEANINGS',
    ),
    de: bundle(
      () => import('./hsk3GermanTranslations'),
      'HSK3_DE_WORD_MEANINGS',
      'HSK3_DE_SENTENCE_MEANINGS',
    ),
    es: bundle(
      () => import('./hsk3SpanishTranslations'),
      'HSK3_ES_WORD_MEANINGS',
      'HSK3_ES_SENTENCE_MEANINGS',
    ),
    fr: bundle(
      () => import('./hsk3FrenchTranslations'),
      'HSK3_FR_WORD_MEANINGS',
      'HSK3_FR_SENTENCE_MEANINGS',
    ),
    id: bundle(
      () => import('./hsk3IndonesianTranslations'),
      'HSK3_ID_WORD_MEANINGS',
      'HSK3_ID_SENTENCE_MEANINGS',
    ),
    ja: bundle(
      () => import('./hsk3JapaneseTranslations'),
      'HSK3_JA_WORD_MEANINGS',
      'HSK3_JA_SENTENCE_MEANINGS',
    ),
    ko: bundle(
      () => import('./hsk3KoreanTranslations'),
      'HSK3_KO_WORD_MEANINGS',
      'HSK3_KO_SENTENCE_MEANINGS',
    ),
    'pt-BR': bundle(
      () => import('./hsk3PortugueseTranslations'),
      'HSK3_PT_BR_WORD_MEANINGS',
      'HSK3_PT_BR_SENTENCE_MEANINGS',
    ),
    ru: bundle(
      () => import('./hsk3RussianTranslations'),
      'HSK3_RU_WORD_MEANINGS',
      'HSK3_RU_SENTENCE_MEANINGS',
    ),
    vi: bundle(
      () => import('./hsk3VietnameseTranslations'),
      'HSK3_VI_WORD_MEANINGS',
      'HSK3_VI_SENTENCE_MEANINGS',
    ),
  },
  4: {
    ar: bundle(
      () => import('./hsk4ArabicTranslations'),
      'HSK4_AR_WORD_MEANINGS',
      'HSK4_AR_SENTENCE_MEANINGS',
    ),
    de: bundle(
      () => import('./hsk4GermanTranslations'),
      'HSK4_DE_WORD_MEANINGS',
      'HSK4_DE_SENTENCE_MEANINGS',
    ),
    es: bundle(
      () => import('./hsk4SpanishTranslations'),
      'HSK4_ES_WORD_MEANINGS',
      'HSK4_ES_SENTENCE_MEANINGS',
    ),
    fr: bundle(
      () => import('./hsk4FrenchTranslations'),
      'HSK4_FR_WORD_MEANINGS',
      'HSK4_FR_SENTENCE_MEANINGS',
    ),
    id: bundle(
      () => import('./hsk4IndonesianTranslations'),
      'HSK4_ID_WORD_MEANINGS',
      'HSK4_ID_SENTENCE_MEANINGS',
    ),
    ja: bundle(
      () => import('./hsk4JapaneseTranslations'),
      'HSK4_JA_WORD_MEANINGS',
      'HSK4_JA_SENTENCE_MEANINGS',
    ),
    ko: bundle(
      () => import('./hsk4KoreanTranslations'),
      'HSK4_KO_WORD_MEANINGS',
      'HSK4_KO_SENTENCE_MEANINGS',
    ),
    'pt-BR': bundle(
      () => import('./hsk4PortugueseTranslations'),
      'HSK4_PT_BR_WORD_MEANINGS',
      'HSK4_PT_BR_SENTENCE_MEANINGS',
    ),
    ru: bundle(
      () => import('./hsk4RussianTranslations'),
      'HSK4_RU_WORD_MEANINGS',
      'HSK4_RU_SENTENCE_MEANINGS',
    ),
    vi: bundle(
      () => import('./hsk4VietnameseTranslations'),
      'HSK4_VI_WORD_MEANINGS',
      'HSK4_VI_SENTENCE_MEANINGS',
    ),
  },
  5: {
    ar: withWordMeaningOverrides(
      bundle(
        () => import('./hsk5ArabicTranslations'),
        'HSK5_AR_WORD_MEANINGS',
        'HSK5_AR_SENTENCE_MEANINGS',
      ),
      HSK5_LOCALIZED_WORD_MEANING_OVERRIDES.ar,
    ),
    de: withWordMeaningOverrides(
      bundle(
        () => import('./hsk5GermanTranslations'),
        'HSK5_DE_WORD_MEANINGS',
        'HSK5_DE_SENTENCE_MEANINGS',
      ),
      HSK5_LOCALIZED_WORD_MEANING_OVERRIDES.de,
    ),
    es: withWordMeaningOverrides(
      bundle(
        () => import('./hsk5SpanishTranslations'),
        'HSK5_ES_WORD_MEANINGS',
        'HSK5_ES_SENTENCE_MEANINGS',
      ),
      HSK5_LOCALIZED_WORD_MEANING_OVERRIDES.es,
    ),
    fr: withWordMeaningOverrides(
      bundle(
        () => import('./hsk5FrenchTranslations'),
        'HSK5_FR_WORD_MEANINGS',
        'HSK5_FR_SENTENCE_MEANINGS',
      ),
      HSK5_LOCALIZED_WORD_MEANING_OVERRIDES.fr,
    ),
    id: withWordMeaningOverrides(
      bundle(
        () => import('./hsk5IndonesianTranslations'),
        'HSK5_ID_WORD_MEANINGS',
        'HSK5_ID_SENTENCE_MEANINGS',
      ),
      HSK5_LOCALIZED_WORD_MEANING_OVERRIDES.id,
    ),
    ja: withWordMeaningOverrides(
      bundle(
        () => import('./hsk5JapaneseTranslations'),
        'HSK5_JA_WORD_MEANINGS',
        'HSK5_JA_SENTENCE_MEANINGS',
      ),
      HSK5_LOCALIZED_WORD_MEANING_OVERRIDES.ja,
    ),
    ko: withWordMeaningOverrides(
      bundle(
        () => import('./hsk5KoreanTranslations'),
        'HSK5_KO_WORD_MEANINGS',
        'HSK5_KO_SENTENCE_MEANINGS',
      ),
      HSK5_LOCALIZED_WORD_MEANING_OVERRIDES.ko,
    ),
    'pt-BR': withWordMeaningOverrides(
      bundle(
        () => import('./hsk5PortugueseTranslations'),
        'HSK5_PT_BR_WORD_MEANINGS',
        'HSK5_PT_BR_SENTENCE_MEANINGS',
      ),
      HSK5_LOCALIZED_WORD_MEANING_OVERRIDES['pt-BR'],
    ),
    ru: withWordMeaningOverrides(
      bundle(
        () => import('./hsk5RussianTranslations'),
        'HSK5_RU_WORD_MEANINGS',
        'HSK5_RU_SENTENCE_MEANINGS',
      ),
      HSK5_LOCALIZED_WORD_MEANING_OVERRIDES.ru,
    ),
    vi: withWordMeaningOverrides(
      bundle(
        () => import('./hsk5VietnameseTranslations'),
        'HSK5_VI_WORD_MEANINGS',
        'HSK5_VI_SENTENCE_MEANINGS',
      ),
      HSK5_LOCALIZED_WORD_MEANING_OVERRIDES.vi,
    ),
  },
  6: {
    ar: bundle(
      () => import('./hsk6ArabicTranslations'),
      'HSK6_AR_WORD_MEANINGS',
      'HSK6_AR_SENTENCE_MEANINGS',
    ),
    de: bundle(
      () => import('./hsk6GermanTranslations'),
      'HSK6_DE_WORD_MEANINGS',
      'HSK6_DE_SENTENCE_MEANINGS',
    ),
    es: bundle(
      () => import('./hsk6SpanishTranslations'),
      'HSK6_ES_WORD_MEANINGS',
      'HSK6_ES_SENTENCE_MEANINGS',
    ),
    fr: bundle(
      () => import('./hsk6FrenchTranslations'),
      'HSK6_FR_WORD_MEANINGS',
      'HSK6_FR_SENTENCE_MEANINGS',
    ),
    ja: bundle(
      () => import('./hsk6JapaneseTranslations'),
      'HSK6_JA_WORD_MEANINGS',
      'HSK6_JA_SENTENCE_MEANINGS',
    ),
    ko: bundle(
      () => import('./hsk6KoreanTranslations'),
      'HSK6_KO_WORD_MEANINGS',
      'HSK6_KO_SENTENCE_MEANINGS',
    ),
    'pt-BR': bundle(
      () => import('./hsk6PortugueseTranslations'),
      'HSK6_PT_BR_WORD_MEANINGS',
      'HSK6_PT_BR_SENTENCE_MEANINGS',
    ),
    ru: bundle(
      () => import('./hsk6RussianTranslations'),
      'HSK6_RU_WORD_MEANINGS',
      'HSK6_RU_SENTENCE_MEANINGS',
    ),
    vi: bundle(
      () => import('./hsk6VietnameseTranslations'),
      'HSK6_VI_WORD_MEANINGS',
      'HSK6_VI_SENTENCE_MEANINGS',
    ),
    id: bundle(
      () => import('./hsk6IndonesianTranslations'),
      'HSK6_ID_WORD_MEANINGS',
      'HSK6_ID_SENTENCE_MEANINGS',
    ),
  },
};

const translationCache = new Map<string, Promise<LocalizedMeaningMap>>();

export function getAvailableLocalizedLevels(language: TranslationLanguage) {
  if (language === 'en') {
    return [];
  }

  return Object.entries(TRANSLATION_LOADERS)
    .filter(([, loaders]) => Boolean(loaders?.[language]))
    .map(([level]) => Number(level) as HskLevel);
}

export function loadLocalizedMeanings(level: HskLevel, language: LocalizedLanguage) {
  const loader = TRANSLATION_LOADERS[level]?.[language];
  if (!loader) {
    return Promise.resolve(null);
  }

  const cacheKey = `${level}:${language}`;
  const cached = translationCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const loaded = loader();
  translationCache.set(cacheKey, loaded);
  return loaded;
}

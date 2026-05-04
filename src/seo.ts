import {
  HSK_LEVEL_OPTIONS,
  HSK_LEVEL_WORD_COUNTS,
  HSK_LEVELS,
} from './data/hskMetadata';
import type { TranslationLanguage } from './data/translationLoaders';
import type { HskLevel } from './types';
import { getUiCopy } from './uiCopy';

export const HSKMAP_SITE_URL = 'https://hskmap.com';
export const HSKMAP_NAME = 'HSKMAP';
export { HSK_LEVELS };

export type HskView = HskLevel | 'all';

export interface LocaleConfig {
  id: TranslationLanguage;
  slug: string;
  hreflang: string;
  htmlLang: string;
  direction: 'ltr' | 'rtl';
  shortLabel: string;
  label: string;
  flag: string;
  accent: string;
  tint: string;
}

export interface AppRoute {
  language: TranslationLanguage;
  view: HskView;
  isLocalizedRoute: boolean;
}

export const SEO_LOCALES: LocaleConfig[] = [
  {
    id: 'en',
    slug: 'en',
    hreflang: 'en',
    htmlLang: 'en',
    direction: 'ltr',
    shortLabel: 'US',
    label: 'English',
    flag: 'US',
    accent: '#2563eb',
    tint: '#eff6ff',
  },
  {
    id: 'es',
    slug: 'es',
    hreflang: 'es',
    htmlLang: 'es',
    direction: 'ltr',
    shortLabel: 'ES',
    label: 'Español',
    flag: 'ES',
    accent: '#dc2626',
    tint: '#fff7ed',
  },
  {
    id: 'fr',
    slug: 'fr',
    hreflang: 'fr',
    htmlLang: 'fr',
    direction: 'ltr',
    shortLabel: 'FR',
    label: 'Français',
    flag: 'FR',
    accent: '#1d4ed8',
    tint: '#eff6ff',
  },
  {
    id: 'ru',
    slug: 'ru',
    hreflang: 'ru',
    htmlLang: 'ru',
    direction: 'ltr',
    shortLabel: 'RU',
    label: 'Русский',
    flag: 'RU',
    accent: '#b91c1c',
    tint: '#fef2f2',
  },
  {
    id: 'pt-BR',
    slug: 'pt-br',
    hreflang: 'pt-BR',
    htmlLang: 'pt-BR',
    direction: 'ltr',
    shortLabel: 'BR',
    label: 'Português',
    flag: 'BR',
    accent: '#15803d',
    tint: '#f0fdf4',
  },
  {
    id: 'de',
    slug: 'de',
    hreflang: 'de',
    htmlLang: 'de',
    direction: 'ltr',
    shortLabel: 'DE',
    label: 'Deutsch',
    flag: 'DE',
    accent: '#ca8a04',
    tint: '#fefce8',
  },
  {
    id: 'ja',
    slug: 'ja',
    hreflang: 'ja',
    htmlLang: 'ja',
    direction: 'ltr',
    shortLabel: 'JP',
    label: '日本語',
    flag: 'JP',
    accent: '#dc2626',
    tint: '#fff1f2',
  },
  {
    id: 'ko',
    slug: 'ko',
    hreflang: 'ko',
    htmlLang: 'ko',
    direction: 'ltr',
    shortLabel: 'KR',
    label: '한국어',
    flag: 'KR',
    accent: '#1d4ed8',
    tint: '#eff6ff',
  },
  {
    id: 'vi',
    slug: 'vi',
    hreflang: 'vi',
    htmlLang: 'vi',
    direction: 'ltr',
    shortLabel: 'VN',
    label: 'Tiếng Việt',
    flag: 'VN',
    accent: '#dc2626',
    tint: '#fff7ed',
  },
  {
    id: 'id',
    slug: 'id',
    hreflang: 'id',
    htmlLang: 'id',
    direction: 'ltr',
    shortLabel: 'ID',
    label: 'Indonesia',
    flag: 'ID',
    accent: '#dc2626',
    tint: '#fef2f2',
  },
  {
    id: 'ar',
    slug: 'ar',
    hreflang: 'ar',
    htmlLang: 'ar',
    direction: 'rtl',
    shortLabel: 'SA',
    label: 'العربية',
    flag: 'SA',
    accent: '#15803d',
    tint: '#f0fdf4',
  },
];

const DEFAULT_LOCALE = SEO_LOCALES[0];

const SEO_DESCRIPTIONS: Record<TranslationLanguage, string> = {
  en: 'Explore Chinese vocabulary with pinyin, audio, example sentences, translations, flashcards, writing practice, and local progress tracking.',
  es: 'Explora vocabulario chino con pinyin, audio, frases de ejemplo, traducciones, tarjetas, práctica de escritura y progreso local.',
  fr: 'Explorez le vocabulaire chinois avec pinyin, audio, phrases exemples, traductions, cartes mémoire, écriture et suivi local.',
  ru: 'Изучайте китайскую лексику с пиньинем, аудио, примерами, переводами, карточками, письмом и локальным прогрессом.',
  'pt-BR': 'Explore vocabulário chinês com pinyin, áudio, frases de exemplo, traduções, flashcards, escrita e progresso local.',
  de: 'Entdecke chinesische Vokabeln mit Pinyin, Audio, Beispielsätzen, Übersetzungen, Karteikarten, Schreibübung und lokalem Fortschritt.',
  ja: 'ピンイン、音声、例文、翻訳、フラッシュカード、書き取り練習、ローカル進捗で中国語語彙を学べます。',
  ko: '병음, 오디오, 예문, 번역, 플래시카드, 쓰기 연습, 로컬 진도 추적으로 중국어 어휘를 익히세요.',
  vi: 'Khám phá từ vựng tiếng Trung với pinyin, âm thanh, câu ví dụ, bản dịch, flashcard, luyện viết và tiến độ cục bộ.',
  id: 'Jelajahi kosakata Mandarin dengan pinyin, audio, kalimat contoh, terjemahan, flashcard, latihan menulis, dan progres lokal.',
  ar: 'استكشف مفردات الصينية مع البينين والصوت والجمل المثال والترجمات والبطاقات وتدريب الكتابة وتتبع التقدم المحلي.',
};

export function getLocaleByLanguage(language: TranslationLanguage) {
  return SEO_LOCALES.find((locale) => locale.id === language) ?? DEFAULT_LOCALE;
}

export function getLocaleBySlug(slug: string) {
  const normalizedSlug = slug.toLowerCase();
  return SEO_LOCALES.find((locale) => locale.slug === normalizedSlug) ?? null;
}

export function getLocalizedPath(language: TranslationLanguage, view: HskView = 'all') {
  const locale = getLocaleByLanguage(language);
  return view === 'all' ? `/${locale.slug}/` : `/${locale.slug}/hsk-${view}/`;
}

export function getAbsoluteUrl(path: string) {
  return new URL(path, HSKMAP_SITE_URL).href;
}

export function getAppRouteFromPath(pathname: string): AppRoute {
  const parts = pathname.split('/').filter(Boolean);
  const locale = parts[0] ? getLocaleBySlug(parts[0]) : null;

  if (!locale) {
    return { language: DEFAULT_LOCALE.id, view: 'all', isLocalizedRoute: false };
  }

  const levelMatch = parts[1]?.match(/^hsk-([1-6])$/);
  const view = levelMatch ? (Number(levelMatch[1]) as HskLevel) : 'all';

  return {
    language: locale.id,
    view,
    isLocalizedRoute: true,
  };
}

export function getSeoPageTitle(language: TranslationLanguage, level?: HskLevel) {
  const ui = getUiCopy(language);
  if (!level) {
    return `${HSKMAP_NAME} | ${ui.classicMaps}`;
  }

  return `${HSKMAP_NAME} ${HSK_LEVEL_OPTIONS[level - 1].label} | ${ui.tileMap(`HSK ${level}`)}`;
}

export function getSeoPageDescription(language: TranslationLanguage, level?: HskLevel) {
  const description = SEO_DESCRIPTIONS[language];
  if (!level) {
    return description;
  }

  const locale = getLocaleByLanguage(language);
  const wordCount = HSK_LEVEL_WORD_COUNTS[level].toLocaleString(locale.htmlLang);
  return `${HSK_LEVEL_OPTIONS[level - 1].label}: ${wordCount} words. ${description}`;
}

export function getSeoIntro(language: TranslationLanguage, level?: HskLevel) {
  if (!level) {
    return SEO_DESCRIPTIONS[language];
  }

  const locale = getLocaleByLanguage(language);
  const wordCount = HSK_LEVEL_WORD_COUNTS[level].toLocaleString(locale.htmlLang);
  return `${HSK_LEVEL_OPTIONS[level - 1].label} includes ${wordCount} vocabulary items with hanzi, pinyin, meanings, examples, audio, and writing practice.`;
}

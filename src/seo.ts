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

export interface HskSeoOverviewRow {
  level: HskLevel;
  label: string;
  newWords: number;
  cumulativeWords: number;
  focus: string;
}

export interface SeoGuideTableLabels {
  level: string;
  wordsAdded: string;
  cumulativeWords: string;
  studyFocus: string;
}

export interface SeoGuideSection {
  title: string;
  paragraphs: string[];
  items?: string[];
}

export interface SeoGuideFaq {
  question: string;
  answer: string;
}

export interface SeoGuideContent {
  eyebrow: string;
  title: string;
  intro: string;
  rows?: HskSeoOverviewRow[];
  tableLabels?: SeoGuideTableLabels;
  sections: SeoGuideSection[];
  faqs: SeoGuideFaq[];
  faqLabel?: string;
}

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

interface LocalizedSeoGuideCopy {
  overviewEyebrow: string;
  overviewTitle: string;
  overviewIntro: string;
  tableLabels: SeoGuideTableLabels;
  levelFocus: Record<HskLevel, string>;
  sections: SeoGuideSection[];
  faqs: SeoGuideFaq[];
  faqLabel: string;
  guideLabel: string;
  whatYouLearnTitle: string;
  practiceTitle: string;
  allCountQuestion: string;
  allCountAnswer: string;
  levelCountQuestion: (level: HskLevel) => string;
  levelCountAnswer: (level: HskLevel, countLabel: string, cumulativeLabel: string) => string;
  levelIncludesQuestion: (level: HskLevel) => string;
  levelIncludesAnswer: (level: HskLevel) => string;
  levelScopeQuestion: (level: HskLevel) => string;
  levelScopeAnswer: (level: HskLevel) => string;
}

const LOCALIZED_SEO_GUIDES: Record<TranslationLanguage, LocalizedSeoGuideCopy> = {
  en: {
    overviewEyebrow: 'HSK vocabulary guide',
    overviewTitle: 'HSK vocabulary from HSK 1 to HSK 6',
    overviewIntro:
      'HSKMAP organizes the classic six-level HSK vocabulary into interactive Chinese tile maps. Use the overview to study all 5,000 vocabulary items together, or open a single level when you want focused review.',
    tableLabels: {
      level: 'Level',
      wordsAdded: 'Words added',
      cumulativeWords: 'Cumulative words',
      studyFocus: 'Study focus',
    },
    levelFocus: {
      1: 'Essential beginner words for greetings, numbers, family, dates, places, and basic actions.',
      2: 'Everyday words for simple conversations, shopping, travel, school, work, and preferences.',
      3: 'Practical vocabulary for routines, comparisons, directions, plans, health, and daily opinions.',
      4: 'Intermediate words for longer conversations, study, work, news, relationships, and explanations.',
      5: 'Advanced vocabulary for reading, formal situations, abstract topics, media, and written Chinese.',
      6: 'The full classic HSK range with advanced, formal, literary, idiomatic, and specialized vocabulary.',
    },
    sections: [
      {
        title: 'How the HSK levels are organized',
        paragraphs: [
          'HSK 1 starts with 150 beginner words. Each later HSK level adds new vocabulary while assuming the earlier levels are already familiar. Together, HSK 1 through HSK 6 cover 5,000 classic HSK vocabulary items.',
        ],
      },
      {
        title: 'How to study with HSKMAP',
        paragraphs: [
          'Start on the map and pick a Chinese tile. Open the word to check its pinyin, meaning, audio, example sentence, flashcard, and writing practice, then mark it as Known or Review for later.',
        ],
        items: [
          'Study from the map by clicking tiles instead of working through a plain vocabulary list.',
          'Use Known for words you can recognize confidently.',
          'Use Review for words you want to come back to later.',
          'Use search only when you want to jump to a specific Chinese word, pinyin, or English meaning.',
        ],
      },
      {
        title: 'Which HSK level should I start with?',
        paragraphs: [
          'New learners should usually start with HSK 1. If you already know basic greetings, numbers, family words, dates, and common verbs, try HSK 2 or HSK 3 and use the Review filter to catch gaps. Intermediate learners can use HSK 4 and HSK 5 to strengthen reading and conversation vocabulary, while HSK 6 is best for advanced reading and formal language.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does HSKMAP include pinyin and example sentences?',
        answer:
          'Yes. Each word includes hanzi, pinyin, an English meaning, and an example sentence when available. Many words also include audio and writing practice.',
      },
      {
        question: 'Can I study all HSK levels together?',
        answer:
          'Yes. The English overview page loads all six levels as HSK maps so you can study the complete vocabulary set. Direct level pages load only the selected level for focused review.',
      },
      {
        question: 'Is my HSK progress saved?',
        answer:
          'Progress is stored locally in your browser. You can mark words as Known or Review without creating an account.',
      },
    ],
    faqLabel: 'HSK vocabulary FAQ',
    guideLabel: 'HSK vocabulary guide',
    whatYouLearnTitle: 'What you learn in',
    practiceTitle: 'How to practice HSK vocabulary',
    allCountQuestion: 'How many words are in HSK 1 to HSK 6?',
    allCountAnswer:
      'The classic HSK set on HSKMAP has 150 words in HSK 1, 150 new words in HSK 2, 300 in HSK 3, 600 in HSK 4, 1,300 in HSK 5, and 2,500 in HSK 6, for 5,000 total vocabulary items.',
    levelCountQuestion: (level) => `How many words are in HSK ${level}?`,
    levelCountAnswer: (level, countLabel, cumulativeLabel) =>
      level === 1
        ? `HSK 1 contains ${countLabel}.`
        : `HSK ${level} adds ${countLabel}. The cumulative HSK 1-${level} total is ${cumulativeLabel}.`,
    levelIncludesQuestion: (level) => `What does this HSK ${level} page include?`,
    levelIncludesAnswer: (level) =>
      `The HSK ${level} page includes Chinese characters, pinyin, English meanings, example sentences, audio, flashcards, writing practice, and local progress tracking for this level.`,
    levelScopeQuestion: (level) => `Should I study only HSK ${level} or all levels together?`,
    levelScopeAnswer: (level) =>
      level === 1
        ? 'Start with HSK 1 if you are new to Chinese. Use the all-level overview later when you want to study the full HSK map.'
        : `Use this HSK ${level} page for focused study, and use the all-level overview when you want to compare words across HSK 1 through HSK 6.`,
  },
  es: {
    overviewEyebrow: 'Guía de vocabulario HSK',
    overviewTitle: 'Guía de estudio HSKMAP',
    overviewIntro:
      'HSKMAP convierte el vocabulario HSK en mapas interactivos de fichas chinas. Haz clic en una ficha para abrir pinyin, significado, audio, ejemplos, tarjetas y práctica de escritura. Marca palabras como Sabidas o Repasar para seguir tu progreso. Usa la búsqueda solo como atajo cuando quieras encontrar una palabra rápidamente.',
    tableLabels: {
      level: 'Nivel',
      wordsAdded: 'Palabras nuevas',
      cumulativeWords: 'Palabras acumuladas',
      studyFocus: 'Enfoque de estudio',
    },
    levelFocus: {
      1: 'Concéntrate en saludos, números, pronombres, familia y verbos básicos para reconocer palabras frecuentes en contexto.',
      2: 'Amplía frases cotidianas sobre tiempo, comida, compras, transporte y actividades diarias.',
      3: 'Practica vocabulario para conversaciones más largas, opiniones sencillas, trabajo, estudio y planes.',
      4: 'Refuerza palabras abstractas, conectores, emociones, experiencias y temas sociales comunes.',
      5: 'Desarrolla lectura más fluida con vocabulario de noticias, cultura, trabajo, viajes y argumentos.',
      6: 'Trabaja vocabulario avanzado para textos auténticos, matices, expresiones formales y comprensión precisa.',
    },
    sections: [
      {
        title: 'Estudia desde el mapa',
        paragraphs: [
          'Empieza por el mapa de fichas y explora visualmente el vocabulario por nivel HSK. El mapa te ayuda a ver qué palabras ya conoces, cuáles necesitas repasar y dónde seguir estudiando.',
        ],
        items: [
          'Haz clic en cualquier ficha china para abrir sus detalles.',
          'Recorre el mapa por nivel en lugar de depender primero de la búsqueda.',
          'Vuelve a las zonas marcadas para reforzar palabras débiles.',
        ],
      },
      {
        title: 'Abre los detalles de cada palabra',
        paragraphs: [
          'Cada ficha incluye herramientas para entender y practicar la palabra sin salir del flujo de estudio.',
        ],
        items: [
          'Consulta pinyin, significado, audio y ejemplos.',
          'Usa tarjetas para comprobar si recuerdas la palabra.',
          'Practica la escritura para fijar forma, sonido y significado.',
        ],
      },
      {
        title: 'Marca tu progreso',
        paragraphs: [
          'Usa Sabidas cuando una palabra ya sea cómoda y Repasar cuando necesite más práctica. Estas etiquetas convierten el mapa en una vista clara de tu progreso.',
        ],
        items: [
          'Marca como Sabidas las palabras que reconoces con seguridad.',
          'Marca como Repasar las palabras que quieres volver a practicar.',
          'Revisa el mapa para decidir tu siguiente sesión de estudio.',
        ],
      },
      {
        title: 'Usa la búsqueda como atajo',
        paragraphs: [
          'La búsqueda sirve para saltar rápidamente a una palabra, pero el método principal es estudiar desde el mapa interactivo.',
        ],
        items: [
          'Busca una palabra específica cuando ya sepas qué quieres encontrar.',
          'Después de buscar, abre la ficha y continúa desde el mapa.',
          'Evita estudiar solo con búsquedas aisladas.',
        ],
      },
    ],
    faqs: [
      {
        question: '¿Cómo debo usar HSKMAP para estudiar vocabulario HSK?',
        answer:
          'Empieza en el mapa del nivel HSK que estés estudiando. Haz clic en fichas, revisa pinyin, significado, audio y ejemplos, practica con tarjetas o escritura, y marca cada palabra como Sabidas o Repasar.',
      },
      {
        question: '¿La búsqueda es la forma principal de estudiar?',
        answer:
          'No. La búsqueda es un atajo para encontrar palabras concretas. HSKMAP está pensado para estudiar primero desde los mapas interactivos.',
      },
    ],
    faqLabel: 'Preguntas frecuentes de vocabulario HSK',
    guideLabel: 'Guía de vocabulario HSK',
    whatYouLearnTitle: 'Qué aprendes en',
    practiceTitle: 'Cómo practicar vocabulario HSK',
    allCountQuestion: '¿Cuántas palabras hay de HSK 1 a HSK 6?',
    allCountAnswer:
      'El conjunto clásico de HSKMAP tiene 150 palabras en HSK 1, 150 palabras nuevas en HSK 2, 300 en HSK 3, 600 en HSK 4, 1.300 en HSK 5 y 2.500 en HSK 6: 5.000 palabras en total.',
    levelCountQuestion: (level) => `¿Cuántas palabras hay en HSK ${level}?`,
    levelCountAnswer: (level, countLabel, cumulativeLabel) =>
      level === 1
        ? `HSK 1 contiene ${countLabel}.`
        : `HSK ${level} añade ${countLabel}. El total acumulado de HSK 1-${level} es ${cumulativeLabel}.`,
    levelIncludesQuestion: (level) => `¿Qué incluye la página HSK ${level}?`,
    levelIncludesAnswer: (level) =>
      `La página HSK ${level} incluye caracteres chinos, pinyin, significados, ejemplos, audio, tarjetas, práctica de escritura y seguimiento local del progreso.`,
    levelScopeQuestion: (level) => `¿Debo estudiar solo HSK ${level} o todos los niveles?`,
    levelScopeAnswer: (level) =>
      level === 1
        ? 'Empieza con HSK 1 si eres nuevo en chino. Usa la vista general más adelante cuando quieras estudiar todo el mapa HSK.'
        : `Usa esta página HSK ${level} para estudio enfocado y la vista general para comparar palabras de HSK 1 a HSK 6.`,
  },
  fr: {
    overviewEyebrow: 'Guide de vocabulaire HSK',
    overviewTitle: 'Guide d’étude HSKMAP',
    overviewIntro:
      'HSKMAP transforme le vocabulaire HSK en cartes interactives de tuiles chinoises. Cliquez sur une tuile pour ouvrir le pinyin, le sens, l’audio, des exemples, des cartes mémoire et la pratique de l’écriture. Marquez les mots comme Connus ou Réviser pour suivre vos progrès. Utilisez la recherche seulement comme raccourci quand vous voulez retrouver rapidement un mot.',
    tableLabels: {
      level: 'Niveau',
      wordsAdded: 'Mots ajoutés',
      cumulativeWords: 'Mots cumulés',
      studyFocus: 'Axe d’étude',
    },
    levelFocus: {
      1: 'Concentrez-vous sur les salutations, les nombres, les pronoms, la famille et les verbes de base pour reconnaître les mots fréquents en contexte.',
      2: 'Élargissez vos phrases du quotidien autour du temps, de la nourriture, des achats, des transports et des activités courantes.',
      3: 'Pratiquez le vocabulaire des conversations plus longues, des opinions simples, du travail, des études et des projets.',
      4: 'Renforcez les mots abstraits, les connecteurs, les émotions, les expériences et les sujets sociaux courants.',
      5: 'Développez une lecture plus fluide avec le vocabulaire de l’actualité, de la culture, du travail, des voyages et de l’argumentation.',
      6: 'Travaillez le vocabulaire avancé pour les textes authentiques, les nuances, les expressions formelles et une compréhension précise.',
    },
    sections: [
      {
        title: 'Étudiez depuis la carte',
        paragraphs: [
          'Commencez par la carte de tuiles et explorez visuellement le vocabulaire par niveau HSK. La carte vous aide à voir les mots déjà connus, ceux à réviser et la prochaine zone à étudier.',
        ],
        items: [
          'Cliquez sur n’importe quelle tuile chinoise pour ouvrir ses détails.',
          'Parcourez la carte par niveau au lieu de commencer par la recherche.',
          'Revenez sur les zones marquées pour renforcer les mots fragiles.',
        ],
      },
      {
        title: 'Ouvrez les détails de chaque mot',
        paragraphs: [
          'Chaque tuile contient des outils pour comprendre et pratiquer le mot sans quitter votre rythme d’étude.',
        ],
        items: [
          'Consultez le pinyin, le sens, l’audio et les exemples.',
          'Utilisez les cartes mémoire pour vérifier votre rappel.',
          'Pratiquez l’écriture pour relier forme, son et sens.',
        ],
      },
      {
        title: 'Marquez vos progrès',
        paragraphs: [
          'Utilisez Connus quand un mot est confortable et Réviser quand il demande encore de la pratique. Ces libellés transforment la carte en vue claire de vos progrès.',
        ],
        items: [
          'Marquez comme Connus les mots que vous reconnaissez avec assurance.',
          'Marquez comme Réviser les mots que vous voulez retravailler.',
          'Relisez la carte pour choisir votre prochaine session.',
        ],
      },
      {
        title: 'Utilisez la recherche comme raccourci',
        paragraphs: [
          'La recherche sert à atteindre rapidement un mot, mais la méthode principale reste l’étude depuis la carte interactive.',
        ],
        items: [
          'Cherchez un mot précis quand vous savez déjà ce que vous voulez trouver.',
          'Après la recherche, ouvrez la tuile et continuez depuis la carte.',
          'Évitez d’étudier uniquement avec des recherches isolées.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Comment utiliser HSKMAP pour étudier le vocabulaire HSK ?',
        answer:
          'Commencez sur la carte du niveau HSK que vous étudiez. Cliquez sur les tuiles, consultez le pinyin, le sens, l’audio et les exemples, pratiquez avec les cartes mémoire ou l’écriture, puis marquez chaque mot comme Connus ou Réviser.',
      },
      {
        question: 'La recherche est-elle la principale façon d’étudier ?',
        answer:
          'Non. La recherche est un raccourci pour trouver des mots précis. HSKMAP est conçu pour commencer par les cartes interactives.',
      },
    ],
    faqLabel: 'FAQ vocabulaire HSK',
    guideLabel: 'Guide de vocabulaire HSK',
    whatYouLearnTitle: 'Ce que vous apprenez en',
    practiceTitle: 'Comment pratiquer le vocabulaire HSK',
    allCountQuestion: 'Combien de mots y a-t-il de HSK 1 à HSK 6 ?',
    allCountAnswer:
      'L’ensemble HSK classique sur HSKMAP compte 150 mots en HSK 1, 150 nouveaux mots en HSK 2, 300 en HSK 3, 600 en HSK 4, 1 300 en HSK 5 et 2 500 en HSK 6, soit 5 000 mots au total.',
    levelCountQuestion: (level) => `Combien de mots contient HSK ${level} ?`,
    levelCountAnswer: (level, countLabel, cumulativeLabel) =>
      level === 1
        ? `HSK 1 contient ${countLabel}.`
        : `HSK ${level} ajoute ${countLabel}. Le total cumulé HSK 1-${level} est de ${cumulativeLabel}.`,
    levelIncludesQuestion: (level) => `Que contient la page HSK ${level} ?`,
    levelIncludesAnswer: (level) =>
      `La page HSK ${level} contient les caractères chinois, le pinyin, les sens, les exemples, l’audio, les cartes mémoire, la pratique de l’écriture et le suivi local de progression.`,
    levelScopeQuestion: (level) => `Faut-il étudier seulement HSK ${level} ou tous les niveaux ?`,
    levelScopeAnswer: (level) =>
      level === 1
        ? 'Commencez par HSK 1 si vous débutez en chinois. Utilisez ensuite la vue complète pour étudier toute la carte HSK.'
        : `Utilisez cette page HSK ${level} pour une étude ciblée et la vue complète pour comparer les mots de HSK 1 à HSK 6.`,
  },
  ru: {
    overviewEyebrow: 'Гид по лексике HSK',
    overviewTitle: 'Интерактивная карта слов HSK',
    overviewIntro:
      'HSKMAP превращает лексику HSK в интерактивные карты китайских плиток. Нажимайте на плитки, открывайте карточки слов с пиньинем, значением, аудио, примерами, флеш-картой и практикой письма. Отмечайте слова как «Знаю» или «Повторить», а поиск используйте только как быстрый путь к нужному слову.',
    tableLabels: {
      level: 'Уровень',
      wordsAdded: 'Новые слова',
      cumulativeWords: 'Всего слов',
      studyFocus: 'Фокус обучения',
    },
    levelFocus: {
      1: 'HSK 1: освойте базовые слова для приветствий, чисел, семьи, времени и простых повседневных фраз.',
      2: 'HSK 2: расширяйте базовый словарь для покупок, транспорта, учебы, работы и коротких разговоров.',
      3: 'HSK 3: связывайте слова по темам и учитесь понимать более длинные фразы, описания и частые ситуации.',
      4: 'HSK 4: укрепляйте словарный запас для мнений, планов, причин, сравнений и более естественного общения.',
      5: 'HSK 5: работайте с абстрактной лексикой, текстами, новостями, учебными темами и устойчивыми выражениями.',
      6: 'HSK 6: развивайте продвинутый словарь для чтения, обсуждений, эссе, идиоматичных выражений и точного понимания.',
    },
    sections: [
      {
        title: 'Учитесь через карту, а не через список',
        paragraphs: [
          'Каждый уровень HSK представлен как карта китайских плиток. Вы начинаете с обзора, замечаете знакомые и новые слова, затем открываете нужные плитки для подробного изучения.',
        ],
        items: [
          'Просматривайте лексику визуально по уровням HSK.',
          'Нажимайте плитки, чтобы открыть детали слова.',
          'Возвращайтесь к карте, чтобы видеть общий прогресс.',
        ],
      },
      {
        title: 'Открывайте детали слова',
        paragraphs: [
          'Карточка слова помогает быстро перейти от узнавания иероглифа к пониманию, произношению и активной практике.',
        ],
        items: [
          'Проверяйте пиньинь и перевод.',
          'Слушайте аудио произношения.',
          'Изучайте пример предложения.',
          'Запускайте флеш-карту или практику письма.',
        ],
      },
      {
        title: 'Отмечайте, что знаете и что нужно повторить',
        paragraphs: [
          'Используйте локальные метки прогресса, чтобы карта показывала, какие слова уже знакомы, а какие стоит повторить.',
        ],
        items: [
          '«Знаю» — слово уже уверенно знакомо.',
          '«Повторить» — слово нужно закрепить позже.',
          'Метки помогают планировать повторение без потери контекста карты.',
        ],
      },
      {
        title: 'Поиск как быстрый переход',
        paragraphs: [
          'Поиск помогает быстро найти конкретное слово, но основной способ обучения в HSKMAP — исследовать карту, открывать плитки и постепенно закрывать пробелы.',
        ],
        items: [
          'Ищите слово, если уже знаете, что нужно найти.',
          'Используйте карту для системного изучения уровня.',
          'Возвращайтесь к плиткам после поиска, чтобы не терять обзор.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Как лучше пользоваться HSKMAP для подготовки к HSK?',
        answer:
          'Начните с карты нужного уровня HSK, открывайте незнакомые плитки и изучайте пиньинь, значение, аудио, пример, флеш-карту и письмо. Отмечайте уверенные слова как «Знаю», а сложные как «Повторить». Поиск используйте только когда нужно быстро перейти к конкретному слову.',
      },
    ],
    faqLabel: 'Вопросы о лексике HSK',
    guideLabel: 'Гид по лексике HSK',
    whatYouLearnTitle: 'Что вы изучаете в',
    practiceTitle: 'Как практиковать лексику HSK',
    allCountQuestion: 'Сколько слов в HSK 1-6?',
    allCountAnswer:
      'Классический набор HSK на HSKMAP содержит 150 слов в HSK 1, 150 новых слов в HSK 2, 300 в HSK 3, 600 в HSK 4, 1 300 в HSK 5 и 2 500 в HSK 6 — всего 5 000 слов.',
    levelCountQuestion: (level) => `Сколько слов в HSK ${level}?`,
    levelCountAnswer: (level, countLabel, cumulativeLabel) =>
      level === 1
        ? `HSK 1 содержит ${countLabel}.`
        : `HSK ${level} добавляет ${countLabel}. Общий объем HSK 1-${level}: ${cumulativeLabel}.`,
    levelIncludesQuestion: (level) => `Что есть на странице HSK ${level}?`,
    levelIncludesAnswer: (level) =>
      `Страница HSK ${level} включает иероглифы, пиньинь, значения, примеры, аудио, флеш-карты, практику письма и локальное отслеживание прогресса.`,
    levelScopeQuestion: (level) => `Учить только HSK ${level} или все уровни вместе?`,
    levelScopeAnswer: (level) =>
      level === 1
        ? 'Начните с HSK 1, если вы новичок. Общий обзор пригодится позже для изучения всей карты HSK.'
        : `Используйте страницу HSK ${level} для фокусированного обучения, а общий обзор — чтобы сравнивать слова HSK 1-6.`,
  },
  'pt-BR': {
    overviewEyebrow: 'Guia de vocabulário HSK',
    overviewTitle: 'Guia de estudo do HSKMAP',
    overviewIntro:
      'O HSKMAP transforma o vocabulário HSK em mapas interativos de blocos chineses. Clique em um bloco para abrir pinyin, significado, áudio, exemplos, flashcards e prática de escrita. Marque palavras como Conhecidas ou Revisar para acompanhar seu progresso. Use a busca apenas como atalho quando quiser encontrar uma palavra rapidamente.',
    tableLabels: {
      level: 'Nível',
      wordsAdded: 'Palavras novas',
      cumulativeWords: 'Palavras acumuladas',
      studyFocus: 'Foco de estudo',
    },
    levelFocus: {
      1: 'Concentre-se em cumprimentos, números, pronomes, família e verbos básicos para reconhecer palavras frequentes em contexto.',
      2: 'Amplie frases do dia a dia sobre tempo, comida, compras, transporte e atividades diárias.',
      3: 'Pratique vocabulário para conversas mais longas, opiniões simples, trabalho, estudo e planos.',
      4: 'Reforce palavras abstratas, conectores, emoções, experiências e temas sociais comuns.',
      5: 'Desenvolva leitura mais fluente com vocabulário de notícias, cultura, trabalho, viagens e argumentos.',
      6: 'Trabalhe vocabulário avançado para textos autênticos, nuances, expressões formais e compreensão precisa.',
    },
    sections: [
      {
        title: 'Estude pelo mapa',
        paragraphs: [
          'Comece pelo mapa de blocos e explore visualmente o vocabulário por nível HSK. O mapa ajuda você a ver quais palavras já conhece, quais precisa revisar e onde continuar estudando.',
        ],
        items: [
          'Clique em qualquer bloco chinês para abrir seus detalhes.',
          'Percorra o mapa por nível em vez de depender primeiro da busca.',
          'Volte às áreas marcadas para reforçar palavras mais fracas.',
        ],
      },
      {
        title: 'Abra os detalhes de cada palavra',
        paragraphs: [
          'Cada bloco inclui ferramentas para entender e praticar a palavra sem sair do fluxo de estudo.',
        ],
        items: [
          'Veja pinyin, significado, áudio e exemplos.',
          'Use flashcards para testar sua memória.',
          'Pratique a escrita para fixar forma, som e significado.',
        ],
      },
      {
        title: 'Marque seu progresso',
        paragraphs: [
          'Use Conhecidas quando uma palavra já estiver confortável e Revisar quando ela ainda precisar de prática. Esses rótulos transformam o mapa em uma visão clara do seu progresso.',
        ],
        items: [
          'Marque como Conhecidas as palavras que você reconhece com segurança.',
          'Marque como Revisar as palavras que quer praticar novamente.',
          'Confira o mapa para escolher sua próxima sessão de estudo.',
        ],
      },
      {
        title: 'Use a busca como atalho',
        paragraphs: [
          'A busca serve para ir rapidamente até uma palavra, mas o método principal é estudar pelo mapa interativo.',
        ],
        items: [
          'Busque uma palavra específica quando já souber o que quer encontrar.',
          'Depois da busca, abra o bloco e continue pelo mapa.',
          'Evite estudar apenas com buscas isoladas.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Como devo usar o HSKMAP para estudar vocabulário HSK?',
        answer:
          'Comece no mapa do nível HSK que você está estudando. Clique nos blocos, veja pinyin, significado, áudio e exemplos, pratique com flashcards ou escrita e marque cada palavra como Conhecidas ou Revisar.',
      },
      {
        question: 'A busca é a principal forma de estudar?',
        answer:
          'Não. A busca é um atalho para encontrar palavras específicas. O HSKMAP foi pensado para estudar primeiro pelos mapas interativos.',
      },
    ],
    faqLabel: 'Perguntas frequentes sobre vocabulário HSK',
    guideLabel: 'Guia de vocabulário HSK',
    whatYouLearnTitle: 'O que você aprende no',
    practiceTitle: 'Como praticar vocabulário HSK',
    allCountQuestion: 'Quantas palavras existem de HSK 1 a HSK 6?',
    allCountAnswer:
      'O conjunto clássico no HSKMAP tem 150 palavras no HSK 1, 150 palavras novas no HSK 2, 300 no HSK 3, 600 no HSK 4, 1.300 no HSK 5 e 2.500 no HSK 6: 5.000 palavras no total.',
    levelCountQuestion: (level) => `Quantas palavras há no HSK ${level}?`,
    levelCountAnswer: (level, countLabel, cumulativeLabel) =>
      level === 1
        ? `O HSK 1 contém ${countLabel}.`
        : `O HSK ${level} adiciona ${countLabel}. O total acumulado de HSK 1-${level} é ${cumulativeLabel}.`,
    levelIncludesQuestion: (level) => `O que a página HSK ${level} inclui?`,
    levelIncludesAnswer: (level) =>
      `A página HSK ${level} inclui caracteres chineses, pinyin, significados, exemplos, áudio, flashcards, prática de escrita e acompanhamento local de progresso.`,
    levelScopeQuestion: (level) => `Devo estudar só HSK ${level} ou todos os níveis?`,
    levelScopeAnswer: (level) =>
      level === 1
        ? 'Comece pelo HSK 1 se você é iniciante em chinês. Use a visão geral depois para estudar todo o mapa HSK.'
        : `Use esta página HSK ${level} para estudo focado e a visão geral para comparar palavras de HSK 1 a HSK 6.`,
  },
  de: {
    overviewEyebrow: 'HSK-Wortschatzleitfaden',
    overviewTitle: 'HSKMAP-Lernleitfaden',
    overviewIntro:
      'HSKMAP verwandelt HSK-Wortschatz in interaktive Karten mit chinesischen Kacheln. Klicke auf eine Kachel, um Pinyin, Bedeutung, Audio, Beispiele, Karteikarten und Schreibübungen zu öffnen. Markiere Wörter als Bekannt oder Wiederholen, um deinen Fortschritt zu verfolgen. Nutze die Suche nur als Abkürzung, wenn du ein Wort schnell finden möchtest.',
    tableLabels: {
      level: 'Niveau',
      wordsAdded: 'Neue Wörter',
      cumulativeWords: 'Wörter gesamt',
      studyFocus: 'Lernfokus',
    },
    levelFocus: {
      1: 'Konzentriere dich auf Begrüßungen, Zahlen, Pronomen, Familie und grundlegende Verben, um häufige Wörter im Kontext zu erkennen.',
      2: 'Erweitere Alltagssätze zu Zeit, Essen, Einkaufen, Verkehr und täglichen Aktivitäten.',
      3: 'Übe Wortschatz für längere Gespräche, einfache Meinungen, Arbeit, Studium und Pläne.',
      4: 'Festige abstrakte Wörter, Konnektoren, Gefühle, Erfahrungen und häufige gesellschaftliche Themen.',
      5: 'Entwickle flüssigeres Lesen mit Wortschatz aus Nachrichten, Kultur, Arbeit, Reisen und Argumentation.',
      6: 'Arbeite an fortgeschrittenem Wortschatz für authentische Texte, Nuancen, formelle Ausdrücke und genaues Verstehen.',
    },
    sections: [
      {
        title: 'Lerne über die Karte',
        paragraphs: [
          'Beginne mit der Kachelkarte und erkunde den Wortschatz nach HSK-Stufe visuell. Die Karte zeigt dir, welche Wörter du bereits gelernt hast, welche du wiederholen solltest und wo du weiterlernen kannst.',
        ],
        items: [
          'Klicke auf eine chinesische Kachel, um die Details zu öffnen.',
          'Gehe die Karte nach Stufe durch, statt zuerst über die Suche zu lernen.',
          'Kehre zu markierten Bereichen zurück, um unsichere Wörter zu festigen.',
        ],
      },
      {
        title: 'Öffne die Wortdetails',
        paragraphs: [
          'Jede Kachel enthält Werkzeuge, mit denen du das Wort verstehen und üben kannst, ohne den Lernfluss zu verlassen.',
        ],
        items: [
          'Sieh dir Pinyin, Bedeutung, Audio und Beispiele an.',
          'Nutze Karteikarten, um dein Erinnern zu prüfen.',
          'Übe das Schreiben, um Form, Klang und Bedeutung zu verbinden.',
        ],
      },
      {
        title: 'Markiere deinen Fortschritt',
        paragraphs: [
          'Nutze Bekannt, wenn ein Wort sicher sitzt, und Wiederholen, wenn es noch Übung braucht. Diese Labels machen deinen Fortschritt direkt auf der Karte sichtbar.',
        ],
        items: [
          'Markiere Wörter als Bekannt, wenn du sie sicher erkennst.',
          'Markiere Wörter als Wiederholen, wenn du sie erneut üben möchtest.',
          'Nutze die Karte, um deine nächste Lerneinheit zu planen.',
        ],
      },
      {
        title: 'Nutze die Suche als Abkürzung',
        paragraphs: [
          'Die Suche hilft dir, schnell zu einem Wort zu springen. Die Hauptmethode bleibt aber das Lernen über die interaktive Karte.',
        ],
        items: [
          'Suche nach einem bestimmten Wort, wenn du schon weißt, was du finden möchtest.',
          'Öffne nach der Suche die Kachel und lerne von der Karte aus weiter.',
          'Vermeide es, nur über einzelne Suchanfragen zu lernen.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Wie sollte ich HSKMAP zum Lernen von HSK-Wortschatz nutzen?',
        answer:
          'Beginne auf der Karte der HSK-Stufe, die du gerade lernst. Klicke auf Kacheln, prüfe Pinyin, Bedeutung, Audio und Beispiele, übe mit Karteikarten oder Schreibübungen und markiere jedes Wort als Bekannt oder Wiederholen.',
      },
      {
        question: 'Ist die Suche die wichtigste Lernmethode?',
        answer:
          'Nein. Die Suche ist eine Abkürzung für bestimmte Wörter. HSKMAP ist darauf ausgelegt, zuerst über die interaktiven Karten zu lernen.',
      },
    ],
    faqLabel: 'HSK-Wortschatz FAQ',
    guideLabel: 'HSK-Wortschatzleitfaden',
    whatYouLearnTitle: 'Was du lernst in',
    practiceTitle: 'HSK-Wortschatz üben',
    allCountQuestion: 'Wie viele Wörter gibt es von HSK 1 bis HSK 6?',
    allCountAnswer:
      'Der klassische HSK-Satz auf HSKMAP enthält 150 Wörter in HSK 1, 150 neue Wörter in HSK 2, 300 in HSK 3, 600 in HSK 4, 1.300 in HSK 5 und 2.500 in HSK 6, insgesamt 5.000 Wörter.',
    levelCountQuestion: (level) => `Wie viele Wörter enthält HSK ${level}?`,
    levelCountAnswer: (level, countLabel, cumulativeLabel) =>
      level === 1
        ? `HSK 1 enthält ${countLabel}.`
        : `HSK ${level} fügt ${countLabel} hinzu. Der kumulative Gesamtstand HSK 1-${level} ist ${cumulativeLabel}.`,
    levelIncludesQuestion: (level) => `Was enthält die Seite HSK ${level}?`,
    levelIncludesAnswer: (level) =>
      `Die Seite HSK ${level} enthält chinesische Zeichen, Pinyin, Bedeutungen, Beispiele, Audio, Karteikarten, Schreibübungen und lokale Fortschrittsverfolgung.`,
    levelScopeQuestion: (level) => `Soll ich nur HSK ${level} oder alle Stufen lernen?`,
    levelScopeAnswer: (level) =>
      level === 1
        ? 'Beginne mit HSK 1, wenn Chinesisch neu für dich ist. Nutze später die Gesamtübersicht, um die ganze HSK-Karte zu lernen.'
        : `Nutze diese HSK ${level}-Seite für fokussiertes Lernen und die Gesamtübersicht, um Wörter von HSK 1 bis HSK 6 zu vergleichen.`,
  },
  ja: {
    overviewEyebrow: 'HSK語彙ガイド',
    overviewTitle: 'HSK単語のインタラクティブマップ',
    overviewIntro:
      'HSKMAPは、HSK語彙を中国語タイルのインタラクティブマップとして表示します。タイルをクリックすると、ピンイン、意味、音声、例文、フラッシュカード、書き取り練習を確認できます。単語には「既知」または「復習」としてマークでき、検索は目的の単語へすばやく移動するための補助機能です。',
    tableLabels: {
      level: 'レベル',
      wordsAdded: '追加語数',
      cumulativeWords: '累計語数',
      studyFocus: '学習ポイント',
    },
    levelFocus: {
      1: 'HSK 1: あいさつ、数字、家族、時間、簡単な日常表現の基本語彙を身につけます。',
      2: 'HSK 2: 買い物、交通、学習、仕事、短い会話で使う基礎語彙を広げます。',
      3: 'HSK 3: テーマごとに単語を結びつけ、少し長い文や説明、よくある場面を理解できるようにします。',
      4: 'HSK 4: 意見、予定、理由、比較など、より自然なやり取りに必要な語彙を強化します。',
      5: 'HSK 5: 抽象的な語彙、文章、ニュース、学習分野、よく使う表現に慣れていきます。',
      6: 'HSK 6: 読解、議論、作文、慣用的な表現、細かなニュアンス理解に必要な上級語彙を伸ばします。',
    },
    sections: [
      {
        title: 'リストではなくマップで学ぶ',
        paragraphs: [
          '各HSKレベルは、中国語タイルのマップとして表示されます。まず全体を見渡し、知っている単語と新しい単語を確認してから、必要なタイルを開いて詳しく学習します。',
        ],
        items: [
          'HSKレベルごとに語彙を視覚的に確認できます。',
          'タイルをクリックして単語の詳細を開けます。',
          'マップに戻ることで、進み具合を全体として把握できます。',
        ],
      },
      {
        title: '単語の詳細を確認する',
        paragraphs: [
          '単語カードでは、漢字を見分けるだけでなく、意味、発音、実際の使い方、能動的な練習までつなげて学べます。',
        ],
        items: [
          'ピンインと意味を確認します。',
          '発音音声を聞きます。',
          '例文で使い方を学びます。',
          'フラッシュカードや書き取り練習を使います。',
        ],
      },
      {
        title: '既知と復習をマークする',
        paragraphs: [
          '進捗ラベルを使うと、マップ上で覚えた単語ともう一度見直したい単語がわかりやすくなります。',
        ],
        items: [
          '「既知」: 自信を持ってわかる単語。',
          '「復習」: あとで定着させたい単語。',
          'ラベルを使うと、マップの流れを保ったまま復習計画を立てられます。',
        ],
      },
      {
        title: '検索はショートカットとして使う',
        paragraphs: [
          '検索は特定の単語へすばやく移動するために便利ですが、HSKMAPの中心はマップを探索し、タイルを開きながら少しずつ語彙の抜けを埋めていく学習です。',
        ],
        items: [
          '探したい単語が決まっているときに検索します。',
          'レベル全体の学習にはマップを使います。',
          '検索後もタイルとマップに戻って、全体像を保ちます。',
        ],
      },
    ],
    faqs: [
      {
        question: 'HSK対策にHSKMAPをどう使うのが効果的ですか？',
        answer:
          '学習したいHSKレベルのマップから始め、知らないタイルを開いてピンイン、意味、音声、例文、フラッシュカード、書き取りを確認します。自信のある単語は「既知」、まだ不安な単語は「復習」としてマークします。',
      },
    ],
    faqLabel: 'HSK語彙FAQ',
    guideLabel: 'HSK語彙ガイド',
    whatYouLearnTitle: '学習内容',
    practiceTitle: 'HSK語彙の練習方法',
    allCountQuestion: 'HSK 1からHSK 6までに何語ありますか？',
    allCountAnswer:
      'HSKMAPのクラシックHSKセットは、HSK 1が150語、HSK 2が150語追加、HSK 3が300語、HSK 4が600語、HSK 5が1,300語、HSK 6が2,500語で、合計5,000語です。',
    levelCountQuestion: (level) => `HSK ${level}には何語ありますか？`,
    levelCountAnswer: (level, countLabel, cumulativeLabel) =>
      level === 1
        ? `HSK 1には${countLabel}があります。`
        : `HSK ${level}では${countLabel}を追加します。HSK 1-${level}の累計は${cumulativeLabel}です。`,
    levelIncludesQuestion: (level) => `HSK ${level}ページには何が含まれますか？`,
    levelIncludesAnswer: (level) =>
      `HSK ${level}ページには、中国語の漢字、ピンイン、意味、例文、音声、フラッシュカード、書き取り練習、ローカル進捗管理が含まれます。`,
    levelScopeQuestion: (level) => `HSK ${level}だけを学ぶべきですか？`,
    levelScopeAnswer: (level) =>
      level === 1
        ? '中国語を始めたばかりならHSK 1から始めます。あとで全レベルの概要を使って、HSKマップ全体を学習できます。'
        : `このHSK ${level}ページは集中学習に使い、全レベルの概要はHSK 1からHSK 6までの単語を比較するときに使います。`,
  },
  ko: {
    overviewEyebrow: 'HSK 어휘 가이드',
    overviewTitle: 'HSK 단어 인터랙티브 지도',
    overviewIntro:
      'HSKMAP은 HSK 어휘를 중국어 타일로 된 인터랙티브 지도로 보여줍니다. 타일을 클릭하면 병음, 뜻, 오디오, 예문, 플래시카드, 쓰기 연습을 볼 수 있습니다. 단어는 알고 있음 또는 복습으로 표시하고, 검색은 필요한 단어로 바로 이동할 때만 보조적으로 사용합니다.',
    tableLabels: {
      level: '레벨',
      wordsAdded: '새 단어',
      cumulativeWords: '누적 단어',
      studyFocus: '학습 초점',
    },
    levelFocus: {
      1: 'HSK 1: 인사, 숫자, 가족, 시간, 간단한 일상 표현에 필요한 기본 단어를 익힙니다.',
      2: 'HSK 2: 쇼핑, 교통, 학습, 일, 짧은 대화에서 쓰이는 기초 어휘를 넓힙니다.',
      3: 'HSK 3: 주제별로 단어를 연결하고, 조금 더 긴 문장과 설명, 자주 나오는 상황을 이해합니다.',
      4: 'HSK 4: 의견, 계획, 이유, 비교 등 더 자연스러운 의사소통에 필요한 어휘를 강화합니다.',
      5: 'HSK 5: 추상적인 어휘, 글, 뉴스, 학습 주제, 자주 쓰이는 표현에 익숙해집니다.',
      6: 'HSK 6: 독해, 토론, 작문, 관용적 표현, 세밀한 의미 이해에 필요한 고급 어휘를 확장합니다.',
    },
    sections: [
      {
        title: '목록이 아니라 지도로 배우기',
        paragraphs: [
          '각 HSK 레벨은 중국어 타일 지도로 구성됩니다. 먼저 전체를 훑어보고, 아는 단어와 새로운 단어를 확인한 뒤 필요한 타일을 열어 자세히 학습합니다.',
        ],
        items: [
          'HSK 레벨별 어휘를 시각적으로 살펴봅니다.',
          '타일을 클릭해 단어 상세 정보를 엽니다.',
          '다시 지도로 돌아와 전체 진도를 확인합니다.',
        ],
      },
      {
        title: '단어 상세 보기',
        paragraphs: [
          '단어 카드는 한자를 알아보는 단계에서 뜻, 발음, 실제 사용, 능동적인 연습으로 자연스럽게 이어지도록 돕습니다.',
        ],
        items: [
          '병음과 뜻을 확인합니다.',
          '발음 오디오를 듣습니다.',
          '예문으로 쓰임을 익힙니다.',
          '플래시카드나 쓰기 연습을 시작합니다.',
        ],
      },
      {
        title: '알고 있음과 복습 표시하기',
        paragraphs: [
          '진도 표시를 사용하면 지도에서 이미 익힌 단어와 나중에 다시 볼 단어를 쉽게 구분할 수 있습니다.',
        ],
        items: [
          '알고 있음은 자신 있게 아는 단어입니다.',
          '복습은 나중에 다시 익혀야 할 단어입니다.',
          '표시는 지도 흐름을 유지하면서 복습 계획을 세우는 데 도움이 됩니다.',
        ],
      },
      {
        title: '검색은 빠른 이동용으로 사용하기',
        paragraphs: [
          '검색은 특정 단어를 빠르게 찾을 때 유용하지만, HSKMAP의 중심 학습 방식은 지도를 탐색하고 타일을 열어가며 어휘의 빈틈을 채우는 것입니다.',
        ],
        items: [
          '찾을 단어가 정해져 있을 때 검색합니다.',
          '레벨 전체를 공부할 때는 지도를 사용합니다.',
          '검색 후에도 타일과 지도로 돌아와 전체 흐름을 유지합니다.',
        ],
      },
    ],
    faqs: [
      {
        question: 'HSK 준비에 HSKMAP을 어떻게 활용하면 좋나요?',
        answer:
          '공부할 HSK 레벨의 지도에서 시작해 모르는 타일을 열고 병음, 뜻, 오디오, 예문, 플래시카드, 쓰기 연습을 확인합니다. 확실히 아는 단어는 알고 있음, 더 봐야 하는 단어는 복습으로 표시합니다.',
      },
    ],
    faqLabel: 'HSK 어휘 FAQ',
    guideLabel: 'HSK 어휘 가이드',
    whatYouLearnTitle: '학습 내용',
    practiceTitle: 'HSK 어휘 연습 방법',
    allCountQuestion: 'HSK 1부터 HSK 6까지 몇 단어가 있나요?',
    allCountAnswer:
      'HSKMAP의 클래식 HSK 세트는 HSK 1 150단어, HSK 2 새 단어 150개, HSK 3 300개, HSK 4 600개, HSK 5 1,300개, HSK 6 2,500개로 총 5,000개 어휘입니다.',
    levelCountQuestion: (level) => `HSK ${level}에는 몇 단어가 있나요?`,
    levelCountAnswer: (level, countLabel, cumulativeLabel) =>
      level === 1
        ? `HSK 1에는 ${countLabel}가 있습니다.`
        : `HSK ${level}에서는 ${countLabel}를 추가합니다. HSK 1-${level} 누적 합계는 ${cumulativeLabel}입니다.`,
    levelIncludesQuestion: (level) => `HSK ${level} 페이지에는 무엇이 있나요?`,
    levelIncludesAnswer: (level) =>
      `HSK ${level} 페이지에는 중국어 한자, 병음, 뜻, 예문, 오디오, 플래시카드, 쓰기 연습, 로컬 진도 추적이 포함됩니다.`,
    levelScopeQuestion: (level) => `HSK ${level}만 공부해야 하나요?`,
    levelScopeAnswer: (level) =>
      level === 1
        ? '중국어를 처음 배운다면 HSK 1부터 시작하세요. 나중에는 전체 보기로 HSK 지도 전체를 학습할 수 있습니다.'
        : `이 HSK ${level} 페이지는 집중 학습에 사용하고, 전체 보기는 HSK 1부터 HSK 6까지 단어를 비교할 때 사용하세요.`,
  },
  vi: {
    overviewEyebrow: 'Hướng dẫn từ vựng HSK',
    overviewTitle: 'Bản đồ từ vựng HSK tương tác',
    overviewIntro:
      'HSKMAP biến từ vựng HSK thành các bản đồ ô chữ tiếng Trung tương tác. Người học bấm vào từng ô để mở chi tiết từ gồm pinyin, nghĩa, âm thanh, ví dụ, thẻ ghi nhớ và luyện viết. Có thể đánh dấu từ là Đã biết hoặc Ôn tập, còn tìm kiếm chỉ nên dùng như lối tắt khi cần đến nhanh một từ cụ thể.',
    tableLabels: {
      level: 'Cấp',
      wordsAdded: 'Từ mới',
      cumulativeWords: 'Từ tích lũy',
      studyFocus: 'Trọng tâm học',
    },
    levelFocus: {
      1: 'HSK 1: nắm các từ cơ bản cho chào hỏi, số đếm, gia đình, thời gian và câu giao tiếp hằng ngày đơn giản.',
      2: 'HSK 2: mở rộng vốn từ nền tảng cho mua sắm, đi lại, học tập, công việc và hội thoại ngắn.',
      3: 'HSK 3: liên kết từ theo chủ đề và hiểu các câu dài hơn, đoạn mô tả và tình huống quen thuộc.',
      4: 'HSK 4: củng cố từ vựng để diễn đạt ý kiến, kế hoạch, lý do, so sánh và giao tiếp tự nhiên hơn.',
      5: 'HSK 5: làm quen với từ trừu tượng, bài đọc, tin tức, chủ đề học thuật và các cách diễn đạt thường gặp.',
      6: 'HSK 6: phát triển vốn từ nâng cao cho đọc hiểu, thảo luận, viết bài, thành ngữ và sắc thái nghĩa chính xác.',
    },
    sections: [
      {
        title: 'Học bằng bản đồ thay vì danh sách',
        paragraphs: [
          'Mỗi cấp HSK được trình bày dưới dạng bản đồ các ô chữ tiếng Trung. Người học bắt đầu bằng cách nhìn tổng thể, nhận ra từ đã biết và từ mới, rồi mở từng ô cần học để xem chi tiết.',
        ],
        items: [
          'Xem từ vựng theo từng cấp HSK một cách trực quan.',
          'Bấm vào ô để mở thông tin chi tiết của từ.',
          'Quay lại bản đồ để theo dõi tiến độ tổng thể.',
        ],
      },
      {
        title: 'Mở chi tiết từng từ',
        paragraphs: [
          'Thẻ từ giúp người học đi từ nhận diện chữ Hán đến hiểu nghĩa, phát âm, cách dùng và luyện tập chủ động.',
        ],
        items: [
          'Xem pinyin và nghĩa.',
          'Nghe âm thanh phát âm.',
          'Học cách dùng qua câu ví dụ.',
          'Mở thẻ ghi nhớ hoặc luyện viết.',
        ],
      },
      {
        title: 'Đánh dấu Đã biết và Ôn tập',
        paragraphs: [
          'Nhãn tiến độ giúp bản đồ hiển thị rõ từ nào đã quen và từ nào cần học lại.',
        ],
        items: [
          'Đã biết là từ bạn đã nhớ khá chắc.',
          'Ôn tập là từ cần quay lại luyện thêm.',
          'Các nhãn này giúp lên kế hoạch ôn tập mà vẫn giữ được ngữ cảnh của bản đồ.',
        ],
      },
      {
        title: 'Dùng tìm kiếm như một lối tắt',
        paragraphs: [
          'Tìm kiếm hữu ích khi cần đến nhanh một từ cụ thể, nhưng cách học chính trong HSKMAP là khám phá bản đồ, mở các ô và dần lấp đầy phần từ vựng còn thiếu.',
        ],
        items: [
          'Tìm kiếm khi bạn đã biết mình muốn tìm từ nào.',
          'Dùng bản đồ để học có hệ thống theo từng cấp.',
          'Sau khi tìm kiếm, quay lại ô và bản đồ để không mất cái nhìn tổng thể.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Nên dùng HSKMAP như thế nào để ôn thi HSK hiệu quả?',
        answer:
          'Hãy bắt đầu từ bản đồ của cấp HSK bạn đang học, mở các ô chưa biết và xem pinyin, nghĩa, âm thanh, ví dụ, thẻ ghi nhớ và luyện viết. Đánh dấu từ đã chắc là Đã biết, còn từ cần học thêm là Ôn tập.',
      },
    ],
    faqLabel: 'FAQ từ vựng HSK',
    guideLabel: 'Hướng dẫn từ vựng HSK',
    whatYouLearnTitle: 'Nội dung học ở',
    practiceTitle: 'Cách luyện từ vựng HSK',
    allCountQuestion: 'Từ HSK 1 đến HSK 6 có bao nhiêu từ?',
    allCountAnswer:
      'Bộ HSK cổ điển trên HSKMAP có 150 từ ở HSK 1, 150 từ mới ở HSK 2, 300 từ ở HSK 3, 600 từ ở HSK 4, 1.300 từ ở HSK 5 và 2.500 từ ở HSK 6, tổng cộng 5.000 mục từ vựng.',
    levelCountQuestion: (level) => `HSK ${level} có bao nhiêu từ?`,
    levelCountAnswer: (level, countLabel, cumulativeLabel) =>
      level === 1
        ? `HSK 1 có ${countLabel}.`
        : `HSK ${level} thêm ${countLabel}. Tổng tích lũy HSK 1-${level} là ${cumulativeLabel}.`,
    levelIncludesQuestion: (level) => `Trang HSK ${level} bao gồm gì?`,
    levelIncludesAnswer: (level) =>
      `Trang HSK ${level} bao gồm chữ Hán, pinyin, nghĩa, ví dụ, âm thanh, thẻ ghi nhớ, luyện viết và theo dõi tiến độ cục bộ.`,
    levelScopeQuestion: (level) => `Nên học riêng HSK ${level} hay tất cả các cấp?`,
    levelScopeAnswer: (level) =>
      level === 1
        ? 'Hãy bắt đầu với HSK 1 nếu bạn mới học tiếng Trung. Sau đó dùng trang tổng quan để học toàn bộ bản đồ HSK.'
        : `Dùng trang HSK ${level} này để học tập trung, và dùng trang tổng quan khi muốn so sánh từ HSK 1 đến HSK 6.`,
  },
  id: {
    overviewEyebrow: 'Panduan kosakata HSK',
    overviewTitle: 'Panduan Belajar HSKMAP',
    overviewIntro:
      'HSKMAP membantu kamu belajar kosakata HSK lewat peta ubin bahasa Mandarin yang interaktif. Klik ubin untuk membuka detail kata, lihat pinyin, arti, audio, contoh kalimat, kartu flash, dan latihan menulis. Tandai kata sebagai Sudah tahu atau Ulas, lalu gunakan pencarian hanya sebagai jalan pintas saat kamu perlu menemukan kata tertentu.',
    tableLabels: {
      level: 'Level',
      wordsAdded: 'Kata baru',
      cumulativeWords: 'Kata kumulatif',
      studyFocus: 'Fokus belajar',
    },
    levelFocus: {
      1: 'Fokus pada kata sehari-hari paling dasar, sapaan, angka, keluarga, waktu, dan kalimat pendek yang sering muncul.',
      2: 'Perluas kosakata untuk aktivitas harian, arah, belanja, makanan, dan percakapan sederhana dengan lebih banyak kata kerja dan kata sifat.',
      3: 'Bangun kosakata inti untuk belajar, bekerja, perjalanan, perasaan, dan ungkapan yang membuat percakapan lebih alami.',
      4: 'Perkuat kosakata untuk topik yang lebih abstrak, opini, kebiasaan, budaya, dan bacaan pendek dengan struktur yang lebih beragam.',
      5: 'Kembangkan kosakata akademik dan praktis untuk membaca artikel, mengikuti diskusi, dan memahami nuansa makna.',
      6: 'Latih kosakata tingkat lanjut untuk teks panjang, idiom, opini kompleks, dan penggunaan bahasa Mandarin yang lebih tepat dan alami.',
    },
    sections: [
      {
        title: 'Belajar dari peta',
        paragraphs: [
          'Mulai dari peta HSK, bukan dari daftar panjang. Setiap ubin adalah kata yang bisa kamu buka, pelajari, dan tandai sesuai progresmu.',
        ],
        items: [
          'Klik ubin untuk membuka detail kata.',
          'Gunakan warna dan status ubin untuk melihat progres.',
          'Bergerak dari level mudah ke level yang lebih menantang.',
        ],
      },
      {
        title: 'Buka detail kata',
        paragraphs: [
          'Setiap kata memiliki informasi yang membantu kamu memahami dan mengingatnya dalam konteks.',
        ],
        items: [
          'Lihat pinyin dan arti kata.',
          'Dengarkan audio pengucapan.',
          'Pelajari contoh kalimat.',
          'Gunakan kartu flash dan latihan menulis.',
        ],
      },
      {
        title: 'Tandai progres',
        paragraphs: [
          'Gunakan label Sudah tahu dan Ulas untuk mengatur kata yang sudah kamu kuasai dan kata yang masih perlu diulang.',
        ],
        items: [
          'Sudah tahu berarti kamu sudah mengenali kata itu dengan nyaman.',
          'Ulas berarti kata itu perlu dipelajari ulang.',
          'Periksa peta untuk melihat area mana yang masih perlu latihan.',
        ],
      },
      {
        title: 'Gunakan pencarian sebagai pintasan',
        paragraphs: [
          'Pencarian membantu saat kamu ingin langsung menemukan kata tertentu, tetapi alur utama tetap belajar dari peta.',
        ],
        items: [
          'Cari karakter, pinyin, atau arti.',
          'Buka hasil pencarian untuk melihat detail kata.',
          'Kembali ke peta untuk melanjutkan belajar secara visual.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Bagaimana cara terbaik menggunakan HSKMAP?',
        answer:
          'Mulai dari peta level HSK yang sedang kamu pelajari. Klik ubin, baca detail kata, dengarkan audio, lihat contoh, lalu tandai kata sebagai Sudah tahu atau Ulas. Gunakan pencarian hanya saat kamu perlu menemukan kata tertentu dengan cepat.',
      },
    ],
    faqLabel: 'FAQ kosakata HSK',
    guideLabel: 'Panduan kosakata HSK',
    whatYouLearnTitle: 'Yang dipelajari di',
    practiceTitle: 'Cara berlatih kosakata HSK',
    allCountQuestion: 'Berapa banyak kata dari HSK 1 sampai HSK 6?',
    allCountAnswer:
      'Set HSK klasik di HSKMAP memiliki 150 kata di HSK 1, 150 kata baru di HSK 2, 300 di HSK 3, 600 di HSK 4, 1.300 di HSK 5, dan 2.500 di HSK 6, total 5.000 kosakata.',
    levelCountQuestion: (level) => `Berapa banyak kata di HSK ${level}?`,
    levelCountAnswer: (level, countLabel, cumulativeLabel) =>
      level === 1
        ? `HSK 1 berisi ${countLabel}.`
        : `HSK ${level} menambahkan ${countLabel}. Total kumulatif HSK 1-${level} adalah ${cumulativeLabel}.`,
    levelIncludesQuestion: (level) => `Apa isi halaman HSK ${level}?`,
    levelIncludesAnswer: (level) =>
      `Halaman HSK ${level} mencakup karakter Mandarin, pinyin, arti, contoh, audio, flashcard, latihan menulis, dan pelacakan progres lokal.`,
    levelScopeQuestion: (level) => `Perlu belajar hanya HSK ${level} atau semua level?`,
    levelScopeAnswer: (level) =>
      level === 1
        ? 'Mulai dari HSK 1 jika kamu baru belajar Mandarin. Gunakan ringkasan semua level nanti untuk mempelajari seluruh peta HSK.'
        : `Gunakan halaman HSK ${level} ini untuk belajar terfokus, dan ringkasan semua level untuk membandingkan kata dari HSK 1 sampai HSK 6.`,
  },
  ar: {
    overviewEyebrow: 'دليل مفردات HSK',
    overviewTitle: 'دليل الدراسة في HSKMAP',
    overviewIntro:
      'يساعدك HSKMAP على تعلم مفردات HSK من خلال خرائط تفاعلية على شكل مربعات للكلمات الصينية. انقر على أي مربع لفتح تفاصيل الكلمة، ومشاهدة البينين والمعنى والصوت والمثال وبطاقة المراجعة وتدريب الكتابة. علّم الكلمات كـ معروفة أو مراجعة، واستخدم البحث فقط كاختصار عندما تريد العثور على كلمة محددة.',
    tableLabels: {
      level: 'المستوى',
      wordsAdded: 'كلمات جديدة',
      cumulativeWords: 'الكلمات التراكمية',
      studyFocus: 'محور الدراسة',
    },
    levelFocus: {
      1: 'ركّز على أبسط الكلمات اليومية، مثل التحيات والأرقام والعائلة والوقت والجمل القصيرة الشائعة.',
      2: 'وسّع مفرداتك للأنشطة اليومية والاتجاهات والتسوق والطعام والمحادثات البسيطة مع مزيد من الأفعال والصفات.',
      3: 'ابنِ مفردات أساسية للدراسة والعمل والسفر والمشاعر والتعبيرات التي تجعل الحوار أكثر طبيعية.',
      4: 'قوّ مفرداتك في الموضوعات الأكثر تجريدا، مثل الآراء والعادات والثقافة والقراءات القصيرة ذات التراكيب المتنوعة.',
      5: 'طوّر مفردات أكاديمية وعملية تساعدك على قراءة المقالات ومتابعة النقاشات وفهم الفروق الدقيقة في المعنى.',
      6: 'تدرّب على مفردات متقدمة للنصوص الطويلة والتعبيرات الاصطلاحية والآراء المعقدة واستخدام الصينية بدقة وطبيعية أكبر.',
    },
    sections: [
      {
        title: 'تعلّم من الخريطة',
        paragraphs: [
          'ابدأ من خريطة HSK، لا من قائمة طويلة. كل مربع يمثل كلمة يمكنك فتحها ودراستها وتعليمها حسب تقدمك.',
        ],
        items: [
          'انقر على المربع لفتح تفاصيل الكلمة.',
          'استخدم ألوان المربعات وحالاتها لمتابعة تقدمك.',
          'انتقل من المستويات السهلة إلى المستويات الأعلى تدريجيا.',
        ],
      },
      {
        title: 'افتح تفاصيل الكلمة',
        paragraphs: [
          'تحتوي كل كلمة على معلومات تساعدك على فهمها وتذكرها في السياق.',
        ],
        items: [
          'شاهد البينين ومعنى الكلمة.',
          'استمع إلى نطق الكلمة.',
          'تعلّم من الجملة المثال.',
          'استخدم بطاقة المراجعة وتدريب الكتابة.',
        ],
      },
      {
        title: 'علّم تقدمك',
        paragraphs: [
          'استخدم معروفة ومراجعة لتنظيم الكلمات التي أتقنتها والكلمات التي تحتاج إلى تكرار.',
        ],
        items: [
          'معروفة يعني أنك تتعرف على الكلمة بثقة.',
          'مراجعة يعني أن الكلمة تحتاج إلى دراسة إضافية.',
          'راجع الخريطة لمعرفة المناطق التي تحتاج إلى تدريب أكثر.',
        ],
      },
      {
        title: 'استخدم البحث كاختصار',
        paragraphs: [
          'يساعدك البحث عندما تريد الوصول مباشرة إلى كلمة معينة، لكن طريقة التعلم الأساسية تبقى من خلال الخريطة.',
        ],
        items: [
          'ابحث بالحرف الصيني أو البينين أو المعنى.',
          'افتح نتيجة البحث لمشاهدة تفاصيل الكلمة.',
          'ارجع إلى الخريطة لمتابعة التعلم بصريا.',
        ],
      },
    ],
    faqs: [
      {
        question: 'ما أفضل طريقة لاستخدام HSKMAP؟',
        answer:
          'ابدأ من خريطة مستوى HSK الذي تدرسه. انقر على المربعات، واقرأ تفاصيل الكلمات، واستمع إلى الصوت، وشاهد الأمثلة، ثم علّم الكلمة كـ معروفة أو مراجعة. استخدم البحث فقط عندما تحتاج إلى العثور على كلمة محددة بسرعة.',
      },
    ],
    faqLabel: 'أسئلة مفردات HSK',
    guideLabel: 'دليل مفردات HSK',
    whatYouLearnTitle: 'ما ستتعلمه في',
    practiceTitle: 'كيفية تدريب مفردات HSK',
    allCountQuestion: 'كم كلمة توجد من HSK 1 إلى HSK 6؟',
    allCountAnswer:
      'تتضمن مجموعة HSK الكلاسيكية في HSKMAP عدد 150 كلمة في HSK 1، و150 كلمة جديدة في HSK 2، و300 في HSK 3، و600 في HSK 4، و1,300 في HSK 5، و2,500 في HSK 6، أي 5,000 كلمة إجمالا.',
    levelCountQuestion: (level) => `كم كلمة في HSK ${level}؟`,
    levelCountAnswer: (level, countLabel, cumulativeLabel) =>
      level === 1
        ? `يحتوي HSK 1 على ${countLabel}.`
        : `يضيف HSK ${level} عدد ${countLabel}. المجموع التراكمي من HSK 1-${level} هو ${cumulativeLabel}.`,
    levelIncludesQuestion: (level) => `ماذا تتضمن صفحة HSK ${level}؟`,
    levelIncludesAnswer: (level) =>
      `تتضمن صفحة HSK ${level} الحروف الصينية والبينين والمعاني والأمثلة والصوت وبطاقات المراجعة وتدريب الكتابة وتتبع التقدم محليا.`,
    levelScopeQuestion: (level) => `هل أدرس HSK ${level} فقط أم كل المستويات؟`,
    levelScopeAnswer: (level) =>
      level === 1
        ? 'ابدأ بـ HSK 1 إذا كنت جديدا في الصينية. استخدم النظرة العامة لاحقا عندما تريد دراسة خريطة HSK كاملة.'
        : `استخدم صفحة HSK ${level} للدراسة المركزة، واستخدم النظرة العامة عندما تريد مقارنة الكلمات من HSK 1 إلى HSK 6.`,
  },
};

const HSK_LEVEL_GUIDES: Record<
  HskLevel,
  {
    title: string;
    intro: string;
    studyFocus: string;
    practiceAdvice: string;
  }
> = {
  1: {
    title: 'HSK 1 vocabulary: 150 essential beginner words',
    intro:
      'HSK 1 is the starting point for classic HSK vocabulary. It focuses on the most common Chinese words for basic introductions, numbers, people, time, food, places, and simple actions.',
    studyFocus:
      'At this level, prioritize recognition, pronunciation, and sentence patterns. Learn the hanzi together with pinyin and meaning, then use the example sentence to see how each word behaves in real Chinese.',
    practiceAdvice:
      'Review HSK 1 in short sessions until the words feel automatic. Mark familiar words as Known, keep uncertain words in Review, and use writing practice for high-frequency characters you want to remember actively.',
  },
  2: {
    title: 'HSK 2 vocabulary: 150 new words for basic conversation',
    intro:
      'HSK 2 adds 150 new words after HSK 1, bringing the classic cumulative total to 300 words. The level expands everyday conversation with more verbs, adjectives, time expressions, and practical classroom or travel language.',
    studyFocus:
      'Use HSK 2 to connect simple ideas more naturally. Pay attention to verbs, measure words, comparisons, and short phrases that let you describe what happened, what you want, and what you plan to do.',
    practiceAdvice:
      'Mix HSK 1 and HSK 2 review if you are still building fluency. Work through map tiles, open uncertain words for audio and examples, then mark each word as Known or Review.',
  },
  3: {
    title: 'HSK 3 vocabulary: 300 new words for everyday independence',
    intro:
      'HSK 3 adds 300 new words and raises the classic cumulative total to 600 words. It covers more independent daily communication, including directions, weather, work, study, health, comparisons, and personal plans.',
    studyFocus:
      'This level is where vocabulary starts to support longer sentences. Study words in groups, notice related meanings, and use example sentences to understand common word order and collocations.',
    practiceAdvice:
      'When HSK 3 feels large, filter the map to Review words and study in smaller clusters. Keep known HSK 1 and HSK 2 words active so the newer vocabulary has a stable base.',
  },
  4: {
    title: 'HSK 4 vocabulary: 600 new intermediate words',
    intro:
      'HSK 4 adds 600 new words and brings the classic cumulative total to 1,200 words. It moves beyond survival Chinese into longer explanations, opinions, work topics, study topics, travel situations, and social life.',
    studyFocus:
      'HSK 4 vocabulary often has more specific meanings, so examples matter. Compare similar words, read the pinyin carefully, and use the English meaning as a starting point rather than the whole answer.',
    practiceAdvice:
      'Use the HSK 4 page for focused review when the overview feels too broad. Move through the map in smaller passes, open related words as you notice them, and keep difficult words in Review until examples feel clear.',
  },
  5: {
    title: 'HSK 5 vocabulary: 1,300 new advanced words',
    intro:
      'HSK 5 adds 1,300 new words and brings the classic cumulative total to 2,500 words. It introduces broader reading vocabulary for news, essays, work, culture, education, abstract ideas, and formal communication.',
    studyFocus:
      'At this level, single-word translation is not enough. Study meanings with examples, watch for register, and group words by topic so advanced vocabulary becomes usable rather than just recognizable.',
    practiceAdvice:
      'Treat HSK 5 as a long-term review map. Study one area of the map at a time, mark only stable words as Known, and keep a high Review count without worrying about clearing the whole level quickly.',
  },
  6: {
    title: 'HSK 6 vocabulary: 2,500 new words for the full classic set',
    intro:
      'HSK 6 adds 2,500 new words and completes the classic 5,000-word HSK 1-6 vocabulary set. It includes advanced formal, abstract, literary, idiomatic, academic, and specialized vocabulary.',
    studyFocus:
      'HSK 6 is best studied with context. Use examples to check meaning, pronunciation, and register, and expect many words to become useful through repeated reading rather than one-pass memorization.',
    practiceAdvice:
      'Use this page for targeted advanced review. Pick tiles from the map, keep difficult words in Review, and revisit examples often so recognition develops into faster reading comprehension.',
  },
};

function getCumulativeWordCount(level: HskLevel) {
  return HSK_LEVELS.filter((hskLevel) => hskLevel <= level).reduce(
    (count, hskLevel) => count + HSK_LEVEL_WORD_COUNTS[hskLevel],
    0,
  );
}

export function getEnglishHskOverviewRows(): HskSeoOverviewRow[] {
  return getHskOverviewRows('en');
}

export function getHskOverviewRows(language: TranslationLanguage): HskSeoOverviewRow[] {
  const copy = LOCALIZED_SEO_GUIDES[language] ?? LOCALIZED_SEO_GUIDES.en;

  return HSK_LEVELS.map((level) => ({
    level,
    label: `HSK ${level}`,
    newWords: HSK_LEVEL_WORD_COUNTS[level],
    cumulativeWords: getCumulativeWordCount(level),
    focus: stripLevelPrefix(copy.levelFocus[level], level),
  }));
}

function stripLevelPrefix(text: string, level: HskLevel) {
  return text.replace(new RegExp(`^HSK\\s*${level}\\s*[:：]\\s*`), '');
}

function getLocalizedCountLabels(language: TranslationLanguage, level: HskLevel) {
  const ui = getUiCopy(language);
  const count = HSK_LEVEL_WORD_COUNTS[level];
  const cumulativeCount = getCumulativeWordCount(level);

  return {
    count,
    cumulativeCount,
    countLabel: level === 1 ? ui.words(count) : ui.newWords(count),
    cumulativeLabel: ui.words(cumulativeCount),
  };
}

export function getLocalizedSeoGuide(language: TranslationLanguage, view: HskView): SeoGuideContent {
  const copy = LOCALIZED_SEO_GUIDES[language] ?? LOCALIZED_SEO_GUIDES.en;

  if (view === 'all') {
    return {
      eyebrow: copy.overviewEyebrow,
      title: copy.overviewTitle,
      intro: copy.overviewIntro,
      rows: getHskOverviewRows(language),
      tableLabels: copy.tableLabels,
      sections: copy.sections,
      faqs: [
        {
          question: copy.allCountQuestion,
          answer: copy.allCountAnswer,
        },
        ...copy.faqs,
      ],
      faqLabel: copy.faqLabel,
    };
  }

  const englishGuide = language === 'en' ? HSK_LEVEL_GUIDES[view] : null;
  const { countLabel, cumulativeLabel } = getLocalizedCountLabels(language, view);
  const focus = stripLevelPrefix(copy.levelFocus[view], view);

  return {
    eyebrow: englishGuide ? `HSK ${view} vocabulary guide` : `${copy.guideLabel}: HSK ${view}`,
    title: englishGuide?.title ?? `HSK ${view}: ${focus}`,
    intro: englishGuide?.intro ?? focus,
    sections: [
      {
        title: `${copy.whatYouLearnTitle} HSK ${view}`,
        paragraphs: [
          `${copy.tableLabels.wordsAdded}: ${countLabel}. ${copy.tableLabels.cumulativeWords}: ${cumulativeLabel}.`,
          englishGuide?.studyFocus ?? focus,
        ],
      },
      {
        title: copy.practiceTitle,
        paragraphs: [englishGuide?.practiceAdvice ?? copy.sections[0].paragraphs[0]],
        items: copy.sections.flatMap((section) => section.items ?? []).slice(0, 6),
      },
    ],
    faqs: [
      {
        question: copy.levelCountQuestion(view),
        answer: copy.levelCountAnswer(view, countLabel, cumulativeLabel),
      },
      {
        question: copy.levelIncludesQuestion(view),
        answer: copy.levelIncludesAnswer(view),
      },
      {
        question: copy.levelScopeQuestion(view),
        answer: copy.levelScopeAnswer(view),
      },
      ...copy.faqs.slice(0, 1),
    ],
    faqLabel: copy.faqLabel,
  };
}

export function getEnglishSeoGuide(view: HskView): SeoGuideContent {
  return getLocalizedSeoGuide('en', view);
}

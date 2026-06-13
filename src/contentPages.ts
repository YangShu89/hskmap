import { HSKMAP_NAME, HSKMAP_SITE_URL } from './seo';

export const CONTENT_PAGE_SLUGS = [
  '/resources/',
  '/about/',
  '/contact/',
  '/privacy/',
  '/terms/',
  '/hsk-study-guide/',
  '/hsk-1-study-plan/',
  '/hsk-2-study-plan/',
  '/classic-hsk-vocabulary-guide/',
  '/pinyin-and-tones-guide/',
  '/how-to-use-hskmap/',
] as const;

export type ContentPageSlug = (typeof CONTENT_PAGE_SLUGS)[number];

export interface ContentPageSection {
  id: string;
  heading: string;
  paragraphs: string[];
  items?: string[];
}

export type ContentPageJsonLd = Record<string, unknown>;

export interface ContentPage {
  slug: ContentPageSlug;
  title: string;
  description: string;
  updated?: string;
  sections: ContentPageSection[];
  jsonLd?: ContentPageJsonLd;
}

export interface ContentResourceLink {
  href: string;
  label: string;
  description: string;
}

const UPDATED = '2026-06-13';
const LEARNING_PAGE_SLUGS = new Set<ContentPageSlug>([
  '/resources/',
  '/hsk-study-guide/',
  '/hsk-1-study-plan/',
  '/hsk-2-study-plan/',
  '/classic-hsk-vocabulary-guide/',
  '/pinyin-and-tones-guide/',
  '/how-to-use-hskmap/',
]);

function absoluteUrl(slug: ContentPageSlug): string {
  return new URL(slug, HSKMAP_SITE_URL).href;
}

function publisher() {
  return {
    '@type': 'Organization',
    name: HSKMAP_NAME,
    url: HSKMAP_SITE_URL,
  };
}

function webPageJsonLd(page: Pick<ContentPage, 'slug' | 'title' | 'description' | 'updated'>): ContentPageJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: absoluteUrl(page.slug),
    inLanguage: 'en',
    dateModified: page.updated,
    publisher: publisher(),
  };
}

function learningResourceJsonLd(
  page: Pick<ContentPage, 'slug' | 'title' | 'description' | 'updated'>,
): ContentPageJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: page.title,
    description: page.description,
    url: absoluteUrl(page.slug),
    inLanguage: 'en',
    dateModified: page.updated,
    learningResourceType: 'Guide',
    educationalLevel: 'Beginner Chinese',
    teaches:
      page.slug === '/pinyin-and-tones-guide/'
        ? ['Mandarin pinyin', 'Mandarin tones', 'HSK pronunciation practice']
        : ['HSK vocabulary study', 'Chinese learner review routines', page.title],
    publisher: publisher(),
  };
}

export const STUDY_RESOURCE_LINKS = [
  {
    href: '/resources/',
    label: 'Study resources',
    description: 'A starting point for the HSKMAP guides, plans, pronunciation notes, and map workflow.',
  },
  {
    href: '/hsk-study-guide/',
    label: 'HSK study guide',
    description: 'Plan vocabulary review with pinyin, tones, examples, flashcards, writing, and weekly checks.',
  },
  {
    href: '/hsk-1-study-plan/',
    label: 'HSK 1 plan',
    description: 'A beginner-friendly four week plan for first words, tones, and simple sentences.',
  },
  {
    href: '/hsk-2-study-plan/',
    label: 'HSK 2 plan',
    description: 'A six week plan for stronger beginner vocabulary, grammar frames, and recall.',
  },
  {
    href: '/classic-hsk-vocabulary-guide/',
    label: 'Classic HSK guide',
    description: 'How classic HSK 1-6 vocabulary levels build from foundation words to advanced reading.',
  },
  {
    href: '/pinyin-and-tones-guide/',
    label: 'Pinyin and tones',
    description: 'Pronunciation habits for initials, finals, tones, and character-based review.',
  },
  {
    href: '/how-to-use-hskmap/',
    label: 'How to use HSKMAP',
    description: 'Use maps, word cards, progress labels, flashcards, audio, and writing practice together.',
  },
] satisfies ContentResourceLink[];

export const SITE_RESOURCE_LINKS = [
  {
    href: '/about/',
    label: 'About',
    description: 'What HSKMAP is, what the map covers, and how it supports Chinese vocabulary review.',
  },
  {
    href: '/contact/',
    label: 'Contact',
    description: 'How to report vocabulary corrections, display issues, privacy requests, or site feedback.',
  },
  {
    href: '/privacy/',
    label: 'Privacy',
    description: 'How local progress, analytics, cookies, advertising, and user choices are handled.',
  },
  {
    href: '/terms/',
    label: 'Terms',
    description: 'Terms for using the HSKMAP vocabulary map, study guides, and learning content.',
  },
] satisfies ContentResourceLink[];

export const CONTENT_RESOURCE_LINKS = [...STUDY_RESOURCE_LINKS, ...SITE_RESOURCE_LINKS] satisfies ContentResourceLink[];

const rawContentPages = [
  {
    slug: '/resources/',
    title: 'HSK Study Resources from HSKMAP',
    description:
      'Browse HSKMAP study resources for vocabulary planning, beginner HSK levels, pinyin, tones, flashcards, and map-based review.',
    updated: UPDATED,
    sections: [
      {
        id: 'what-this-section-is',
        heading: 'A guide library for the vocabulary map',
        paragraphs: [
          'The HSKMAP word map is the main study tool. This resource section explains how to use that tool inside a real study routine so learners are not left with only a large vocabulary grid.',
          'Use these guides when you need to choose a level, build a daily review habit, repair pronunciation, or understand how classic HSK levels fit together. Each page links back to the map so the advice can be used immediately.',
        ],
      },
      {
        id: 'best-starting-points',
        heading: 'Best starting points',
        paragraphs: [
          'New learners should begin with the HSK 1 plan and the pinyin and tones guide. Learners who already know some Chinese should open the general HSK study guide first, then use the classic HSK guide to decide which level deserves focused review.',
          'If you are visiting HSKMAP for the first time, read the how-to-use guide before starting a long session. It explains the difference between the full overview, level pages, word cards, progress labels, flashcards, audio, and writing practice.',
        ],
        items: [
          'Start with HSK 1 if Mandarin pronunciation and character recognition still feel new.',
          'Use HSK 2 if you can read simple HSK 1 examples but need stronger beginner sentence patterns.',
          'Use the full map when you want to compare levels and find weak areas.',
          'Use level pages when you want a quiet, focused vocabulary session.',
        ],
      },
      {
        id: 'how-to-use-guides',
        heading: 'How to use the guides with the map',
        paragraphs: [
          'Read one guide section, then immediately apply it on a map page. For example, after reading about tone review, open a few difficult words and listen to the audio before marking progress. After reading a study plan, open the matching HSK level and choose a small group of words for the day.',
          'The guides are intentionally practical. They are not meant to replace textbooks, teachers, listening materials, or official exam information. They help you turn HSK vocabulary lists into repeatable review sessions.',
        ],
      },
      {
        id: 'map-links',
        heading: 'Map pages to keep open while studying',
        paragraphs: [
          'The English map pages are the clearest starting point for the current resource library. They include the interactive vocabulary map and the crawlable vocabulary tables generated for each HSK level.',
          'When reviewing a guide, keep the relevant map page open in another tab. That makes it easier to move from advice to actual vocabulary practice.',
        ],
        items: [
          'All HSK levels: /en/',
          'HSK 1 vocabulary map: /en/hsk-1/',
          'HSK 2 vocabulary map: /en/hsk-2/',
          'HSK 3 vocabulary map: /en/hsk-3/',
          'HSK 4 vocabulary map: /en/hsk-4/',
          'HSK 5 vocabulary map: /en/hsk-5/',
          'HSK 6 vocabulary map: /en/hsk-6/',
        ],
      },
    ],
  },
  {
    slug: '/about/',
    title: 'About HSKMAP',
    description:
      'Learn what HSKMAP is, how its visual HSK vocabulary maps work, and how the study tool supports Chinese learners.',
    updated: UPDATED,
    sections: [
      {
        id: 'mission',
        heading: 'A focused HSK vocabulary map',
        paragraphs: [
          'HSKMAP is a Chinese vocabulary study tool built around the classic HSK 1-6 word lists. Its main idea is simple: put vocabulary on an interactive map so learners can scan a level, open any word, and keep track of what still needs review.',
          'The project is designed for independent learners who want practical study details in one place: characters, pinyin, English meanings, example sentences, audio, flashcards, writing practice, and local progress tracking.',
        ],
      },
      {
        id: 'why-visual',
        heading: 'Why the map format helps',
        paragraphs: [
          'A plain list is useful for checking coverage, but it can make every word feel isolated. A map gives learners a broader view of a level, makes progress visible, and helps weak words stand out during review.',
          'The map is not meant to replace listening, reading, speaking, or classroom practice. It is a vocabulary workspace that helps learners organize those activities around the words they are trying to remember.',
        ],
        items: [
          'Use the overview when you want to compare HSK 1 through HSK 6.',
          'Use a level page when you need a narrower review session.',
          'Use word cards when you need pronunciation, examples, flashcards, or writing practice.',
        ],
      },
      {
        id: 'scope',
        heading: 'What HSKMAP covers',
        paragraphs: [
          'HSKMAP currently focuses on the classic six-level HSK vocabulary structure because it is still widely used in textbooks, apps, classroom materials, and legacy exam preparation resources.',
          'The site is a study aid, not an official testing authority. Learners should confirm current exam rules, registration requirements, and syllabus changes with official sources or their school before making exam decisions.',
        ],
      },
    ],
  },
  {
    slug: '/contact/',
    title: 'Contact HSKMAP',
    description:
      'Contact HSKMAP about vocabulary corrections, study guide feedback, technical issues, privacy requests, or site questions.',
    updated: UPDATED,
    sections: [
      {
        id: 'how-to-send-feedback',
        heading: 'How to send useful feedback',
        paragraphs: [
          'The most helpful messages are specific. If you are reporting a vocabulary issue, include the HSK level, the word, the pinyin shown on the site, and the correction you believe is needed.',
          'For technical issues, include the page you were using, your browser, your device type, and what happened before the problem appeared. A short reproducible report is much easier to investigate than a general description.',
        ],
        items: [
          'Vocabulary reports should include the word and level.',
          'Example sentence reports should include the full sentence if possible.',
          'Privacy requests should identify the request type without including unnecessary sensitive documents.',
        ],
      },
      {
        id: 'priorities',
        heading: 'What gets prioritized',
        paragraphs: [
          'HSKMAP prioritizes reports that affect learner accuracy, accessibility, privacy, or site availability. Suggestions about new features are welcome, but corrections and learner-facing clarity usually come first.',
          'Not every suggestion can be added immediately. Changes are weighed against the goal of keeping the vocabulary map fast, calm, and easy to use.',
        ],
      },
      {
        id: 'good-content-notes',
        heading: 'Content feedback that helps learners',
        paragraphs: [
          'Strong content feedback explains the learner problem. For example, tell us when two words are easy to confuse, when an English meaning is too broad, or when a guide assumes knowledge that a beginner may not have.',
          'Reports about broken links, unclear labels, incorrect metadata, and confusing study instructions are also useful because they directly affect how learners use the site.',
        ],
      },
    ],
  },
  {
    slug: '/privacy/',
    title: 'Privacy Policy',
    description:
      'Read the HSKMAP privacy policy covering local study progress, analytics, advertising, cookies, and privacy choices.',
    updated: UPDATED,
    sections: [
      {
        id: 'overview',
        heading: 'Overview',
        paragraphs: [
          'This privacy policy explains how HSKMAP handles information when you use the site. The core study experience is designed to work without requiring a personal account.',
          'HSKMAP may process limited technical information to operate the service, understand aggregate usage, improve learning pages, and support advertising. The exact information available can depend on your browser settings and consent choices.',
        ],
      },
      {
        id: 'local-progress',
        heading: 'Local study progress',
        paragraphs: [
          'HSKMAP can save vocabulary progress in your browser so words marked as learning or known remain available when you return. This progress is intended to stay on your device unless a future feature clearly explains otherwise.',
          'Clearing site data, using private browsing, changing devices, or resetting your browser can remove saved progress because browser storage belongs to that browser profile.',
        ],
      },
      {
        id: 'analytics-ads-cookies',
        heading: 'Analytics, cookies, and advertising',
        paragraphs: [
          'HSKMAP may use analytics to understand how people find and use the site. Analytics data can include page views, approximate location from network data, device and browser information, referrer information, and feature usage.',
          'HSKMAP may display advertising. Advertising providers can use cookies or similar technologies to serve, measure, and improve ads, and they may process information under their own policies and user controls.',
        ],
        items: [
          'You can adjust browser cookie settings to limit some storage technologies.',
          'Some regions may show consent controls where required.',
          'Blocking cookies or scripts can affect analytics, ads, or local progress behavior.',
        ],
      },
      {
        id: 'support-messages',
        heading: 'Messages and support requests',
        paragraphs: [
          'If you contact HSKMAP, the information you choose to send may be used to respond, investigate the issue, and improve the site. Avoid sending unnecessary sensitive information in support messages.',
          'Correction reports and general feedback may be retained as long as needed to track content quality and product decisions.',
        ],
      },
      {
        id: 'choices',
        heading: 'Your choices',
        paragraphs: [
          'Depending on your location, you may have rights to access, correct, delete, or object to certain uses of personal information. You can contact HSKMAP to make a privacy request.',
          'This policy may be updated when the site changes or legal requirements change. The updated date on this page shows the latest revision date for this registry content.',
        ],
      },
    ],
  },
  {
    slug: '/terms/',
    title: 'Terms of Use',
    description:
      'Review the HSKMAP terms of use for vocabulary maps, study guides, learning content, acceptable use, and limitations.',
    updated: UPDATED,
    sections: [
      {
        id: 'using-hskmap',
        heading: 'Using HSKMAP',
        paragraphs: [
          'By using HSKMAP, you agree to use the site as an educational resource and to follow these terms. If you do not agree with these terms, do not use the site.',
          'HSKMAP may update the site, change features, add or remove content, or revise these terms. Continued use after changes means you accept the updated terms.',
        ],
      },
      {
        id: 'educational-content',
        heading: 'Educational content',
        paragraphs: [
          'HSKMAP provides vocabulary lists, study guides, pinyin support, examples, and review tools for learning Chinese. The content is provided for general study support and may contain mistakes despite review efforts.',
          'You are responsible for checking official exam requirements, classroom requirements, and test dates with official sources. HSKMAP is not an official HSK testing authority.',
        ],
      },
      {
        id: 'acceptable-use',
        heading: 'Acceptable use',
        paragraphs: [
          'Use HSKMAP in a way that does not interfere with the site, other users, or the availability of the service. Do not attempt to bypass security controls, overload the service, scrape at harmful rates, or present HSKMAP content as official certification material.',
          'You may link to public HSKMAP pages and use the site for personal study, teaching preparation, and classroom reference. Bulk republication of site content requires permission unless a separate license explicitly allows it.',
        ],
      },
      {
        id: 'limitations',
        heading: 'Availability and limitations',
        paragraphs: [
          'HSKMAP is provided as is and as available. The site may be interrupted, changed, or discontinued. Study progress stored locally can be lost if browser data is cleared or your device changes.',
          'To the fullest extent allowed by law, HSKMAP is not liable for indirect losses, exam outcomes, missed deadlines, or decisions made based on study content.',
        ],
      },
    ],
  },
  {
    slug: '/hsk-study-guide/',
    title: 'HSK Study Guide: Plan Better Chinese Vocabulary Review',
    description:
      'Build a practical HSK study routine with vocabulary review, pinyin, tones, examples, flashcards, writing practice, and progress checks.',
    updated: UPDATED,
    sections: [
      {
        id: 'choose-level',
        heading: 'Start with the right level',
        paragraphs: [
          'A useful HSK plan begins with an honest level choice. New learners should start with HSK 1. Learners with prior study should sample words from several levels and choose the highest level where most items can be understood without guessing.',
          'Do not choose a level only because the word count looks manageable. The real question is whether you can recognize the characters, pronounce the words, understand examples, and use common items in short answers.',
        ],
        items: [
          'HSK 1: greetings, numbers, pronouns, basic verbs, dates, places, and simple questions.',
          'HSK 2: common time phrases, comparisons, everyday actions, and more flexible beginner sentences.',
          'HSK 3 and above: broader reading vocabulary, connectors, abstract words, and longer examples.',
        ],
      },
      {
        id: 'daily-routine',
        heading: 'Use a repeatable daily routine',
        paragraphs: [
          'The best HSK routine is simple enough to repeat. A 25 minute session can cover older words, new words, pronunciation, and one small output task. The goal is not to touch every feature each day; it is to move vocabulary from recognition toward recall.',
          'For most learners, a balanced session works better than only flipping flashcards. Read the word, say it aloud, listen to the audio, study the example, then test whether you can produce a short phrase without looking.',
        ],
        items: [
          'Review 10 to 20 older words before adding new ones.',
          'Add 5 to 12 new words depending on your available time.',
          'Write or type 3 short sentences using difficult words.',
          'End by marking words honestly as learning or known.',
        ],
      },
      {
        id: 'pronunciation-and-examples',
        heading: 'Connect sound, meaning, and examples',
        paragraphs: [
          'Pinyin is useful, but it should not become the only thing you recognize. When studying a word, connect the characters, pinyin, tone pattern, English meaning, and example sentence in the same review moment.',
          'Examples prevent shallow memorization. Many HSK words have English meanings that look simple but behave differently in Chinese word order, collocations, or grammar patterns.',
        ],
      },
      {
        id: 'weekly-check',
        heading: 'Check progress each week',
        paragraphs: [
          'Once a week, scan your current level and look for weak clusters. If many weak words belong to the same theme, such as time, food, transport, or classroom language, pause new vocabulary and review that theme directly.',
          'A good weekly check includes recognition, pronunciation, and recall. If you can recognize a word but cannot say it or use it, keep it in review.',
        ],
      },
    ],
  },
  {
    slug: '/hsk-1-study-plan/',
    title: 'HSK 1 Study Plan for Beginners',
    description:
      'Follow a beginner-friendly HSK 1 study plan for core words, pinyin, tones, simple sentences, flashcards, and review milestones.',
    updated: UPDATED,
    sections: [
      {
        id: 'goal',
        heading: 'What HSK 1 should accomplish',
        paragraphs: [
          'HSK 1 is not just a first vocabulary list. It is the stage where you learn how Mandarin sounds, how basic sentence order works, and how simple characters connect to useful meanings.',
          'By the end of this level, aim to recognize common words, understand slow beginner examples, answer basic personal questions, and read short phrases without relying on English word order.',
        ],
      },
      {
        id: 'four-week-plan',
        heading: 'Four week HSK 1 plan',
        paragraphs: [
          'A four week plan works well if you can study five days per week. Keep sessions short and consistent. Beginners often make faster progress with 20 to 30 focused minutes than with one long weekend session.',
          'Use the HSKMAP HSK 1 page as your vocabulary dashboard. Mark new words as learning, move reliable words to known, and reopen hard words during each review session.',
        ],
        items: [
          'Week 1: pinyin initials and finals, tone practice, numbers, pronouns, and greetings.',
          'Week 2: basic verbs, question words, dates, time words, and classroom phrases.',
          'Week 3: food, family, locations, simple adjectives, and short examples.',
          'Week 4: mixed review, listening checks, writing practice, and short self-introductions.',
        ],
      },
      {
        id: 'daily-template',
        heading: 'Daily study template',
        paragraphs: [
          'Start each session with pronunciation. Read five older words aloud, listen to audio, and repeat with attention to tones. Then study a small set of new words and immediately place them in short phrases.',
          'End each session with recall. Hide the English meaning and try to remember it from the character and pinyin. Then hide the Chinese cue and try to say the word from the English meaning.',
        ],
        items: [
          '5 minutes: tone and pinyin warmup.',
          '10 minutes: new word study with examples.',
          '10 minutes: flashcard review of learning words.',
          '5 minutes: write or type three tiny sentences.',
        ],
      },
      {
        id: 'ready-for-hsk2',
        heading: 'When to begin HSK 2',
        paragraphs: [
          'You are ready for HSK 2 when HSK 1 words feel familiar in mixed order, not only in the order you first studied them. You should also be able to pronounce most words without stopping to decode every syllable.',
          'If recognition is good but recall is weak, spend a few more days producing short answers. HSK 2 becomes easier when HSK 1 words can be used quickly.',
        ],
      },
    ],
  },
  {
    slug: '/hsk-2-study-plan/',
    title: 'HSK 2 Study Plan: Build Strong Beginner Chinese',
    description:
      'Use this HSK 2 study plan to expand beginner Chinese vocabulary, review grammar patterns, improve recall, and prepare for longer examples.',
    updated: UPDATED,
    sections: [
      {
        id: 'what-changes',
        heading: 'What changes at HSK 2',
        paragraphs: [
          'HSK 2 adds more everyday actions, time expressions, adjectives, adverbs, and sentence patterns. You are no longer only naming basic things; you are learning to describe plans, preferences, comparisons, and simple experiences.',
          'This level is a good time to shift from word-by-word memorization to phrase-based review. A word is easier to remember when it is connected to ordering food, describing weather, making plans, or talking about study.',
        ],
      },
      {
        id: 'six-week-plan',
        heading: 'Six week HSK 2 plan',
        paragraphs: [
          'A six week plan gives enough room for review without rushing. If HSK 1 still feels slow, use the first week to repair weak basics before adding many new HSK 2 words.',
          'Use HSKMAP to keep difficult words visible. HSK 2 has enough vocabulary that weak items can disappear in a plain list, but a map makes it easier to return to them by theme and level.',
        ],
        items: [
          'Week 1: HSK 1 repair, tone review, question words, and routine vocabulary.',
          'Week 2: time, dates, frequency, and short planning sentences.',
          'Week 3: travel, shopping, food, and service interactions.',
          'Week 4: adjectives, degree adverbs, comparisons, and preferences.',
          'Week 5: mixed listening, example sentence reading, and writing practice.',
          'Week 6: full vocabulary review, weak word repair, and timed recall checks.',
        ],
      },
      {
        id: 'grammar-frames',
        heading: 'Pair vocabulary with grammar frames',
        paragraphs: [
          'At HSK 2, many words are best learned inside a frame. Review time words in sentences, comparison words in comparisons, and verbs in short actions instead of keeping everything in isolated translation pairs.',
          'When a sentence feels too long, reduce it instead of abandoning it. Keep the target word and make the rest simpler. This keeps review active without overloading memory.',
        ],
      },
      {
        id: 'recall',
        heading: 'Review for recall',
        paragraphs: [
          'Recognition feels good, but HSK 2 requires faster recall. After reading a card, close your eyes and say the word. Then try to produce a short phrase. If you cannot do that, keep the word in the learning group.',
          'Use mixed review often. Words studied by theme are easier during the lesson than they are in random order. Random order shows whether the word is really available when you need it.',
        ],
      },
    ],
  },
  {
    slug: '/classic-hsk-vocabulary-guide/',
    title: 'Classic HSK Vocabulary Guide',
    description:
      'Understand classic HSK 1-6 vocabulary, word counts, study priorities, and how to use classic lists with current Chinese learning goals.',
    updated: UPDATED,
    sections: [
      {
        id: 'classic-meaning',
        heading: 'What classic HSK means',
        paragraphs: [
          'Classic HSK usually refers to the six-level vocabulary framework used by many textbooks, apps, classroom materials, and older exam preparation resources. Each level has a familiar identity and a widely referenced word list.',
          'Even when learners are not preparing for a specific legacy exam, the classic structure remains useful. It gives beginners and intermediate learners a practical ladder from daily words to advanced reading vocabulary.',
        ],
      },
      {
        id: 'level-progression',
        heading: 'How the levels build',
        paragraphs: [
          'The early levels emphasize survival communication: people, numbers, time, food, school, family, places, and common actions. Middle levels introduce broader daily life, work, travel, opinions, and sentence connectors. Higher levels add abstract vocabulary, formal phrasing, idioms, and reading-heavy words.',
          'A learner should not treat every level as the same kind of task. HSK 1 and HSK 2 build the base. HSK 3 and HSK 4 build sentence flexibility. HSK 5 and HSK 6 require more reading, listening, and context.',
        ],
        items: [
          'HSK 1: foundation words and simple sentence patterns.',
          'HSK 2: beginner expansion and everyday interactions.',
          'HSK 3: more independent daily communication.',
          'HSK 4: richer description, opinion, and narrative language.',
          'HSK 5: reading and discussion vocabulary.',
          'HSK 6: advanced comprehension and precise expression.',
        ],
      },
      {
        id: 'using-lists',
        heading: 'How to use vocabulary lists well',
        paragraphs: [
          'A vocabulary list is a starting point, not a complete study method. Attach each word to pronunciation, a sentence, and a review decision. If a word is only familiar when you see it in list order, it is not fully learned.',
          'Use HSKMAP to move between the full map and level-specific pages. The full map helps you see progression. Level pages help you concentrate when a review session needs to stay narrow.',
        ],
      },
      {
        id: 'current-goals',
        heading: 'Classic lists and current goals',
        paragraphs: [
          'Chinese proficiency standards and exam formats can change, and learners should verify current test requirements before registering for an exam. Classic HSK vocabulary remains valuable because it appears across years of learning materials.',
          'If your goal is classroom success, follow your teacher and textbook sequence. If your goal is independent learning, use classic HSK as a backbone and add real reading, listening, and speaking practice as early as possible.',
        ],
      },
    ],
  },
  {
    slug: '/pinyin-and-tones-guide/',
    title: 'Pinyin and Tones Guide for HSK Learners',
    description:
      'Learn how pinyin, initials, finals, and tones support HSK vocabulary study, with practical pronunciation habits for beginners.',
    updated: UPDATED,
    sections: [
      {
        id: 'what-pinyin-does',
        heading: 'What pinyin is for',
        paragraphs: [
          'Pinyin is the standard romanization system that helps learners pronounce Mandarin syllables. It shows initials, finals, and tones, so it is especially useful during the first stages of HSK study.',
          'Pinyin is a guide to sound, not a replacement for characters. The long-term goal is to connect pinyin, characters, meaning, and usage. If you only memorize roman letters, reading Chinese will remain fragile.',
        ],
      },
      {
        id: 'tones',
        heading: 'The four tones and neutral tone',
        paragraphs: [
          'Mandarin tones change meaning, so tone practice belongs inside vocabulary review. A syllable with the wrong tone can sound like a different word. Beginners should study tones slowly and clearly before trying to speak quickly.',
          'Use tone numbers if you are typing without tone marks: ma1, ma2, ma3, ma4, and ma5 for neutral tone. In real study, listen to audio and imitate the full word, not only an isolated syllable.',
        ],
        items: [
          'First tone: high and level.',
          'Second tone: rising.',
          'Third tone: low with a dipping shape.',
          'Fourth tone: falling and firm.',
          'Neutral tone: short and light.',
        ],
      },
      {
        id: 'beginner-problems',
        heading: 'Common beginner problems',
        paragraphs: [
          'Many learners pronounce pinyin as if it were English spelling. That causes problems with sounds such as x, q, zh, ch, r, and the final u after j, q, x, and y. These sounds need direct listening and imitation.',
          'Another common problem is ignoring tone changes in connected speech. For example, two third tones together do not sound like two full dipping tones. Learn the basic rule, then listen for it in real words and examples.',
        ],
      },
      {
        id: 'practice-routine',
        heading: 'A practical tone routine',
        paragraphs: [
          'Use a short tone routine before each vocabulary session. Pick five words, listen once, repeat slowly, then say each word in a short phrase. This keeps tone practice connected to HSK vocabulary instead of turning it into a separate drill that you might skip.',
          'When a tone is difficult, compare it with nearby tones. Say ma1, ma2, ma3, and ma4 slowly, then return to the real word. The contrast makes the target sound easier to notice.',
        ],
        items: [
          'Listen before reading the English meaning.',
          'Repeat at half speed with a clear tone shape.',
          'Say the word in a phrase or short sentence.',
          'Review hard tones the next day before adding many new words.',
        ],
      },
    ],
  },
  {
    slug: '/how-to-use-hskmap/',
    title: 'How to Use HSKMAP',
    description:
      'Learn how to use HSKMAP for vocabulary maps, level pages, flashcards, writing practice, audio, examples, and local progress tracking.',
    updated: UPDATED,
    sections: [
      {
        id: 'choose-view',
        heading: 'Choose the right view',
        paragraphs: [
          'HSKMAP has two main study views: the full overview and level-specific pages. The overview is useful when you want to compare levels or browse the full classic HSK path. A level page is better when you want a focused session with only the words you are studying now.',
          'If you are preparing for a class quiz, use the level page. If you are planning long-term study or trying to find weak areas, use the overview and move between levels.',
        ],
      },
      {
        id: 'word-cards',
        heading: 'Open word cards for detail',
        paragraphs: [
          'Click or tap a word tile to review its details. A useful review pass includes the Chinese characters, pinyin, meaning, example sentence, and audio. Do not rush past the example sentence, because it shows how the word behaves in context.',
          'For Chinese characters, visual familiarity matters. Spend a moment looking at the shape of the word before switching to flashcards or writing practice.',
        ],
      },
      {
        id: 'progress',
        heading: 'Track progress honestly',
        paragraphs: [
          'Progress labels are most helpful when they reflect real recall. Mark a word as known only when you can recognize it in mixed review and remember the meaning without the list order helping you.',
          'Keep difficult words in learning. That is not a failure; it is the mechanism that makes review useful. A smaller honest known list is better than a large list that hides weak vocabulary.',
        ],
        items: [
          'Use learning for new, unstable, or confusing words.',
          'Use known for words you can recognize quickly in random order.',
          'Reopen known words occasionally to make sure they still feel reliable.',
        ],
      },
      {
        id: 'flashcards-writing',
        heading: 'Combine flashcards and writing practice',
        paragraphs: [
          'Flashcards are useful for quick recognition and recall, but writing practice adds a different kind of memory. If a word is important or visually confusing, practice writing it after you can recognize it.',
          'Writing does not need to dominate every session. Use it selectively for words you keep missing, words with similar characters, and words you want to use actively.',
        ],
      },
      {
        id: 'study-loop',
        heading: 'Use a simple study loop',
        paragraphs: [
          'A strong HSKMAP session follows a loop: review old words, learn a few new words, test recall, mark progress, and return to weak words later. The map makes that loop visible because you can see what still needs attention.',
          'For beginners, one focused level is usually enough. For intermediate learners, alternating between a current level and a lower-level repair session can prevent old gaps from slowing down new study.',
        ],
      },
    ],
  },
] satisfies Omit<ContentPage, 'jsonLd'>[];

export const CONTENT_PAGES = rawContentPages.map((page) => ({
  ...page,
  jsonLd: LEARNING_PAGE_SLUGS.has(page.slug) ? learningResourceJsonLd(page) : webPageJsonLd(page),
})) satisfies ContentPage[];

export const CONTENT_PAGES_BY_SLUG = Object.fromEntries(
  CONTENT_PAGES.map((page) => [page.slug, page]),
) as Record<ContentPageSlug, ContentPage>;

export const CONTENT_PAGE_REGISTRY = CONTENT_PAGES_BY_SLUG;

export function getContentPageBySlug(slug: string): ContentPage | undefined {
  return CONTENT_PAGE_SLUGS.includes(slug as ContentPageSlug)
    ? CONTENT_PAGES_BY_SLUG[slug as ContentPageSlug]
    : undefined;
}

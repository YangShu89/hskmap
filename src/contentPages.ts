import { HSKMAP_NAME, HSKMAP_SITE_URL } from './seo';

export const CONTENT_PAGE_SLUGS = [
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

const updated = '2026-05-31';

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
  teaches: string[],
): ContentPageJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: page.title,
    description: page.description,
    url: absoluteUrl(page.slug),
    inLanguage: 'en',
    dateModified: page.updated,
    learningResourceType: 'Study guide',
    educationalLevel: 'Beginner Chinese',
    teaches,
    publisher: publisher(),
  };
}

const aboutPage = {
  slug: '/about/',
  title: 'About HSKMAP',
  description:
    'Learn what HSKMAP is, how its visual HSK vocabulary maps work, and why the tool focuses on useful review for Chinese learners.',
  updated,
  sections: [
    {
      id: 'mission',
      heading: 'A visual way to study HSK vocabulary',
      paragraphs: [
        'HSKMAP is a Chinese vocabulary study tool built around the classic HSK 1-6 word lists. Instead of presenting a long spreadsheet of words, it arranges vocabulary into a map so learners can scan a level, notice related words, and return to difficult items without losing context.',
        'The project is designed for independent learners who want a calm study space with practical details: characters, pinyin, English meanings, example sentences, audio, flashcards, writing practice, and local progress tracking.',
      ],
    },
    {
      id: 'approach',
      heading: 'How the map supports learning',
      paragraphs: [
        'A vocabulary map helps learners avoid treating each word as an isolated fact. When words are grouped by level and meaning, it becomes easier to compare similar items, recognize patterns, and build review sessions around a specific weakness.',
        'HSKMAP keeps the interface lightweight. You can open a level, review the cards you need, mark words as learning or known, and come back later without creating an account.',
      ],
      items: [
        'Use the overview to compare HSK 1 through HSK 6.',
        'Use level pages when you need focused review before a quiz or exam.',
        'Use flashcards and writing practice to move from recognition toward recall.',
      ],
    },
    {
      id: 'scope',
      heading: 'What content is included',
      paragraphs: [
        'The current learning content follows the classic HSK structure because many textbooks, courses, and legacy exam resources still reference those six levels. The site also includes planning guides that explain how to use those lists with modern study habits.',
        'The vocabulary data is intended as a study aid, not as an official exam registration source. Learners should always check current exam requirements with their school, test center, or official Chinese testing service before making exam decisions.',
      ],
    },
    {
      id: 'privacy-first',
      heading: 'A privacy-aware study tool',
      paragraphs: [
        'HSKMAP stores study progress locally in the browser where possible. That makes it useful for quick daily review without requiring a sign-in flow for basic vocabulary practice.',
        'The site may use standard analytics and advertising technologies to understand usage and keep the free resource available. The privacy policy explains those practices in more detail.',
      ],
    },
  ],
} satisfies ContentPage;

const contactPage = {
  slug: '/contact/',
  title: 'Contact HSKMAP',
  description:
    'Contact HSKMAP about vocabulary corrections, study guide feedback, technical issues, privacy requests, or partnership questions.',
  updated,
  sections: [
    {
      id: 'how-to-contact',
      heading: 'How to get in touch',
      paragraphs: [
        'For questions about HSKMAP, send a clear message that explains what you were trying to do, which page you were using, and what happened. Specific reports are much easier to investigate than general notes.',
        'If you are reporting a vocabulary issue, include the HSK level, the Chinese word, the pinyin shown on the site, and the correction you believe is needed. If the issue involves an example sentence, include the full sentence as it appears.',
      ],
      items: [
        'Vocabulary correction reports should include the word and level.',
        'Technical reports should include your browser and device type.',
        'Privacy requests should identify the request type but should not include sensitive documents unless requested.',
      ],
    },
    {
      id: 'response-expectations',
      heading: 'What to expect',
      paragraphs: [
        'HSKMAP is maintained as a focused educational resource, so response times can vary. Messages that affect learner accuracy, site availability, or privacy will usually be reviewed before general suggestions.',
        'Not every suggestion can be added immediately. The site prioritizes corrections, accessibility improvements, clear study workflows, and changes that help many learners rather than one-time customization requests.',
      ],
    },
    {
      id: 'content-feedback',
      heading: 'Useful feedback to send',
      paragraphs: [
        'The most helpful feedback explains the learner problem. For example, say that two words are easy to confuse, that a definition needs a narrower sense, or that a study guide step is unclear for a new learner.',
        'HSKMAP welcomes reports about broken links, incorrect metadata, confusing instructions, display problems, and places where a page could explain Chinese study decisions more clearly.',
      ],
    },
  ],
} satisfies ContentPage;

const privacyPage = {
  slug: '/privacy/',
  title: 'Privacy Policy',
  description:
    'Read the HSKMAP privacy policy, including local study progress, analytics, advertising, cookies, and privacy request information.',
  updated,
  sections: [
    {
      id: 'overview',
      heading: 'Overview',
      paragraphs: [
        'This privacy policy explains how HSKMAP handles information when you use the site. HSKMAP is a vocabulary study resource, and the core study experience is designed to work without requiring a personal account.',
        'The site may process limited technical information to operate the service, understand aggregate usage, improve learning pages, and support advertising. The exact data available can depend on your browser settings and consent choices.',
      ],
    },
    {
      id: 'local-progress',
      heading: 'Local study progress',
      paragraphs: [
        'HSKMAP can save vocabulary progress in your browser so that words marked as learning or known remain available when you return. This progress is intended to stay on your device unless a future feature clearly explains otherwise.',
        'Because local browser storage belongs to the browser profile, clearing site data, using private browsing, changing devices, or resetting the browser can remove saved progress.',
      ],
    },
    {
      id: 'analytics-and-ads',
      heading: 'Analytics, cookies, and advertising',
      paragraphs: [
        'HSKMAP may use analytics to understand how people find and use the site. Analytics events can include page views, device and browser information, approximate location derived from network data, referrer information, and feature usage.',
        'HSKMAP may also display advertising. Advertising providers can use cookies or similar technologies to serve, measure, and improve ads. These providers may process information according to their own policies and user controls.',
      ],
      items: [
        'You can adjust browser cookie settings to limit some storage technologies.',
        'Some regions may show consent controls where required.',
        'Blocking cookies or scripts can change how analytics, ads, or progress storage behave.',
      ],
    },
    {
      id: 'messages',
      heading: 'Messages and support requests',
      paragraphs: [
        'If you contact HSKMAP, the information you choose to send may be used to respond, investigate the issue, and improve the site. Avoid sending unnecessary sensitive information in support messages.',
        'Correction reports and general feedback may be retained as long as needed to track content quality and product decisions.',
      ],
    },
    {
      id: 'rights',
      heading: 'Your choices',
      paragraphs: [
        'Depending on your location, you may have rights to access, correct, delete, or object to certain uses of personal information. You can contact HSKMAP to make a privacy request.',
        'This policy may be updated when the site changes or legal requirements change. The updated date on this page shows the latest revision date for this registry content.',
      ],
    },
  ],
} satisfies ContentPage;

const termsPage = {
  slug: '/terms/',
  title: 'Terms of Use',
  description:
    'Review the HSKMAP terms of use for the vocabulary map, study guides, learning content, acceptable use, and limitations.',
  updated,
  sections: [
    {
      id: 'acceptance',
      heading: 'Using HSKMAP',
      paragraphs: [
        'By using HSKMAP, you agree to use the site as an educational resource and to follow these terms. If you do not agree with these terms, do not use the site.',
        'HSKMAP may update the site, change features, add or remove content, or revise these terms. Continued use after changes means you accept the updated terms.',
      ],
    },
    {
      id: 'learning-content',
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
        'Use HSKMAP in a way that does not interfere with the site, other users, or the availability of the service. Do not attempt to bypass security controls, overload the service, scrape at harmful rates, or misrepresent the site content as official certification material.',
        'You may link to public HSKMAP pages and use the site for personal study, teaching preparation, and classroom reference. Bulk republication of site content requires permission unless a separate license explicitly allows it.',
      ],
    },
    {
      id: 'availability',
      heading: 'Availability and limitations',
      paragraphs: [
        'HSKMAP is provided as is and as available. The site may be interrupted, changed, or discontinued. Study progress stored locally can be lost if your browser data is cleared or your device changes.',
        'To the fullest extent allowed by law, HSKMAP is not liable for indirect losses, exam outcomes, missed deadlines, or decisions made based on study content.',
      ],
    },
  ],
} satisfies ContentPage;

const hskStudyGuidePage = {
  slug: '/hsk-study-guide/',
  title: 'HSK Study Guide: How to Plan Chinese Vocabulary Review',
  description:
    'Build a practical HSK study routine with vocabulary review, pinyin, tones, examples, flashcards, writing practice, and progress checks.',
  updated,
  sections: [
    {
      id: 'start-with-level',
      heading: 'Start with the right HSK level',
      paragraphs: [
        'A useful HSK plan begins with an honest level choice. If you are new to Chinese, start with HSK 1 and build confidence with high-frequency words before moving forward. If you have studied before, sample words from several levels and choose the highest level where you can understand most items without guessing.',
        'Do not choose a level only because the word count looks manageable. The real question is whether you can recognize characters, pronounce the words, understand example sentences, and use the vocabulary in short answers.',
      ],
      items: [
        'HSK 1: daily survival words, numbers, pronouns, basic verbs, and simple questions.',
        'HSK 2: common time phrases, comparisons, everyday actions, and more flexible sentences.',
        'HSK 3 and above: broader reading vocabulary, connectors, abstract words, and longer examples.',
      ],
    },
    {
      id: 'daily-routine',
      heading: 'Use a repeatable daily routine',
      paragraphs: [
        'The best HSK routine is simple enough to repeat. A 25 minute session can cover new words, review words, pronunciation, and one small output task. The goal is not to touch every feature each day. The goal is to keep vocabulary moving from recognition to recall.',
        'For most learners, a balanced session works better than only flipping cards. Read the word, say it aloud, listen to the audio, look at the example, then test whether you can produce a short phrase without looking.',
      ],
      items: [
        'Review 10 to 20 older words before adding new ones.',
        'Add 5 to 12 new words depending on your available time.',
        'Write or type 3 short sentences using the hardest words.',
        'End by marking words honestly as learning or known.',
      ],
    },
    {
      id: 'pinyin-tones-characters',
      heading: 'Study pinyin, tones, and characters together',
      paragraphs: [
        'Pinyin is useful, but it should not become the only thing you recognize. When studying a word like 学生, connect the characters, pronunciation, and meaning in the same review moment. That gives your memory more ways to retrieve the word later.',
        'Tones also need active review. Saying a word once is not enough. Compare similar syllables, listen for tone shape, and repeat the word inside a phrase so pronunciation practice stays connected to real language.',
      ],
    },
    {
      id: 'examples',
      heading: 'Use examples to avoid shallow memorization',
      paragraphs: [
        'Many HSK words have meanings that look simple in English but behave differently in Chinese. Example sentences show word order, measure words, particles, and common collocations. A learner who studies examples usually remembers more than a learner who studies isolated translations.',
        'When an example feels difficult, do not skip it immediately. Identify one unknown structure, look at how the target word fits inside the sentence, then return to the vocabulary card. That small loop is often enough to make the word stick.',
      ],
    },
    {
      id: 'weekly-review',
      heading: 'Check progress each week',
      paragraphs: [
        'Once a week, scan your current level and look for clusters of weak words. If many weak words belong to the same theme, such as time, food, transport, or classroom language, pause new vocabulary and review that theme directly.',
        'A good weekly check includes recognition, pronunciation, and recall. If you can recognize a word but cannot say it or use it, keep it in review. Passing a flashcard once should not be the only standard for knowing a word.',
      ],
    },
  ],
} satisfies ContentPage;

const hsk1StudyPlanPage = {
  slug: '/hsk-1-study-plan/',
  title: 'HSK 1 Study Plan for Beginners',
  description:
    'Follow a beginner-friendly HSK 1 study plan covering core words, pinyin, tones, simple sentences, flashcards, and review milestones.',
  updated,
  sections: [
    {
      id: 'goal',
      heading: 'What HSK 1 should accomplish',
      paragraphs: [
        'HSK 1 is not just a list of first words. It is the stage where you learn how Chinese sounds, how basic sentence order works, and how to connect simple characters to useful meanings. A good HSK 1 plan should make you comfortable with small but complete sentences.',
        'By the end of this level, aim to recognize the common words, understand slow beginner examples, answer basic personal questions, and read short phrases without relying on English word order.',
      ],
    },
    {
      id: 'four-week-plan',
      heading: 'Four week HSK 1 plan',
      paragraphs: [
        'A four week plan works well if you can study five days per week. Keep sessions short and consistent. Beginners often make faster progress with 20 to 30 focused minutes than with one long weekend session.',
        'Use the HSKMAP HSK 1 page as your main vocabulary dashboard. Mark new words as learning, move reliable words to known, and reopen hard words during each review session.',
      ],
      items: [
        'Week 1: pinyin initials and finals, tone practice, numbers, pronouns, and greetings.',
        'Week 2: basic verbs, question words, dates, time words, and common classroom phrases.',
        'Week 3: food, family, locations, simple adjectives, and short example sentences.',
        'Week 4: mixed review, listening checks, writing practice, and short self-introductions.',
      ],
    },
    {
      id: 'daily-template',
      heading: 'Daily study template',
      paragraphs: [
        'Start each session with pronunciation. Read five older words aloud, listen to audio, and repeat with attention to tones. Then study a small set of new words and immediately place them in short phrases.',
        'End each session with recall. Hide the English meaning and try to remember it from the character and pinyin. Then hide the Chinese and try to say the word from the English cue.',
      ],
      items: [
        '5 minutes: tone and pinyin warmup.',
        '10 minutes: new word study with examples.',
        '10 minutes: flashcard review of learning words.',
        '5 minutes: write or type three tiny sentences.',
      ],
    },
    {
      id: 'sentences',
      heading: 'Sentence patterns to master',
      paragraphs: [
        'HSK 1 learners should spend extra time on a few high-value patterns. Examples include statements with 是, possession with 的, questions with 吗, and simple time expressions. These patterns appear constantly after the first level.',
        'Do not wait until every word is memorized before using sentences. Even phrases like 我是学生, 你好吗, and 今天很热 help connect vocabulary to grammar.',
      ],
    },
    {
      id: 'readiness',
      heading: 'Ready for HSK 2',
      paragraphs: [
        'You are ready to begin HSK 2 when HSK 1 words feel familiar in mixed order, not only in the order you first studied them. You should also be able to pronounce most words without stopping to decode every syllable.',
        'If recognition is good but recall is weak, spend a few more days producing short answers. HSK 2 becomes easier when HSK 1 words can be used quickly.',
      ],
    },
  ],
} satisfies ContentPage;

const hsk2StudyPlanPage = {
  slug: '/hsk-2-study-plan/',
  title: 'HSK 2 Study Plan: Build Strong Beginner Chinese',
  description:
    'Use this HSK 2 study plan to expand beginner Chinese vocabulary, review grammar patterns, improve recall, and prepare for longer examples.',
  updated,
  sections: [
    {
      id: 'goal',
      heading: 'What changes at HSK 2',
      paragraphs: [
        'HSK 2 builds on the first level by adding more everyday actions, time expressions, adjectives, adverbs, and sentence patterns. You are no longer only naming basic things. You are learning to describe plans, preferences, comparisons, and simple experiences.',
        'This level is a good time to shift from word-by-word memorization to phrase-based review. A word is easier to remember when you connect it to a real use case, such as ordering food, describing weather, making plans, or talking about study.',
      ],
    },
    {
      id: 'six-week-plan',
      heading: 'Six week HSK 2 plan',
      paragraphs: [
        'A six week plan gives enough room for review without rushing. If you already know HSK 1 well, you can move faster. If HSK 1 still feels slow, use the first week to repair weak basics before adding many new HSK 2 words.',
        'Use HSKMAP to keep difficult words visible. HSK 2 has enough vocabulary that weak items can disappear in a plain list, but a map makes it easier to return to them by theme and level.',
      ],
      items: [
        'Week 1: HSK 1 repair, tone review, question words, and daily routine vocabulary.',
        'Week 2: time, dates, frequency, and short planning sentences.',
        'Week 3: travel, shopping, food, and service interactions.',
        'Week 4: adjectives, degree adverbs, comparisons, and preferences.',
        'Week 5: mixed listening, example sentence reading, and writing practice.',
        'Week 6: full vocabulary review, weak word repair, and timed recall checks.',
      ],
    },
    {
      id: 'grammar-links',
      heading: 'Pair vocabulary with grammar',
      paragraphs: [
        'At HSK 2, many words are best learned with a grammar frame. For example, review time words inside sentences, not as a separate list. Practice patterns such as 因为...所以..., 比, 觉得, and 要 so vocabulary becomes usable.',
        'When a sentence feels too long, reduce it instead of abandoning it. Keep the target word and make the rest simpler. This keeps review active without overloading memory.',
      ],
    },
    {
      id: 'review-method',
      heading: 'Review for recall, not just recognition',
      paragraphs: [
        'Recognition feels good, but HSK 2 requires faster recall. After reading a card, close your eyes and say the word. Then try to produce a short phrase. If you cannot do that, keep the word in the learning group.',
        'Use mixed review often. Words studied by theme are easier during the lesson than they are in random order. Random order shows whether the word is really available when you need it.',
      ],
      items: [
        'Read the character and say the pinyin aloud.',
        'Cover the meaning and recall it from memory.',
        'Make one phrase with the word.',
        'Return to difficult words after a short break.',
      ],
    },
    {
      id: 'move-forward',
      heading: 'When to move beyond HSK 2',
      paragraphs: [
        'Move toward HSK 3 when you can read HSK 2 examples without translating every word into English first. Some hesitation is normal, but the sentence shape should feel familiar.',
        'If your listening is weaker than reading, add audio review before moving on. A larger vocabulary will not solve pronunciation and tone recognition gaps by itself.',
      ],
    },
  ],
} satisfies ContentPage;

const classicHskVocabularyGuidePage = {
  slug: '/classic-hsk-vocabulary-guide/',
  title: 'Classic HSK Vocabulary Guide',
  description:
    'Understand the classic HSK 1-6 vocabulary structure, word counts, study priorities, and how to use classic lists with current Chinese learning goals.',
  updated,
  sections: [
    {
      id: 'what-classic-means',
      heading: 'What classic HSK means',
      paragraphs: [
        'Classic HSK usually refers to the six-level vocabulary framework used by many textbooks, apps, classroom materials, and older exam preparation resources. It is familiar to learners because each level has a manageable identity and a widely referenced word list.',
        'Even when learners are not preparing for a specific legacy exam, the classic structure remains useful. It gives beginners a practical ladder from basic daily words to advanced reading vocabulary.',
      ],
    },
    {
      id: 'level-shape',
      heading: 'How the levels build',
      paragraphs: [
        'The early levels emphasize survival communication: people, numbers, time, food, school, family, places, and common actions. Middle levels introduce broader daily life, work, travel, opinions, and more sentence connectors. Higher levels add abstract vocabulary, formal phrasing, idioms, and reading-heavy words.',
        'A learner should not treat every level as the same kind of task. HSK 1 and HSK 2 are about building a base. HSK 3 and HSK 4 are about sentence flexibility. HSK 5 and HSK 6 require more reading, listening, and context.',
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
        'A vocabulary list is a starting point, not a complete study method. To make the list useful, attach each word to pronunciation, a sentence, and a review decision. If a word is only familiar when you see it in list order, it is not fully learned yet.',
        'Use HSKMAP to move between the full map and level-specific pages. The full map helps you see progression. Level pages help you concentrate when a review session needs to stay narrow.',
      ],
    },
    {
      id: 'classic-vs-current',
      heading: 'Classic lists and current goals',
      paragraphs: [
        'Chinese proficiency standards and exam formats can change, and learners should verify current test requirements before registering for an exam. Still, classic HSK vocabulary remains valuable because it appears across years of learning materials.',
        'If your goal is classroom success, follow your teacher and textbook sequence. If your goal is independent learning, use classic HSK as a backbone and add real reading, listening, and speaking practice as soon as possible.',
      ],
    },
  ],
} satisfies ContentPage;

const pinyinAndTonesGuidePage = {
  slug: '/pinyin-and-tones-guide/',
  title: 'Pinyin and Tones Guide for HSK Learners',
  description:
    'Learn how pinyin, initials, finals, and tones support HSK vocabulary study, with practical pronunciation habits for beginners.',
  updated,
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
        'First tone: high and level, as in ma1.',
        'Second tone: rising, as in ma2.',
        'Third tone: low with a dipping shape, as in ma3.',
        'Fourth tone: falling and firm, as in ma4.',
        'Neutral tone: short and light, as in ma5.',
      ],
    },
    {
      id: 'common-beginner-problems',
      heading: 'Common beginner problems',
      paragraphs: [
        'Many learners pronounce pinyin as if it were English spelling. That causes problems with sounds such as x, q, zh, ch, r, and the final u after j, q, x, and y. These sounds need direct listening and imitation.',
        'Another common problem is ignoring tone changes in connected speech. For example, two third tones together do not sound like two full dipping tones. Learn the basic rule, then listen for it in real words and examples.',
      ],
    },
    {
      id: 'practice-method',
      heading: 'A practical tone routine',
      paragraphs: [
        'Use a short tone routine before each vocabulary session. Pick five words, listen once, repeat slowly, then say each word in a short phrase. This keeps tone practice connected to HSK vocabulary instead of turning it into a separate drill that you might skip.',
        'When a tone is difficult, compare it with a nearby tone. Say ma1, ma2, ma3, ma4 slowly, then return to the real word. The contrast makes the target sound easier to notice.',
      ],
      items: [
        'Listen before reading the English meaning.',
        'Repeat at half speed with clear tone shape.',
        'Say the word in a phrase or short sentence.',
        'Review hard tones the next day before adding new words.',
      ],
    },
    {
      id: 'characters',
      heading: 'Move from pinyin toward characters',
      paragraphs: [
        'As soon as a word is familiar, spend more time looking at the characters. For example, connect 你好 with ni3 hao3 and the greeting meaning, then gradually test yourself from the characters first.',
        'This transition matters because HSK reading depends on character recognition. Pinyin helps you enter the language, but characters carry the written system you need for real reading.',
      ],
    },
  ],
} satisfies ContentPage;

const howToUseHskmapPage = {
  slug: '/how-to-use-hskmap/',
  title: 'How to Use HSKMAP',
  description:
    'Learn how to use HSKMAP for vocabulary maps, level pages, flashcards, writing practice, audio, examples, and local progress tracking.',
  updated,
  sections: [
    {
      id: 'choose-a-view',
      heading: 'Choose the right view',
      paragraphs: [
        'HSKMAP has two main study modes: the full overview and level-specific pages. The overview is useful when you want to compare levels or browse the full classic HSK path. A level page is better when you want a focused session with only the words you are studying now.',
        'If you are preparing for a class quiz, use the level page. If you are planning long-term study or trying to find weak areas, use the overview and move between levels.',
      ],
    },
    {
      id: 'open-word-cards',
      heading: 'Open word cards for detail',
      paragraphs: [
        'Click or tap a word tile to review its details. A useful review pass includes the Chinese characters, pinyin, meaning, example sentence, and audio. Do not rush past the example sentence, because it shows how the word behaves in context.',
        'For Chinese characters, visual familiarity matters. Spend a moment looking at the shape of the word before switching to flashcards or writing practice.',
      ],
    },
    {
      id: 'track-progress',
      heading: 'Track progress honestly',
      paragraphs: [
        'Progress labels are most helpful when they reflect real recall. Mark a word as known only when you can recognize it in mixed review and remember the meaning without the list order helping you.',
        'Keep difficult words in learning. That is not a failure. It is the mechanism that makes review useful. A smaller honest known list is better than a large list that hides weak vocabulary.',
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
} satisfies ContentPage;

const contentPages = [
  aboutPage,
  contactPage,
  privacyPage,
  termsPage,
  hskStudyGuidePage,
  hsk1StudyPlanPage,
  hsk2StudyPlanPage,
  classicHskVocabularyGuidePage,
  pinyinAndTonesGuidePage,
  howToUseHskmapPage,
].map((page) => ({
  ...page,
  jsonLd:
    page.slug === '/hsk-study-guide/' ||
    page.slug === '/hsk-1-study-plan/' ||
    page.slug === '/hsk-2-study-plan/' ||
    page.slug === '/classic-hsk-vocabulary-guide/' ||
    page.slug === '/pinyin-and-tones-guide/' ||
    page.slug === '/how-to-use-hskmap/'
      ? learningResourceJsonLd(page, [
          page.slug === '/pinyin-and-tones-guide/' ? 'Mandarin pinyin and tones' : 'HSK vocabulary study',
          page.title,
        ])
      : webPageJsonLd(page),
})) satisfies ContentPage[];

export const CONTENT_PAGES = contentPages;

export const CONTENT_PAGES_BY_SLUG = Object.fromEntries(
  CONTENT_PAGES.map((page) => [page.slug, page]),
) as Record<ContentPageSlug, ContentPage>;

export const CONTENT_PAGE_REGISTRY = CONTENT_PAGES_BY_SLUG;

export function getContentPageBySlug(slug: string): ContentPage | undefined {
  return CONTENT_PAGE_SLUGS.includes(slug as ContentPageSlug)
    ? CONTENT_PAGES_BY_SLUG[slug as ContentPageSlug]
    : undefined;
}

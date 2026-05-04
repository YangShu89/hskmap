import type { ClusterId, HskLevel, HskWord } from '../types';

export type RawWord = {
  hanzi: string;
  pinyin: string;
  meaning: string;
};

const KNOWN_CLUSTER_OVERRIDES: Record<string, ClusterId> = {
  爸爸: 'people',
  妈妈: 'people',
  学校: 'places',
};

const PEOPLE_KEYWORDS = [
  'aunt',
  'brother',
  'child',
  'colleague',
  'driver',
  'everyone',
  'female',
  'guest',
  'he',
  'husband',
  'male',
  'manager',
  'mother',
  'nanny',
  'neighbor',
  'other people',
  'polite',
  'principal',
  'sister',
  'uncle',
  'wife',
  'younger',
  'grandfather',
  'grandmother',
  'self',
];

const TIME_KEYWORDS = [
  'already',
  'always',
  'autumn',
  'before',
  'birthday',
  'date',
  'day',
  'duration',
  'evening',
  'first',
  'half',
  'hour',
  'last year',
  'long time',
  'morning',
  'now',
  'occurrence',
  'quarter',
  'recently',
  'season',
  'spring',
  'summer',
  'then',
  'thousand',
  'time',
  'today',
  'tomorrow',
  'weekend',
  'winter',
  'year',
  'zero',
  'hundred',
];

const PLACE_KEYWORDS = [
  'airport',
  'area',
  'bank',
  'beijing',
  'beside',
  'city',
  'classroom',
  'company',
  'country',
  'east',
  'floor',
  'guesthouse',
  'hotel',
  'library',
  'map',
  'middle',
  'north',
  'office',
  'outside',
  'park',
  'place',
  'restroom',
  'road',
  'room',
  'side',
  'south',
  'station',
  'street',
  'subway',
  'train station',
  'toward',
  'west',
];

const DAILY_KEYWORDS = [
  'air conditioner',
  'animal',
  'bag',
  'banana',
  'beer',
  'bird',
  'blackboard',
  'boat',
  'body',
  'book',
  'bowl',
  'bread',
  'cake',
  'camera',
  'chopsticks',
  'clothes',
  'coffee',
  'color',
  'credit card',
  'dictionary',
  'door',
  'drink',
  'ear',
  'egg',
  'email',
  'eyes',
  'fish',
  'flower',
  'food',
  'gift',
  'grass',
  'hair',
  'hat',
  'homework',
  'horse',
  'lamp',
  'medicine',
  'menu',
  'milk',
  'mobile phone',
  'moon',
  'mouth',
  'mutton',
  'newspaper',
  'noodles',
  'nose',
  'notebook',
  'panda',
  'pants',
  'passport',
  'pencil',
  'phone',
  'photo',
  'plate',
  'refrigerator',
  'rice',
  'shirt',
  'shoes',
  'skirt',
  'snow',
  'soccer',
  'sport',
  'suitcase',
  'sun',
  'supermarket',
  'ticket',
  'tree',
  'umbrella',
  'watch',
  'watermelon',
];

const DESCRIPTOR_KEYWORDS = [
  'angry',
  'bad',
  'black',
  'blue',
  'broken',
  'busy',
  'cheap',
  'clean',
  'clear',
  'clever',
  'cloudy',
  'comfortable',
  'convenient',
  'correct',
  'cute',
  'difficult',
  'easy',
  'enthusiastic',
  'expensive',
  'far',
  'fast',
  'fresh',
  'full',
  'green',
  'happy',
  'high',
  'hungry',
  'important',
  'long',
  'near',
  'new',
  'old',
  'quiet',
  'red',
  'sad',
  'satisfied',
  'short',
  'slow',
  'special',
  'strange',
  'sunny',
  'sweet',
  'tall',
  'thin',
  'thirsty',
  'tired',
  'true',
  'very',
  'white',
  'wrong',
  'young',
];

const QUESTION_KEYWORDS = [
  'although',
  'because',
  'but',
  'compare',
  'degree',
  'for; because',
  'if',
  'meaning',
  'measure word',
  'modal',
  'not only',
  'only if',
  'or',
  'particle',
  'problem',
  'question',
  'sentence',
  'should',
  'so',
  'therefore',
  'why',
];

const VERB_KEYWORDS = [
  'agree',
  'allow',
  'answer',
  'arrive',
  'ask',
  'be interested',
  'believe',
  'borrow',
  'bring',
  'brush',
  'carry',
  'chat',
  'choose',
  'clean',
  'climb',
  'close',
  'complete',
  'cry',
  'dance',
  'decide',
  'deliver',
  'discover',
  'draw',
  'exercise',
  'feel',
  'finish',
  'forget',
  'get married',
  'go',
  'go online',
  'grow',
  'help',
  'hope',
  'improve',
  'inspect',
  'introduce',
  'know',
  'laugh',
  'leave',
  'let',
  'listen',
  'look',
  'meet',
  'move',
  'need',
  'participate',
  'pay attention',
  'plan',
  'play',
  'prepare',
  'practice',
  'put',
  'receive',
  'remember',
  'request',
  'rest',
  'return',
  'review',
  'ride',
  'run',
  'sell',
  'send',
  'sing',
  'smile',
  'solve',
  'speak',
  'spend',
  'stand',
  'start',
  'study',
  'swim',
  'take',
  'take care',
  'take off',
  'talk',
  'teach',
  'tell',
  'think',
  'travel',
  'try',
  'turn off',
  'understand',
  'use',
  'wait',
  'walk',
  'wash',
  'wear',
  'welcome',
  'work',
  'worry',
];

function rawToWords(raw: string | string[]): RawWord[] {
  const lines = Array.isArray(raw) ? raw : raw.trim().split('\n');

  return lines
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [hanzi, pinyin, meaning] = line.split('|');
      return { hanzi, pinyin, meaning };
    });
}

function includesAny(haystack: string, needles: string[]) {
  return needles.some((needle) => haystack.includes(needle));
}

function clusterFor(word: RawWord): ClusterId {
  const override = KNOWN_CLUSTER_OVERRIDES[word.hanzi];
  if (override) {
    return override;
  }

  const meaning = word.meaning.toLowerCase();

  if (includesAny(meaning, PEOPLE_KEYWORDS)) {
    return 'people';
  }

  if (includesAny(meaning, TIME_KEYWORDS)) {
    return 'time';
  }

  if (includesAny(meaning, PLACE_KEYWORDS)) {
    return 'places';
  }

  if (includesAny(meaning, QUESTION_KEYWORDS)) {
    return 'questions';
  }

  if (includesAny(meaning, VERB_KEYWORDS)) {
    return 'verbs';
  }

  if (includesAny(meaning, DESCRIPTOR_KEYWORDS)) {
    return 'descriptors';
  }

  if (includesAny(meaning, DAILY_KEYWORDS)) {
    return 'daily';
  }

  return 'daily';
}

function slugify(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ü/g, 'v')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

export function buildWords(level: HskLevel, raw: string | string[]): HskWord[] {
  return rawToWords(raw).map((word, index) => ({
    ...word,
    cluster: clusterFor(word),
    id: `hsk${level}-${slugify(word.pinyin || word.hanzi)}-${index + 1}`,
    level,
  }));
}

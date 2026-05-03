import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import HanziWriter, { type StrokeData } from 'hanzi-writer';
import { HSK_LEVEL_OPTIONS, HSK_WORDS_BY_LEVEL } from './data/hsk';
import { HSK1_AR_SENTENCE_MEANINGS, HSK1_AR_WORD_MEANINGS } from './data/hsk1ArabicTranslations';
import { HSK1_FR_SENTENCE_MEANINGS, HSK1_FR_WORD_MEANINGS } from './data/hsk1FrenchTranslations';
import { HSK1_DE_SENTENCE_MEANINGS, HSK1_DE_WORD_MEANINGS } from './data/hsk1GermanTranslations';
import { HSK1_ID_SENTENCE_MEANINGS, HSK1_ID_WORD_MEANINGS } from './data/hsk1IndonesianTranslations';
import { HSK1_JA_SENTENCE_MEANINGS, HSK1_JA_WORD_MEANINGS } from './data/hsk1JapaneseTranslations';
import { HSK1_KO_SENTENCE_MEANINGS, HSK1_KO_WORD_MEANINGS } from './data/hsk1KoreanTranslations';
import { HSK1_PT_BR_SENTENCE_MEANINGS, HSK1_PT_BR_WORD_MEANINGS } from './data/hsk1PortugueseTranslations';
import { HSK1_ES_SENTENCE_MEANINGS, HSK1_ES_WORD_MEANINGS } from './data/hsk1SpanishTranslations';
import { HSK1_RU_SENTENCE_MEANINGS, HSK1_RU_WORD_MEANINGS } from './data/hsk1Translations';
import { HSK1_VI_SENTENCE_MEANINGS, HSK1_VI_WORD_MEANINGS } from './data/hsk1VietnameseTranslations';
import { HSK2_AR_SENTENCE_MEANINGS, HSK2_AR_WORD_MEANINGS } from './data/hsk2ArabicTranslations';
import { HSK2_FR_SENTENCE_MEANINGS, HSK2_FR_WORD_MEANINGS } from './data/hsk2FrenchTranslations';
import { HSK2_DE_SENTENCE_MEANINGS, HSK2_DE_WORD_MEANINGS } from './data/hsk2GermanTranslations';
import { HSK2_ID_SENTENCE_MEANINGS, HSK2_ID_WORD_MEANINGS } from './data/hsk2IndonesianTranslations';
import { HSK2_JA_SENTENCE_MEANINGS, HSK2_JA_WORD_MEANINGS } from './data/hsk2JapaneseTranslations';
import { HSK2_KO_SENTENCE_MEANINGS, HSK2_KO_WORD_MEANINGS } from './data/hsk2KoreanTranslations';
import { HSK2_PT_BR_SENTENCE_MEANINGS, HSK2_PT_BR_WORD_MEANINGS } from './data/hsk2PortugueseTranslations';
import { HSK2_RU_SENTENCE_MEANINGS, HSK2_RU_WORD_MEANINGS } from './data/hsk2RussianTranslations';
import { HSK2_ES_SENTENCE_MEANINGS, HSK2_ES_WORD_MEANINGS } from './data/hsk2SpanishTranslations';
import { HSK2_VI_SENTENCE_MEANINGS, HSK2_VI_WORD_MEANINGS } from './data/hsk2VietnameseTranslations';
import { useMandarinSpeech } from './hooks/useMandarinSpeech';
import { useProgress } from './hooks/useProgress';
import type { HskLevel, HskWord, ProgressMap, WordStatus } from './types';

type FilterMode = 'all' | 'learning' | 'know' | 'unmarked';
type HskView = HskLevel | 'all';
type TranslationLanguage = 'en' | 'es' | 'fr' | 'ru' | 'pt-BR' | 'de' | 'ja' | 'ko' | 'vi' | 'id' | 'ar';
type WritingMode = 'watch' | 'practice';

interface MapCamera {
  panX: number;
  panY: number;
  scale: number;
}

interface VisibleWordGroup {
  startIndex: number;
  words: HskWord[];
}

interface WordTileLayout {
  word: HskWord;
  x: number;
  y: number;
}

interface WordMapLayout {
  width: number;
  height: number;
  tiles: WordTileLayout[];
}

interface MapViewportSize {
  width: number;
  height: number;
}

interface MapDragState {
  active: boolean;
  captured: boolean;
  pointerId: number;
  startX: number;
  startY: number;
  startPanX: number;
  startPanY: number;
  didMove: boolean;
}

interface PracticeFeedback {
  completedStrokes: number;
  currentStroke: number;
  isComplete: boolean;
  message: string;
  totalMistakes: number;
  totalStrokes: number;
}

const DEFAULT_ZOOM = 1;
const MIN_ZOOM = 0.08;
const MAX_ZOOM = 36;
const ZOOM_SENSITIVITY = 0.0015;
const WHEEL_DELTA_THRESHOLD = 0.5;
const WHEEL_PAN_SENSITIVITY = 1;
const TILE_BASE_SIZE = 74;
const TILE_BOARD_PADDING_RATIO = 0.324;
const MIN_VISIBLE_MAP_EDGE = 96;
const HSK4_WORD_MAP_SPLIT_INDEX = 300;
const CANVAS_OVERSCAN_TILES = 2;
const ALL_WORDS = HSK_LEVEL_OPTIONS.flatMap((level) => HSK_WORDS_BY_LEVEL[level.id]);
const TILE_COLORS = {
  default: {
    fill: '#f7b718',
    hoverFill: '#ffc928',
    border: 'rgba(255, 244, 196, 0.9)',
    hoverBorder: '#fff8c5',
    text: '#3b3208',
  },
  know: {
    fill: '#35cf66',
    hoverFill: '#4ade80',
    border: 'rgba(220, 252, 231, 0.92)',
    text: '#052e16',
  },
  learning: {
    fill: '#ff6b16',
    hoverFill: '#fb7c24',
    border: 'rgba(255, 237, 213, 0.92)',
    text: '#fff7ed',
  },
} as const;
const LEVEL_ACCENTS: Record<HskLevel, string> = {
  1: '#f7b718',
  2: '#0f8fa5',
  3: '#f05a35',
  4: '#7c3aed',
  5: '#2563eb',
  6: '#db2777',
};
const LEVEL_TEXT_COLORS: Record<HskLevel, string> = {
  1: '#3b3208',
  2: '#ecfeff',
  3: '#fff7ed',
  4: '#f5f3ff',
  5: '#eff6ff',
  6: '#fff1f2',
};
const VIEW_OPTIONS: { id: HskView; label: string; description: string }[] = [
  { id: 'all', label: 'All HSK', description: `${ALL_WORDS.length} words` },
  ...HSK_LEVEL_OPTIONS,
];

const FILTERS: { id: FilterMode; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'learning', label: 'Review' },
  { id: 'know', label: 'Known' },
  { id: 'unmarked', label: 'Unmarked' },
];
const LANGUAGE_STORAGE_KEY = 'hsk-translation-language';
const LANGUAGE_OPTIONS: { id: TranslationLanguage; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'es', label: 'Español' },
  { id: 'fr', label: 'Français' },
  { id: 'ru', label: 'Русский' },
  { id: 'pt-BR', label: 'Português' },
  { id: 'de', label: 'Deutsch' },
  { id: 'ja', label: '日本語' },
  { id: 'ko', label: '한국어' },
  { id: 'vi', label: 'Tiếng Việt' },
  { id: 'id', label: 'Indonesia' },
  { id: 'ar', label: 'العربية' },
];
type LocalizedMeaningMap = {
  words: Record<string, string>;
  sentences: Record<string, string>;
};
type LocalizedLanguage = Exclude<TranslationLanguage, 'en'>;

const LOCALIZED_MEANINGS: Partial<Record<HskLevel, Partial<Record<LocalizedLanguage, LocalizedMeaningMap>>>> = {
  1: {
    ar: {
      words: HSK1_AR_WORD_MEANINGS,
      sentences: HSK1_AR_SENTENCE_MEANINGS,
    },
    de: {
      words: HSK1_DE_WORD_MEANINGS,
      sentences: HSK1_DE_SENTENCE_MEANINGS,
    },
    es: {
      words: HSK1_ES_WORD_MEANINGS,
      sentences: HSK1_ES_SENTENCE_MEANINGS,
    },
    fr: {
      words: HSK1_FR_WORD_MEANINGS,
      sentences: HSK1_FR_SENTENCE_MEANINGS,
    },
    id: {
      words: HSK1_ID_WORD_MEANINGS,
      sentences: HSK1_ID_SENTENCE_MEANINGS,
    },
    ja: {
      words: HSK1_JA_WORD_MEANINGS,
      sentences: HSK1_JA_SENTENCE_MEANINGS,
    },
    ko: {
      words: HSK1_KO_WORD_MEANINGS,
      sentences: HSK1_KO_SENTENCE_MEANINGS,
    },
    'pt-BR': {
      words: HSK1_PT_BR_WORD_MEANINGS,
      sentences: HSK1_PT_BR_SENTENCE_MEANINGS,
    },
    ru: {
      words: HSK1_RU_WORD_MEANINGS,
      sentences: HSK1_RU_SENTENCE_MEANINGS,
    },
    vi: {
      words: HSK1_VI_WORD_MEANINGS,
      sentences: HSK1_VI_SENTENCE_MEANINGS,
    },
  },
  2: {
    ar: {
      words: HSK2_AR_WORD_MEANINGS,
      sentences: HSK2_AR_SENTENCE_MEANINGS,
    },
    de: {
      words: HSK2_DE_WORD_MEANINGS,
      sentences: HSK2_DE_SENTENCE_MEANINGS,
    },
    es: {
      words: HSK2_ES_WORD_MEANINGS,
      sentences: HSK2_ES_SENTENCE_MEANINGS,
    },
    fr: {
      words: HSK2_FR_WORD_MEANINGS,
      sentences: HSK2_FR_SENTENCE_MEANINGS,
    },
    id: {
      words: HSK2_ID_WORD_MEANINGS,
      sentences: HSK2_ID_SENTENCE_MEANINGS,
    },
    ja: {
      words: HSK2_JA_WORD_MEANINGS,
      sentences: HSK2_JA_SENTENCE_MEANINGS,
    },
    ko: {
      words: HSK2_KO_WORD_MEANINGS,
      sentences: HSK2_KO_SENTENCE_MEANINGS,
    },
    'pt-BR': {
      words: HSK2_PT_BR_WORD_MEANINGS,
      sentences: HSK2_PT_BR_SENTENCE_MEANINGS,
    },
    ru: {
      words: HSK2_RU_WORD_MEANINGS,
      sentences: HSK2_RU_SENTENCE_MEANINGS,
    },
    vi: {
      words: HSK2_VI_WORD_MEANINGS,
      sentences: HSK2_VI_SENTENCE_MEANINGS,
    },
  },
};
const WRITING_PRACTICE_LEVELS = new Set<HskLevel>([1, 2, 3, 4, 5, 6]);

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\u00fc/g, 'u:')
    .replace(/v/g, 'u:');
}

function getInitialTranslationLanguage(): TranslationLanguage {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return LANGUAGE_OPTIONS.some((option) => option.id === storedLanguage)
    ? (storedLanguage as TranslationLanguage)
    : 'en';
}

function getWordMeaning(word: HskWord, language: TranslationLanguage) {
  if (language !== 'en' && word.level) {
    return LOCALIZED_MEANINGS[word.level]?.[language]?.words[word.id] ?? word.meaning;
  }

  return word.meaning;
}

function getSentenceMeaning(word: HskWord, language: TranslationLanguage) {
  if (!word.exampleSentence) {
    return '';
  }

  if (language !== 'en' && word.level) {
    return LOCALIZED_MEANINGS[word.level]?.[language]?.sentences[word.id] ?? word.exampleSentence.meaning;
  }

  return word.exampleSentence.meaning;
}

function getSearchableMeaning(word: HskWord, language: TranslationLanguage) {
  const localizedMeaning = getWordMeaning(word, language);
  return localizedMeaning === word.meaning ? word.meaning : `${word.meaning} ${localizedMeaning}`;
}

function isWordVisible(
  word: HskWord,
  search: string,
  filter: FilterMode,
  status: WordStatus | undefined,
  language: TranslationLanguage,
) {
  if (filter === 'learning' && status !== 'learning') {
    return false;
  }

  if (filter === 'know' && status !== 'know') {
    return false;
  }

  if (filter === 'unmarked' && status) {
    return false;
  }

  const normalizedSearch = normalize(search.trim());
  if (!normalizedSearch) {
    return true;
  }

  const haystack = normalize(`${word.hanzi} ${word.pinyin} ${getSearchableMeaning(word, language)}`);
  return haystack.includes(normalizedSearch) || word.hanzi.includes(search.trim());
}

function getVisibleWordGroups(selectedView: HskView, visibleWords: HskWord[]): VisibleWordGroup[] {
  const splitIndex =
    selectedView === 3
      ? Math.ceil(visibleWords.length / 2)
      : selectedView === 4 && visibleWords.length > HSK4_WORD_MAP_SPLIT_INDEX
        ? HSK4_WORD_MAP_SPLIT_INDEX
        : 0;

  if (splitIndex <= 0 || splitIndex >= visibleWords.length) {
    return [{ startIndex: 0, words: visibleWords }];
  }

  return [
    { startIndex: 0, words: visibleWords.slice(0, splitIndex) },
    { startIndex: splitIndex, words: visibleWords.slice(splitIndex) },
  ];
}

function getTwoCharacterRows(value: string) {
  const characters = Array.from(value.replace(/\s/g, ''));
  const isCjkOnly = characters.every((character) => /[\u3400-\u9fff]/u.test(character));

  if (!isCjkOnly || characters.length < 3) {
    return value;
  }

  const rows: string[] = [];
  for (let index = 0; index < characters.length; index += 2) {
    rows.push(characters.slice(index, index + 2).join(''));
  }

  return rows.join('\n');
}

function getTileLabel(hanzi: string) {
  if (!hanzi.includes('…')) {
    return getTwoCharacterRows(hanzi);
  }

  return hanzi
    .split('…')
    .map((part) => part.trim())
    .filter(Boolean)
    .map(getTwoCharacterRows)
    .join('\n');
}

function getTileTextClass(hanzi: string) {
  if (hanzi.includes('…')) {
    return 'is-phrase-text';
  }

  const characterCount = Array.from(hanzi.replace(/\s/g, '')).length;
  if (characterCount >= 5) {
    return 'is-long-text';
  }

  if (characterCount >= 3) {
    return 'is-medium-text';
  }

  return '';
}

function getTileTextScale(label: string) {
  const lines = label.split('\n').filter(Boolean);
  const lineCount = Math.max(lines.length, 1);
  const longestLineLength = Math.max(
    ...lines.map((line) => Array.from(line.replace(/\s/g, '')).length),
    1,
  );
  const widthScale = 0.78 / longestLineLength;
  const heightScale = 0.82 / (lineCount * 0.96);

  return Math.max(0.1, Math.min(0.38, widthScale, heightScale));
}

function getModalHanziCharacterCount(hanzi: string) {
  return Math.max(Array.from(hanzi.replace(/\s/g, '')).length, 1);
}

function getWordAudioSrc(word: HskWord) {
  return word.level && word.level <= 6 ? `/audio/words/${word.id}.mp3` : undefined;
}

function getWritableCharacters(hanzi: string) {
  return Array.from(hanzi).filter((character) => /[\u3400-\u9fff]/u.test(character));
}

function getInitialPracticeFeedback(character: string): PracticeFeedback {
  return {
    completedStrokes: 0,
    currentStroke: 1,
    isComplete: false,
    message: `Write ${character}`,
    totalMistakes: 0,
    totalStrokes: 0,
  };
}

function getStrokeProgress(strokeData: StrokeData, isCorrect: boolean) {
  const completedStrokes = strokeData.strokeNum + (isCorrect ? 1 : 0);
  const totalStrokes = completedStrokes + strokeData.strokesRemaining;

  return {
    completedStrokes,
    currentStroke: isCorrect
      ? Math.min(totalStrokes, completedStrokes + 1)
      : Math.min(totalStrokes, strokeData.strokeNum + 1),
    totalStrokes,
  };
}

function formatCssNumber(value: number, digits = 4) {
  return Number(value.toFixed(digits)).toString();
}

function formatPixelValue(value: number) {
  return `${formatCssNumber(value, 3)}px`;
}

function clampZoom(value: number) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
}

function clampMapCameraToBounds(
  camera: MapCamera,
  viewportWidth: number,
  viewportHeight: number,
  contentWidth: number,
  contentHeight: number,
) {
  const scale = clampZoom(camera.scale);
  const scaledWidth = contentWidth * scale;
  const scaledHeight = contentHeight * scale;
  const clampAxis = (pan: number, viewportSize: number, contentSize: number) => {
    const visibleEdge = Math.min(
      contentSize,
      Math.max(MIN_VISIBLE_MAP_EDGE, Math.min(viewportSize * 0.2, 180)),
    );
    const minPan = visibleEdge - contentSize;
    const maxPan = viewportSize - visibleEdge;

    return Math.min(maxPan, Math.max(minPan, pan));
  };

  return {
    panX: clampAxis(camera.panX, viewportWidth, scaledWidth),
    panY: clampAxis(camera.panY, viewportHeight, scaledHeight),
    scale,
  };
}

function getWheelAdjustedCamera({
  camera,
  cursorX,
  cursorY,
  deltaX,
  deltaY,
  shiftKey,
}: {
  camera: MapCamera;
  cursorX: number;
  cursorY: number;
  deltaX: number;
  deltaY: number;
  shiftKey: boolean;
}) {
  const currentScale = Math.max(camera.scale, 0.001);
  const horizontalDelta =
    Math.abs(deltaX) > WHEEL_DELTA_THRESHOLD ? deltaX : shiftKey ? deltaY : 0;
  const zoomDelta = shiftKey ? 0 : deltaY;
  const nextScale =
    Math.abs(zoomDelta) > WHEEL_DELTA_THRESHOLD
      ? clampZoom(currentScale * Math.exp(-zoomDelta * ZOOM_SENSITIVITY))
      : currentScale;
  const shouldPanHorizontally = Math.abs(horizontalDelta) > WHEEL_DELTA_THRESHOLD;
  const shouldZoom = Math.abs(nextScale - currentScale) >= 0.0005;

  if (!shouldZoom && !shouldPanHorizontally) {
    return camera;
  }

  const mapX = (cursorX - camera.panX) / currentScale;
  const mapY = (cursorY - camera.panY) / currentScale;
  const nextPanX = shouldZoom ? cursorX - mapX * nextScale : camera.panX;
  const nextPanY = shouldZoom ? cursorY - mapY * nextScale : camera.panY;

  return {
    panX: nextPanX - horizontalDelta * WHEEL_PAN_SENSITIVITY,
    panY: nextPanY,
    scale: nextScale,
  };
}

function getWordMapLayout(wordGroups: VisibleWordGroup[], levelGridRows: number) {
  const padding = TILE_BASE_SIZE * TILE_BOARD_PADDING_RATIO;
  const rowCount = Math.max(levelGridRows, 1);
  const tiles: WordTileLayout[] = [];
  let currentY = padding;
  let maxGroupWidth = 0;

  for (const wordGroup of wordGroups) {
    const groupColumns = Math.ceil(wordGroup.words.length / rowCount);
    const groupWidth = groupColumns * TILE_BASE_SIZE;
    maxGroupWidth = Math.max(maxGroupWidth, groupWidth);

    wordGroup.words.forEach((word, index) => {
      const column = Math.floor(index / rowCount);
      const row = index % rowCount;

      tiles.push({
        word,
        x: padding + column * TILE_BASE_SIZE,
        y: currentY + row * TILE_BASE_SIZE,
      });
    });

    currentY += rowCount * TILE_BASE_SIZE;
  }

  return {
    width: padding * 2 + maxGroupWidth,
    height: padding + currentY,
    tiles,
  };
}

function hitTestWordTile(layout: WordMapLayout, camera: MapCamera, viewportX: number, viewportY: number) {
  const scale = Math.max(camera.scale, 0.001);
  const mapX = (viewportX - camera.panX) / scale;
  const mapY = (viewportY - camera.panY) / scale;

  for (let index = layout.tiles.length - 1; index >= 0; index -= 1) {
    const tile = layout.tiles[index];
    if (
      mapX >= tile.x &&
      mapX <= tile.x + TILE_BASE_SIZE &&
      mapY >= tile.y &&
      mapY <= tile.y + TILE_BASE_SIZE
    ) {
      return tile.word;
    }
  }

  return null;
}

function TileButton({
  word,
  meaning,
  status,
  isPulsing,
  onSelect,
  className: extraClassName,
  style,
}: {
  word: HskWord;
  meaning: string;
  status?: WordStatus;
  isPulsing: boolean;
  onSelect: (word: HskWord) => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  const tileLabel = getTileLabel(word.hanzi);
  const className = [
    'word-tile',
    extraClassName,
    status ? `is-${status}` : '',
    isPulsing ? 'status-flash' : '',
  ]
    .filter(Boolean)
    .join(' ');
  const tileStyle = {
    ...style,
    '--tile-font-scale': formatCssNumber(getTileTextScale(tileLabel), 4),
  } as React.CSSProperties;

  return (
    <button
      className={className}
      draggable={false}
      type="button"
      onClick={() => onSelect(word)}
      aria-label={`${word.hanzi}, ${word.pinyin}, ${meaning}`}
      style={tileStyle}
    >
      <span className="tile-hanzi">{tileLabel}</span>
    </button>
  );
}

function drawWordMapCanvas({
  camera,
  context,
  height,
  hoveredWordId,
  layout,
  progress,
  pulseProgress,
  pulsingWordId,
  width,
}: {
  camera: MapCamera;
  context: CanvasRenderingContext2D;
  height: number;
  hoveredWordId: string | null;
  layout: WordMapLayout;
  progress: ProgressMap;
  pulseProgress: number | null;
  pulsingWordId: string | null;
  width: number;
}) {
  const tileSize = TILE_BASE_SIZE * camera.scale;
  const overscan = tileSize * CANVAS_OVERSCAN_TILES;

  context.clearRect(0, 0, width, height);
  context.textAlign = 'center';
  context.textBaseline = 'middle';

  for (const tile of layout.tiles) {
    const status = progress[tile.word.id];
    const palette = status === 'know' ? TILE_COLORS.know : status === 'learning' ? TILE_COLORS.learning : TILE_COLORS.default;
    const isHovered = hoveredWordId === tile.word.id;
    const isPulsing = pulsingWordId === tile.word.id && pulseProgress !== null;
    const pulseScale = isPulsing ? 1 + Math.sin(pulseProgress * Math.PI) * 0.04 : 1;
    const x = camera.panX + tile.x * camera.scale;
    const y = camera.panY + tile.y * camera.scale;
    const drawSize = tileSize * pulseScale;
    const drawX = x - (drawSize - tileSize) / 2;
    const drawY = y - (drawSize - tileSize) / 2;

    if (
      drawX > width + overscan ||
      drawY > height + overscan ||
      drawX + drawSize < -overscan ||
      drawY + drawSize < -overscan
    ) {
      continue;
    }

    if (isHovered || isPulsing) {
      context.shadowColor = isPulsing ? 'rgba(15, 23, 42, 0.18)' : 'rgba(120, 53, 15, 0.24)';
      context.shadowBlur = isPulsing ? 20 : 18;
      context.shadowOffsetY = isPulsing ? 8 : 10;
    } else {
      context.shadowColor = 'transparent';
      context.shadowBlur = 0;
      context.shadowOffsetY = 0;
    }

    context.fillStyle = isHovered ? palette.hoverFill : palette.fill;
    context.fillRect(drawX, drawY, drawSize, drawSize);
    context.shadowColor = 'transparent';
    context.shadowBlur = 0;
    context.shadowOffsetY = 0;
    context.lineWidth = 1;
    context.strokeStyle =
      isHovered && status === undefined ? TILE_COLORS.default.hoverBorder : palette.border;
    context.strokeRect(drawX + 0.5, drawY + 0.5, Math.max(0, drawSize - 1), Math.max(0, drawSize - 1));

    const tileLabel = getTileLabel(tile.word.hanzi);
    const fontSize = drawSize * getTileTextScale(tileLabel);
    if (fontSize < 3 || drawSize < 8) {
      continue;
    }

    const lines = tileLabel.split('\n').filter(Boolean);
    const lineHeight = fontSize * 0.96;
    const firstLineY = drawY + drawSize / 2 - ((lines.length - 1) * lineHeight) / 2;

    context.fillStyle = palette.text;
    context.font = `950 ${fontSize}px Inter, "Segoe UI", sans-serif`;
    lines.forEach((line, index) => {
      context.fillText(line, drawX + drawSize / 2, firstLineY + index * lineHeight);
    });
  }
}

interface CanvasWordMapProps {
  words: HskWord[];
  wordGroups: VisibleWordGroup[];
  progress: ProgressMap;
  pulsingWordId: string | null;
  levelGridRows: number;
  selectedViewLabel: string;
  language: TranslationLanguage;
  onSelectWord: (word: HskWord) => void;
}

function CanvasWordMap({
  words,
  wordGroups,
  progress,
  pulsingWordId,
  levelGridRows,
  selectedViewLabel,
  language,
  onSelectWord,
}: CanvasWordMapProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const mapCameraRef = useRef<MapCamera>({
    panX: 0,
    panY: 0,
    scale: DEFAULT_ZOOM,
  });
  const didDragRef = useRef(false);
  const dragStateRef = useRef<MapDragState>({
    active: false,
    captured: false,
    pointerId: 0,
    startX: 0,
    startY: 0,
    startPanX: 0,
    startPanY: 0,
    didMove: false,
  });
  const pulseStartRef = useRef(0);
  const [mapCamera, setMapCamera] = useState<MapCamera>({
    panX: 0,
    panY: 0,
    scale: DEFAULT_ZOOM,
  });
  const [hoveredWordId, setHoveredWordId] = useState<string | null>(null);
  const [pulseProgress, setPulseProgress] = useState<number | null>(null);
  const [viewportSize, setViewportSize] = useState<MapViewportSize>({ width: 0, height: 0 });
  const layout = useMemo(() => getWordMapLayout(wordGroups, levelGridRows), [levelGridRows, wordGroups]);

  const constrainMapCamera = useCallback(
    (camera: MapCamera) => {
      const viewport = viewportRef.current;
      if (!viewport) {
        return {
          ...camera,
          scale: clampZoom(camera.scale),
        };
      }

      return clampMapCameraToBounds(
        camera,
        viewport.clientWidth,
        viewport.clientHeight,
        layout.width,
        layout.height,
      );
    },
    [layout.height, layout.width],
  );

  const commitMapCamera = useCallback(
    (nextCamera: MapCamera) => {
      const constrainedCamera = constrainMapCamera(nextCamera);
      mapCameraRef.current = constrainedCamera;
      setMapCamera(constrainedCamera);
      return constrainedCamera;
    },
    [constrainMapCamera],
  );

  const getWordFromPointer = useCallback(
    (event: React.PointerEvent<HTMLElement> | React.MouseEvent<HTMLElement>) => {
      const viewport = viewportRef.current;
      if (!viewport) {
        return null;
      }

      const rect = viewport.getBoundingClientRect();
      const viewportX = event.clientX - rect.left - viewport.clientLeft;
      const viewportY = event.clientY - rect.top - viewport.clientTop;

      return hitTestWordTile(layout, mapCameraRef.current, viewportX, viewportY);
    },
    [layout],
  );

  const updateHoveredWord = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const hoveredWord = getWordFromPointer(event);
      const nextHoveredWordId = hoveredWord?.id ?? null;
      setHoveredWordId((current) => (current === nextHoveredWordId ? current : nextHoveredWordId));
    },
    [getWordFromPointer],
  );

  const handleMapWheel = useCallback(
    (event: React.WheelEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const viewport = viewportRef.current;
      if (!viewport) {
        return;
      }

      const rect = viewport.getBoundingClientRect();
      const cursorX = event.clientX - rect.left - viewport.clientLeft;
      const cursorY = event.clientY - rect.top - viewport.clientTop;

      commitMapCamera(
        getWheelAdjustedCamera({
          camera: mapCameraRef.current,
          cursorX,
          cursorY,
          deltaX: event.deltaX,
          deltaY: event.deltaY,
          shiftKey: event.shiftKey,
        }),
      );
    },
    [commitMapCamera],
  );

  const handleMapDragStart = useCallback((event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
  }, []);

  const handleMapPointerDown = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (event.button !== 0) {
      return;
    }

    didDragRef.current = false;
    dragStateRef.current = {
      active: true,
      captured: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startPanX: mapCameraRef.current.panX,
      startPanY: mapCameraRef.current.panY,
      didMove: false,
    };
  }, []);

  const handleMapPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      const dragState = dragStateRef.current;
      if (!dragState.active || dragState.pointerId !== event.pointerId) {
        updateHoveredWord(event);
        return;
      }

      const deltaX = event.clientX - dragState.startX;
      const deltaY = event.clientY - dragState.startY;
      if (Math.abs(deltaX) + Math.abs(deltaY) > 4) {
        dragState.didMove = true;
        didDragRef.current = true;
        setHoveredWordId(null);

        if (!dragState.captured) {
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.classList.add('is-panning');
          dragState.captured = true;
        }
      }

      if (dragState.didMove) {
        event.preventDefault();
        const nextCamera = commitMapCamera({
          ...mapCameraRef.current,
          panX: dragState.startPanX + deltaX,
          panY: dragState.startPanY + deltaY,
        });
        dragState.startX = event.clientX;
        dragState.startY = event.clientY;
        dragState.startPanX = nextCamera.panX;
        dragState.startPanY = nextCamera.panY;
      }
    },
    [commitMapCamera, updateHoveredWord],
  );

  const handleMapPointerEnd = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState.active || dragState.pointerId !== event.pointerId) {
      return;
    }

    dragStateRef.current = { ...dragState, active: false };
    event.currentTarget.classList.remove('is-panning');
    if (dragState.captured && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (dragState.didMove) {
      window.setTimeout(() => {
        didDragRef.current = false;
      }, 0);
    }
  }, []);

  const handleMapPointerLeave = useCallback(() => {
    if (!dragStateRef.current.active) {
      setHoveredWordId(null);
    }
  }, []);

  const handleMapClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (didDragRef.current) {
        event.preventDefault();
        event.stopPropagation();
        didDragRef.current = false;
        return;
      }

      const selectedWord = getWordFromPointer(event);
      if (selectedWord) {
        onSelectWord(selectedWord);
      }
    },
    [getWordFromPointer, onSelectWord],
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return undefined;
    }

    const updateViewportSize = () => {
      setViewportSize({
        width: viewport.clientWidth,
        height: viewport.clientHeight,
      });
    };
    const resizeObserver = new ResizeObserver(updateViewportSize);

    updateViewportSize();
    resizeObserver.observe(viewport);
    window.addEventListener('resize', updateViewportSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateViewportSize);
    };
  }, []);

  useEffect(() => {
    const resetCamera = {
      panX: 0,
      panY: 0,
      scale: DEFAULT_ZOOM,
    };
    mapCameraRef.current = resetCamera;
    setMapCamera(resetCamera);
    setHoveredWordId(null);
  }, [selectedViewLabel]);

  useEffect(() => {
    commitMapCamera(mapCameraRef.current);
  }, [commitMapCamera, viewportSize.height, viewportSize.width]);

  useEffect(() => {
    if (!pulsingWordId) {
      setPulseProgress(null);
      return undefined;
    }

    let animationFrame = 0;
    pulseStartRef.current = performance.now();

    const animatePulse = (timestamp: number) => {
      const nextProgress = Math.min((timestamp - pulseStartRef.current) / 520, 1);
      setPulseProgress(nextProgress);

      if (nextProgress < 1) {
        animationFrame = window.requestAnimationFrame(animatePulse);
      }
    };

    animationFrame = window.requestAnimationFrame(animatePulse);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [pulsingWordId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;
    if (!canvas || !viewport) {
      return;
    }

    const width = viewportSize.width || viewport.clientWidth;
    const height = viewportSize.height || viewport.clientHeight;
    if (!width || !height) {
      return;
    }

    const devicePixelRatio = Math.max(window.devicePixelRatio || 1, 1);
    const canvasWidth = Math.max(1, Math.round(width * devicePixelRatio));
    const canvasHeight = Math.max(1, Math.round(height * devicePixelRatio));
    if (canvas.width !== canvasWidth) {
      canvas.width = canvasWidth;
    }

    if (canvas.height !== canvasHeight) {
      canvas.height = canvasHeight;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    drawWordMapCanvas({
      camera: mapCamera,
      context,
      height,
      hoveredWordId,
      layout,
      progress,
      pulseProgress,
      pulsingWordId,
      width,
    });
  }, [hoveredWordId, layout, mapCamera, progress, pulseProgress, pulsingWordId, viewportSize]);

  return (
    <div
      ref={viewportRef}
      className={hoveredWordId ? 'poster-scroll canvas-word-map has-canvas-hover' : 'poster-scroll canvas-word-map'}
      onClick={handleMapClick}
      onDragStart={handleMapDragStart}
      onPointerCancel={handleMapPointerEnd}
      onPointerDown={handleMapPointerDown}
      onPointerLeave={handleMapPointerLeave}
      onPointerMove={handleMapPointerMove}
      onPointerUp={handleMapPointerEnd}
      onWheel={handleMapWheel}
      aria-label={`${selectedViewLabel} canvas word map`}
      role="region"
    >
      <canvas
        aria-hidden="true"
        className="word-map-canvas"
        ref={canvasRef}
        width={Math.max(1, viewportSize.width)}
        height={Math.max(1, viewportSize.height)}
      />
      <div className="canvas-word-fallback sr-only" aria-label={`${selectedViewLabel} word list`}>
        {words.map((word) => (
          <button
            key={word.id}
            type="button"
            onClick={() => onSelectWord(word)}
            aria-label={`${word.hanzi}, ${word.pinyin}, ${getWordMeaning(word, language)}`}
          >
            {word.hanzi}
          </button>
        ))}
      </div>
    </div>
  );
}

function HanziWriterCard({ hanzi }: { hanzi: string }) {
  const characters = useMemo(() => getWritableCharacters(hanzi), [hanzi]);
  const targetRefs = useRef<Array<HTMLDivElement | null>>([]);
  const writerRefs = useRef<Array<HanziWriter | null>>([]);
  const practiceTargetRef = useRef<HTMLDivElement | null>(null);
  const practiceWriterRef = useRef<HanziWriter | null>(null);
  const advancePracticeTimerRef = useRef(0);
  const [mode, setMode] = useState<WritingMode>('watch');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceResetKey, setPracticeResetKey] = useState(0);
  const [completedCharacters, setCompletedCharacters] = useState<boolean[]>([]);
  const activePracticeCharacter = characters[practiceIndex] ?? characters[0] ?? '';
  const practiceFeedback = useMemo(
    () => getInitialPracticeFeedback(activePracticeCharacter),
    [activePracticeCharacter],
  );
  const [practiceState, setPracticeState] = useState<PracticeFeedback>(practiceFeedback);
  const completedPracticeCount = completedCharacters.filter(Boolean).length;
  const isPracticeComplete = characters.length > 0 && completedPracticeCount === characters.length;

  const animateCharacters = useCallback(async () => {
    for (const writer of writerRefs.current) {
      await writer?.animateCharacter();
    }
  }, []);

  useEffect(() => {
    setMode('watch');
    setLoadError(null);
    setPracticeIndex(0);
    setPracticeResetKey(0);
    setCompletedCharacters(characters.map(() => false));
    setPracticeState(getInitialPracticeFeedback(characters[0] ?? ''));
  }, [characters, hanzi]);

  useEffect(() => {
    setPracticeState(getInitialPracticeFeedback(activePracticeCharacter));
  }, [activePracticeCharacter, practiceResetKey]);

  useEffect(() => {
    if (mode !== 'watch') {
      return undefined;
    }

    setLoadError(null);
    writerRefs.current = [];

    characters.forEach((character, index) => {
      const target = targetRefs.current[index];
      if (!target) {
        return;
      }

      target.replaceChildren();
      writerRefs.current[index] = HanziWriter.create(target, character, {
        width: 112,
        height: 112,
        padding: 8,
        showCharacter: false,
        showOutline: true,
        strokeAnimationSpeed: 1.45,
        delayBetweenStrokes: 260,
        strokeColor: '#0f172a',
        outlineColor: '#cbd5e1',
        radicalColor: '#ef4444',
        highlightColor: '#facc15',
        onLoadCharDataError: () => {
          setLoadError('Stroke data could not be loaded for this character.');
        },
      });
    });

    const animationTimer = window.setTimeout(() => {
      void animateCharacters();
    }, 220);

    return () => {
      window.clearTimeout(animationTimer);
      targetRefs.current.forEach((target) => target?.replaceChildren());
      writerRefs.current = [];
    };
  }, [animateCharacters, characters, mode]);

  useEffect(() => {
    if (mode !== 'practice' || !activePracticeCharacter) {
      return undefined;
    }

    const target = practiceTargetRef.current;
    if (!target) {
      return undefined;
    }

    setLoadError(null);
    target.replaceChildren();
    practiceWriterRef.current = HanziWriter.create(target, activePracticeCharacter, {
      width: 220,
      height: 220,
      padding: 12,
      showCharacter: false,
      showOutline: true,
      drawingColor: '#2563eb',
      drawingWidth: 18,
      strokeColor: '#0f172a',
      outlineColor: '#cbd5e1',
      radicalColor: '#ef4444',
      highlightColor: '#facc15',
      highlightOnComplete: true,
      showHintAfterMisses: 2,
      onLoadCharDataSuccess: (data) => {
        setPracticeState((current) => ({
          ...current,
          currentStroke: data.strokes.length ? 1 : 0,
          totalStrokes: data.strokes.length,
        }));
      },
      onLoadCharDataError: () => {
        setLoadError('Stroke data could not be loaded for this character.');
      },
    });

    void practiceWriterRef.current.quiz({
      showHintAfterMisses: 2,
      onMistake: (strokeData) => {
        const progress = getStrokeProgress(strokeData, false);
        setPracticeState({
          ...progress,
          isComplete: false,
          message: 'Try that stroke again',
          totalMistakes: strokeData.totalMistakes,
        });
      },
      onCorrectStroke: (strokeData) => {
        const progress = getStrokeProgress(strokeData, true);
        setPracticeState({
          ...progress,
          isComplete: false,
          message: 'Good stroke',
          totalMistakes: strokeData.totalMistakes,
        });
      },
      onComplete: (summaryData) => {
        setCompletedCharacters((current) =>
          current.map((isComplete, index) => (index === practiceIndex ? true : isComplete)),
        );
        setPracticeState((current) => ({
          ...current,
          completedStrokes: current.totalStrokes,
          currentStroke: current.totalStrokes,
          isComplete: true,
          message:
            practiceIndex < characters.length - 1
              ? `${summaryData.character} complete`
              : 'Word complete',
          totalMistakes: summaryData.totalMistakes,
        }));

        if (practiceIndex < characters.length - 1) {
          window.clearTimeout(advancePracticeTimerRef.current);
          advancePracticeTimerRef.current = window.setTimeout(() => {
            setPracticeIndex((current) => Math.min(current + 1, characters.length - 1));
          }, 850);
        }
      },
    });

    return () => {
      window.clearTimeout(advancePracticeTimerRef.current);
      practiceWriterRef.current?.cancelQuiz();
      target.replaceChildren();
      practiceWriterRef.current = null;
    };
  }, [activePracticeCharacter, characters.length, mode, practiceIndex, practiceResetKey]);

  const handleModeChange = useCallback(
    (nextMode: WritingMode) => {
      setMode(nextMode);

      if (nextMode === 'practice') {
        setPracticeIndex(0);
        setPracticeResetKey((key) => key + 1);
        setCompletedCharacters(characters.map(() => false));
      }
    },
    [characters],
  );

  const handlePracticeReset = useCallback(() => {
    setPracticeIndex(0);
    setPracticeResetKey((key) => key + 1);
    setCompletedCharacters(characters.map(() => false));
  }, [characters]);

  const handlePracticeHint = useCallback(() => {
    const strokeIndex = Math.max(practiceState.currentStroke - 1, 0);
    void practiceWriterRef.current?.highlightStroke(strokeIndex);
  }, [practiceState.currentStroke]);

  if (!characters.length) {
    return null;
  }

  return (
    <div className={mode === 'practice' ? 'writing-card is-practice' : 'writing-card'}>
      <div className="writing-card-header">
        <p className="writing-kicker">Stroke order</p>
        <div className="writing-card-controls">
          <div className="writing-mode-tabs" role="group" aria-label="Writing mode">
            <button
              className={mode === 'watch' ? 'active' : ''}
              type="button"
              onClick={() => handleModeChange('watch')}
            >
              Watch
            </button>
            <button
              className={mode === 'practice' ? 'active' : ''}
              type="button"
              onClick={() => handleModeChange('practice')}
            >
              Practice
            </button>
          </div>
          {mode === 'watch' ? (
            <button className="writing-replay" type="button" onClick={() => void animateCharacters()}>
              Replay
            </button>
          ) : (
            <button className="writing-replay" type="button" onClick={handlePracticeReset}>
              Reset
            </button>
          )}
        </div>
      </div>

      {mode === 'watch' ? (
        <div className="writing-grid" aria-label={`Stroke order animation for ${hanzi}`}>
          {characters.map((character, index) => (
            <div className="writer-character" key={`${character}-${index}`}>
              <div
                className="writer-target"
                ref={(node) => {
                  targetRefs.current[index] = node;
                }}
                aria-label={`Animated stroke order for ${character}`}
              />
              <span>{character}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="practice-panel">
          <div className="practice-meta">
            <div>
              <span className="practice-word">{hanzi}</span>
              <span className="practice-step">
                Character {practiceIndex + 1} / {characters.length}
              </span>
            </div>
            <div className={practiceState.isComplete ? 'practice-message is-complete' : 'practice-message'}>
              {practiceState.message}
            </div>
          </div>

          <div className="practice-body">
            <div className="practice-target-wrap">
              <div
                className="writer-target practice-target"
                key={`${activePracticeCharacter}-${practiceIndex}-${practiceResetKey}`}
                ref={practiceTargetRef}
                aria-label={`Practice writing ${activePracticeCharacter}`}
              />
            </div>
            <div className="practice-sidebar">
              <div className="practice-character-tabs" role="group" aria-label="Practice character">
                {characters.map((character, index) => (
                  <button
                    className={[
                      index === practiceIndex ? 'active' : '',
                      completedCharacters[index] ? 'complete' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    key={`${character}-${index}`}
                    type="button"
                    onClick={() => setPracticeIndex(index)}
                  >
                    {character}
                  </button>
                ))}
              </div>
              <div className="practice-stats" aria-live="polite">
                <span>
                  Stroke {practiceState.totalStrokes ? practiceState.currentStroke : 0} /{' '}
                  {practiceState.totalStrokes || '-'}
                </span>
                <span>{practiceState.completedStrokes} done</span>
                <span>{practiceState.totalMistakes} mistakes</span>
                <span>
                  {completedPracticeCount} / {characters.length} characters
                </span>
              </div>
              <button
                className="writing-hint"
                disabled={!practiceState.totalStrokes || isPracticeComplete}
                type="button"
                onClick={handlePracticeHint}
              >
                Hint
              </button>
            </div>
          </div>
        </div>
      )}

      {loadError ? <p className="writing-error">{loadError}</p> : null}
    </div>
  );
}

function DetailModal({
  word,
  wordMeaning,
  sentenceMeaning,
  status,
  isAudioPlaying,
  speechMessage,
  speechSupported,
  onClose,
  onSpeak,
  onSetStatus,
  onClearStatus,
}: {
  word: HskWord;
  wordMeaning: string;
  sentenceMeaning: string;
  status?: WordStatus;
  isAudioPlaying: boolean;
  speechMessage: string | null;
  speechSupported: boolean;
  onClose: () => void;
  onSpeak: (word: HskWord) => void;
  onSetStatus: (wordId: string, status: WordStatus) => void;
  onClearStatus: (wordId: string) => void;
}) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [isSentenceExpanded, setIsSentenceExpanded] = useState(false);
  const modalScrollRef = useRef<HTMLDivElement | null>(null);
  const sentenceCardRef = useRef<HTMLDivElement | null>(null);
  const hanziCharacterCount = getModalHanziCharacterCount(word.hanzi);
  const flashcardStyle = {
    '--modal-hanzi-count': hanziCharacterCount,
  } as React.CSSProperties;

  useEffect(() => {
    setIsAnswerVisible(false);
    setIsSentenceExpanded(false);
  }, [word.id]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!isSentenceExpanded) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      const scrollContainer = modalScrollRef.current;
      const sentenceCard = sentenceCardRef.current;

      if (!scrollContainer || !sentenceCard) {
        return;
      }

      const scrollContainerRect = scrollContainer.getBoundingClientRect();
      const sentenceCardRect = sentenceCard.getBoundingClientRect();
      const scrollDistance = sentenceCardRect.bottom - scrollContainerRect.bottom + 24;

      if (scrollDistance > 0) {
        scrollContainer.scrollBy({
          top: scrollDistance,
          behavior: 'smooth',
        });
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [isSentenceExpanded]);

  const audioNote = speechMessage;
  const hasWritingAnimation = WRITING_PRACTICE_LEVELS.has(word.level ?? 1);
  const markForReview = () => {
    onSetStatus(word.id, 'learning');
    onClose();
  };
  const markAsKnown = () => {
    onSetStatus(word.id, 'know');
    onClose();
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <section
        aria-labelledby="word-detail-title"
        aria-modal="true"
        className="word-modal"
        onMouseDown={(event) => event.stopPropagation()}
        onWheel={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="modal-topbar">
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close details">
            <span className="modal-close-mark" aria-hidden="true" />
          </button>
        </div>

        <div className="modal-scroll" ref={modalScrollRef}>
          <h2 className="sr-only" id="word-detail-title">
            {word.hanzi}
          </h2>

          <button
            aria-controls="word-detail-answer"
            aria-expanded={isAnswerVisible}
            className={isAnswerVisible ? 'flashcard-card is-revealed' : 'flashcard-card'}
            onClick={() => setIsAnswerVisible((visible) => !visible)}
            style={flashcardStyle}
            type="button"
          >
            <span className="flashcard-face flashcard-front" aria-hidden={isAnswerVisible}>
              <span className="modal-kicker">HSK {word.level ?? 1} Word</span>
              <span className="modal-hanzi">{word.hanzi}</span>
              <span className="flashcard-cue">Reveal answer</span>
            </span>
            <span className="flashcard-face flashcard-back" aria-hidden={!isAnswerVisible}>
              <span className="modal-kicker">HSK {word.level ?? 1} Word</span>
              <span className="modal-meaning" dir="auto">{wordMeaning}</span>
              <span className="modal-pinyin">{word.pinyin}</span>
              <span className="flashcard-cue">Hide answer</span>
            </span>
          </button>

          <div className={isAnswerVisible ? 'modal-answer is-visible' : 'modal-answer'} id="word-detail-answer">
            {word.examples?.length ? (
              <div className="examples">
                {word.examples.map((example) => (
                  <p key={example}>{example}</p>
                ))}
              </div>
            ) : null}
          </div>

          {hasWritingAnimation ? <HanziWriterCard hanzi={word.hanzi} /> : null}

          {word.exampleSentence ? (
            <div className="sentence-card" ref={sentenceCardRef}>
              <div className="sentence-card-header">
                <p className="sentence-kicker">Example sentence</p>
                <button
                  aria-controls={`sentence-detail-${word.id}`}
                  aria-expanded={isSentenceExpanded}
                  className="sentence-toggle"
                  type="button"
                  onClick={() => setIsSentenceExpanded((expanded) => !expanded)}
                >
                  {isSentenceExpanded ? 'Hide pinyin' : 'Show pinyin'}
                </button>
              </div>
              <p className="sentence-hanzi">{word.exampleSentence.hanzi}</p>
              {isSentenceExpanded ? (
                <div className="sentence-detail" id={`sentence-detail-${word.id}`}>
                  <p className="sentence-pinyin">{word.exampleSentence.pinyin}</p>
                  <p className="sentence-meaning" dir="auto">{sentenceMeaning}</p>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="modal-footer">
          <div className="modal-actions">
            <button
              aria-busy={isAudioPlaying}
              className={isAudioPlaying ? 'audio-button is-playing' : 'audio-button'}
              disabled={!speechSupported}
              type="button"
              onClick={() => onSpeak(word)}
            >
              <span className="audio-button-visualizer" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span>Play audio</span>
            </button>
            <div className={status ? 'modal-status-actions' : 'modal-status-actions is-unmarked'}>
              <button
                className={status === 'learning' ? 'status-action learning active' : 'status-action learning'}
                type="button"
                onClick={markForReview}
              >
                Review Again
              </button>
              <button
                className={status === 'know' ? 'status-action know active' : 'status-action know'}
                type="button"
                onClick={markAsKnown}
              >
                I Know This
              </button>
              {status ? (
                <button className="status-action muted" type="button" onClick={() => onClearStatus(word.id)}>
                  Clear
                </button>
              ) : null}
            </div>
          </div>

          {audioNote ? <p className="speech-note">{audioNote}</p> : null}
        </div>
      </section>
    </div>
  );
}

function ResetProgressDialog({
  label,
  learningCount,
  knownCount,
  totalCount,
  onCancel,
  onConfirm,
}: {
  label: string;
  learningCount: number;
  knownCount: number;
  totalCount: number;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div className="modal-backdrop reset-dialog-backdrop" onMouseDown={onCancel} role="presentation">
      <section
        aria-describedby="reset-progress-description"
        aria-labelledby="reset-progress-title"
        aria-modal="true"
        className="reset-dialog"
        onMouseDown={(event) => event.stopPropagation()}
        onWheel={(event) => event.stopPropagation()}
        role="dialog"
      >
        <p className="reset-dialog-kicker">Reset progress</p>
        <h2 id="reset-progress-title">Saved work will be gone</h2>
        <p id="reset-progress-description">
          Resetting {label} will permanently remove your saved Known and Review marks for this
          study set, including words hidden by search or filters.
        </p>

        <div className="reset-dialog-summary" aria-label={`${label} saved progress summary`}>
          <span>
            <strong>{knownCount}</strong>
            Known
          </span>
          <span>
            <strong>{learningCount}</strong>
            Review
          </span>
          <span>
            <strong>{totalCount}</strong>
            Words affected
          </span>
        </div>

        <p className="reset-dialog-note">This cannot be undone.</p>

        <div className="reset-dialog-actions">
          <button autoFocus className="reset-dialog-cancel" type="button" onClick={onCancel}>
            Keep progress
          </button>
          <button className="reset-dialog-confirm" type="button" onClick={onConfirm}>
            Reset progress
          </button>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [selectedView, setSelectedView] = useState<HskView>('all');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterMode>('all');
  const [language, setLanguage] = useState<TranslationLanguage>(getInitialTranslationLanguage);
  const [selectedWord, setSelectedWord] = useState<HskWord | null>(null);
  const [pulsingWordId, setPulsingWordId] = useState<string | null>(null);
  const [mapCamera, setMapCamera] = useState<MapCamera>({
    panX: 0,
    panY: 0,
    scale: DEFAULT_ZOOM,
  });
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const posterViewportRef = useRef<HTMLDivElement | null>(null);
  const posterBoardRef = useRef<HTMLDivElement | null>(null);
  const mapCameraRef = useRef<MapCamera>({
    panX: 0,
    panY: 0,
    scale: DEFAULT_ZOOM,
  });
  const didDragRef = useRef(false);
  const dragStateRef = useRef({
    active: false,
    captured: false,
    pointerId: 0,
    startX: 0,
    startY: 0,
    startPanX: 0,
    startPanY: 0,
    didMove: false,
  });
  const { progress, setWordStatus, clearWordStatus, resetProgress } = useProgress();
  const {
    isPlaying: isAudioPlaying,
    message: speechMessage,
    preload: preloadSpeechAudio,
    speak: speakMandarin,
    supported: speechSupported,
  } = useMandarinSpeech();
  const words = selectedView === 'all' ? ALL_WORDS : HSK_WORDS_BY_LEVEL[selectedView];
  const selectedViewMeta = VIEW_OPTIONS.find((view) => view.id === selectedView) ?? VIEW_OPTIONS[0];

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const stats = useMemo(() => {
    let known = 0;
    let learning = 0;

    for (const word of words) {
      if (progress[word.id] === 'know') {
        known += 1;
      }

      if (progress[word.id] === 'learning') {
        learning += 1;
      }
    }

    return {
      known,
      learning,
      unmarked: words.length - known - learning,
      total: words.length,
    };
  }, [progress, words]);

  const visibleWords = useMemo(() => {
    if (selectedView === 'all') {
      return [];
    }

    return words.filter((word) => isWordVisible(word, search, filter, progress[word.id], language));
  }, [filter, language, progress, search, selectedView, words]);

  const levelOverview = useMemo(() => {
    return HSK_LEVEL_OPTIONS.map((level) => {
      const levelWords = HSK_WORDS_BY_LEVEL[level.id];
      const visibleWords = levelWords.filter((word) =>
        isWordVisible(word, search, filter, progress[word.id], language),
      );
      let known = 0;
      let learning = 0;

      for (const word of levelWords) {
        if (progress[word.id] === 'know') {
          known += 1;
        }

        if (progress[word.id] === 'learning') {
          learning += 1;
        }
      }

      return {
        level: level.id,
        label: level.label,
        description: level.description,
        total: levelWords.length,
        visibleWords,
        visibleCount: visibleWords.length,
        known,
        learning,
        unmarked: levelWords.length - known - learning,
        accent: LEVEL_ACCENTS[level.id],
        textColor: LEVEL_TEXT_COLORS[level.id],
      };
    });
  }, [filter, language, progress, search]);

  const visibleCount =
    selectedView === 'all'
      ? levelOverview.reduce((count, level) => count + level.visibleCount, 0)
      : visibleWords.length;
  const hasVisibleWords = visibleCount > 0;
  const isModalOpen = Boolean(selectedWord) || isResetDialogOpen;
  const visibleWordGroups = useMemo(
    () => getVisibleWordGroups(selectedView, visibleWords),
    [selectedView, visibleWords],
  );
  const isSplitWordGrid = visibleWordGroups.length > 1;
  const tileBaseSize = TILE_BASE_SIZE;
  const levelGridRows = selectedView === 6 ? 30 : selectedView === 5 ? 24 : 6;
  const shouldUseCanvasMap = selectedView === 5 || selectedView === 6;

  const constrainMapCamera = useCallback((camera: MapCamera) => {
    const viewport = posterViewportRef.current;
    const board = posterBoardRef.current;
    if (!viewport || !board) {
      return camera;
    }

    const scale = clampZoom(camera.scale);
    const renderedTileSize =
      Number.parseFloat(window.getComputedStyle(viewport).getPropertyValue('--tile-size')) ||
      tileBaseSize * mapCameraRef.current.scale;
    const renderedScale = Math.max(renderedTileSize / tileBaseSize, 0.001);
    const contentWidth = board.offsetWidth / renderedScale;
    const contentHeight = board.offsetHeight / renderedScale;

    return clampMapCameraToBounds(
      { ...camera, scale },
      viewport.clientWidth,
      viewport.clientHeight,
      contentWidth,
      contentHeight,
    );
  }, [tileBaseSize]);

  const commitMapCamera = useCallback(
    (nextCamera: MapCamera) => {
      const constrainedCamera = constrainMapCamera(nextCamera);
      mapCameraRef.current = constrainedCamera;
      setMapCamera(constrainedCamera);
      return constrainedCamera;
    },
    [constrainMapCamera],
  );

  const handleSetStatus = useCallback(
    (wordId: string, status: WordStatus) => {
      setWordStatus(wordId, status);
      setPulsingWordId(wordId);
      window.setTimeout(() => setPulsingWordId(null), 520);
    },
    [setWordStatus],
  );

  const handleClearStatus = useCallback(
    (wordId: string) => {
      clearWordStatus(wordId);
      setPulsingWordId(wordId);
      window.setTimeout(() => setPulsingWordId(null), 520);
    },
    [clearWordStatus],
  );

  const handleReset = useCallback(() => {
    setIsResetDialogOpen(true);
  }, []);

  const handleCancelReset = useCallback(() => {
    setIsResetDialogOpen(false);
  }, []);

  const handleConfirmReset = useCallback(() => {
    resetProgress(words.map((word) => word.id));
    setIsResetDialogOpen(false);
  }, [resetProgress, words]);

  const handleSpeak = useCallback(
    (word: HskWord) => {
      speakMandarin(word.hanzi, getWordAudioSrc(word));
    },
    [speakMandarin],
  );

  const handleMapWheel = useCallback(
    (event: React.WheelEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const viewport = event.currentTarget;
      const rect = viewport.getBoundingClientRect();
      const cursorX = event.clientX - rect.left - viewport.clientLeft;
      const cursorY = event.clientY - rect.top - viewport.clientTop;

      commitMapCamera(
        getWheelAdjustedCamera({
          camera: mapCameraRef.current,
          cursorX,
          cursorY,
          deltaX: event.deltaX,
          deltaY: event.deltaY,
          shiftKey: event.shiftKey,
        }),
      );
    },
    [commitMapCamera],
  );

  const handleMapDragStart = useCallback((event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
  }, []);

  const handleMapPointerDown = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (event.button !== 0) {
      return;
    }

    dragStateRef.current = {
      active: true,
      captured: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startPanX: mapCameraRef.current.panX,
      startPanY: mapCameraRef.current.panY,
      didMove: false,
    };
  }, []);

  const handleMapPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState.active || dragState.pointerId !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    const deltaY = event.clientY - dragState.startY;
    if (Math.abs(deltaX) + Math.abs(deltaY) > 4) {
      dragState.didMove = true;
      didDragRef.current = true;

      if (!dragState.captured) {
        event.currentTarget.setPointerCapture(event.pointerId);
        event.currentTarget.classList.add('is-panning');
        dragState.captured = true;
      }
    }

    if (dragState.didMove) {
      event.preventDefault();
      const nextCamera = commitMapCamera({
        ...mapCameraRef.current,
        panX: dragState.startPanX + deltaX,
        panY: dragState.startPanY + deltaY,
      });
      dragState.startX = event.clientX;
      dragState.startY = event.clientY;
      dragState.startPanX = nextCamera.panX;
      dragState.startPanY = nextCamera.panY;
    }
  }, [commitMapCamera]);

  const handleMapPointerEnd = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState.active || dragState.pointerId !== event.pointerId) {
      return;
    }

    dragStateRef.current = { ...dragState, active: false };
    event.currentTarget.classList.remove('is-panning');
    if (dragState.captured && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (dragState.didMove) {
      window.setTimeout(() => {
        didDragRef.current = false;
      }, 0);
    }
  }, []);

  const handleMapClickCapture = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (!didDragRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    didDragRef.current = false;
  }, []);

  useEffect(() => {
    if (!selectedWord) {
      return;
    }

    const latestWord = words.find((word) => word.id === selectedWord.id);
    if (latestWord) {
      setSelectedWord(latestWord);
      return;
    }

    setSelectedWord(null);
  }, [progress, selectedWord, words]);

  useEffect(() => {
    preloadSpeechAudio(selectedWord ? getWordAudioSrc(selectedWord) : undefined);
  }, [preloadSpeechAudio, selectedWord]);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [isModalOpen]);

  useEffect(() => {
    const resetCamera = {
      panX: 0,
      panY: 0,
      scale: DEFAULT_ZOOM,
    };
    mapCameraRef.current = resetCamera;
    setMapCamera(resetCamera);
  }, [selectedView]);

  useEffect(() => {
    commitMapCamera(mapCameraRef.current);
  }, [commitMapCamera, levelGridRows, visibleCount]);

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Classic HSK 1-6 word maps</p>
          <h1>
            {selectedView === 'all'
              ? 'All HSK Level Overview'
              : `${selectedViewMeta.label} Tile Map`}
          </h1>
        </div>
        <div className="progress-card" aria-label="Progress summary">
          <div>
            <span className="progress-number">{stats.known}</span>
            <span className="progress-label">Known</span>
          </div>
          <div>
            <span className="progress-number">{stats.learning}</span>
            <span className="progress-label">Review</span>
          </div>
          <div>
            <span className="progress-number">{stats.unmarked}</span>
            <span className="progress-label">Unmarked</span>
          </div>
        </div>
      </header>

      <section className="toolbar" aria-label="Map controls">
        <div className="level-tabs" role="group" aria-label="HSK level">
          {VIEW_OPTIONS.map((view) => (
            <button
              className={selectedView === view.id ? 'active' : ''}
              key={view.id}
              type="button"
              onClick={() => {
                setSelectedView(view.id);
                setSelectedWord(null);
              }}
            >
              <span>{view.label}</span>
              <small>{view.description}</small>
            </button>
          ))}
        </div>

        <label className="search-field">
          <span>Search</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Chinese, pinyin, or translation"
          />
        </label>

        <div className="filter-tabs" role="group" aria-label="Progress filter">
          {FILTERS.map((item) => (
            <button
              className={filter === item.id ? 'active' : ''}
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="language-tabs" role="group" aria-label="Translation language">
          {LANGUAGE_OPTIONS.map((item) => (
            <button
              className={language === item.id ? 'active' : ''}
              key={item.id}
              type="button"
              onClick={() => setLanguage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="toolbar-meta">
          <span>
            {visibleCount} / {stats.total} shown
          </span>
          <button className="reset-button" type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </section>

      {selectedView === 'all' ? (
        hasVisibleWords ? (
          <section className="level-overview" aria-label="All HSK level overview">
            {levelOverview.map((level) => (
              <article
                className={level.visibleCount ? 'level-card' : 'level-card is-empty'}
                key={level.level}
                style={
                  {
                    '--cluster-accent': level.accent,
                    '--level-text': level.textColor,
                  } as React.CSSProperties
                }
              >
                <button
                  className="level-card-main"
                  disabled={!level.visibleCount}
                  type="button"
                  onClick={() => {
                    setSelectedView(level.level);
                    setSelectedWord(null);
                  }}
                >
                  <span className="level-card-kicker">{level.description}</span>
                  <span className="level-card-title">HSK {level.level}</span>
                  <span className="level-card-count">
                    {level.visibleCount} / {level.total} shown
                  </span>
                </button>

                <div className="level-progress" aria-label={`HSK ${level.level} progress`}>
                  <span style={{ width: `${(level.known / level.total) * 100}%` }} />
                  <span style={{ width: `${(level.learning / level.total) * 100}%` }} />
                </div>

                <div className="level-card-stats">
                  <span>{level.known} know</span>
                  <span>{level.learning} learning</span>
                  <span>{level.unmarked} unmarked</span>
                </div>

                {level.visibleWords.length ? (
                  <div className="level-word-preview" aria-label={`HSK ${level.level} matching words`}>
                    {level.visibleWords.slice(0, 10).map((word) => (
                      <button
                        className={progress[word.id] ? `preview-word is-${progress[word.id]}` : 'preview-word'}
                        key={word.id}
                        type="button"
                        onClick={() => setSelectedWord(word)}
                      >
                        {getTileLabel(word.hanzi)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="level-empty-note">No matches in this level.</p>
                )}
              </article>
            ))}
          </section>
        ) : (
          <div className="empty-state">
            <h2>No words match this view.</h2>
            <p>Try a different search or progress filter.</p>
          </div>
        )
      ) : (
        <section className="map-shell" aria-label={`${selectedViewMeta.label} word map`}>
          {shouldUseCanvasMap && hasVisibleWords ? (
            <CanvasWordMap
              language={language}
              levelGridRows={levelGridRows}
              onSelectWord={setSelectedWord}
              progress={progress}
              pulsingWordId={pulsingWordId}
              selectedViewLabel={selectedViewMeta.label}
              wordGroups={visibleWordGroups}
              words={visibleWords}
            />
          ) : (
            <div
              ref={posterViewportRef}
              className="poster-scroll"
              onClickCapture={handleMapClickCapture}
              onDragStart={handleMapDragStart}
              onPointerCancel={handleMapPointerEnd}
              onPointerDown={handleMapPointerDown}
              onPointerMove={handleMapPointerMove}
              onPointerUp={handleMapPointerEnd}
              onWheel={handleMapWheel}
              aria-label={`${selectedViewMeta.label} scrollable word map`}
              role="region"
              style={
                {
                  '--map-pan-x': formatPixelValue(mapCamera.panX),
                  '--map-pan-y': formatPixelValue(mapCamera.panY),
                  '--tile-size': formatPixelValue(tileBaseSize * mapCamera.scale),
                } as React.CSSProperties
              }
            >
              {hasVisibleWords ? (
                <div className="poster-zoom-space">
                  <div
                    className={isSplitWordGrid ? 'poster-board is-split-word-grid' : 'poster-board'}
                    ref={posterBoardRef}
                  >
                    {visibleWordGroups.map((wordGroup, groupIndex) => (
                      <div
                        className="tile-grid level-word-grid"
                        aria-label={
                          isSplitWordGrid
                            ? `${selectedViewMeta.label} words ${wordGroup.startIndex + 1}-${
                                wordGroup.startIndex + wordGroup.words.length
                              }`
                            : selectedViewMeta.label
                        }
                        key={`${selectedViewMeta.label}-${groupIndex}`}
                        style={
                          {
                            '--level-rows': levelGridRows,
                          } as React.CSSProperties
                        }
                      >
                        {wordGroup.words.map((word) => (
                          <TileButton
                            isPulsing={pulsingWordId === word.id}
                            key={word.id}
                            meaning={getWordMeaning(word, language)}
                            onSelect={setSelectedWord}
                            status={progress[word.id]}
                            word={word}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="empty-state">
                  <h2>No words match this view.</h2>
                  <p>Try a different search or progress filter.</p>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {isResetDialogOpen ? (
        <ResetProgressDialog
          label={selectedViewMeta.label}
          knownCount={stats.known}
          learningCount={stats.learning}
          onCancel={handleCancelReset}
          onConfirm={handleConfirmReset}
          totalCount={stats.total}
        />
      ) : null}

      {selectedWord ? (
        <DetailModal
          onClearStatus={handleClearStatus}
          onClose={() => setSelectedWord(null)}
          onSetStatus={handleSetStatus}
          onSpeak={handleSpeak}
          isAudioPlaying={isAudioPlaying}
          sentenceMeaning={getSentenceMeaning(selectedWord, language)}
          speechMessage={speechMessage}
          speechSupported={speechSupported}
          status={progress[selectedWord.id]}
          word={selectedWord}
          wordMeaning={getWordMeaning(selectedWord, language)}
        />
      ) : null}
    </main>
  );
}

export default App;

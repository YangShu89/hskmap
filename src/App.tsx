import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import HanziWriter, { type StrokeData } from 'hanzi-writer';
import {
  HSK_LEVEL_OPTIONS,
  HSK_LEVEL_WORD_COUNTS,
  HSK_LEVELS,
} from './data/hskMetadata';
import { loadHskLevels } from './data/hskLoaders';
import {
  getAvailableLocalizedLevels,
  loadLocalizedMeanings,
  type LocalizedLanguage,
  type LoadedLocalizedMeanings,
  type TranslationLanguage,
} from './data/translationLoaders';
import { useMandarinSpeech } from './hooks/useMandarinSpeech';
import { useProgress } from './hooks/useProgress';
import {
  captureAnalyticsEvent,
  captureAnalyticsPageView,
  type AnalyticsProperties,
} from './analytics';
import {
  SEO_LOCALES,
  getAppRouteFromPath,
  getLocalizedSeoGuide,
  getLocalizedPath,
  getLocaleByLanguage,
  type HskView,
} from './seo';
import type { HskLevel, HskWord, ProgressMap, WordStatus } from './types';
import { getUiCopy, type UiCopy } from './uiCopy';

type FilterMode = 'all' | 'learning' | 'know' | 'unmarked';
type FlashcardPromptMode = 'chinese' | 'translation';
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

interface MapPointerPosition {
  clientX: number;
  clientY: number;
}

interface MapPinchState {
  centerX: number;
  centerY: number;
  startDistance: number;
  startPanX: number;
  startPanY: number;
  startScale: number;
}

interface PracticeFeedback {
  completedStrokes: number;
  currentStroke: number;
  isComplete: boolean;
  message: string;
  totalMistakes: number;
  totalStrokes: number;
}

type NavigatorWithConnection = Navigator & {
  connection?: {
    addEventListener?: (type: 'change', listener: () => void) => void;
    removeEventListener?: (type: 'change', listener: () => void) => void;
    saveData?: boolean;
  };
};

const DEFAULT_ZOOM = 1;
const MIN_ZOOM = 0.04;
const MAX_ZOOM = 36;
const ZOOM_SENSITIVITY = 0.0015;
const WHEEL_DELTA_THRESHOLD = 0.5;
const WHEEL_PAN_SENSITIVITY = 1;
const TILE_BASE_SIZE = 74;
const TILE_BOARD_PADDING_RATIO = 0.324;
const MIN_VISIBLE_MAP_EDGE = 96;
const HSK4_WORD_MAP_SPLIT_INDEX = 300;
const CANVAS_OVERSCAN_TILES = 2;
const HOVER_WARMUP_DWELL_MS = 120;
const HOVER_WARMUP_MEDIA_QUERY = '(hover: hover) and (pointer: fine)';
const ALL_WORD_COUNT = HSK_LEVELS.reduce(
  (count, level) => count + HSK_LEVEL_WORD_COUNTS[level],
  0,
);
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
const FILTERS: { id: FilterMode }[] = [
  { id: 'all' },
  { id: 'learning' },
  { id: 'know' },
  { id: 'unmarked' },
];
const FLASHCARD_PROMPT_MODES: { id: FlashcardPromptMode }[] = [
  { id: 'chinese' },
  { id: 'translation' },
];
const FLASHCARD_PROMPT_MODE_STORAGE_KEY = 'hsk-flashcard-prompt-mode';
const LANGUAGE_STORAGE_KEY = 'hsk-translation-language';
const LANGUAGE_OPTIONS = SEO_LOCALES;
const WRITING_PRACTICE_LEVELS = new Set<HskLevel>([1, 2, 3, 4, 5, 6]);

function isDesktopHoverWarmupEnabled() {
  if (typeof window === 'undefined') {
    return false;
  }

  if ((navigator as NavigatorWithConnection).connection?.saveData === true) {
    return false;
  }

  return window.matchMedia(HOVER_WARMUP_MEDIA_QUERY).matches;
}

function useDesktopHoverWarmupEnabled() {
  const [isEnabled, setIsEnabled] = useState(isDesktopHoverWarmupEnabled);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(HOVER_WARMUP_MEDIA_QUERY);
    const legacyMediaQuery = mediaQuery as MediaQueryList & {
      addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
      removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
    };
    const connection = (navigator as NavigatorWithConnection).connection;
    const sync = () => setIsEnabled(isDesktopHoverWarmupEnabled());

    sync();
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', sync);
    } else {
      legacyMediaQuery.addListener?.(sync);
    }
    connection?.addEventListener?.('change', sync);

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', sync);
      } else {
        legacyMediaQuery.removeListener?.(sync);
      }
      connection?.removeEventListener?.('change', sync);
    };
  }, []);

  return isEnabled;
}

function useWordHoverWarmup({
  enabled,
  onWarmup,
}: {
  enabled: boolean;
  onWarmup: (word: HskWord) => void;
}) {
  const timerRef = useRef<number | null>(null);
  const pendingWordIdRef = useRef<string | null>(null);

  const cancel = useCallback((wordOrId?: HskWord | string | null) => {
    const targetWordId = typeof wordOrId === 'string' ? wordOrId : wordOrId?.id ?? null;
    if (targetWordId && pendingWordIdRef.current !== targetWordId) {
      return;
    }

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    pendingWordIdRef.current = null;
  }, []);

  const schedule = useCallback(
    (word: HskWord) => {
      if (!enabled || typeof window === 'undefined') {
        return;
      }

      if (pendingWordIdRef.current === word.id) {
        return;
      }

      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }

      pendingWordIdRef.current = word.id;
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        pendingWordIdRef.current = null;
        onWarmup(word);
      }, HOVER_WARMUP_DWELL_MS);
    },
    [enabled, onWarmup],
  );

  useEffect(() => {
    if (!enabled) {
      cancel();
    }
  }, [cancel, enabled]);

  useEffect(
    () => () => {
      cancel();
    },
    [cancel],
  );

  return { cancel, schedule };
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\u00fc/g, 'u:')
    .replace(/v/g, 'u:');
}

function getInitialAppRoute() {
  if (typeof window === 'undefined') {
    return getAppRouteFromPath('/');
  }

  return getAppRouteFromPath(window.location.pathname);
}

function getInitialSelectedView(): HskView {
  return getInitialAppRoute().view;
}

function getInitialTranslationLanguage(): TranslationLanguage {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const initialRoute = getInitialAppRoute();
  if (initialRoute.isLocalizedRoute) {
    return initialRoute.language;
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return LANGUAGE_OPTIONS.some((option) => option.id === storedLanguage)
    ? (storedLanguage as TranslationLanguage)
    : 'en';
}

function shouldHandleRouteClick(event: React.MouseEvent<HTMLElement>) {
  return !(event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey);
}

function isIgnoredMapPanTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest('[data-map-pan-ignore="true"]'));
}

function getInitialFlashcardPromptMode(): FlashcardPromptMode {
  if (typeof window === 'undefined') {
    return 'chinese';
  }

  const storedMode = window.localStorage.getItem(FLASHCARD_PROMPT_MODE_STORAGE_KEY);
  return storedMode === 'translation' ? 'translation' : 'chinese';
}

function getWordMeaning(
  word: HskWord,
  language: TranslationLanguage,
  localizedMeanings?: LoadedLocalizedMeanings,
) {
  if (language !== 'en' && word.level) {
    return localizedMeanings?.[word.level]?.[language]?.words[word.id] ?? word.meaning;
  }

  return word.meaning;
}

function getSentenceMeaning(
  word: HskWord,
  language: TranslationLanguage,
  localizedMeanings?: LoadedLocalizedMeanings,
) {
  if (!word.exampleSentence) {
    return '';
  }

  if (language !== 'en' && word.level) {
    return localizedMeanings?.[word.level]?.[language]?.sentences[word.id] ?? word.exampleSentence.meaning;
  }

  return word.exampleSentence.meaning;
}

function getSearchableMeaning(
  word: HskWord,
  language: TranslationLanguage,
  localizedMeanings?: LoadedLocalizedMeanings,
) {
  const localizedMeaning = getWordMeaning(word, language, localizedMeanings);
  return localizedMeaning === word.meaning ? word.meaning : `${word.meaning} ${localizedMeaning}`;
}

function isWordVisible(
  word: HskWord,
  search: string,
  filter: FilterMode,
  status: WordStatus | undefined,
  language: TranslationLanguage,
  localizedMeanings?: LoadedLocalizedMeanings,
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

  const haystack = normalize(
    `${word.hanzi} ${word.pinyin} ${getSearchableMeaning(word, language, localizedMeanings)}`,
  );
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

function LocalizedSeoGuide({
  language,
  onNavigate,
  view,
}: {
  language: TranslationLanguage;
  onNavigate: (view: HskView) => void;
  view: HskView;
}) {
  const guide = getLocalizedSeoGuide(language, view);
  const locale = getLocaleByLanguage(language);
  const tableLabels = guide.tableLabels;

  return (
    <section className="hsk-guide" aria-labelledby="hsk-guide-title">
      <p className="hsk-guide-eyebrow">{guide.eyebrow}</p>
      <h2 id="hsk-guide-title">{guide.title}</h2>
      <p className="hsk-guide-intro">{guide.intro}</p>

      {guide.rows ? (
        <div className="hsk-guide-table-wrap">
          <table className="hsk-guide-table">
            <thead>
              <tr>
                <th>{tableLabels?.level}</th>
                <th>{tableLabels?.wordsAdded}</th>
                <th>{tableLabels?.cumulativeWords}</th>
                <th>{tableLabels?.studyFocus}</th>
              </tr>
            </thead>
            <tbody>
              {guide.rows.map((row) => (
                <tr key={row.level}>
                  <td>
                    <a
                      href={getLocalizedPath(language, row.level)}
                      onClick={(event) => {
                        if (!shouldHandleRouteClick(event)) {
                          return;
                        }

                        event.preventDefault();
                        onNavigate(row.level);
                      }}
                    >
                      {row.label}
                    </a>
                  </td>
                  <td>{row.newWords.toLocaleString(locale.htmlLang)}</td>
                  <td>{row.cumulativeWords.toLocaleString(locale.htmlLang)}</td>
                  <td>{row.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <div className="hsk-guide-sections">
        {guide.sections.map((section) => (
          <article className="hsk-guide-section" key={section.title}>
            <h3>{section.title}</h3>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.items ? (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>

      <div className="hsk-guide-faq" aria-label={guide.faqLabel}>
        {guide.faqs.map((faq) => (
          <article className="hsk-guide-faq-item" key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
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

function getAnalyticsView(view: HskView) {
  return view === 'all' ? 'all' : `hsk-${view}`;
}

function getRouteAnalyticsProperties(language: TranslationLanguage, view: HskView): AnalyticsProperties {
  return {
    hsk_view: getAnalyticsView(view),
    language,
  };
}

function getWordAnalyticsProperties(
  word: HskWord,
  language: TranslationLanguage,
  view: HskView,
): AnalyticsProperties {
  return {
    ...getRouteAnalyticsProperties(language, view),
    cluster: word.cluster,
    has_audio: Boolean(getWordAudioSrc(word)),
    has_example_sentence: Boolean(word.exampleSentence),
    word_id: word.id,
    word_level: word.level ?? null,
  };
}

function getWritableCharacters(hanzi: string) {
  return Array.from(hanzi).filter((character) => /[\u3400-\u9fff]/u.test(character));
}

function getInitialPracticeFeedback(character: string, ui: UiCopy): PracticeFeedback {
  return {
    completedStrokes: 0,
    currentStroke: 1,
    isComplete: false,
    message: ui.writing.writeCharacter(character),
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

function getPointerDistance(firstPointer: MapPointerPosition, secondPointer: MapPointerPosition) {
  return Math.hypot(firstPointer.clientX - secondPointer.clientX, firstPointer.clientY - secondPointer.clientY);
}

function getPointerPair(activePointers: Map<number, MapPointerPosition>) {
  const pointerPair = Array.from(activePointers.values()).slice(0, 2);
  return pointerPair.length === 2 ? pointerPair : null;
}

function getViewportCenter(
  viewport: HTMLElement,
  firstPointer: MapPointerPosition,
  secondPointer: MapPointerPosition,
) {
  const rect = viewport.getBoundingClientRect();

  return {
    x: (firstPointer.clientX + secondPointer.clientX) / 2 - rect.left - viewport.clientLeft,
    y: (firstPointer.clientY + secondPointer.clientY) / 2 - rect.top - viewport.clientTop,
  };
}

function getPinchAdjustedCamera({
  currentCenterX,
  currentCenterY,
  currentDistance,
  pinch,
}: {
  currentCenterX: number;
  currentCenterY: number;
  currentDistance: number;
  pinch: MapPinchState;
}) {
  if (pinch.startDistance <= 0) {
    return {
      panX: pinch.startPanX,
      panY: pinch.startPanY,
      scale: pinch.startScale,
    };
  }

  const startScale = Math.max(pinch.startScale, 0.001);
  const nextScale = clampZoom(startScale * (currentDistance / pinch.startDistance));
  const mapX = (pinch.centerX - pinch.startPanX) / startScale;
  const mapY = (pinch.centerY - pinch.startPanY) / startScale;

  return {
    panX: currentCenterX - mapX * nextScale,
    panY: currentCenterY - mapY * nextScale,
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
  onFocusIntent,
  onHoverEnd,
  onHoverStart,
  onPointerIntent,
  onSelect,
  className: extraClassName,
  style,
}: {
  word: HskWord;
  meaning: string;
  status?: WordStatus;
  isPulsing: boolean;
  onFocusIntent: (word: HskWord) => void;
  onHoverEnd: (word: HskWord) => void;
  onHoverStart: (word: HskWord) => void;
  onPointerIntent: (word: HskWord) => void;
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
      onBlur={() => onHoverEnd(word)}
      onFocus={() => onFocusIntent(word)}
      onMouseEnter={() => onHoverStart(word)}
      onMouseLeave={() => onHoverEnd(word)}
      onPointerDown={() => onPointerIntent(word)}
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
  hoverWarmupEnabled: boolean;
  words: HskWord[];
  wordGroups: VisibleWordGroup[];
  progress: ProgressMap;
  pulsingWordId: string | null;
  levelGridRows: number;
  selectedViewLabel: string;
  language: TranslationLanguage;
  localizedMeanings: LoadedLocalizedMeanings;
  ui: UiCopy;
  onFocusIntentWord: (word: HskWord) => void;
  onHoverWarmupWord: (word: HskWord) => void;
  onPointerIntentWord: (word: HskWord) => void;
  onSelectWord: (word: HskWord) => void;
}

function CanvasWordMap({
  hoverWarmupEnabled,
  words,
  wordGroups,
  progress,
  pulsingWordId,
  levelGridRows,
  selectedViewLabel,
  language,
  localizedMeanings,
  ui,
  onFocusIntentWord,
  onHoverWarmupWord,
  onPointerIntentWord,
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
  const activePointersRef = useRef(new Map<number, MapPointerPosition>());
  const pinchStateRef = useRef<MapPinchState | null>(null);
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
  const wordsById = useMemo(() => new Map(words.map((word) => [word.id, word])), [words]);
  const { cancel: cancelHoverWarmup, schedule: scheduleHoverWarmup } = useWordHoverWarmup({
    enabled: hoverWarmupEnabled,
    onWarmup: onHoverWarmupWord,
  });

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

  const startPinchGesture = useCallback((viewport: HTMLElement) => {
    const pointerPair = getPointerPair(activePointersRef.current);
    if (!pointerPair) {
      return false;
    }

    const [firstPointer, secondPointer] = pointerPair;
    const center = getViewportCenter(viewport, firstPointer, secondPointer);
    const startDistance = getPointerDistance(firstPointer, secondPointer);
    if (startDistance <= 0) {
      return false;
    }

    pinchStateRef.current = {
      centerX: center.x,
      centerY: center.y,
      startDistance,
      startPanX: mapCameraRef.current.panX,
      startPanY: mapCameraRef.current.panY,
      startScale: mapCameraRef.current.scale,
    };
    dragStateRef.current = {
      ...dragStateRef.current,
      active: false,
      captured: false,
      didMove: false,
    };
    didDragRef.current = true;
    setHoveredWordId(null);
    viewport.classList.add('is-panning');
    return true;
  }, []);

  const handleMapPointerDown = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (event.button !== 0 || isIgnoredMapPanTarget(event.target)) {
      return;
    }

    const intentWord = getWordFromPointer(event);
    if (intentWord) {
      onPointerIntentWord(intentWord);
    }

    activePointersRef.current.set(event.pointerId, {
      clientX: event.clientX,
      clientY: event.clientY,
    });

    if (activePointersRef.current.size >= 2 && startPinchGesture(event.currentTarget)) {
      event.preventDefault();
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
  }, [getWordFromPointer, onPointerIntentWord, startPinchGesture]);

  const handleMapPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (activePointersRef.current.has(event.pointerId)) {
        activePointersRef.current.set(event.pointerId, {
          clientX: event.clientX,
          clientY: event.clientY,
        });
      }

      if (activePointersRef.current.size >= 2) {
        const pointerPair = getPointerPair(activePointersRef.current);
        if (!pointerPair) {
          return;
        }

        if (!pinchStateRef.current && !startPinchGesture(event.currentTarget)) {
          return;
        }

        const pinch = pinchStateRef.current;
        if (!pinch) {
          return;
        }

        const [firstPointer, secondPointer] = pointerPair;
        const currentCenter = getViewportCenter(event.currentTarget, firstPointer, secondPointer);
        event.preventDefault();
        didDragRef.current = true;
        setHoveredWordId(null);
        commitMapCamera(
          getPinchAdjustedCamera({
            currentCenterX: currentCenter.x,
            currentCenterY: currentCenter.y,
            currentDistance: getPointerDistance(firstPointer, secondPointer),
            pinch,
          }),
        );
        return;
      }

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
    [commitMapCamera, startPinchGesture, updateHoveredWord],
  );

  const handleMapPointerEnd = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const wasPinching = Boolean(pinchStateRef.current);
    activePointersRef.current.delete(event.pointerId);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (wasPinching) {
      if (activePointersRef.current.size < 2) {
        pinchStateRef.current = null;
        dragStateRef.current = {
          ...dragStateRef.current,
          active: false,
          captured: false,
          didMove: false,
        };
        event.currentTarget.classList.remove('is-panning');
        window.setTimeout(() => {
          didDragRef.current = false;
        }, 0);
      }
      return;
    }

    const dragState = dragStateRef.current;
    if (!dragState.active || dragState.pointerId !== event.pointerId) {
      return;
    }

    dragStateRef.current = { ...dragState, active: false };
    event.currentTarget.classList.remove('is-panning');
    if (dragState.didMove) {
      window.setTimeout(() => {
        didDragRef.current = false;
      }, 0);
    }
  }, []);

  const handleMapPointerLeave = useCallback(() => {
    if (!dragStateRef.current.active && !pinchStateRef.current) {
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
    activePointersRef.current.clear();
    pinchStateRef.current = null;
  }, [selectedViewLabel]);

  useEffect(() => {
    if (!hoverWarmupEnabled || dragStateRef.current.active || pinchStateRef.current) {
      cancelHoverWarmup();
      return undefined;
    }

    const hoveredWord = hoveredWordId ? wordsById.get(hoveredWordId) ?? null : null;
    if (!hoveredWord) {
      cancelHoverWarmup();
      return undefined;
    }

    scheduleHoverWarmup(hoveredWord);
    return () => {
      cancelHoverWarmup(hoveredWord.id);
    };
  }, [cancelHoverWarmup, hoverWarmupEnabled, hoveredWordId, scheduleHoverWarmup, wordsById]);

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
      aria-label={ui.canvasWordMap(selectedViewLabel)}
      role="region"
    >
      <canvas
        aria-hidden="true"
        className="word-map-canvas"
        ref={canvasRef}
        width={Math.max(1, viewportSize.width)}
        height={Math.max(1, viewportSize.height)}
      />
      <div className="canvas-word-fallback sr-only" aria-label={ui.wordList(selectedViewLabel)}>
        {words.map((word) => (
          <button
            key={word.id}
            type="button"
            onFocus={() => onFocusIntentWord(word)}
            onPointerDown={() => onPointerIntentWord(word)}
            onClick={() => onSelectWord(word)}
            aria-label={`${word.hanzi}, ${word.pinyin}, ${getWordMeaning(word, language, localizedMeanings)}`}
          >
            {word.hanzi}
          </button>
        ))}
      </div>
    </div>
  );
}

function HanziWriterCard({
  hanzi,
  ui,
  onWritingPracticeComplete,
  onWritingPracticeHint,
  onWritingPracticeStart,
  onWritingReplay,
}: {
  hanzi: string;
  ui: UiCopy;
  onWritingPracticeComplete?: () => void;
  onWritingPracticeHint?: () => void;
  onWritingPracticeStart?: () => void;
  onWritingReplay?: () => void;
}) {
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
    () => getInitialPracticeFeedback(activePracticeCharacter, ui),
    [activePracticeCharacter, ui],
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
    setPracticeState(getInitialPracticeFeedback(characters[0] ?? '', ui));
  }, [characters, hanzi, ui]);

  useEffect(() => {
    setPracticeState(getInitialPracticeFeedback(activePracticeCharacter, ui));
  }, [activePracticeCharacter, practiceResetKey, ui]);

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
          setLoadError(ui.writing.strokeDataError);
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
        setLoadError(ui.writing.strokeDataError);
      },
    });

    void practiceWriterRef.current.quiz({
      showHintAfterMisses: 2,
      onMistake: (strokeData) => {
        const progress = getStrokeProgress(strokeData, false);
        setPracticeState({
          ...progress,
          isComplete: false,
          message: ui.writing.tryStrokeAgain,
          totalMistakes: strokeData.totalMistakes,
        });
      },
      onCorrectStroke: (strokeData) => {
        const progress = getStrokeProgress(strokeData, true);
        setPracticeState({
          ...progress,
          isComplete: false,
          message: ui.writing.goodStroke,
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
              ? ui.writing.characterComplete(summaryData.character)
              : ui.writing.wordComplete,
          totalMistakes: summaryData.totalMistakes,
        }));

        if (practiceIndex < characters.length - 1) {
          window.clearTimeout(advancePracticeTimerRef.current);
          advancePracticeTimerRef.current = window.setTimeout(() => {
            setPracticeIndex((current) => Math.min(current + 1, characters.length - 1));
          }, 850);
        } else {
          onWritingPracticeComplete?.();
        }
      },
    });

    return () => {
      window.clearTimeout(advancePracticeTimerRef.current);
      practiceWriterRef.current?.cancelQuiz();
      target.replaceChildren();
      practiceWriterRef.current = null;
    };
  }, [
    activePracticeCharacter,
    characters.length,
    mode,
    onWritingPracticeComplete,
    practiceIndex,
    practiceResetKey,
    ui,
  ]);

  const handleModeChange = useCallback(
    (nextMode: WritingMode) => {
      setMode(nextMode);

      if (nextMode === 'practice') {
        setPracticeIndex(0);
        setPracticeResetKey((key) => key + 1);
        setCompletedCharacters(characters.map(() => false));
        onWritingPracticeStart?.();
      }
    },
    [characters, onWritingPracticeStart],
  );

  const handlePracticeReset = useCallback(() => {
    setPracticeIndex(0);
    setPracticeResetKey((key) => key + 1);
    setCompletedCharacters(characters.map(() => false));
  }, [characters]);

  const handlePracticeHint = useCallback(() => {
    const strokeIndex = Math.max(practiceState.currentStroke - 1, 0);
    onWritingPracticeHint?.();
    void practiceWriterRef.current?.highlightStroke(strokeIndex);
  }, [onWritingPracticeHint, practiceState.currentStroke]);

  if (!characters.length) {
    return null;
  }

  return (
    <div className={mode === 'practice' ? 'writing-card is-practice' : 'writing-card'}>
      <div className="writing-card-header">
        <p className="writing-kicker">{ui.writing.strokeOrder}</p>
        <div className="writing-card-controls">
          <div className="writing-mode-tabs" role="group" aria-label={ui.writing.writingMode}>
            <button
              className={mode === 'watch' ? 'active' : ''}
              type="button"
              onClick={() => handleModeChange('watch')}
            >
              {ui.writing.watch}
            </button>
            <button
              className={mode === 'practice' ? 'active' : ''}
              type="button"
              onClick={() => handleModeChange('practice')}
            >
              {ui.writing.practice}
            </button>
          </div>
          {mode === 'watch' ? (
            <button
              className="writing-replay"
              type="button"
              onClick={() => {
                onWritingReplay?.();
                void animateCharacters();
              }}
            >
              {ui.writing.replay}
            </button>
          ) : (
            <button className="writing-replay" type="button" onClick={handlePracticeReset}>
              {ui.writing.reset}
            </button>
          )}
        </div>
      </div>

      {mode === 'watch' ? (
        <div className="writing-grid" aria-label={ui.writing.strokeOrderAnimation(hanzi)}>
          {characters.map((character, index) => (
            <div className="writer-character" key={`${character}-${index}`}>
              <div
                className="writer-target"
                ref={(node) => {
                  targetRefs.current[index] = node;
                }}
                aria-label={ui.writing.animatedStrokeOrder(character)}
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
                {ui.writing.characterStep(practiceIndex + 1, characters.length)}
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
                aria-label={ui.writing.practiceWriting(activePracticeCharacter)}
              />
            </div>
            <div className="practice-sidebar">
              <div className="practice-character-tabs" role="group" aria-label={ui.writing.practiceCharacter}>
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
                  {ui.writing.strokeProgress(
                    practiceState.totalStrokes ? practiceState.currentStroke : 0,
                    practiceState.totalStrokes || '-',
                  )}
                </span>
                <span>{ui.writing.done(practiceState.completedStrokes)}</span>
                <span>{ui.writing.mistakes(practiceState.totalMistakes)}</span>
                <span>{ui.writing.characters(completedPracticeCount, characters.length)}</span>
              </div>
              <button
                className="writing-hint"
                disabled={!practiceState.totalStrokes || isPracticeComplete}
                type="button"
                onClick={handlePracticeHint}
              >
                {ui.writing.hint}
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
  promptMode,
  ui,
  status,
  isAudioButtonActive,
  isAudioPending,
  isAudioLoading,
  speechMessage,
  speechSupported,
  onClose,
  onFlashcardReveal,
  onSentenceExpanded,
  onSpeak,
  onSetStatus,
  onClearStatus,
  onWritingPracticeComplete,
  onWritingPracticeHint,
  onWritingPracticeStart,
  onWritingReplay,
}: {
  word: HskWord;
  wordMeaning: string;
  sentenceMeaning: string;
  promptMode: FlashcardPromptMode;
  ui: UiCopy;
  status?: WordStatus;
  isAudioButtonActive: boolean;
  isAudioPending: boolean;
  isAudioLoading: boolean;
  speechMessage: string | null;
  speechSupported: boolean;
  onClose: () => void;
  onFlashcardReveal: (word: HskWord) => void;
  onSentenceExpanded: (word: HskWord) => void;
  onSpeak: (word: HskWord) => void;
  onSetStatus: (wordId: string, status: WordStatus) => void;
  onClearStatus: (wordId: string) => void;
  onWritingPracticeComplete: (word: HskWord) => void;
  onWritingPracticeHint: (word: HskWord) => void;
  onWritingPracticeStart: (word: HskWord) => void;
  onWritingReplay: (word: HskWord) => void;
}) {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [isSentenceExpanded, setIsSentenceExpanded] = useState(false);
  const modalScrollRef = useRef<HTMLDivElement | null>(null);
  const sentenceCardRef = useRef<HTMLDivElement | null>(null);
  const hanziCharacterCount = getModalHanziCharacterCount(word.hanzi);
  const flashcardStyle = {
    '--modal-hanzi-count': hanziCharacterCount,
  } as React.CSSProperties;
  const isTranslationFirst = promptMode === 'translation';
  const isRecallContentLocked = isTranslationFirst && !isAnswerVisible;
  const flashcardClassName = [
    'flashcard-card',
    isAnswerVisible ? 'is-revealed' : '',
    isTranslationFirst ? 'is-translation-first' : '',
  ]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    setIsAnswerVisible(false);
    setIsSentenceExpanded(false);
  }, [promptMode, word.id]);

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
  const handleFlashcardToggle = useCallback(() => {
    setIsAnswerVisible((visible) => {
      const nextVisible = !visible;
      if (nextVisible) {
        onFlashcardReveal(word);
      }

      return nextVisible;
    });
  }, [onFlashcardReveal, word]);
  const toggleSentenceDetail = useCallback(() => {
    if (isRecallContentLocked) {
      return;
    }

    setIsSentenceExpanded((expanded) => {
      const nextExpanded = !expanded;
      if (nextExpanded) {
        onSentenceExpanded(word);
      }

      return nextExpanded;
    });
  }, [isRecallContentLocked, onSentenceExpanded, word]);
  const handleSentenceCardKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== 'Enter' && event.key !== ' ') {
        return;
      }

      event.preventDefault();
      toggleSentenceDetail();
    },
    [toggleSentenceDetail],
  );

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
          <button className="modal-close" type="button" onClick={onClose} aria-label={ui.closeDetails}>
            <span className="modal-close-mark" aria-hidden="true" />
          </button>
        </div>

        <div className="modal-scroll" ref={modalScrollRef}>
          <h2 className="sr-only" id="word-detail-title">
            {word.hanzi}
          </h2>

          <div className="flashcard-stage">
            <button
              aria-controls="word-detail-answer"
              aria-expanded={isAnswerVisible}
              className={flashcardClassName}
              onClick={handleFlashcardToggle}
              style={flashcardStyle}
              type="button"
            >
              <span className="flashcard-face flashcard-front" aria-hidden={isAnswerVisible}>
                <span className="modal-kicker">{ui.hskWord(word.level ?? 1)}</span>
                {isTranslationFirst ? (
                  <span className="modal-meaning modal-prompt-meaning" dir="auto">
                    {wordMeaning}
                  </span>
                ) : (
                  <span className="modal-hanzi">{word.hanzi}</span>
                )}
                <span className="flashcard-cue">
                  {isTranslationFirst ? ui.revealChinese : ui.revealAnswer}
                </span>
              </span>
              <span className="flashcard-face flashcard-back" aria-hidden={!isAnswerVisible}>
                <span className="modal-kicker">{ui.hskWord(word.level ?? 1)}</span>
                {isTranslationFirst ? (
                  <>
                    <span className="modal-hanzi">{word.hanzi}</span>
                    <span className="modal-pinyin">{word.pinyin}</span>
                    <span className="modal-meaning" dir="auto">{wordMeaning}</span>
                  </>
                ) : (
                  <>
                    <span className="modal-meaning" dir="auto">{wordMeaning}</span>
                    <span className="modal-pinyin">{word.pinyin}</span>
                  </>
                )}
                <span className="flashcard-cue">{ui.hideAnswer}</span>
              </span>
            </button>
          </div>

          <div className={isAnswerVisible ? 'modal-answer is-visible' : 'modal-answer'} id="word-detail-answer">
            {word.examples?.length ? (
              <div className="examples">
                {word.examples.map((example) => (
                  <p key={example}>{example}</p>
                ))}
              </div>
            ) : null}
          </div>

          {hasWritingAnimation ? (
            <div className={isRecallContentLocked ? 'recall-locked-content is-locked' : 'recall-locked-content'}>
              <HanziWriterCard
                hanzi={word.hanzi}
                ui={ui}
                onWritingPracticeComplete={() => onWritingPracticeComplete(word)}
                onWritingPracticeHint={() => onWritingPracticeHint(word)}
                onWritingPracticeStart={() => onWritingPracticeStart(word)}
                onWritingReplay={() => onWritingReplay(word)}
              />
              {isRecallContentLocked ? (
                <div className="recall-lock-overlay" aria-hidden="true">
                  {ui.unlockWriting}
                </div>
              ) : null}
            </div>
          ) : null}

          {word.exampleSentence ? (
            <div className={isRecallContentLocked ? 'recall-locked-content is-locked' : 'recall-locked-content'}>
              <div
                aria-controls={`sentence-detail-${word.id}`}
                aria-disabled={isRecallContentLocked}
                aria-expanded={isSentenceExpanded}
                className={isRecallContentLocked ? 'sentence-card is-disabled' : 'sentence-card'}
                onClick={toggleSentenceDetail}
                onKeyDown={handleSentenceCardKeyDown}
                ref={sentenceCardRef}
                role="button"
                tabIndex={isRecallContentLocked ? -1 : 0}
              >
                <div className="sentence-card-header">
                  <p className="sentence-kicker">{ui.exampleSentence}</p>
                  <span className="sentence-toggle" aria-hidden="true">
                    {isSentenceExpanded ? ui.hidePinyin : ui.showPinyin}
                  </span>
                </div>
                <p className="sentence-hanzi">{word.exampleSentence.hanzi}</p>
                {isSentenceExpanded ? (
                  <div className="sentence-detail" id={`sentence-detail-${word.id}`}>
                    <p className="sentence-pinyin">{word.exampleSentence.pinyin}</p>
                    <p className="sentence-meaning" dir="auto">{sentenceMeaning}</p>
                  </div>
                ) : null}
              </div>
              {isRecallContentLocked ? (
                <div className="recall-lock-overlay" aria-hidden="true">
                  {ui.unlockExample}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="modal-footer">
          <div className="modal-actions">
            <button
              aria-busy={isAudioLoading || isAudioPending}
              className={isAudioButtonActive ? 'audio-button is-playing' : 'audio-button'}
              disabled={!speechSupported || isRecallContentLocked || isAudioPending}
              type="button"
              onClick={() => onSpeak(word)}
            >
              <span className="audio-button-visualizer" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span>{ui.playAudio}</span>
            </button>
            <div className={status ? 'modal-status-actions' : 'modal-status-actions is-unmarked'}>
              <button
                className={status === 'learning' ? 'status-action learning active' : 'status-action learning'}
                type="button"
                onClick={markForReview}
              >
                {ui.reviewAgain}
              </button>
              <button
                className={status === 'know' ? 'status-action know active' : 'status-action know'}
                type="button"
                onClick={markAsKnown}
              >
                {ui.iKnowThis}
              </button>
              {status ? (
                <button className="status-action muted" type="button" onClick={() => onClearStatus(word.id)}>
                  {ui.clear}
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
  ui,
  onCancel,
  onConfirm,
}: {
  label: string;
  learningCount: number;
  knownCount: number;
  totalCount: number;
  ui: UiCopy;
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
        <p className="reset-dialog-kicker">{ui.resetDialog.kicker}</p>
        <h2 id="reset-progress-title">{ui.resetDialog.title}</h2>
        <p id="reset-progress-description">
          {ui.resetDialog.description(label)}
        </p>

        <div className="reset-dialog-summary" aria-label={ui.resetDialog.summary(label)}>
          <span>
            <strong>{knownCount}</strong>
            {ui.resetDialog.known}
          </span>
          <span>
            <strong>{learningCount}</strong>
            {ui.resetDialog.review}
          </span>
          <span>
            <strong>{totalCount}</strong>
            {ui.resetDialog.wordsAffected}
          </span>
        </div>

        <p className="reset-dialog-note">{ui.resetDialog.note}</p>

        <div className="reset-dialog-actions">
          <button autoFocus className="reset-dialog-cancel" type="button" onClick={onCancel}>
            {ui.resetDialog.keepProgress}
          </button>
          <button className="reset-dialog-confirm" type="button" onClick={onConfirm}>
            {ui.resetDialog.resetProgress}
          </button>
        </div>
      </section>
    </div>
  );
}

function App() {
  useLayoutEffect(() => {
    document.documentElement.classList.remove('app-loading');
  }, []);

  const [selectedView, setSelectedView] = useState<HskView>(getInitialSelectedView);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterMode>('all');
  const [language, setLanguage] = useState<TranslationLanguage>(getInitialTranslationLanguage);
  const ui = getUiCopy(language);
  const [flashcardPromptMode, setFlashcardPromptMode] = useState<FlashcardPromptMode>(
    getInitialFlashcardPromptMode,
  );
  const [localizedMeanings, setLocalizedMeanings] = useState<LoadedLocalizedMeanings>({});
  const [wordsByLevel, setWordsByLevel] = useState<Partial<Record<HskLevel, HskWord[]>>>({});
  const [wordDataError, setWordDataError] = useState<string | null>(null);
  const [selectedWord, setSelectedWord] = useState<HskWord | null>(null);
  const [pulsingWordId, setPulsingWordId] = useState<string | null>(null);
  const [isMobileControlsOpen, setIsMobileControlsOpen] = useState(false);
  const [mapCamera, setMapCamera] = useState<MapCamera>({
    panX: 0,
    panY: 0,
    scale: DEFAULT_ZOOM,
  });
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const posterViewportRef = useRef<HTMLDivElement | null>(null);
  const posterBoardRef = useRef<HTMLDivElement | null>(null);
  const lastTrackedPageRef = useRef('');
  const searchTrackingTimerRef = useRef(0);
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
  const activePointersRef = useRef(new Map<number, MapPointerPosition>());
  const pinchStateRef = useRef<MapPinchState | null>(null);
  const { progress, setWordStatus, clearWordStatus, resetProgress } = useProgress();
  const {
    getAudioFeedback,
    message: speechMessage,
    preload: preloadSpeechAudio,
    prefetch: prefetchSpeechAudio,
    speak: speakMandarin,
    supported: speechSupported,
    warmup: warmupSpeechAudio,
  } = useMandarinSpeech(ui.speech);
  const hoverWarmupEnabled = useDesktopHoverWarmupEnabled();
  const navigateToRoute = useCallback((nextLanguage: TranslationLanguage, nextView: HskView) => {
    if (nextLanguage !== language) {
      captureAnalyticsEvent('language_changed', {
        ...getRouteAnalyticsProperties(nextLanguage, nextView),
        previous_language: language,
      });
    }

    if (nextView !== selectedView) {
      captureAnalyticsEvent('level_opened', {
        ...getRouteAnalyticsProperties(nextLanguage, nextView),
        previous_hsk_view: getAnalyticsView(selectedView),
      });
    }

    setLanguage(nextLanguage);
    setSelectedView(nextView);
    setSelectedWord(null);

    if (typeof window === 'undefined') {
      return;
    }

    const nextPath = getLocalizedPath(nextLanguage, nextView);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ hskmap: true }, '', nextPath);
    }
  }, [language, selectedView]);
  const levelsToLoad = useMemo<readonly HskLevel[]>(
    () => (selectedView === 'all' ? HSK_LEVELS : [selectedView]),
    [selectedView],
  );
  const isWordDataLoading = levelsToLoad.some((level) => !wordsByLevel[level]) && !wordDataError;
  const selectedViewWordCount =
    selectedView === 'all' ? ALL_WORD_COUNT : HSK_LEVEL_WORD_COUNTS[selectedView];
  const words = useMemo(
    () =>
      selectedView === 'all'
        ? HSK_LEVELS.flatMap((level) => wordsByLevel[level] ?? [])
        : wordsByLevel[selectedView] ?? [],
    [selectedView, wordsByLevel],
  );
  const viewOptions = useMemo(
    () => [
      { id: 'all' as const, label: ui.allHsk, description: ui.words(ALL_WORD_COUNT) },
      ...HSK_LEVEL_OPTIONS.map((level) => ({
        id: level.id,
        label: level.label,
        description:
          level.id === 1
            ? ui.words(HSK_LEVEL_WORD_COUNTS[level.id])
            : ui.newWords(HSK_LEVEL_WORD_COUNTS[level.id]),
      })),
    ],
    [ui],
  );
  const selectedViewMeta = viewOptions.find((view) => view.id === selectedView) ?? viewOptions[0];
  const translationLevelsToLoad = useMemo(() => {
    if (language === 'en') {
      return [];
    }

    const availableLevels = getAvailableLocalizedLevels(language);
    if (selectedView === 'all') {
      return availableLevels;
    }

    return availableLevels.includes(selectedView) ? [selectedView] : [];
  }, [language, selectedView]);

  useEffect(() => {
    let ignoreLoad = false;
    setWordDataError(null);

    loadHskLevels(levelsToLoad)
      .then((loadedLevels) => {
        if (ignoreLoad) {
          return;
        }

        setWordsByLevel((current) => {
          let didChange = false;
          const next = { ...current };

          for (const level of levelsToLoad) {
            if (loadedLevels[level] && current[level] !== loadedLevels[level]) {
              next[level] = loadedLevels[level];
              didChange = true;
            }
          }

          return didChange ? next : current;
        });
      })
      .catch((error: unknown) => {
        if (ignoreLoad) {
          return;
        }

        console.error('Could not load HSK word data.', error);
        setWordDataError(error instanceof Error ? error.message : 'Unknown loading error');
      });

    return () => {
      ignoreLoad = true;
    };
  }, [levelsToLoad]);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    window.localStorage.setItem(FLASHCARD_PROMPT_MODE_STORAGE_KEY, flashcardPromptMode);
  }, [flashcardPromptMode]);

  useEffect(() => {
    document.documentElement.lang = ui.htmlLang;
    document.documentElement.dir = ui.direction;
  }, [ui.direction, ui.htmlLang]);

  useEffect(() => {
    const handlePopState = () => {
      const nextRoute = getAppRouteFromPath(window.location.pathname);
      setLanguage(nextRoute.language);
      setSelectedView(nextRoute.view);
      setSelectedWord(null);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const pageKey = `${window.location.pathname}${window.location.search}`;
    if (lastTrackedPageRef.current === pageKey) {
      return;
    }

    lastTrackedPageRef.current = pageKey;
    captureAnalyticsPageView(getRouteAnalyticsProperties(language, selectedView));
  }, [language, selectedView]);

  useEffect(() => {
    if (language === 'en' || !translationLevelsToLoad.length) {
      return;
    }

    let ignoreLoad = false;
    const localizedLanguage: LocalizedLanguage = language;

    Promise.all(
      translationLevelsToLoad.map(async (level) => {
        const meanings = await loadLocalizedMeanings(level, localizedLanguage);
        return [level, meanings] as const;
      }),
    )
      .then((entries) => {
        if (ignoreLoad) {
          return;
        }

        setLocalizedMeanings((current) => {
          let didChange = false;
          const next: LoadedLocalizedMeanings = { ...current };

          for (const [level, meanings] of entries) {
            if (!meanings || next[level]?.[localizedLanguage] === meanings) {
              continue;
            }

            next[level] = {
              ...next[level],
              [localizedLanguage]: meanings,
            };
            didChange = true;
          }

          return didChange ? next : current;
        });
      })
      .catch((error: unknown) => {
        console.error('Could not load translation data.', error);
      });

    return () => {
      ignoreLoad = true;
    };
  }, [language, translationLevelsToLoad]);

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
      unmarked: Math.max(selectedViewWordCount - known - learning, 0),
      total: selectedViewWordCount,
    };
  }, [progress, selectedViewWordCount, words]);

  const visibleWords = useMemo(() => {
    if (selectedView === 'all') {
      return [];
    }

    return words.filter((word) =>
      isWordVisible(word, search, filter, progress[word.id], language, localizedMeanings),
    );
  }, [filter, language, localizedMeanings, progress, search, selectedView, words]);

  const levelOverview = useMemo(() => {
    return HSK_LEVEL_OPTIONS.map((level) => {
      const levelWords = wordsByLevel[level.id] ?? [];
      const total = HSK_LEVEL_WORD_COUNTS[level.id];
      const visibleWords = levelWords.filter((word) =>
        isWordVisible(word, search, filter, progress[word.id], language, localizedMeanings),
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
        description: viewOptions.find((view) => view.id === level.id)?.description ?? '',
        total,
        visibleWords,
        visibleCount: visibleWords.length,
        known,
        learning,
        unmarked: Math.max(total - known - learning, 0),
        accent: LEVEL_ACCENTS[level.id],
        textColor: LEVEL_TEXT_COLORS[level.id],
      };
    });
  }, [filter, language, localizedMeanings, progress, search, viewOptions, wordsByLevel]);

  const visibleCount =
    selectedView === 'all'
      ? levelOverview.reduce((count, level) => count + level.visibleCount, 0)
      : visibleWords.length;
  const activeLanguage = LANGUAGE_OPTIONS.find((item) => item.id === language) ?? LANGUAGE_OPTIONS[0];
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

  useEffect(() => {
    window.clearTimeout(searchTrackingTimerRef.current);
    const normalizedSearchLength = search.trim().length;
    if (normalizedSearchLength === 0) {
      return;
    }

    searchTrackingTimerRef.current = window.setTimeout(() => {
      captureAnalyticsEvent('search_used', {
        ...getRouteAnalyticsProperties(language, selectedView),
        result_count: visibleCount,
        search_length: normalizedSearchLength,
      });
    }, 700);

    return () => window.clearTimeout(searchTrackingTimerRef.current);
  }, [language, search, selectedView, visibleCount]);

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

  const handleFilterChange = useCallback(
    (nextFilter: FilterMode) => {
      setFilter(nextFilter);
      captureAnalyticsEvent('filter_changed', {
        ...getRouteAnalyticsProperties(language, selectedView),
        filter: nextFilter,
      });
    },
    [language, selectedView],
  );

  const handleFlashcardPromptModeChange = useCallback(
    (nextMode: FlashcardPromptMode) => {
      setFlashcardPromptMode(nextMode);
      captureAnalyticsEvent('flashcard_prompt_mode_changed', {
        ...getRouteAnalyticsProperties(language, selectedView),
        prompt_mode: nextMode,
      });
    },
    [language, selectedView],
  );

  const handleSetStatus = useCallback(
    (wordId: string, status: WordStatus) => {
      setWordStatus(wordId, status);
      const word = words.find((item) => item.id === wordId);
      captureAnalyticsEvent('word_status_set', {
        ...(word
          ? getWordAnalyticsProperties(word, language, selectedView)
          : { ...getRouteAnalyticsProperties(language, selectedView), word_id: wordId }),
        status,
      });
      setPulsingWordId(wordId);
      window.setTimeout(() => setPulsingWordId(null), 520);
    },
    [language, selectedView, setWordStatus, words],
  );

  const handleClearStatus = useCallback(
    (wordId: string) => {
      clearWordStatus(wordId);
      const word = words.find((item) => item.id === wordId);
      captureAnalyticsEvent('word_status_cleared', {
        ...(word
          ? getWordAnalyticsProperties(word, language, selectedView)
          : { ...getRouteAnalyticsProperties(language, selectedView), word_id: wordId }),
      });
      setPulsingWordId(wordId);
      window.setTimeout(() => setPulsingWordId(null), 520);
    },
    [clearWordStatus, language, selectedView, words],
  );

  const handleReset = useCallback(() => {
    setIsResetDialogOpen(true);
  }, []);

  const handleCancelReset = useCallback(() => {
    setIsResetDialogOpen(false);
  }, []);

  const handleConfirmReset = useCallback(() => {
    resetProgress(words.map((word) => word.id));
    captureAnalyticsEvent('progress_reset', {
      ...getRouteAnalyticsProperties(language, selectedView),
      known_count: stats.known,
      learning_count: stats.learning,
      word_count: words.length,
    });
    setIsResetDialogOpen(false);
  }, [language, resetProgress, selectedView, stats.known, stats.learning, words]);

  const handleSpeak = useCallback(
    (word: HskWord) => {
      captureAnalyticsEvent('audio_played', getWordAnalyticsProperties(word, language, selectedView));
      speakMandarin(word.hanzi, getWordAudioSrc(word));
    },
    [language, selectedView, speakMandarin],
  );

  const handleFocusIntentWord = useCallback(
    (word: HskWord) => {
      prefetchSpeechAudio(getWordAudioSrc(word), { intent: 'focus' });
    },
    [prefetchSpeechAudio],
  );

  const handlePointerIntentWord = useCallback(
    (word: HskWord) => {
      prefetchSpeechAudio(getWordAudioSrc(word), { intent: 'pointerdown' });
    },
    [prefetchSpeechAudio],
  );

  const handleHoverWarmupWord = useCallback(
    (word: HskWord) => {
      warmupSpeechAudio(getWordAudioSrc(word), { intent: 'hover' });
    },
    [warmupSpeechAudio],
  );

  const { cancel: cancelHoverWarmup, schedule: scheduleHoverWarmup } = useWordHoverWarmup({
    enabled: hoverWarmupEnabled,
    onWarmup: handleHoverWarmupWord,
  });

  const handleHoverWarmupStart = useCallback(
    (word: HskWord) => {
      scheduleHoverWarmup(word);
    },
    [scheduleHoverWarmup],
  );

  const handleHoverWarmupEnd = useCallback(
    (word: HskWord) => {
      cancelHoverWarmup(word);
    },
    [cancelHoverWarmup],
  );

  const handleSelectWord = useCallback(
    (word: HskWord) => {
      captureAnalyticsEvent('word_opened', getWordAnalyticsProperties(word, language, selectedView));
      setSelectedWord(word);
    },
    [language, selectedView],
  );

  const handleFlashcardReveal = useCallback(
    (word: HskWord) => {
      captureAnalyticsEvent('flashcard_revealed', getWordAnalyticsProperties(word, language, selectedView));
    },
    [language, selectedView],
  );

  const handleSentenceExpanded = useCallback(
    (word: HskWord) => {
      captureAnalyticsEvent('sentence_expanded', getWordAnalyticsProperties(word, language, selectedView));
    },
    [language, selectedView],
  );

  const handleWritingPracticeStart = useCallback(
    (word: HskWord) => {
      captureAnalyticsEvent('writing_practice_started', getWordAnalyticsProperties(word, language, selectedView));
    },
    [language, selectedView],
  );

  const handleWritingPracticeComplete = useCallback(
    (word: HskWord) => {
      captureAnalyticsEvent('writing_practice_completed', getWordAnalyticsProperties(word, language, selectedView));
    },
    [language, selectedView],
  );

  const handleWritingPracticeHint = useCallback(
    (word: HskWord) => {
      captureAnalyticsEvent('writing_practice_hint_used', getWordAnalyticsProperties(word, language, selectedView));
    },
    [language, selectedView],
  );

  const handleWritingReplay = useCallback(
    (word: HskWord) => {
      captureAnalyticsEvent('writing_replay_clicked', getWordAnalyticsProperties(word, language, selectedView));
    },
    [language, selectedView],
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

  const startPinchGesture = useCallback((viewport: HTMLElement) => {
    const pointerPair = getPointerPair(activePointersRef.current);
    if (!pointerPair) {
      return false;
    }

    const [firstPointer, secondPointer] = pointerPair;
    const center = getViewportCenter(viewport, firstPointer, secondPointer);
    const startDistance = getPointerDistance(firstPointer, secondPointer);
    if (startDistance <= 0) {
      return false;
    }

    pinchStateRef.current = {
      centerX: center.x,
      centerY: center.y,
      startDistance,
      startPanX: mapCameraRef.current.panX,
      startPanY: mapCameraRef.current.panY,
      startScale: mapCameraRef.current.scale,
    };
    dragStateRef.current = {
      ...dragStateRef.current,
      active: false,
      captured: false,
      didMove: false,
    };
    didDragRef.current = true;
    viewport.classList.add('is-panning');
    return true;
  }, []);

  const handleMapPointerDown = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (event.button !== 0 || isIgnoredMapPanTarget(event.target)) {
      return;
    }

    activePointersRef.current.set(event.pointerId, {
      clientX: event.clientX,
      clientY: event.clientY,
    });

    if (activePointersRef.current.size >= 2 && startPinchGesture(event.currentTarget)) {
      event.preventDefault();
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
  }, [startPinchGesture]);

  const handleMapPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (activePointersRef.current.has(event.pointerId)) {
      activePointersRef.current.set(event.pointerId, {
        clientX: event.clientX,
        clientY: event.clientY,
      });
    }

    if (activePointersRef.current.size >= 2) {
      const pointerPair = getPointerPair(activePointersRef.current);
      if (!pointerPair) {
        return;
      }

      if (!pinchStateRef.current && !startPinchGesture(event.currentTarget)) {
        return;
      }

      const pinch = pinchStateRef.current;
      if (!pinch) {
        return;
      }

      const [firstPointer, secondPointer] = pointerPair;
      const currentCenter = getViewportCenter(event.currentTarget, firstPointer, secondPointer);
      event.preventDefault();
      didDragRef.current = true;
      commitMapCamera(
        getPinchAdjustedCamera({
          currentCenterX: currentCenter.x,
          currentCenterY: currentCenter.y,
          currentDistance: getPointerDistance(firstPointer, secondPointer),
          pinch,
        }),
      );
      return;
    }

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
  }, [commitMapCamera, startPinchGesture]);

  const handleMapPointerEnd = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const wasPinching = Boolean(pinchStateRef.current);
    activePointersRef.current.delete(event.pointerId);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (wasPinching) {
      if (activePointersRef.current.size < 2) {
        pinchStateRef.current = null;
        dragStateRef.current = {
          ...dragStateRef.current,
          active: false,
          captured: false,
          didMove: false,
        };
        event.currentTarget.classList.remove('is-panning');
        window.setTimeout(() => {
          didDragRef.current = false;
        }, 0);
      }
      return;
    }

    const dragState = dragStateRef.current;
    if (!dragState.active || dragState.pointerId !== event.pointerId) {
      return;
    }

    dragStateRef.current = { ...dragState, active: false };
    event.currentTarget.classList.remove('is-panning');

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
    preloadSpeechAudio(selectedWord ? getWordAudioSrc(selectedWord) : undefined, {
      reason: 'modal',
    });
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
    activePointersRef.current.clear();
    pinchStateRef.current = null;
  }, [selectedView]);

  useEffect(() => {
    commitMapCamera(mapCameraRef.current);
  }, [commitMapCamera, levelGridRows, visibleCount]);

  const handleToolbarPointerDownCapture = useCallback((event: React.PointerEvent<HTMLElement>) => {
    event.stopPropagation();
    activePointersRef.current.clear();
    pinchStateRef.current = null;
    dragStateRef.current = {
      ...dragStateRef.current,
      active: false,
      captured: false,
      didMove: false,
    };
    didDragRef.current = false;
  }, []);
  const selectedWordAudioFeedback = selectedWord ? getAudioFeedback(getWordAudioSrc(selectedWord)) : null;

  return (
    <main className="app-shell" lang={ui.htmlLang} dir={ui.direction}>
      <header className="hero">
        <div>
          <p className="eyebrow">{ui.classicMaps}</p>
          <h1>
            {selectedView === 'all'
              ? ui.allOverview
              : ui.tileMap(selectedViewMeta.label)}
          </h1>
        </div>
        <div className="progress-card" aria-label={ui.progressSummary}>
          <div>
            <span className="progress-number">{stats.known}</span>
            <span className="progress-label">{ui.known}</span>
          </div>
          <div>
            <span className="progress-number">{stats.learning}</span>
            <span className="progress-label">{ui.review}</span>
          </div>
          <div>
            <span className="progress-number">{stats.unmarked}</span>
            <span className="progress-label">{ui.unmarked}</span>
          </div>
        </div>
      </header>

      <section
        className={isMobileControlsOpen ? 'toolbar is-mobile-open' : 'toolbar'}
        aria-label={ui.mapControls}
        data-map-pan-ignore="true"
        onPointerDownCapture={handleToolbarPointerDownCapture}
      >
        <div className="level-tabs" role="group" aria-label={ui.hskLevel}>
          {viewOptions.map((view) => (
            <a
              className={selectedView === view.id ? 'active' : ''}
              href={getLocalizedPath(language, view.id)}
              key={view.id}
              onClick={(event) => {
                if (!shouldHandleRouteClick(event)) {
                  return;
                }

                event.preventDefault();
                navigateToRoute(language, view.id);
              }}
            >
              <span>{view.label}</span>
              <small>{view.description}</small>
            </a>
          ))}
        </div>

        <div className="mobile-toolbar-summary">
          <div className="mobile-toolbar-status">
            <span>{selectedViewMeta.label}</span>
            <span>{ui.shown(visibleCount, stats.total)}</span>
            <span>{ui.filters[filter]}</span>
            <span>{activeLanguage.flag}</span>
          </div>
          <button
            aria-controls="mobile-controls-panel"
            aria-expanded={isMobileControlsOpen}
            aria-label={ui.menuLabel}
            className="mobile-controls-toggle"
            type="button"
            onClick={() => setIsMobileControlsOpen((isOpen) => !isOpen)}
          >
            <span className="mobile-controls-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="mobile-controls-label">{ui.menuLabel}</span>
          </button>
        </div>

        <div className="mobile-control-panel" id="mobile-controls-panel">
          <label className="search-field">
            <span>{ui.searchLabel}</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={ui.searchPlaceholder}
            />
          </label>

          <div className="filter-tabs" role="group" aria-label={ui.progressFilter}>
            {FILTERS.map((item) => (
              <button
                className={filter === item.id ? 'active' : ''}
                key={item.id}
                type="button"
                onClick={() => handleFilterChange(item.id)}
              >
                {ui.filters[item.id]}
              </button>
            ))}
          </div>

          <div className="study-mode-tabs" role="group" aria-label={ui.flashcardPromptSide}>
            {FLASHCARD_PROMPT_MODES.map((mode) => (
              <button
                className={flashcardPromptMode === mode.id ? 'active' : ''}
                key={mode.id}
                type="button"
                onClick={() => handleFlashcardPromptModeChange(mode.id)}
              >
                {ui.promptModes[mode.id]}
              </button>
            ))}
          </div>

          <div className="toolbar-meta">
            <span>{ui.shown(visibleCount, stats.total)}</span>
            <button className="reset-button" type="button" onClick={handleReset}>
              {ui.reset}
            </button>
          </div>

          <div className="language-tabs" role="group" aria-label={ui.translationLanguage}>
            {LANGUAGE_OPTIONS.map((item) => (
              <a
                aria-label={ui.showTranslationsIn(item.label)}
                className={language === item.id ? 'active' : ''}
                href={getLocalizedPath(item.id, selectedView)}
                key={item.id}
                style={
                  {
                    '--language-accent': item.accent,
                    '--language-tint': item.tint,
                  } as React.CSSProperties
                }
                onClick={(event) => {
                  if (!shouldHandleRouteClick(event)) {
                    return;
                  }

                  event.preventDefault();
                  navigateToRoute(item.id, selectedView);
                }}
              >
                <span className="language-flag" aria-hidden="true">{item.flag}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {wordDataError ? (
        <div className="empty-state" role="alert">
          <h2>Could not load HSK words.</h2>
          <p>{wordDataError}</p>
        </div>
      ) : isWordDataLoading ? (
        <div className="empty-state" aria-busy="true">
          <h2>{selectedView === 'all' ? ui.allHskOverview : ui.wordMap(selectedViewMeta.label)}</h2>
          <p>{ui.shown(words.length, selectedViewWordCount)}</p>
        </div>
      ) : selectedView === 'all' ? (
        hasVisibleWords ? (
          <section className="level-overview" aria-label={ui.allHskOverview}>
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
                <a
                  aria-disabled={!level.visibleCount}
                  className="level-card-main"
                  href={getLocalizedPath(language, level.level)}
                  tabIndex={level.visibleCount ? undefined : -1}
                  onClick={(event) => {
                    if (!level.visibleCount || !shouldHandleRouteClick(event)) {
                      event.preventDefault();
                      return;
                    }

                    event.preventDefault();
                    navigateToRoute(language, level.level);
                  }}
                >
                  <span className="level-card-kicker">{level.description}</span>
                  <span className="level-card-title">HSK {level.level}</span>
                  <span className="level-card-count">
                    {ui.levelCardCount(level.visibleCount, level.total)}
                  </span>
                </a>

                <div className="level-progress" aria-label={ui.levelProgress(level.level)}>
                  <span style={{ width: `${(level.known / level.total) * 100}%` }} />
                  <span style={{ width: `${(level.learning / level.total) * 100}%` }} />
                </div>

                <div className="level-card-stats">
                  <span>{ui.levelKnown(level.known)}</span>
                  <span>{ui.levelLearning(level.learning)}</span>
                  <span>{ui.levelUnmarked(level.unmarked)}</span>
                </div>

                {level.visibleWords.length ? (
                  <div className="level-word-preview" aria-label={ui.matchingWords(level.level)}>
                    {level.visibleWords.slice(0, 10).map((word) => (
                      <button
                        className={progress[word.id] ? `preview-word is-${progress[word.id]}` : 'preview-word'}
                        key={word.id}
                        type="button"
                        onBlur={() => handleHoverWarmupEnd(word)}
                        onFocus={() => handleFocusIntentWord(word)}
                        onMouseEnter={() => handleHoverWarmupStart(word)}
                        onMouseLeave={() => handleHoverWarmupEnd(word)}
                        onPointerDown={() => handlePointerIntentWord(word)}
                        onClick={() => handleSelectWord(word)}
                      >
                        {getTileLabel(word.hanzi)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="level-empty-note">{ui.noMatchesInLevel}</p>
                )}
              </article>
            ))}
          </section>
        ) : (
          <div className="empty-state">
            <h2>{ui.noWordsMatch}</h2>
            <p>{ui.tryDifferentSearch}</p>
          </div>
        )
      ) : (
        <section className="map-shell" aria-label={ui.wordMap(selectedViewMeta.label)}>
          {shouldUseCanvasMap && hasVisibleWords ? (
            <CanvasWordMap
              hoverWarmupEnabled={hoverWarmupEnabled}
              language={language}
              localizedMeanings={localizedMeanings}
              levelGridRows={levelGridRows}
              onFocusIntentWord={handleFocusIntentWord}
              onHoverWarmupWord={handleHoverWarmupWord}
              onPointerIntentWord={handlePointerIntentWord}
              onSelectWord={handleSelectWord}
              progress={progress}
              pulsingWordId={pulsingWordId}
              selectedViewLabel={selectedViewMeta.label}
              ui={ui}
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
              aria-label={ui.scrollableWordMap(selectedViewMeta.label)}
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
                            ? ui.wordRange(
                                selectedViewMeta.label,
                                wordGroup.startIndex + 1,
                                wordGroup.startIndex + wordGroup.words.length,
                              )
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
                            meaning={getWordMeaning(word, language, localizedMeanings)}
                            onFocusIntent={handleFocusIntentWord}
                            onHoverEnd={handleHoverWarmupEnd}
                            onHoverStart={handleHoverWarmupStart}
                            onPointerIntent={handlePointerIntentWord}
                            onSelect={handleSelectWord}
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
                  <h2>{ui.noWordsMatch}</h2>
                  <p>{ui.tryDifferentSearch}</p>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {!wordDataError && !isWordDataLoading ? (
        <>
          <LocalizedSeoGuide
            language={language}
            view={selectedView}
            onNavigate={(nextView) => navigateToRoute(language, nextView)}
          />
          <p className="site-disclaimer">
            HSKMap is an independent study tool and is not affiliated with Chinese Testing International
            or the official HSK exam.
          </p>
        </>
      ) : null}

      {isResetDialogOpen ? (
        <ResetProgressDialog
          label={selectedViewMeta.label}
          knownCount={stats.known}
          learningCount={stats.learning}
          onCancel={handleCancelReset}
          onConfirm={handleConfirmReset}
          totalCount={stats.total}
          ui={ui}
        />
      ) : null}

      {selectedWord ? (
        <DetailModal
          onClearStatus={handleClearStatus}
          onClose={() => setSelectedWord(null)}
          onFlashcardReveal={handleFlashcardReveal}
          onSentenceExpanded={handleSentenceExpanded}
          onSetStatus={handleSetStatus}
          onSpeak={handleSpeak}
          onWritingPracticeComplete={handleWritingPracticeComplete}
          onWritingPracticeHint={handleWritingPracticeHint}
          onWritingPracticeStart={handleWritingPracticeStart}
          onWritingReplay={handleWritingReplay}
          promptMode={flashcardPromptMode}
          isAudioButtonActive={selectedWordAudioFeedback?.isActive ?? false}
          isAudioLoading={selectedWordAudioFeedback?.loadState === 'loading'}
          isAudioPending={selectedWordAudioFeedback?.isPending ?? false}
          sentenceMeaning={getSentenceMeaning(selectedWord, language, localizedMeanings)}
          speechMessage={speechMessage}
          speechSupported={speechSupported}
          status={progress[selectedWord.id]}
          ui={ui}
          word={selectedWord}
          wordMeaning={getWordMeaning(selectedWord, language, localizedMeanings)}
        />
      ) : null}
    </main>
  );
}

export default App;

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HSK_LEVEL_OPTIONS, HSK_WORDS_BY_LEVEL } from './data/hsk';
import { useMandarinSpeech } from './hooks/useMandarinSpeech';
import { useProgress } from './hooks/useProgress';
import type { HskLevel, HskWord, WordStatus } from './types';

type FilterMode = 'all' | 'learning' | 'know' | 'unmarked';
type HskView = HskLevel | 'all';

const DEFAULT_ZOOM = 1;
const MIN_ZOOM = 0.08;
const MAX_ZOOM = 36;
const ZOOM_SENSITIVITY = 0.0015;
const TILE_BASE_SIZE = 74;
const ALL_WORDS = HSK_LEVEL_OPTIONS.flatMap((level) => HSK_WORDS_BY_LEVEL[level.id]);
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
  { id: 'learning', label: 'Learning' },
  { id: 'know', label: 'Know' },
  { id: 'unmarked', label: 'Unmarked' },
];

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\u00fc/g, 'u:')
    .replace(/v/g, 'u:');
}

function isWordVisible(word: HskWord, search: string, filter: FilterMode, status?: WordStatus) {
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

  const haystack = normalize(`${word.hanzi} ${word.pinyin} ${word.meaning}`);
  return haystack.includes(normalizedSearch) || word.hanzi.includes(search.trim());
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

function formatCssNumber(value: number, digits = 4) {
  return Number(value.toFixed(digits)).toString();
}

function formatPixelValue(value: number) {
  return `${formatCssNumber(value, 3)}px`;
}

function clampZoom(value: number) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));
}

function TileButton({
  word,
  status,
  isPulsing,
  onSelect,
  className: extraClassName,
  style,
}: {
  word: HskWord;
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
      type="button"
      onClick={() => onSelect(word)}
      aria-label={`${word.hanzi}, ${word.pinyin}, ${word.meaning}`}
      style={tileStyle}
    >
      <span className="tile-hanzi">{tileLabel}</span>
    </button>
  );
}

function DetailModal({
  word,
  status,
  audioAvailable,
  speechMessage,
  speechSupported,
  onClose,
  onSpeak,
  onSetStatus,
  onClearStatus,
}: {
  word: HskWord;
  status?: WordStatus;
  audioAvailable: boolean;
  speechMessage: string | null;
  speechSupported: boolean;
  onClose: () => void;
  onSpeak: (word: HskWord) => void;
  onSetStatus: (wordId: string, status: WordStatus) => void;
  onClearStatus: (wordId: string) => void;
}) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  const audioNote = audioAvailable ? speechMessage : 'Audio for HSK 5-6 will be added later.';

  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <section
        aria-labelledby="word-detail-title"
        aria-modal="true"
        className="word-modal"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close details">
          x
        </button>

        <div className="modal-word-stack">
          <p className="modal-kicker">HSK {word.level ?? 1} Word</p>
          <h2 id="word-detail-title">{word.hanzi}</h2>
          <p className="modal-pinyin">{word.pinyin}</p>
          <p className="modal-meaning">{word.meaning}</p>
        </div>

        {word.examples?.length ? (
          <div className="examples">
            {word.examples.map((example) => (
              <p key={example}>{example}</p>
            ))}
          </div>
        ) : null}

        <div className="modal-actions">
          <button
            className="audio-button"
            disabled={!speechSupported || !audioAvailable}
            type="button"
            onClick={() => onSpeak(word)}
          >
            {audioAvailable ? 'Play audio' : 'Audio later'}
          </button>
          <button
            className={status === 'learning' ? 'status-action active learning' : 'status-action'}
            type="button"
            onClick={() => onSetStatus(word.id, 'learning')}
          >
            Learning
          </button>
          <button
            className={status === 'know' ? 'status-action active know' : 'status-action'}
            type="button"
            onClick={() => onSetStatus(word.id, 'know')}
          >
            Know
          </button>
          <button className="status-action muted" type="button" onClick={() => onClearStatus(word.id)}>
            Clear
          </button>
        </div>

        {audioNote ? <p className="speech-note">{audioNote}</p> : null}
      </section>
    </div>
  );
}

function App() {
  const [selectedView, setSelectedView] = useState<HskView>('all');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterMode>('all');
  const [selectedWord, setSelectedWord] = useState<HskWord | null>(null);
  const [pulsingWordId, setPulsingWordId] = useState<string | null>(null);
  const [zoomScale, setZoomScale] = useState(DEFAULT_ZOOM);
  const posterViewportRef = useRef<HTMLDivElement | null>(null);
  const posterBoardRef = useRef<HTMLDivElement | null>(null);
  const zoomRef = useRef(DEFAULT_ZOOM);
  const pendingWheelDeltaRef = useRef(0);
  const zoomFrameRef = useRef(0);
  const zoomPointerRef = useRef({ x: 0, y: 0 });
  const didDragRef = useRef(false);
  const dragStateRef = useRef({
    active: false,
    captured: false,
    pointerId: 0,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
    didMove: false,
  });
  const { progress, setWordStatus, clearWordStatus, resetProgress } = useProgress();
  const speech = useMandarinSpeech();
  const words = selectedView === 'all' ? ALL_WORDS : HSK_WORDS_BY_LEVEL[selectedView];
  const selectedViewMeta = VIEW_OPTIONS.find((view) => view.id === selectedView) ?? VIEW_OPTIONS[0];

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

    return words.filter((word) => isWordVisible(word, search, filter, progress[word.id]));
  }, [filter, progress, search, selectedView, words]);

  const levelOverview = useMemo(() => {
    return HSK_LEVEL_OPTIONS.map((level) => {
      const levelWords = HSK_WORDS_BY_LEVEL[level.id];
      const visibleWords = levelWords.filter((word) =>
        isWordVisible(word, search, filter, progress[word.id]),
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
  }, [filter, progress, search]);

  const visibleCount =
    selectedView === 'all'
      ? levelOverview.reduce((count, level) => count + level.visibleCount, 0)
      : visibleWords.length;
  const hasVisibleWords = visibleCount > 0;
  const tileBaseSize = TILE_BASE_SIZE;
  const levelGridRows = selectedView === 6 ? 30 : selectedView === 5 ? 24 : 6;

  const applyZoomScale = useCallback(
    (nextZoom = zoomRef.current) => {
      const viewport = posterViewportRef.current;
      if (!viewport) {
        return;
      }

      viewport.style.setProperty('--tile-size', formatPixelValue(tileBaseSize * nextZoom));
    },
    [tileBaseSize],
  );

  const setZoomAtViewportPoint = useCallback(
    (nextZoomValue: number, anchorPoint: { x: number; y: number }) => {
      const viewport = posterViewportRef.current;
      if (!viewport) {
        return;
      }

      const currentZoom = Math.max(zoomRef.current, 0.001);
      const nextZoom = clampZoom(nextZoomValue);
      if (Math.abs(nextZoom - currentZoom) < 0.0005) {
        return;
      }

      const board = posterBoardRef.current;
      const boardStyle = board ? window.getComputedStyle(board) : null;
      const boardPaddingLeft = boardStyle ? Number.parseFloat(boardStyle.paddingLeft) || 0 : 0;
      const boardPaddingTop = boardStyle ? Number.parseFloat(boardStyle.paddingTop) || 0 : 0;
      const currentTileSize = tileBaseSize * currentZoom;
      const nextTileSize = tileBaseSize * nextZoom;
      const gridX = (viewport.scrollLeft + anchorPoint.x - boardPaddingLeft) / currentTileSize;
      const gridY = (viewport.scrollTop + anchorPoint.y - boardPaddingTop) / currentTileSize;

      zoomRef.current = nextZoom;
      setZoomScale(nextZoom);
      applyZoomScale(nextZoom);

      viewport.scrollLeft = boardPaddingLeft + gridX * nextTileSize - anchorPoint.x;
      viewport.scrollTop = boardPaddingTop + gridY * nextTileSize - anchorPoint.y;
    },
    [applyZoomScale, tileBaseSize],
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
    const confirmed = window.confirm(`Reset saved ${selectedViewMeta.label} progress?`);
    if (confirmed) {
      resetProgress(words.map((word) => word.id));
    }
  }, [resetProgress, selectedViewMeta.label, words]);

  const handleSpeak = useCallback(
    (word: HskWord) => {
      speech.speak(word.hanzi);
    },
    [speech],
  );

  const handleMapWheel = useCallback(
    (event: React.WheelEvent<HTMLElement>) => {
      event.preventDefault();
      const viewport = event.currentTarget;
      const rect = viewport.getBoundingClientRect();
      zoomPointerRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      pendingWheelDeltaRef.current += event.deltaY;

      if (zoomFrameRef.current) {
        return;
      }

      zoomFrameRef.current = window.requestAnimationFrame(() => {
        zoomFrameRef.current = 0;

        const delta = pendingWheelDeltaRef.current;
        pendingWheelDeltaRef.current = 0;
        const currentZoom = zoomRef.current;
        const nextZoom = Math.min(
          MAX_ZOOM,
          Math.max(MIN_ZOOM, currentZoom * Math.exp(-delta * ZOOM_SENSITIVITY)),
        );

        if (Math.abs(nextZoom - currentZoom) < 0.001) {
          return;
        }

        setZoomAtViewportPoint(nextZoom, zoomPointerRef.current);
      });
    },
    [setZoomAtViewportPoint],
  );

  const handleMapPointerDown = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (event.button !== 0) {
      return;
    }

    const viewport = event.currentTarget;
    dragStateRef.current = {
      active: true,
      captured: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: viewport.scrollLeft,
      scrollTop: viewport.scrollTop,
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
      event.currentTarget.scrollLeft = dragState.scrollLeft - deltaX;
      event.currentTarget.scrollTop = dragState.scrollTop - deltaY;
    }
  }, []);

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
    const viewport = posterViewportRef.current;
    if (!viewport) {
      return;
    }

    zoomRef.current = DEFAULT_ZOOM;
    setZoomScale(DEFAULT_ZOOM);
    pendingWheelDeltaRef.current = 0;
    if (zoomFrameRef.current) {
      window.cancelAnimationFrame(zoomFrameRef.current);
      zoomFrameRef.current = 0;
    }
    viewport.style.setProperty('--tile-size', formatPixelValue(tileBaseSize));
    viewport.scrollLeft = 0;
    viewport.scrollTop = 0;
  }, [selectedView, tileBaseSize]);

  useEffect(
    () => () => {
      if (zoomFrameRef.current) {
        window.cancelAnimationFrame(zoomFrameRef.current);
      }
    },
    [],
  );

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Classic HSK 1-6 word maps</p>
          <h1>
            {selectedView === 'all'
              ? 'All HSK Level Overview'
              : `${selectedViewMeta.label} Visual Tile Map`}
          </h1>
          <p className="hero-copy">
            {selectedView === 'all'
              ? 'Choose a level to study, scan progress, and use search or filters to see where matching words live.'
              : 'A compact word wall for scanning, hearing, zooming, and marking Mandarin vocabulary by level.'}
          </p>
        </div>
        <div className="progress-card" aria-label="Progress summary">
          <div>
            <span className="progress-number">{stats.known}</span>
            <span className="progress-label">Know</span>
          </div>
          <div>
            <span className="progress-number">{stats.learning}</span>
            <span className="progress-label">Learning</span>
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
            placeholder="Chinese, pinyin, or English"
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
          <div
            ref={posterViewportRef}
            className="poster-scroll"
            onClickCapture={handleMapClickCapture}
            onPointerCancel={handleMapPointerEnd}
            onPointerDown={handleMapPointerDown}
            onPointerMove={handleMapPointerMove}
            onPointerUp={handleMapPointerEnd}
            onWheel={handleMapWheel}
            aria-label={`${selectedViewMeta.label} scrollable word map`}
            role="region"
            style={
              {
                '--tile-size': formatPixelValue(tileBaseSize * zoomScale),
              } as React.CSSProperties
            }
          >
            {hasVisibleWords ? (
              <div className="poster-zoom-space">
                <div className="poster-board" ref={posterBoardRef}>
                  <div
                    className="tile-grid level-word-grid"
                    aria-label={selectedViewMeta.label}
                    style={
                      {
                        '--level-rows': levelGridRows,
                      } as React.CSSProperties
                    }
                  >
                    {visibleWords.map((word) => (
                      <TileButton
                        isPulsing={pulsingWordId === word.id}
                        key={word.id}
                        onSelect={setSelectedWord}
                        status={progress[word.id]}
                        word={word}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <h2>No words match this view.</h2>
                <p>Try a different search or progress filter.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {selectedWord ? (
        <DetailModal
          audioAvailable={(selectedWord.level ?? 1) <= 4}
          onClearStatus={handleClearStatus}
          onClose={() => setSelectedWord(null)}
          onSetStatus={handleSetStatus}
          onSpeak={handleSpeak}
          speechMessage={speech.message}
          speechSupported={speech.supported}
          status={progress[selectedWord.id]}
          word={selectedWord}
        />
      ) : null}
    </main>
  );
}

export default App;

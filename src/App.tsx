import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import HanziWriter, { type StrokeData } from 'hanzi-writer';
import { HSK_LEVEL_OPTIONS, HSK_WORDS_BY_LEVEL } from './data/hsk';
import { useMandarinSpeech } from './hooks/useMandarinSpeech';
import { useProgress } from './hooks/useProgress';
import type { HskLevel, HskWord, WordStatus } from './types';

type FilterMode = 'all' | 'learning' | 'know' | 'unmarked';
type HskView = HskLevel | 'all';
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
const MIN_VISIBLE_MAP_EDGE = 96;
const HSK4_WORD_MAP_SPLIT_INDEX = 300;
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
const WRITING_PRACTICE_LEVELS = new Set<HskLevel>([1, 2, 3, 4, 5, 6]);

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
      draggable={false}
      type="button"
      onClick={() => onSelect(word)}
      aria-label={`${word.hanzi}, ${word.pinyin}, ${word.meaning}`}
      style={tileStyle}
    >
      <span className="tile-hanzi">{tileLabel}</span>
    </button>
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
              <span className="modal-meaning">{word.meaning}</span>
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
                  <p className="sentence-meaning">{word.exampleSentence.meaning}</p>
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
            <div className="modal-status-actions">
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
          Resetting {label} will permanently remove your saved Know and Learning marks for this
          study set, including words hidden by search or filters.
        </p>

        <div className="reset-dialog-summary" aria-label={`${label} saved progress summary`}>
          <span>
            <strong>{knownCount}</strong>
            Know
          </span>
          <span>
            <strong>{learningCount}</strong>
            Learning
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
  const isModalOpen = Boolean(selectedWord) || isResetDialogOpen;
  const visibleWordGroups = useMemo(
    () => getVisibleWordGroups(selectedView, visibleWords),
    [selectedView, visibleWords],
  );
  const isSplitWordGrid = visibleWordGroups.length > 1;
  const tileBaseSize = TILE_BASE_SIZE;
  const levelGridRows = selectedView === 6 ? 30 : selectedView === 5 ? 24 : 6;

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
    const scaledWidth = (board.offsetWidth / renderedScale) * scale;
    const scaledHeight = (board.offsetHeight / renderedScale) * scale;
    const viewportWidth = viewport.clientWidth;
    const viewportHeight = viewport.clientHeight;
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
      speech.speak(word.hanzi, getWordAudioSrc(word));
    },
    [speech],
  );

  const handleMapWheel = useCallback(
    (event: React.WheelEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const viewport = event.currentTarget;
      const rect = viewport.getBoundingClientRect();
      const cursorX = event.clientX - rect.left - viewport.clientLeft;
      const cursorY = event.clientY - rect.top - viewport.clientTop;
      const currentCamera = mapCameraRef.current;
      const currentScale = Math.max(currentCamera.scale, 0.001);
      const horizontalDelta =
        Math.abs(event.deltaX) > WHEEL_DELTA_THRESHOLD ? event.deltaX : event.shiftKey ? event.deltaY : 0;
      const zoomDelta = event.shiftKey ? 0 : event.deltaY;
      const nextScale =
        Math.abs(zoomDelta) > WHEEL_DELTA_THRESHOLD
          ? clampZoom(currentScale * Math.exp(-zoomDelta * ZOOM_SENSITIVITY))
          : currentScale;
      const shouldPanHorizontally = Math.abs(horizontalDelta) > WHEEL_DELTA_THRESHOLD;
      const shouldZoom = Math.abs(nextScale - currentScale) >= 0.0005;

      if (!shouldZoom && !shouldPanHorizontally) {
        return;
      }

      const mapX = (cursorX - currentCamera.panX) / currentScale;
      const mapY = (cursorY - currentCamera.panY) / currentScale;
      const nextPanX = shouldZoom ? cursorX - mapX * nextScale : currentCamera.panX;
      const nextPanY = shouldZoom ? cursorY - mapY * nextScale : currentCamera.panY;

      commitMapCamera({
        panX: nextPanX - horizontalDelta * WHEEL_PAN_SENSITIVITY,
        panY: nextPanY,
        scale: nextScale,
      });
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
          isAudioPlaying={speech.isPlaying}
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

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { MandarinSpeechCopy } from '../uiCopy';

const DEFAULT_SPEECH_COPY: MandarinSpeechCopy = {
  audioUnavailable: 'Audio playback is not available in this browser.',
  noMandarinVoice: 'No Mandarin voice is installed, so your browser will use its default voice.',
  customAudioFallbackUnavailable: 'Custom audio could not play, and speech synthesis is not available in this browser.',
  usingBrowserFallbackAudio: 'Using browser fallback audio.',
  usingBrowserAudio: 'Using browser audio.',
  audioCouldNotPlay: (error) => `Audio could not play: ${error}.`,
};

type SpeechError =
  | { type: 'customAudioFallbackUnavailable' }
  | { type: 'audioCouldNotPlay'; error: string };
type SourceMessage = 'browserFallbackAudio' | 'browserAudio';
type AudioLoadState = 'idle' | 'loading' | 'ready' | 'failed';
type AudioIntentSource = 'pointerdown' | 'focus' | 'hover';
type PreloadReason = 'hover' | 'modal';
type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};
type PrefetchOptions = {
  intent?: AudioIntentSource;
};
type PreloadOptions = {
  force?: boolean;
  reason?: PreloadReason;
};
type WarmupOptions = {
  intent?: AudioIntentSource;
};
type AudioLatencyRecord = {
  audioSrc: string | null;
  fallbackActivateAt?: number;
  intentAt?: number;
  intentSource?: AudioIntentSource;
  loadStateAtPlayClick?: AudioLoadState;
  modalPreloadAt?: number;
  playClickAt?: number;
};

const DEV_LATENCY_LOGGING = import.meta.env.DEV;
const LATENCY_LOG_PREFIX = '[audio-latency]';

function getVoices(): SpeechSynthesisVoice[] {
  if (!('speechSynthesis' in window)) {
    return [];
  }

  return window.speechSynthesis.getVoices();
}

function getVoiceMatchScore(voice: SpeechSynthesisVoice) {
  const haystack = `${voice.lang} ${voice.name}`.toLowerCase();

  if (haystack.includes('zh-cn') || haystack.includes('cmn-hans-cn') || haystack.includes('china')) {
    return 4;
  }

  if (haystack.includes('mandarin')) {
    return 3;
  }

  if (haystack.includes('chinese')) {
    return 2;
  }

  if (haystack.includes('zh') || haystack.includes('cmn')) {
    return 1;
  }

  return 0;
}

function pickMandarinVoice(voices: SpeechSynthesisVoice[]) {
  return [...voices].sort((a, b) => getVoiceMatchScore(b) - getVoiceMatchScore(a))[0];
}

function resolveAudioSrc(audioSrc?: string) {
  if (!audioSrc || typeof window === 'undefined') {
    return null;
  }

  return new URL(audioSrc, window.location.href).href;
}

function resetAudioElement(audio: HTMLAudioElement) {
  audio.oncanplaythrough = null;
  audio.onended = null;
  audio.onerror = null;
  audio.onloadeddata = null;
  audio.onplay = null;
  audio.pause();
  audio.removeAttribute('src');
  audio.load();
}

function getLatencyKey(text: string, resolvedSrc: string | null) {
  return resolvedSrc ?? `speech:${text}`;
}

export function useMandarinSpeech(copy: MandarinSpeechCopy = DEFAULT_SPEECH_COPY) {
  const [audioStates, setAudioStates] = useState<Record<string, AudioLoadState>>({});
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [lastError, setLastError] = useState<SpeechError | null>(null);
  const [sourceMessage, setSourceMessage] = useState<SourceMessage | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAudioSrc, setActiveAudioSrc] = useState<string | null>(null);
  const [isPlayPending, setIsPlayPending] = useState(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const preloadedAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioStatesRef = useRef<Record<string, AudioLoadState>>({});
  const fetchPrefetchesRef = useRef(new Map<string, Promise<void>>());
  const latencyRecordsRef = useRef(new Map<string, AudioLatencyRecord>());
  const playbackIdRef = useRef(0);
  const browserSpeechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const audioElementSupported = typeof window !== 'undefined' && 'Audio' in window;
  const supported = browserSpeechSupported || audioElementSupported;

  const setAudioState = useCallback((audioSrc: string, nextState: AudioLoadState) => {
    setAudioStates((current) => {
      if (current[audioSrc] === nextState) {
        return current;
      }

      const next = {
        ...current,
        [audioSrc]: nextState,
      };
      audioStatesRef.current = next;
      return next;
    });
  }, []);

  const updateLatencyRecord = useCallback(
    (key: string, updater: (current: AudioLatencyRecord) => AudioLatencyRecord) => {
      if (!DEV_LATENCY_LOGGING || typeof performance === 'undefined') {
        return;
      }

      const current = latencyRecordsRef.current.get(key) ?? { audioSrc: null };
      latencyRecordsRef.current.set(key, updater(current));
    },
    [],
  );

  const logLatency = useCallback(
    ({
      audioSrc,
      event,
      key,
      loadState,
      source,
    }: {
      audioSrc: string | null;
      event: 'audio-onplay' | 'speech-onstart' | 'fallback-activate';
      key: string;
      loadState: AudioLoadState;
      source: 'audio element' | 'speech synthesis';
    }) => {
      if (!DEV_LATENCY_LOGGING || typeof performance === 'undefined') {
        return;
      }

      const eventAt = performance.now();
      const current = latencyRecordsRef.current.get(key) ?? { audioSrc };
      const nextRecord =
        event === 'fallback-activate'
          ? { ...current, audioSrc, fallbackActivateAt: eventAt }
          : { ...current, audioSrc };

      latencyRecordsRef.current.set(key, nextRecord);

      console.debug(LATENCY_LOG_PREFIX, {
        audioSrc,
        elapsedMs: {
          fallbackToEvent:
            nextRecord.fallbackActivateAt === undefined ? null : Math.round(eventAt - nextRecord.fallbackActivateAt),
          intentToEvent:
            nextRecord.intentAt === undefined ? null : Math.round(eventAt - nextRecord.intentAt),
          modalPreloadToEvent:
            nextRecord.modalPreloadAt === undefined ? null : Math.round(eventAt - nextRecord.modalPreloadAt),
          playClickToEvent:
            nextRecord.playClickAt === undefined ? null : Math.round(eventAt - nextRecord.playClickAt),
        },
        event,
        intentSource: nextRecord.intentSource ?? null,
        loadState,
        loadStateAtPlayClick: nextRecord.loadStateAtPlayClick ?? 'idle',
        source,
        timestampsMs: {
          event: eventAt,
          fallbackActivate: nextRecord.fallbackActivateAt ?? null,
          intent: nextRecord.intentAt ?? null,
          modalPreload: nextRecord.modalPreloadAt ?? null,
          playClick: nextRecord.playClickAt ?? null,
        },
      });
    },
    [],
  );

  useEffect(() => {
    if (!browserSpeechSupported) {
      return undefined;
    }

    const updateVoices = () => setVoices(getVoices());
    const voiceTimers = [window.setTimeout(updateVoices, 250), window.setTimeout(updateVoices, 1000)];

    updateVoices();
    window.speechSynthesis.addEventListener('voiceschanged', updateVoices);

    return () => {
      voiceTimers.forEach((timer) => window.clearTimeout(timer));
      window.speechSynthesis.removeEventListener('voiceschanged', updateVoices);
    };
  }, [browserSpeechSupported]);

  const mandarinVoice = useMemo(() => {
    const bestVoice = pickMandarinVoice(voices);
    return bestVoice && getVoiceMatchScore(bestVoice) > 0 ? bestVoice : undefined;
  }, [voices]);

  const message = useMemo(() => {
    if (!supported) {
      return copy.audioUnavailable;
    }

    if (lastError) {
      return lastError.type === 'customAudioFallbackUnavailable'
        ? copy.customAudioFallbackUnavailable
        : copy.audioCouldNotPlay(lastError.error);
    }

    if (sourceMessage) {
      return sourceMessage === 'browserFallbackAudio'
        ? copy.usingBrowserFallbackAudio
        : copy.usingBrowserAudio;
    }

    if (voices.length > 0 && !mandarinVoice) {
      return copy.noMandarinVoice;
    }

    return null;
  }, [copy, lastError, mandarinVoice, sourceMessage, supported, voices.length]);

  const stopCurrentAudio = useCallback(() => {
    playbackIdRef.current += 1;
    setActiveAudioSrc(null);
    setIsPlayPending(false);
    setIsPlaying(false);

    if (!currentAudioRef.current) {
      return;
    }

    resetAudioElement(currentAudioRef.current);
    currentAudioRef.current = null;
  }, []);

  const clearPreloadedAudio = useCallback(() => {
    if (!preloadedAudioRef.current) {
      return;
    }

    resetAudioElement(preloadedAudioRef.current);
    preloadedAudioRef.current = null;
  }, []);

  const prefetch = useCallback(
    (audioSrc?: string, options?: PrefetchOptions) => {
      const resolvedSrc = resolveAudioSrc(audioSrc);
      if (resolvedSrc && options?.intent) {
        updateLatencyRecord(resolvedSrc, (current) => ({
          ...current,
          audioSrc: resolvedSrc,
          intentAt: performance.now(),
          intentSource: options.intent,
        }));
      }

      if (
        !audioSrc ||
        !audioElementSupported ||
        typeof fetch !== 'function' ||
        (navigator as NavigatorWithConnection).connection?.saveData === true
      ) {
        return;
      }

      if (!resolvedSrc) {
        return;
      }

      const currentState = audioStatesRef.current[resolvedSrc] ?? 'idle';
      if (
        currentState === 'loading' ||
        currentState === 'ready' ||
        fetchPrefetchesRef.current.has(resolvedSrc)
      ) {
        return;
      }

      setAudioState(resolvedSrc, 'loading');
      const request = fetch(audioSrc, { cache: 'force-cache' })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          return response.arrayBuffer();
        })
        .then(() => {
          setAudioState(resolvedSrc, 'ready');
        })
        .catch(() => {
          setAudioState(resolvedSrc, 'failed');
        })
        .finally(() => {
          fetchPrefetchesRef.current.delete(resolvedSrc);
        });

      fetchPrefetchesRef.current.set(resolvedSrc, request);
    },
    [audioElementSupported, setAudioState, updateLatencyRecord],
  );

  const preload = useCallback(
    (audioSrc?: string, options?: PreloadOptions) => {
      if (!audioSrc || !audioElementSupported || typeof window === 'undefined') {
        clearPreloadedAudio();
        return;
      }

      const resolvedSrc = resolveAudioSrc(audioSrc);
      if (!resolvedSrc) {
        clearPreloadedAudio();
        return;
      }

      if (options?.reason === 'modal') {
        updateLatencyRecord(resolvedSrc, (current) => ({
          ...current,
          audioSrc: resolvedSrc,
          modalPreloadAt: performance.now(),
        }));
      }

      if (preloadedAudioRef.current?.src === resolvedSrc) {
        return;
      }

      const currentState = audioStatesRef.current[resolvedSrc] ?? 'idle';
      if (!options?.force && (currentState === 'loading' || currentState === 'ready')) {
        return;
      }

      if (currentState !== 'ready') {
        setAudioState(resolvedSrc, 'loading');
      }

      clearPreloadedAudio();
      const audio = new Audio();
      audio.preload = 'auto';
      audio.oncanplaythrough = () => setAudioState(resolvedSrc, 'ready');
      audio.onloadeddata = () => setAudioState(resolvedSrc, 'ready');
      audio.onerror = () => setAudioState(resolvedSrc, 'failed');
      audio.src = audioSrc;
      audio.load();
      preloadedAudioRef.current = audio;
    },
    [audioElementSupported, clearPreloadedAudio, setAudioState, updateLatencyRecord],
  );

  const warmup = useCallback(
    (audioSrc?: string, options?: WarmupOptions) => {
      const resolvedSrc = resolveAudioSrc(audioSrc);
      if (!audioSrc || !resolvedSrc) {
        return;
      }

      const currentState = audioStatesRef.current[resolvedSrc] ?? 'idle';
      if (currentState === 'loading' || currentState === 'ready') {
        return;
      }

      prefetch(audioSrc, { intent: options?.intent ?? 'hover' });
      preload(audioSrc, { force: true, reason: 'hover' });
    },
    [prefetch, preload],
  );

  useEffect(() => clearPreloadedAudio, [clearPreloadedAudio]);

  const getAudioFeedback = useCallback(
    (audioSrc?: string) => {
      const resolvedSrc = resolveAudioSrc(audioSrc);
      const isCurrentSrc = resolvedSrc ? activeAudioSrc === resolvedSrc : activeAudioSrc === null;
      const loadState = resolvedSrc ? audioStates[resolvedSrc] ?? 'idle' : 'idle';
      const isPending = isCurrentSrc && isPlayPending;
      const isCurrentAudioPlaying = isCurrentSrc && isPlaying;

      return {
        isActive: loadState === 'loading' || isPending || isCurrentAudioPlaying,
        isPending,
        isPlaying: isCurrentAudioPlaying,
        loadState,
      };
    },
    [activeAudioSrc, audioStates, isPlayPending, isPlaying],
  );

  const speak = useCallback(
    (text: string, audioSrc?: string) => {
      if (!supported || typeof window === 'undefined') {
        return;
      }

      setLastError(null);
      setSourceMessage(null);
      stopCurrentAudio();
      const playbackId = playbackIdRef.current;
      const resolvedSrc = resolveAudioSrc(audioSrc);
      const latencyKey = getLatencyKey(text, resolvedSrc);

      updateLatencyRecord(latencyKey, (current) => ({
        ...current,
        audioSrc: resolvedSrc,
        fallbackActivateAt: undefined,
        loadStateAtPlayClick: resolvedSrc ? audioStatesRef.current[resolvedSrc] ?? 'idle' : 'idle',
        playClickAt: performance.now(),
      }));

      if (browserSpeechSupported) {
        window.speechSynthesis.cancel();
      }

      const speakWithBrowserVoice = () => {
        if (!browserSpeechSupported) {
          setActiveAudioSrc(null);
          setIsPlayPending(false);
          setLastError({ type: 'customAudioFallbackUnavailable' });
          return;
        }

        if (resolvedSrc) {
          logLatency({
            audioSrc: resolvedSrc,
            event: 'fallback-activate',
            key: latencyKey,
            loadState: 'failed',
            source: 'speech synthesis',
          });
        }

        setSourceMessage(audioSrc ? 'browserFallbackAudio' : 'browserAudio');

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.82;
        utterance.pitch = 1;
        utterance.volume = 1;
        utterance.onstart = () => {
          if (playbackIdRef.current === playbackId) {
            setIsPlayPending(false);
            setIsPlaying(true);
          }
          logLatency({
            audioSrc: resolvedSrc,
            event: 'speech-onstart',
            key: latencyKey,
            loadState: resolvedSrc ? 'failed' : 'idle',
            source: 'speech synthesis',
          });
        };
        utterance.onend = () => {
          if (playbackIdRef.current === playbackId) {
            setActiveAudioSrc(null);
            setIsPlayPending(false);
            setIsPlaying(false);
          }
        };
        utterance.onerror = (event) => {
          if (playbackIdRef.current === playbackId) {
            setActiveAudioSrc(null);
            setIsPlayPending(false);
            setIsPlaying(false);
            setLastError({ type: 'audioCouldNotPlay', error: event.error });
          }
        };

        if (mandarinVoice) {
          utterance.voice = mandarinVoice;
          utterance.lang = mandarinVoice.lang || 'zh-CN';
        }

        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }

        window.speechSynthesis.speak(utterance);
        window.setTimeout(() => window.speechSynthesis.resume(), 0);
      };

      if (audioSrc && audioElementSupported && resolvedSrc) {
        const preloadedAudio =
          preloadedAudioRef.current?.src === resolvedSrc ? preloadedAudioRef.current : null;
        const audio = preloadedAudio ?? new Audio(audioSrc);
        let handledAudioFailure = false;
        setActiveAudioSrc(resolvedSrc);
        setIsPlayPending(true);

        if (preloadedAudio) {
          preloadedAudioRef.current = null;
        }

        if ((audioStatesRef.current[resolvedSrc] ?? 'idle') !== 'ready') {
          setAudioState(resolvedSrc, 'loading');
        }

        audio.preload = 'auto';
        audio.currentTime = 0;
        currentAudioRef.current = audio;
        audio.onended = () => {
          if (currentAudioRef.current === audio) {
            currentAudioRef.current = null;
            preloadedAudioRef.current = audio;
          }
          if (playbackIdRef.current === playbackId) {
            setActiveAudioSrc(null);
            setIsPlayPending(false);
            setIsPlaying(false);
          }
        };
        audio.onplay = () => {
          if (playbackIdRef.current === playbackId) {
            setAudioState(resolvedSrc, 'ready');
            setIsPlayPending(false);
            setIsPlaying(true);
          }
          logLatency({
            audioSrc: resolvedSrc,
            event: 'audio-onplay',
            key: latencyKey,
            loadState: 'ready',
            source: 'audio element',
          });
        };
        audio.onerror = () => {
          if (handledAudioFailure) {
            return;
          }
          handledAudioFailure = true;
          if (currentAudioRef.current === audio) {
            currentAudioRef.current = null;
          }
          setAudioState(resolvedSrc, 'failed');
          if (playbackIdRef.current === playbackId) {
            setIsPlaying(false);
          }
          speakWithBrowserVoice();
        };

        void audio.play().catch(() => {
          if (handledAudioFailure) {
            return;
          }
          handledAudioFailure = true;
          if (currentAudioRef.current === audio) {
            currentAudioRef.current = null;
          }
          setAudioState(resolvedSrc, 'failed');
          if (playbackIdRef.current === playbackId) {
            setIsPlaying(false);
          }
          speakWithBrowserVoice();
        });
        return;
      }

      setActiveAudioSrc(null);
      setIsPlayPending(false);
      speakWithBrowserVoice();
    },
    [
      audioElementSupported,
      browserSpeechSupported,
      logLatency,
      mandarinVoice,
      setAudioState,
      stopCurrentAudio,
      supported,
      updateLatencyRecord,
    ],
  );

  return { getAudioFeedback, isPlaying, message, preload, prefetch, supported, speak, warmup };
}

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

export function useMandarinSpeech(copy: MandarinSpeechCopy = DEFAULT_SPEECH_COPY) {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [lastError, setLastError] = useState<SpeechError | null>(null);
  const [sourceMessage, setSourceMessage] = useState<SourceMessage | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const preloadedAudioRef = useRef<HTMLAudioElement | null>(null);
  const playbackIdRef = useRef(0);
  const browserSpeechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const audioElementSupported = typeof window !== 'undefined' && 'Audio' in window;
  const supported = browserSpeechSupported || audioElementSupported;

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
    setIsPlaying(false);

    if (!currentAudioRef.current) {
      return;
    }

    currentAudioRef.current.pause();
    currentAudioRef.current.removeAttribute('src');
    currentAudioRef.current.load();
    currentAudioRef.current = null;
  }, []);

  const clearPreloadedAudio = useCallback(() => {
    if (!preloadedAudioRef.current) {
      return;
    }

    preloadedAudioRef.current.pause();
    preloadedAudioRef.current.removeAttribute('src');
    preloadedAudioRef.current.load();
    preloadedAudioRef.current = null;
  }, []);

  const preload = useCallback(
    (audioSrc?: string) => {
      if (!audioSrc || !audioElementSupported || typeof window === 'undefined') {
        clearPreloadedAudio();
        return;
      }

      const resolvedSrc = new URL(audioSrc, window.location.href).href;
      if (preloadedAudioRef.current?.src === resolvedSrc) {
        return;
      }

      clearPreloadedAudio();
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = audioSrc;
      audio.load();
      preloadedAudioRef.current = audio;
    },
    [audioElementSupported, clearPreloadedAudio],
  );

  useEffect(() => clearPreloadedAudio, [clearPreloadedAudio]);

  const speak = useCallback(
    (text: string, audioSrc?: string) => {
      if (!supported || typeof window === 'undefined') {
        return;
      }

      setLastError(null);
      setSourceMessage(null);
      stopCurrentAudio();
      const playbackId = playbackIdRef.current;

      if (browserSpeechSupported) {
        window.speechSynthesis.cancel();
      }

      const speakWithBrowserVoice = () => {
        if (!browserSpeechSupported) {
          setLastError({ type: 'customAudioFallbackUnavailable' });
          return;
        }

        setSourceMessage(audioSrc ? 'browserFallbackAudio' : 'browserAudio');

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.82;
        utterance.pitch = 1;
        utterance.volume = 1;
        utterance.onstart = () => {
          if (playbackIdRef.current === playbackId) {
            setIsPlaying(true);
          }
        };
        utterance.onend = () => {
          if (playbackIdRef.current === playbackId) {
            setIsPlaying(false);
          }
        };
        utterance.onerror = (event) => {
          if (playbackIdRef.current === playbackId) {
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

      if (audioSrc && audioElementSupported) {
        const resolvedSrc = new URL(audioSrc, window.location.href).href;
        const preloadedAudio =
          preloadedAudioRef.current?.src === resolvedSrc ? preloadedAudioRef.current : null;
        const audio = preloadedAudio ?? new Audio(audioSrc);

        if (preloadedAudio) {
          preloadedAudioRef.current = null;
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
            setIsPlaying(false);
          }
        };
        audio.onplay = () => {
          if (playbackIdRef.current === playbackId) {
            setIsPlaying(true);
          }
        };
        audio.onerror = () => {
          if (currentAudioRef.current === audio) {
            currentAudioRef.current = null;
          }
          if (playbackIdRef.current === playbackId) {
            setIsPlaying(false);
          }
          speakWithBrowserVoice();
        };

        void audio.play().catch(() => {
          if (currentAudioRef.current === audio) {
            currentAudioRef.current = null;
          }
          if (playbackIdRef.current === playbackId) {
            setIsPlaying(false);
          }
          speakWithBrowserVoice();
        });
        return;
      }

      speakWithBrowserVoice();
    },
    [audioElementSupported, browserSpeechSupported, copy, mandarinVoice, stopCurrentAudio, supported],
  );

  return { isPlaying, message, preload, supported, speak };
}

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

export function useMandarinSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [lastError, setLastError] = useState<string | null>(null);
  const [sourceMessage, setSourceMessage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
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
      return 'Audio playback is not available in this browser.';
    }

    if (lastError) {
      return lastError;
    }

    if (sourceMessage) {
      return sourceMessage;
    }

    if (voices.length > 0 && !mandarinVoice) {
      return 'No Mandarin voice is installed, so your browser will use its default voice.';
    }

    return null;
  }, [lastError, mandarinVoice, sourceMessage, supported, voices.length]);

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
          setLastError('Custom audio could not play, and speech synthesis is not available in this browser.');
          return;
        }

        setSourceMessage(audioSrc ? 'Using browser fallback audio.' : 'Using browser audio.');

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
            setLastError(`Audio could not play: ${event.error}.`);
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
        const audio = new Audio(audioSrc);
        currentAudioRef.current = audio;
        audio.onended = () => {
          if (currentAudioRef.current === audio) {
            currentAudioRef.current = null;
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
    [audioElementSupported, browserSpeechSupported, mandarinVoice, stopCurrentAudio, supported],
  );

  return { isPlaying, message, supported, speak };
}

import { useCallback, useEffect, useMemo, useState } from 'react';

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
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    if (!supported) {
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
  }, [supported]);

  const mandarinVoice = useMemo(() => {
    const bestVoice = pickMandarinVoice(voices);
    return bestVoice && getVoiceMatchScore(bestVoice) > 0 ? bestVoice : undefined;
  }, [voices]);

  const message = useMemo(() => {
    if (!supported) {
      return 'Speech synthesis is not available in this browser.';
    }

    if (lastError) {
      return lastError;
    }

    if (voices.length > 0 && !mandarinVoice) {
      return 'No Mandarin voice is installed, so your browser will use its default voice.';
    }

    return null;
  }, [lastError, mandarinVoice, supported, voices.length]);

  const speak = useCallback(
    (text: string) => {
      if (!supported) {
        return;
      }

      setLastError(null);
      window.speechSynthesis.cancel();

      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.82;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.onerror = (event) => {
        setLastError(`Audio could not play: ${event.error}.`);
      };

      if (mandarinVoice) {
        utterance.voice = mandarinVoice;
        utterance.lang = mandarinVoice.lang || 'zh-CN';
      }

      window.speechSynthesis.speak(utterance);
      window.setTimeout(() => window.speechSynthesis.resume(), 0);
    },
    [mandarinVoice, supported],
  );

  return { message, supported, speak };
}

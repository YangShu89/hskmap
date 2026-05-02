import { useCallback, useEffect, useState } from 'react';
import type { ProgressMap, WordStatus } from '../types';

const STORAGE_KEY = 'hsk-demo:v1:progress';

function readProgress(): ProgressMap {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {};
    }

    const progress: ProgressMap = {};
    for (const [id, status] of Object.entries(parsed)) {
      if (status === 'know' || status === 'learning') {
        progress[id] = status;
      }
    }

    return progress;
  } catch {
    return {};
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>(() => readProgress());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const setWordStatus = useCallback((wordId: string, status: WordStatus) => {
    setProgress((current) => ({ ...current, [wordId]: status }));
  }, []);

  const clearWordStatus = useCallback((wordId: string) => {
    setProgress((current) => {
      const next = { ...current };
      delete next[wordId];
      return next;
    });
  }, []);

  const resetProgress = useCallback((wordIds?: string[]) => {
    if (!wordIds) {
      setProgress({});
      return;
    }

    const idsToReset = new Set(wordIds);
    setProgress((current) => {
      const next = { ...current };
      for (const id of idsToReset) {
        delete next[id];
      }
      return next;
    });
  }, []);

  return { progress, setWordStatus, clearWordStatus, resetProgress };
}

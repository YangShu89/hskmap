import type { HskLevel, HskWord } from '../types';

const levelCache = new Map<HskLevel, Promise<HskWord[]>>();

export function loadHskLevel(level: HskLevel): Promise<HskWord[]> {
  const cached = levelCache.get(level);
  if (cached) {
    return cached;
  }

  const loaded = (async () => {
    switch (level) {
      case 1:
        return (await import('./hskLevel1')).HSK1_LEVEL_WORDS;
      case 2:
        return (await import('./hskLevel2')).HSK2_WORDS;
      case 3:
        return (await import('./hskLevel3')).HSK3_WORDS;
      case 4:
        return (await import('./hskLevel4')).HSK4_WORDS;
      case 5:
        return (await import('./hskLevel5')).HSK5_WORDS;
      case 6:
        return (await import('./hskLevel6')).HSK6_WORDS;
      default: {
        const exhaustiveCheck: never = level;
        throw new Error(`Unsupported HSK level: ${exhaustiveCheck}`);
      }
    }
  })();

  levelCache.set(level, loaded);
  loaded.catch(() => {
    levelCache.delete(level);
  });
  return loaded;
}

export async function loadHskLevels(
  levels: readonly HskLevel[],
): Promise<Record<HskLevel, HskWord[]>> {
  const entries = await Promise.all(
    levels.map(async (level) => [level, await loadHskLevel(level)] as const),
  );

  return Object.fromEntries(entries) as Record<HskLevel, HskWord[]>;
}

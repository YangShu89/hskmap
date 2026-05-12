import { buildWords } from './hskBuild';
import { HSK5_RAW } from './hsk5Raw';
import { HSK5_SENTENCES } from './hsk5Sentences';
import { getHsk5Meaning, getHsk5Senses } from './hsk5Senses';

export const HSK5_WORDS = buildWords(5, HSK5_RAW).map((word) => {
  const senses = getHsk5Senses(word);

  return {
    ...word,
    meaning: getHsk5Meaning(word, senses),
    exampleSentence: HSK5_SENTENCES[word.id],
    senses,
  };
});

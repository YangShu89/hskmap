import { buildWords } from './hskBuild';
import { HSK4_RAW } from './hsk4Raw';
import { getHsk4Senses } from './hsk4Senses';
import { HSK4_SENTENCES } from './hsk4Sentences';

export const HSK4_WORDS = buildWords(4, HSK4_RAW).map((word) => {
  const wordWithSentence = {
    ...word,
    exampleSentence: HSK4_SENTENCES[word.id],
  };
  const senses = getHsk4Senses(wordWithSentence);

  return senses
    ? {
        ...wordWithSentence,
        senses,
      }
    : wordWithSentence;
});

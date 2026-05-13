import { buildWords } from './hskBuild';
import { HSK6_RAW } from './hsk6Raw';
import { HSK6_SENTENCES } from './hsk6Sentences';
import { getHsk6Meaning, getHsk6Senses } from './hsk6Senses';

export const HSK6_WORDS = buildWords(6, HSK6_RAW).map((word) => {
  const senses = getHsk6Senses(word);

  return senses
    ? {
        ...word,
        meaning: getHsk6Meaning(word, senses),
        exampleSentence: HSK6_SENTENCES[word.id],
        senses,
      }
    : {
        ...word,
        exampleSentence: HSK6_SENTENCES[word.id],
      };
});

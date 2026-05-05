# Official Vocabulary Source Files

Primary canonical input:

- `official-syllabus.pdf`

Generated intermediate:

- `officialVocabulary.tsv`

Preferred workflow:

1. Download the official CTI syllabus PDF to this folder.
2. Run `npm run hsk3:extract`.
3. Run `npm run hsk3:import`.
4. Run `npm run hsk3:validate`.

The generated TSV is UTF-8 and includes these headers:

- `sequence`
- `level`
- `levelLabel`
- `additionalLevels`
- `hanzi`
- `pinyin`
- `partOfSpeech`

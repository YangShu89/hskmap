# HSK 3.0 Data Scaffold

This folder is the canonical namespace for the new `HSK 3.0` standard.

What is committed here now:

- `sourceManifest.json`: official source-of-truth metadata for the CTI syllabus PDF
- `metadata.ts`: typed level metadata and official word-count summaries
- `officialVocabulary.json`: placeholder for the imported official vocabulary entries
- `source/README.md`: instructions for preparing the TSV import input

What is intentionally not committed yet:

- parsed level data for HSK 3.0
- reused sentence/audio mappings
- any UI switch between classic HSK and HSK 3.0

Import flow:

1. Download the official CTI syllabus PDF into `src/data/hsk3/source/official-syllabus.pdf`.
2. Run `npm run hsk3:extract`.
3. Run `npm run hsk3:import`.
4. Run `npm run hsk3:validate`.

The existing app still uses the classic `HSK 1-6` dataset. This scaffold is isolated so we can ingest HSK 3.0 without breaking the current product.

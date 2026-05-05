import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(projectRoot, 'dist');
const locales = [
  ['en', 'en'],
  ['es', 'es'],
  ['fr', 'fr'],
  ['ru', 'ru'],
  ['pt-br', 'pt-BR'],
  ['de', 'de'],
  ['ja', 'ja'],
  ['ko', 'ko'],
  ['vi', 'vi'],
  ['id', 'id'],
  ['ar', 'ar'],
];
const indexedHsk6Slugs = new Set(['en', 'ru', 'es', 'fr', 'de', 'pt-br', 'ko', 'ja', 'vi', 'id', 'ar']);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function readPage(...segments) {
  return fs.readFile(path.join(distDir, ...segments, 'index.html'), 'utf8');
}

function verifyCommon(html, label) {
  assert((html.match(/<h1\b/g) ?? []).length === 1, `${label}: expected exactly one h1`);
  assert(/<title>[^<]+<\/title>/.test(html), `${label}: missing title`);
  assert(/<meta name="description" content="[^"]+"/.test(html), `${label}: missing description`);
  assert(/<link rel="canonical" href="https:\/\/hskmap\.com\//.test(html), `${label}: missing canonical`);
  assert(/<script type="application\/ld\+json">/.test(html), `${label}: missing JSON-LD`);
}

async function main() {
  const rootHtml = await readPage();
  verifyCommon(rootHtml, '/');
  assert(rootHtml.includes('hreflang="x-default"'), '/: missing x-default hreflang');

  for (const [slug, hreflang] of locales) {
    const homeHtml = await readPage(slug);
    verifyCommon(homeHtml, `/${slug}/`);
    assert(homeHtml.includes(`hreflang="${hreflang}"`), `/${slug}/: missing self hreflang`);
    assert(homeHtml.includes(`lang="${hreflang}"`), `/${slug}/: missing html lang`);
    assert(homeHtml.includes('class="hsk-guide"'), `/${slug}/: missing localized HSK guide`);
    if (slug === 'en') {
      assert(homeHtml.includes('HSK vocabulary from HSK 1 to HSK 6'), '/en/: missing English guide content');
      assert(homeHtml.includes('How many words are in HSK 1 to HSK 6?'), '/en/: missing English FAQ content');
    } else {
      assert(!homeHtml.includes('Learn HSK vocabulary visually'), `/${slug}/: old generic SEO panel should not render`);
    }

    for (let level = 1; level <= 6; level += 1) {
      const levelHtml = await readPage(slug, `hsk-${level}`);
      verifyCommon(levelHtml, `/${slug}/hsk-${level}/`);
      assert(levelHtml.includes('seo-vocab-table'), `/${slug}/hsk-${level}/: missing vocabulary table`);
      assert(levelHtml.includes('class="hsk-guide"'), `/${slug}/hsk-${level}/: missing localized level guide`);
      if (slug === 'en') {
        assert(
          levelHtml.includes(`HSK ${level} vocabulary guide`),
          `/en/hsk-${level}/: missing English level guide`,
        );
      }

      if (level === 6 && slug !== 'en') {
        if (indexedHsk6Slugs.has(slug)) {
          assert(
            levelHtml.includes('<meta name="robots" content="index,follow" />'),
            `/${slug}/hsk-6/: expected translated HSK 6 locale to be indexable`,
          );
        } else {
          assert(
            levelHtml.includes('<meta name="robots" content="noindex,follow" />'),
            `/${slug}/hsk-6/: expected noindex until translations exist`,
          );
        }
      }
    }
  }

  const sitemap = await fs.readFile(path.join(distDir, 'sitemap.xml'), 'utf8');
  assert(sitemap.includes('https://hskmap.com/en/hsk-6/'), 'sitemap: missing English HSK 6');
  assert(sitemap.includes('https://hskmap.com/ru/hsk-6/'), 'sitemap: missing Russian HSK 6');
  assert(sitemap.includes('https://hskmap.com/es/hsk-6/'), 'sitemap: missing Spanish HSK 6');
  assert(sitemap.includes('https://hskmap.com/fr/hsk-6/'), 'sitemap: missing French HSK 6');
  assert(sitemap.includes('https://hskmap.com/de/hsk-6/'), 'sitemap: missing German HSK 6');
  assert(sitemap.includes('https://hskmap.com/pt-br/hsk-6/'), 'sitemap: missing Brazilian Portuguese HSK 6');
  assert(sitemap.includes('https://hskmap.com/ko/hsk-6/'), 'sitemap: missing Korean HSK 6');
  assert(sitemap.includes('https://hskmap.com/ja/hsk-6/'), 'sitemap: missing Japanese HSK 6');
  assert(sitemap.includes('https://hskmap.com/vi/hsk-6/'), 'sitemap: missing Vietnamese HSK 6');
  assert(sitemap.includes('https://hskmap.com/id/hsk-6/'), 'sitemap: missing Indonesian HSK 6');
  assert(sitemap.includes('https://hskmap.com/ar/hsk-6/'), 'sitemap: missing Arabic HSK 6');

  console.log('Static SEO verification passed.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

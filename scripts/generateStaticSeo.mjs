import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');
const distDir = path.join(projectRoot, 'dist');
const seoDataOutDir = path.join(projectRoot, 'node_modules', '.tmp', 'seo-data');
const seoDataEntry = path.join(projectRoot, 'scripts', 'seoDataEntry.ts');
const generatedEntryName = 'seoDataEntry.mjs';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeScriptJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function toUrlPath(filePath) {
  const relativePath = path.relative(distDir, filePath).split(path.sep).join('/');
  return `/${relativePath}`;
}

async function loadSeoData() {
  await build({
    configFile: false,
    logLevel: 'warn',
    build: {
      copyPublicDir: false,
      emptyOutDir: true,
      outDir: seoDataOutDir,
      ssr: seoDataEntry,
      rollupOptions: {
        output: {
          chunkFileNames: 'chunks/[name]-[hash].mjs',
          entryFileNames: generatedEntryName,
          format: 'es',
        },
      },
    },
  });

  const entryUrl = pathToFileURL(path.join(seoDataOutDir, generatedEntryName)).href;
  return import(`${entryUrl}?t=${Date.now()}`);
}

async function getTemplateAssets() {
  const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');
  const tags = template.match(/<script\b[^>]*><\/script>|<link\b[^>]*rel="stylesheet"[^>]*>/g) ?? [];
  return {
    app: tags.join('\n    '),
    css: tags.filter((tag) => tag.startsWith('<link')).join('\n    '),
  };
}

function getCanonical(pathname, data) {
  return new URL(pathname, data.HSKMAP_SITE_URL).href;
}

function isIndexableLevelPage(language, level, data) {
  if (!level || level !== 6 || language === 'en') {
    return true;
  }

  return data.getAvailableLocalizedLevels(language).includes(6);
}

function getAlternates({ level, data }) {
  const alternates = [];
  const defaultPath = level ? data.getLocalizedPath('en', level) : '/';
  alternates.push({ hreflang: 'x-default', href: getCanonical(defaultPath, data) });

  for (const locale of data.SEO_LOCALES) {
    if (level && !isIndexableLevelPage(locale.id, level, data)) {
      continue;
    }

    const pathForLocale = level ? data.getLocalizedPath(locale.id, level) : data.getLocalizedPath(locale.id);
    alternates.push({ hreflang: locale.hreflang, href: getCanonical(pathForLocale, data) });
  }

  return alternates;
}

function renderHead({
  assets,
  canonical,
  description,
  includeApp,
  jsonLd,
  locale,
  noindex,
  alternates,
  title,
}) {
  const ogLocale = locale.htmlLang.replace('-', '_');
  return `    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="robots" content="${noindex ? 'noindex,follow' : 'index,follow'}" />
    <meta name="theme-color" content="#f7b718" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
${alternates
  .map(
    (alternate) =>
      `    <link rel="alternate" hreflang="${escapeHtml(alternate.hreflang)}" href="${escapeHtml(alternate.href)}" />`,
  )
  .join('\n')}
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="HSKMAP" />
    <meta property="og:locale" content="${escapeHtml(ogLocale)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <script type="application/ld+json">${escapeScriptJson(jsonLd)}</script>
    ${includeApp ? assets.app : assets.css}`;
}

function renderDocument({
  assets,
  body,
  canonical,
  description,
  includeApp = true,
  jsonLd,
  locale,
  noindex = false,
  alternates,
  title,
}) {
  return `<!doctype html>
<html lang="${escapeHtml(locale.htmlLang)}" dir="${escapeHtml(locale.direction)}">
  <head>
${renderHead({
  assets,
  canonical,
  description,
  includeApp,
  jsonLd,
  locale,
  noindex,
  alternates,
  title,
})}
  </head>
  <body>
    <div id="root">
${body}
    </div>
  </body>
</html>
`;
}

async function writePage(pathname, html) {
  const outputFile =
    pathname === '/'
      ? path.join(distDir, 'index.html')
      : path.join(distDir, ...pathname.split('/').filter(Boolean), 'index.html');

  await fs.mkdir(path.dirname(outputFile), { recursive: true });
  await fs.writeFile(outputFile, html);
}

function renderRootHub(data) {
  const languageLinks = data.SEO_LOCALES.map(
    (locale) => `<a class="seo-language-card" href="${escapeHtml(data.getLocalizedPath(locale.id))}">
        <span>${escapeHtml(locale.shortLabel)}</span>
        <strong>${escapeHtml(locale.label)}</strong>
      </a>`,
  ).join('\n');

  return `      <main class="seo-shell seo-hub">
        <section class="seo-hero-panel">
          <p class="eyebrow">HSKMAP</p>
          <h1>HSKMAP: Visual HSK 1-6 Vocabulary Map</h1>
          <p>Choose a language to explore Chinese vocabulary maps with pinyin, audio, examples, translations, flashcards, writing practice, and local progress tracking.</p>
        </section>
        <nav class="seo-language-grid" aria-label="Choose language">
${languageLinks}
        </nav>
      </main>`;
}

function renderLocalizedSeoGuide(view, locale, data) {
  const guide = data.getLocalizedSeoGuide(locale.id, view);
  const tableLabels = guide.tableLabels;
  const rows = guide.rows
    ? `<div class="hsk-guide-table-wrap">
          <table class="hsk-guide-table">
            <thead>
              <tr>
                <th>${escapeHtml(tableLabels.level)}</th>
                <th>${escapeHtml(tableLabels.wordsAdded)}</th>
                <th>${escapeHtml(tableLabels.cumulativeWords)}</th>
                <th>${escapeHtml(tableLabels.studyFocus)}</th>
              </tr>
            </thead>
            <tbody>
${guide.rows
  .map(
    (row) => `              <tr>
                <td><a href="${escapeHtml(data.getLocalizedPath(locale.id, row.level))}">${escapeHtml(row.label)}</a></td>
                <td>${escapeHtml(row.newWords.toLocaleString(locale.htmlLang))}</td>
                <td>${escapeHtml(row.cumulativeWords.toLocaleString(locale.htmlLang))}</td>
                <td>${escapeHtml(row.focus)}</td>
              </tr>`,
  )
  .join('\n')}
            </tbody>
          </table>
        </div>`
    : '';

  const sections = guide.sections
    .map(
      (section) => `<article class="hsk-guide-section">
          <h3>${escapeHtml(section.title)}</h3>
${section.paragraphs.map((paragraph) => `          <p>${escapeHtml(paragraph)}</p>`).join('\n')}
${
  section.items
    ? `          <ul>
${section.items.map((item) => `            <li>${escapeHtml(item)}</li>`).join('\n')}
          </ul>`
    : ''
}
        </article>`,
    )
    .join('\n');

  const faqs = guide.faqs
    .map(
      (faq) => `<article class="hsk-guide-faq-item">
          <h3>${escapeHtml(faq.question)}</h3>
          <p>${escapeHtml(faq.answer)}</p>
        </article>`,
    )
    .join('\n');

  return `        <section class="hsk-guide" aria-labelledby="hsk-guide-title">
          <p class="hsk-guide-eyebrow">${escapeHtml(guide.eyebrow)}</p>
          <h2 id="hsk-guide-title">${escapeHtml(guide.title)}</h2>
          <p class="hsk-guide-intro">${escapeHtml(guide.intro)}</p>
${rows}
          <div class="hsk-guide-sections">
${sections}
          </div>
          <div class="hsk-guide-faq" aria-label="${escapeHtml(guide.faqLabel)}">
${faqs}
          </div>
        </section>`;
}

function renderHomePage(locale, data) {
  const levelCards = data.HSK_LEVELS.map((level) => {
    const words = data.HSK_WORDS_BY_LEVEL[level];
    const label = `HSK ${level}`;
    const sample = words
      .slice(0, 12)
      .map((word) => `<span lang="zh-Hans">${escapeHtml(word.hanzi)}</span>`)
      .join('');

    return `<article class="seo-level-card">
          <a href="${escapeHtml(data.getLocalizedPath(locale.id, level))}">
            <small>${escapeHtml(words.length.toLocaleString(locale.htmlLang))} words</small>
            <strong>${escapeHtml(label)}</strong>
            <span>${escapeHtml(data.getSeoIntro(locale.id, level))}</span>
          </a>
          <div class="seo-sample-words">${sample}</div>
        </article>`;
  }).join('\n');

  return `      <main class="seo-shell">
        <section class="seo-hero-panel">
          <p class="eyebrow">${escapeHtml(data.HSKMAP_NAME)}</p>
          <h1>${escapeHtml(data.getSeoPageTitle(locale.id))}</h1>
          <p>${escapeHtml(data.getSeoIntro(locale.id))}</p>
        </section>
        <section class="seo-level-grid" aria-label="HSK levels">
${levelCards}
        </section>
${renderLocalizedSeoGuide('all', locale, data)}
      </main>`;
}

async function getLocalizedMeanings(locale, level, data) {
  if (locale.id === 'en') {
    return null;
  }

  return data.loadLocalizedMeanings(level, locale.id);
}

async function renderLevelPage(locale, level, data) {
  const words = data.HSK_WORDS_BY_LEVEL[level];
  const localizedMeanings = await getLocalizedMeanings(locale, level, data);
  const rows = words
    .map((word, index) => {
      const meaning = localizedMeanings?.words[word.id] ?? word.meaning;
      const sentenceMeaning = word.exampleSentence
        ? localizedMeanings?.sentences[word.id] ?? word.exampleSentence.meaning
        : '';
      const sentence = word.exampleSentence
        ? `${word.exampleSentence.hanzi} ${word.exampleSentence.pinyin} ${sentenceMeaning}`
        : '';

      return `<tr>
              <td>${index + 1}</td>
              <td lang="zh-Hans">${escapeHtml(word.hanzi)}</td>
              <td>${escapeHtml(word.pinyin)}</td>
              <td>${escapeHtml(meaning)}</td>
              <td>${escapeHtml(sentence)}</td>
            </tr>`;
    })
    .join('\n');

  return `      <main class="seo-shell">
        <section class="seo-hero-panel">
          <p class="eyebrow">${escapeHtml(data.HSKMAP_NAME)}</p>
          <h1>${escapeHtml(data.getSeoPageTitle(locale.id, level))}</h1>
          <p>${escapeHtml(data.getSeoIntro(locale.id, level))}</p>
          <p><a href="${escapeHtml(data.getLocalizedPath(locale.id))}">All HSK levels</a></p>
        </section>
${renderLocalizedSeoGuide(level, locale, data)}
        <section class="seo-table-panel" aria-label="HSK ${level} vocabulary">
          <h2>HSK ${level} vocabulary list</h2>
          <div class="seo-table-scroll">
            <table class="seo-vocab-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Hanzi</th>
                  <th>Pinyin</th>
                  <th>Meaning</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
${rows}
              </tbody>
            </table>
          </div>
        </section>
      </main>`;
}

function getJsonLd({ canonical, description, level, locale, title, data }) {
  const base = {
    '@context': 'https://schema.org',
    '@type': level ? 'LearningResource' : 'WebApplication',
    name: title,
    description,
    url: canonical,
    inLanguage: locale.htmlLang,
    publisher: {
      '@type': 'Organization',
      name: data.HSKMAP_NAME,
      url: data.HSKMAP_SITE_URL,
    },
  };

  if (!level) {
    return {
      ...base,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
    };
  }

  return {
    ...base,
    learningResourceType: 'Vocabulary list',
    educationalLevel: `HSK ${level}`,
    teaches: `HSK ${level} Chinese vocabulary`,
  };
}

async function generatePages(data, assets) {
  const defaultLocale = data.SEO_LOCALES.find((locale) => locale.id === 'en') ?? data.SEO_LOCALES[0];
  const rootTitle = 'HSKMAP | Choose your language';
  const rootDescription = 'Choose a language for HSKMAP, a visual HSK 1-6 vocabulary map for Chinese learners.';

  await writePage(
    '/',
    renderDocument({
      assets,
      body: renderRootHub(data),
      canonical: getCanonical('/', data),
      description: rootDescription,
      includeApp: false,
      jsonLd: getJsonLd({
        canonical: getCanonical('/', data),
        description: rootDescription,
        locale: defaultLocale,
        title: rootTitle,
        data,
      }),
      locale: defaultLocale,
      alternates: getAlternates({ data }),
      title: rootTitle,
    }),
  );

  for (const locale of data.SEO_LOCALES) {
    const homePath = data.getLocalizedPath(locale.id);
    const homeTitle = data.getSeoPageTitle(locale.id);
    const homeDescription = data.getSeoPageDescription(locale.id);
    await writePage(
      homePath,
      renderDocument({
        assets,
        body: renderHomePage(locale, data),
        canonical: getCanonical(homePath, data),
        description: homeDescription,
        jsonLd: getJsonLd({
          canonical: getCanonical(homePath, data),
          description: homeDescription,
          locale,
          title: homeTitle,
          data,
        }),
        locale,
        alternates: getAlternates({ data }),
        title: homeTitle,
      }),
    );

    for (const level of data.HSK_LEVELS) {
      const levelPath = data.getLocalizedPath(locale.id, level);
      const levelTitle = data.getSeoPageTitle(locale.id, level);
      const levelDescription = data.getSeoPageDescription(locale.id, level);
      const noindex = !isIndexableLevelPage(locale.id, level, data);

      await writePage(
        levelPath,
        renderDocument({
          assets,
          body: await renderLevelPage(locale, level, data),
          canonical: getCanonical(levelPath, data),
          description: levelDescription,
          jsonLd: getJsonLd({
            canonical: getCanonical(levelPath, data),
            description: levelDescription,
            level,
            locale,
            title: levelTitle,
            data,
          }),
          locale,
          noindex,
          alternates: getAlternates({ data, level }),
          title: levelTitle,
        }),
      );
    }
  }
}

async function writeRobotsAndSitemap(data) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = ['/'];

  for (const locale of data.SEO_LOCALES) {
    urls.push(data.getLocalizedPath(locale.id));
    for (const level of data.HSK_LEVELS) {
      if (isIndexableLevelPage(locale.id, level, data)) {
        urls.push(data.getLocalizedPath(locale.id, level));
      }
    }
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeHtml(getCanonical(url, data))}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

  await fs.writeFile(path.join(distDir, 'sitemap.xml'), sitemap);
  await fs.writeFile(
    path.join(distDir, 'robots.txt'),
    `User-agent: *
Allow: /

Sitemap: ${getCanonical('/sitemap.xml', data)}
`,
  );
}

async function main() {
  const data = await loadSeoData();
  const assets = await getTemplateAssets();

  await generatePages(data, assets);
  await writeRobotsAndSitemap(data);
  await fs.rm(seoDataOutDir, { recursive: true, force: true });

  console.log('Generated multilingual SEO pages, robots.txt, and sitemap.xml.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

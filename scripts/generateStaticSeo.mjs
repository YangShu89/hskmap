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
const contentPageExportNames = [
  'contentPages',
  'CONTENT_PAGES',
  'seoContentPages',
  'SEO_CONTENT_PAGES',
  'staticContentPages',
  'STATIC_CONTENT_PAGES',
  'contentPageRegistry',
  'CONTENT_PAGE_REGISTRY',
];

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
  const adsense = tags.find((tag) => tag.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')) ?? '';
  const appTags = tags.filter((tag) => tag !== adsense);

  return {
    adsense,
    app: appTags.join('\n    '),
    css: appTags.filter((tag) => tag.startsWith('<link')).join('\n    '),
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

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function getStringField(value, fieldNames) {
  for (const fieldName of fieldNames) {
    const fieldValue = value?.[fieldName];
    if (typeof fieldValue === 'string' && fieldValue.trim()) {
      return fieldValue.trim();
    }
  }

  return null;
}

function normalizePagePathname(value, data, label) {
  let pathname = String(value ?? '').trim();
  if (!pathname) {
    throw new Error(`${label}: missing slug/path`);
  }

  if (/^https?:\/\//i.test(pathname)) {
    const url = new URL(pathname);
    const siteUrl = new URL(data.HSKMAP_SITE_URL);
    if (url.origin !== siteUrl.origin) {
      throw new Error(`${label}: content page URL must be on ${siteUrl.origin}`);
    }
    pathname = url.pathname;
  }

  if (!pathname.startsWith('/')) {
    pathname = `/${pathname}`;
  }

  pathname = pathname.replace(/\/{2,}/g, '/');
  if (!pathname.endsWith('/')) {
    pathname = `${pathname}/`;
  }

  if (pathname === '/') {
    throw new Error(`${label}: content pages cannot overwrite the root page`);
  }

  return pathname;
}

function getContentPageRawItems(registry, exportName) {
  if (Array.isArray(registry)) {
    return registry;
  }

  if (isPlainObject(registry)) {
    for (const fieldName of ['pages', 'items', 'contentPages']) {
      if (Array.isArray(registry[fieldName])) {
        return registry[fieldName];
      }
    }

    return Object.entries(registry).map(([slug, page]) =>
      isPlainObject(page) && !page.slug && !page.path && !page.pathname && !page.urlPath && !page.permalink
        ? { slug, ...page }
        : page,
    );
  }

  throw new Error(`${exportName}: expected an array or object content page registry`);
}

function findContentPageRegistry(data) {
  const containers = [data];
  if (Array.isArray(data.default)) {
    return { exportName: 'default', registry: data.default };
  }
  if (isPlainObject(data.default)) {
    containers.push(data.default);
  }

  for (const container of containers) {
    for (const exportName of contentPageExportNames) {
      if (container && Object.prototype.hasOwnProperty.call(container, exportName)) {
        return { exportName, registry: container[exportName] };
      }
    }
  }

  for (const container of containers) {
    for (const [exportName, registry] of Object.entries(container ?? {})) {
      if (/content.*pages|pages.*content|content.*registry/i.test(exportName)) {
        return { exportName, registry };
      }
    }
  }

  return null;
}

function resolveContentLocale(page, data) {
  const rawLocale = getStringField(page, ['locale', 'language', 'lang']);
  const defaultLocale = data.SEO_LOCALES.find((locale) => locale.id === 'en') ?? data.SEO_LOCALES[0];
  if (!rawLocale) {
    return defaultLocale;
  }

  const normalized = rawLocale.toLowerCase();
  return (
    data.SEO_LOCALES.find((locale) =>
      [locale.id, locale.slug, locale.hreflang, locale.htmlLang].some(
        (localeValue) => String(localeValue).toLowerCase() === normalized,
      ),
    ) ?? defaultLocale
  );
}

function parseJsonLdString(value, label) {
  try {
    return JSON.parse(value);
  } catch (error) {
    throw new Error(`${label}: jsonLd string must be valid JSON`);
  }
}

function getContentJsonLd(page, canonical, locale, data, label) {
  const providedJsonLd = page.jsonLd ?? page.jsonLD ?? page.structuredData;
  if (providedJsonLd === false) {
    return null;
  }

  if (typeof providedJsonLd === 'string' && providedJsonLd.trim()) {
    return parseJsonLdString(providedJsonLd, label);
  }

  if (providedJsonLd !== undefined && providedJsonLd !== null) {
    if (isPlainObject(providedJsonLd) || Array.isArray(providedJsonLd)) {
      return providedJsonLd;
    }

    throw new Error(`${label}: jsonLd must be an object, array, JSON string, or false`);
  }

  const schemaType = getStringField(page, ['schemaType', 'jsonLdType']) ?? 'WebPage';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: page.title,
    description: page.description,
    url: canonical,
    inLanguage: locale.htmlLang,
    isPartOf: {
      '@type': 'WebSite',
      name: data.HSKMAP_NAME,
      url: data.HSKMAP_SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: data.HSKMAP_NAME,
      url: data.HSKMAP_SITE_URL,
    },
  };
  const dateModified = getStringField(page, ['updated', 'dateModified', 'modified', 'lastModified']);
  if (dateModified) {
    jsonLd.dateModified = dateModified;
  }

  if (schemaType === 'Article' || schemaType === 'BlogPosting') {
    jsonLd.headline = page.title;
  }

  return jsonLd;
}

function getContentAlternates(page, data) {
  const alternates = page.alternates ?? page.hreflangs;
  if (!alternates) {
    return [];
  }

  const entries = Array.isArray(alternates)
    ? alternates.map((alternate) => [
        alternate.hreflang ?? alternate.lang ?? alternate.language,
        alternate.href ?? alternate.url ?? alternate.path ?? alternate.slug,
      ])
    : Object.entries(alternates);

  return entries
    .filter(([hreflang, href]) => typeof hreflang === 'string' && typeof href === 'string')
    .map(([hreflang, href]) => ({
      hreflang,
      href: /^https?:\/\//i.test(href)
        ? href
        : getCanonical(normalizePagePathname(href, data, `alternate ${hreflang}`), data),
    }));
}

function getContentPages(data) {
  const foundRegistry = findContentPageRegistry(data);
  if (!foundRegistry) {
    return [];
  }

  const rawItems = getContentPageRawItems(foundRegistry.registry, foundRegistry.exportName);
  return rawItems.map((rawPage, index) => {
    if (!isPlainObject(rawPage)) {
      throw new Error(`${foundRegistry.exportName}[${index}]: expected a content page object`);
    }

    const label = `${foundRegistry.exportName}[${index}]`;
    const title = getStringField(rawPage, ['title', 'seoTitle', 'metaTitle']);
    const description = getStringField(rawPage, ['description', 'seoDescription', 'metaDescription']);
    if (!title) {
      throw new Error(`${label}: missing title`);
    }
    if (!description) {
      throw new Error(`${label}: missing description`);
    }

    const pathname = normalizePagePathname(
      getStringField(rawPage, ['pathname', 'path', 'urlPath', 'permalink', 'slug']),
      data,
      label,
    );
    const locale = resolveContentLocale(rawPage, data);
    const canonical = getCanonical(pathname, data);

    return {
      ...rawPage,
      title,
      description,
      h1: getStringField(rawPage, ['h1', 'headline']) ?? title,
      pathname,
      canonical,
      locale,
      alternates: getContentAlternates(rawPage, data),
      jsonLd: getContentJsonLd({ ...rawPage, title, description }, canonical, locale, data, label),
    };
  });
}

function renderHead({
  assets,
  canonical,
  description,
  headScript = '',
  includeApp,
  jsonLd,
  locale,
  noindex,
  alternates,
  title,
}) {
  const ogLocale = locale.htmlLang.replace('-', '_');
  const appBootStyles = includeApp
    ? `    <style>
      html.app-loading #root {
        opacity: 0;
      }

      html.app-loading body::before {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: grid;
        place-items: center;
        color: #475569;
        background: #fff8ed;
        font: 800 0.95rem Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        content: "Loading HSKMAP...";
      }
    </style>
    <noscript>
      <style>
        html.app-loading #root {
          opacity: 1;
        }

        html.app-loading body::before {
          display: none;
        }
      </style>
    </noscript>`
    : '';

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
${jsonLd ? `    <script type="application/ld+json">${escapeScriptJson(jsonLd)}</script>\n` : ''}${assets.adsense ? `    ${assets.adsense}\n` : ''}${appBootStyles}
${headScript}
    ${includeApp ? assets.app : assets.css}`;
}

function renderDocument({
  assets,
  body,
  canonical,
  description,
  headScript,
  includeApp = true,
  jsonLd,
  locale,
  noindex = false,
  alternates,
  title,
}) {
  const rootBody = includeApp ? '' : `\n${body}\n    `;
  const noscriptFallback = includeApp ? `
    <noscript>
${body}
    </noscript>` : '';

  return `<!doctype html>
<html lang="${escapeHtml(locale.htmlLang)}" dir="${escapeHtml(locale.direction)}"${includeApp ? ' class="app-loading"' : ''}>
  <head>
${renderHead({
  assets,
  canonical,
  description,
  headScript,
  includeApp,
  jsonLd,
  locale,
  noindex,
  alternates,
  title,
})}
  </head>
  <body>
    <div id="root">${rootBody}</div>${noscriptFallback}
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

function renderRootLanguageRedirectScript(data) {
  const routes = data.SEO_LOCALES.map((locale) => ({
    id: locale.id,
    path: data.getLocalizedPath(locale.id),
  }));

  return `    <script>
(function () {
  var routes = ${escapeScriptJson(routes)};
  var fallbackPath = ${escapeScriptJson(data.getLocalizedPath('en'))};
  var storageKey = 'hsk-translation-language';

  function normalize(value) {
    return String(value || '').toLowerCase();
  }

  function routeForLanguage(value) {
    var normalized = normalize(value);
    if (!normalized) {
      return null;
    }

    for (var i = 0; i < routes.length; i += 1) {
      if (normalize(routes[i].id) === normalized) {
        return routes[i].path;
      }
    }

    var primary = normalized.split('-')[0];
    if (primary === 'pt') {
      for (var ptIndex = 0; ptIndex < routes.length; ptIndex += 1) {
        if (normalize(routes[ptIndex].id) === 'pt-br') {
          return routes[ptIndex].path;
        }
      }
    }

    for (var primaryIndex = 0; primaryIndex < routes.length; primaryIndex += 1) {
      if (normalize(routes[primaryIndex].id).split('-')[0] === primary) {
        return routes[primaryIndex].path;
      }
    }

    return null;
  }

  var targetPath = null;

  try {
    targetPath = routeForLanguage(window.localStorage.getItem(storageKey));
  } catch (error) {
  }

  if (!targetPath && window.navigator) {
    var languages = window.navigator.languages && window.navigator.languages.length
      ? window.navigator.languages
      : [window.navigator.language || window.navigator.userLanguage];

    for (var languageIndex = 0; languageIndex < languages.length; languageIndex += 1) {
      targetPath = routeForLanguage(languages[languageIndex]);
      if (targetPath) {
        break;
      }
    }
  }

  if (!targetPath) {
    targetPath = fallbackPath;
  }

  if (targetPath && window.location.pathname !== targetPath) {
    window.location.replace(targetPath + window.location.search + window.location.hash);
  }
}());
    </script>`;
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
${renderStaticResourceSection(data, {
  title: 'HSK study resources',
  eyebrow: 'Study guides',
  ariaLabel: 'HSKMAP study resources',
})}
      </main>`;
}

function getResourceLinks(data, exportName) {
  const links = data[exportName];
  return Array.isArray(links) ? links : [];
}

function renderResourceLinkCards(links, currentPathname = null) {
  return links
    .filter((link) => link && typeof link.href === 'string' && link.href !== currentPathname)
    .map(
      (link) => `          <a class="site-resource-card" href="${escapeHtml(link.href)}">
            <strong>${escapeHtml(link.label ?? link.href)}</strong>
            <span>${escapeHtml(link.description ?? '')}</span>
          </a>`,
    )
    .join('\n');
}

function renderStaticResourceSection(
  data,
  { ariaLabel = 'Related study resources', currentPathname = null, includeMapLink = false, title, eyebrow },
) {
  const studyCards = renderResourceLinkCards(getResourceLinks(data, 'STUDY_RESOURCE_LINKS'), currentPathname);
  const mapCard = includeMapLink
    ? `          <a class="site-resource-card" href="${escapeHtml(data.getLocalizedPath('en'))}">
            <strong>Open the vocabulary map</strong>
            <span>Review all classic HSK 1-6 levels with word cards, audio, examples, and progress labels.</span>
          </a>`
    : '';
  const cards = [studyCards, mapCard].filter(Boolean).join('\n');

  if (!cards) {
    return '';
  }

  return `        <section class="site-resources" aria-label="${escapeHtml(ariaLabel)}">
          <p class="site-resources-eyebrow">${escapeHtml(eyebrow)}</p>
          <h2>${escapeHtml(title)}</h2>
          <div class="site-resource-grid">
${cards}
          </div>
        </section>`;
}

function renderContentTopNav() {
  return `        <nav class="content-top-nav" aria-label="HSKMAP navigation">
          <a href="/en/">Vocabulary map</a>
          <a href="/resources/">Study resources</a>
          <a href="/about/">About</a>
        </nav>`;
}

function renderSiteInfoFooter(data) {
  const links = getResourceLinks(data, 'SITE_RESOURCE_LINKS');
  if (!links.length) {
    return '';
  }

  return `        <nav class="content-footer" aria-label="Site information">
${links
  .map((link) => `          <a href="${escapeHtml(link.href)}">${escapeHtml(link.label ?? link.href)}</a>`)
  .join('\n')}
        </nav>`;
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
${renderStaticResourceSection(data, {
  title: 'Use the map with a study plan',
  eyebrow: 'Study resources',
  ariaLabel: 'HSKMAP study resources',
})}
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
${renderStaticResourceSection(data, {
  title: 'More ways to study this level',
  eyebrow: 'Study resources',
  ariaLabel: `HSK ${level} study resources`,
})}
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

function renderParagraphs(value) {
  if (!value) {
    return '';
  }

  const paragraphs = Array.isArray(value) ? value : [value];
  return paragraphs
    .filter((paragraph) => paragraph !== null && paragraph !== undefined && String(paragraph).trim())
    .map((paragraph) => `          <p>${escapeHtml(paragraph)}</p>`)
    .join('\n');
}

function renderList(value) {
  if (!Array.isArray(value) || value.length === 0) {
    return '';
  }

  return `          <ul>
${value
  .filter((item) => item !== null && item !== undefined && String(item).trim())
  .map((item) => `            <li>${escapeHtml(item)}</li>`)
  .join('\n')}
          </ul>`;
}

function renderContentSection(section, index) {
  if (typeof section === 'string') {
    return `<section class="content-section">
${renderParagraphs(section)}
        </section>`;
  }

  if (!isPlainObject(section)) {
    throw new Error(`content section ${index}: expected a string or object`);
  }

  const heading = getStringField(section, ['title', 'heading', 'headline']);
  const sectionId = getStringField(section, ['id', 'anchor']);
  const paragraphs = section.paragraphs ?? section.body ?? section.content ?? section.text;
  const items = section.items ?? section.list ?? section.bullets;

  return `<section class="content-section"${sectionId ? ` id="${escapeHtml(sectionId)}"` : ''}>
${heading ? `          <h2>${escapeHtml(heading)}</h2>\n` : ''}${renderParagraphs(paragraphs)}
${renderList(items)}
        </section>`;
}

function renderContentBody(page) {
  if (typeof page.bodyHtml === 'string' && page.bodyHtml.trim()) {
    return page.bodyHtml;
  }

  if (typeof page.html === 'string' && page.html.trim()) {
    return page.html;
  }

  const sections = Array.isArray(page.sections)
    ? page.sections
    : Array.isArray(page.body)
      ? page.body
      : [];
  const body = typeof page.body === 'string' ? renderParagraphs(page.body) : '';
  const renderedSections = sections.map((section, index) => renderContentSection(section, index)).join('\n');

  return [body, renderedSections].filter(Boolean).join('\n');
}

function renderContentPage(page, data) {
  const intro = getStringField(page, ['intro', 'summary', 'dek']) ?? page.description;
  const body = renderContentBody(page);

  return `      <main class="content-shell">
${renderContentTopNav()}
        <article class="content-hero">
          <p class="eyebrow">${escapeHtml(data.HSKMAP_NAME)}</p>
          <h1>${escapeHtml(page.h1)}</h1>
          <p>${escapeHtml(intro)}</p>
        </article>
${body ? `        <article class="content-page" aria-label="${escapeHtml(page.h1)}">
${body}
        </article>` : ''}
${renderStaticResourceSection(data, {
  title: 'Keep studying with the map',
  eyebrow: 'Related HSKMAP resources',
  ariaLabel: 'Related HSKMAP resources',
  currentPathname: page.pathname,
  includeMapLink: true,
})}
${renderSiteInfoFooter(data)}
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

function getReservedSeoPathnames(data) {
  const reservedPathnames = new Set(['/']);

  for (const locale of data.SEO_LOCALES) {
    reservedPathnames.add(data.getLocalizedPath(locale.id));
    for (const level of data.HSK_LEVELS) {
      reservedPathnames.add(data.getLocalizedPath(locale.id, level));
    }
  }

  return reservedPathnames;
}

function assertContentPageMetadata(contentPages, data) {
  const reservedPathnames = getReservedSeoPathnames(data);
  const seenPathnames = new Set();
  const seenTitles = new Map();

  for (const page of contentPages) {
    if (reservedPathnames.has(page.pathname)) {
      throw new Error(`Content page ${page.pathname} would overwrite an existing map/language/level page`);
    }

    if (seenPathnames.has(page.pathname)) {
      throw new Error(`Duplicate content page pathname: ${page.pathname}`);
    }
    seenPathnames.add(page.pathname);

    const duplicatePathname = seenTitles.get(page.title);
    if (duplicatePathname) {
      throw new Error(
        `Duplicate content page title "${page.title}" used by ${duplicatePathname} and ${page.pathname}`,
      );
    }
    seenTitles.set(page.title, page.pathname);
  }
}

async function generateContentPages(data, assets, contentPages) {
  assertContentPageMetadata(contentPages, data);

  for (const page of contentPages) {
    await writePage(
      page.pathname,
      renderDocument({
        assets,
        body: renderContentPage(page, data),
        canonical: page.canonical,
        description: page.description,
        includeApp: false,
        jsonLd: page.jsonLd,
        locale: page.locale,
        alternates: page.alternates,
        title: page.title,
      }),
    );
  }
}

async function generatePages(data, assets, contentPages) {
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
      headScript: renderRootLanguageRedirectScript(data),
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

  await generateContentPages(data, assets, contentPages);
}

async function writeRobotsAndSitemap(data, contentPages) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [];
  const seenUrls = new Set();

  function addUrl(url) {
    if (!seenUrls.has(url)) {
      urls.push(url);
      seenUrls.add(url);
    }
  }

  addUrl('/');

  for (const locale of data.SEO_LOCALES) {
    addUrl(data.getLocalizedPath(locale.id));
    for (const level of data.HSK_LEVELS) {
      if (isIndexableLevelPage(locale.id, level, data)) {
        addUrl(data.getLocalizedPath(locale.id, level));
      }
    }
  }

  for (const page of contentPages) {
    addUrl(page.pathname);
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
  const contentPages = getContentPages(data);

  await generatePages(data, assets, contentPages);
  await writeRobotsAndSitemap(data, contentPages);
  await fs.rm(seoDataOutDir, { recursive: true, force: true });

  const contentPageSummary = contentPages.length ? ` and ${contentPages.length} content pages` : '';
  console.log(`Generated multilingual SEO pages${contentPageSummary}, robots.txt, and sitemap.xml.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

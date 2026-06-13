import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(projectRoot, 'dist');
const seoDataOutDir = path.join(projectRoot, 'node_modules', '.tmp', 'seo-verify-data');
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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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
  assert(pathname, `${label}: missing slug/path`);

  if (/^https?:\/\//i.test(pathname)) {
    const url = new URL(pathname);
    const siteUrl = new URL(data.HSKMAP_SITE_URL);
    assert(url.origin === siteUrl.origin, `${label}: content page URL must be on ${siteUrl.origin}`);
    pathname = url.pathname;
  }

  if (!pathname.startsWith('/')) {
    pathname = `/${pathname}`;
  }

  pathname = pathname.replace(/\/{2,}/g, '/');
  if (!pathname.endsWith('/')) {
    pathname = `${pathname}/`;
  }

  assert(pathname !== '/', `${label}: content pages cannot overwrite the root page`);
  return pathname;
}

function getCanonical(pathname, data) {
  return new URL(pathname, data.HSKMAP_SITE_URL).href;
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

function contentPageHasJsonLd(page) {
  return (page.jsonLd ?? page.jsonLD ?? page.structuredData) !== false;
}

function getContentPages(data) {
  const foundRegistry = findContentPageRegistry(data);
  if (!foundRegistry) {
    return [];
  }

  const rawItems = getContentPageRawItems(foundRegistry.registry, foundRegistry.exportName);
  return rawItems.map((rawPage, index) => {
    assert(isPlainObject(rawPage), `${foundRegistry.exportName}[${index}]: expected a content page object`);

    const label = `${foundRegistry.exportName}[${index}]`;
    const title = getStringField(rawPage, ['title', 'seoTitle', 'metaTitle']);
    const description = getStringField(rawPage, ['description', 'seoDescription', 'metaDescription']);
    assert(title, `${label}: missing title`);
    assert(description, `${label}: missing description`);

    const pathname = normalizePagePathname(
      getStringField(rawPage, ['pathname', 'path', 'urlPath', 'permalink', 'slug']),
      data,
      label,
    );

    return {
      title,
      description,
      h1: getStringField(rawPage, ['h1', 'headline']) ?? title,
      pathname,
      canonical: getCanonical(pathname, data),
      hasJsonLd: contentPageHasJsonLd(rawPage),
    };
  });
}

async function readPage(...segments) {
  return fs.readFile(path.join(distDir, ...segments, 'index.html'), 'utf8');
}

async function readPageByPathname(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  return readPage(...segments);
}

function verifyCommon(html, label) {
  assert((html.match(/<h1\b/g) ?? []).length === 1, `${label}: expected exactly one h1`);
  assert(/<title>[^<]+<\/title>/.test(html), `${label}: missing title`);
  assert(/<meta name="description" content="[^"]+"/.test(html), `${label}: missing description`);
  assert(/<link rel="canonical" href="https:\/\/hskmap\.com\//.test(html), `${label}: missing canonical`);
  assert(/<script type="application\/ld\+json">/.test(html), `${label}: missing JSON-LD`);
  assert(
    html.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js') &&
      html.includes('client=ca-pub-1029574626964711'),
    `${label}: missing AdSense verification script`,
  );
}

function verifyStaticContentDocument(html, label) {
  assert(html.includes('<main class="content-shell">'), `${label}: missing static content shell`);
  assert(html.includes('class="content-top-nav"'), `${label}: missing content top navigation`);
  assert(html.includes('class="site-resources"'), `${label}: missing related resource section`);
  assert(html.includes('href="/en/"'), `${label}: missing link back to vocabulary map`);
  assert(html.includes('href="/resources/"'), `${label}: missing link to resource hub`);
  assert(!html.includes('class="app-loading"'), `${label}: content page should not use app loading shell`);
  assert(!/<script\b[^>]*\btype="module"[^>]*\bsrc="\/assets\//.test(html), `${label}: content page should not load app module assets`);
  assert(!html.includes('<noscript>'), `${label}: content page should not rely on app noscript fallback`);
}

function verifyContentPages(contentPages, sitemap) {
  const seenTitles = new Map();

  return Promise.all(
    contentPages.map(async (page) => {
      const duplicatePathname = seenTitles.get(page.title);
      assert(
        !duplicatePathname,
        `${page.pathname}: duplicate title "${page.title}" also used by ${duplicatePathname}`,
      );
      seenTitles.set(page.title, page.pathname);

      const html = await readPageByPathname(page.pathname);
      const label = page.pathname;
      verifyStaticContentDocument(html, label);
      assert((html.match(/<h1\b/g) ?? []).length === 1, `${label}: expected exactly one h1`);
      assert(html.includes(`<title>${escapeHtml(page.title)}</title>`), `${label}: missing expected title`);
      assert(
        html.includes(`<meta name="description" content="${escapeHtml(page.description)}" />`),
        `${label}: missing expected description`,
      );
      assert(
        html.includes(`<link rel="canonical" href="${escapeHtml(page.canonical)}" />`),
        `${label}: missing expected canonical`,
      );
      assert(
        html.includes('<meta name="robots" content="index,follow" />'),
        `${label}: expected robots index,follow`,
      );
      assert(html.includes(`<h1>${escapeHtml(page.h1)}</h1>`), `${label}: missing expected h1`);
      if (page.hasJsonLd) {
        assert(/<script type="application\/ld\+json">/.test(html), `${label}: missing JSON-LD`);
      }
      assert(
        html.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js') &&
          html.includes('client=ca-pub-1029574626964711'),
        `${label}: missing AdSense verification script`,
      );
      assert(sitemap.includes(`<loc>${escapeHtml(page.canonical)}</loc>`), `sitemap: missing ${page.canonical}`);
    }),
  );
}

async function main() {
  const data = await loadSeoData();
  const contentPages = getContentPages(data);

  const rootHtml = await readPage();
  verifyCommon(rootHtml, '/');
  assert(rootHtml.includes('hreflang="x-default"'), '/: missing x-default hreflang');
  assert(rootHtml.includes('href="/resources/"'), '/: missing resource hub link');
  assert(rootHtml.includes('class="site-resources"'), '/: missing study resources section');

  for (const [slug, hreflang] of locales) {
    const homeHtml = await readPage(slug);
    verifyCommon(homeHtml, `/${slug}/`);
    assert(homeHtml.includes(`hreflang="${hreflang}"`), `/${slug}/: missing self hreflang`);
    assert(homeHtml.includes(`lang="${hreflang}"`), `/${slug}/: missing html lang`);
    assert(homeHtml.includes('class="hsk-guide"'), `/${slug}/: missing localized HSK guide`);
    assert(homeHtml.includes('href="/resources/"'), `/${slug}/: missing resource hub link`);
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
  await verifyContentPages(contentPages, sitemap);
  await fs.rm(seoDataOutDir, { recursive: true, force: true });

  console.log('Static SEO verification passed.');
}

main().catch((error) => {
  fs.rm(seoDataOutDir, { recursive: true, force: true }).catch(() => {});
  console.error(error);
  process.exitCode = 1;
});

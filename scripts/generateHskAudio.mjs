import { execFileSync } from 'node:child_process';
import { createSign } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const DEFAULT_LANGUAGE_CODE = 'cmn-CN';
const DEFAULT_VOICE_NAME = 'cmn-CN-Chirp3-HD-Leda';
const DEFAULT_SPEAKING_RATE = 0.82;
const API_URL = 'https://texttospeech.googleapis.com/v1/text:synthesize';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const CLOUD_PLATFORM_SCOPE = 'https://www.googleapis.com/auth/cloud-platform';

function getArgValue(name) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((value) => value.startsWith(prefix));
  return arg ? arg.slice(prefix.length) : undefined;
}

function hasArg(name) {
  return process.argv.includes(`--${name}`);
}

function parseLimit() {
  const rawLimit = getArgValue('limit') ?? process.env.GOOGLE_TTS_LIMIT;
  if (!rawLimit) {
    return undefined;
  }

  const limit = Number.parseInt(rawLimit, 10);
  if (!Number.isFinite(limit) || limit <= 0) {
    throw new Error(`Invalid limit: ${rawLimit}`);
  }

  return limit;
}

function parseKind() {
  const kind = getArgValue('kind') ?? 'words';
  if (!['words', 'sentences', 'all'].includes(kind)) {
    throw new Error(`Invalid kind "${kind}". Use words, sentences, or all.`);
  }

  return kind;
}

function parseLevels() {
  const rawLevels = getArgValue('levels') ?? getArgValue('level') ?? '1';
  const levels = rawLevels.split(',').map((value) => Number.parseInt(value.trim(), 10));

  if (levels.some((level) => !Number.isInteger(level) || level < 1 || level > 4)) {
    throw new Error(`Invalid levels "${rawLevels}". This generator currently supports levels 1, 2, 3, and 4.`);
  }

  return [...new Set(levels)];
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ü/g, 'v')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

async function parseHsk1Words() {
  const source = await readFile(path.join(repoRoot, 'src/data/hsk1.ts'), 'utf8');

  return source
    .split('\n')
    .map((line) => {
      const match = line.match(/\{\s*id:\s*'([^']+)'\s*,\s*hanzi:\s*'([^']+)'/);
      return match ? { id: match[1], text: match[2] } : undefined;
    })
    .filter(Boolean);
}

async function parseRawLevelWords(level) {
  const source = await readFile(path.join(repoRoot, 'src/data/hsk.ts'), 'utf8');
  const startMarker = `const HSK${level}_RAW = \``;
  const startIndex = source.indexOf(startMarker);
  if (startIndex === -1) {
    throw new Error(`Could not find HSK${level}_RAW in src/data/hsk.ts.`);
  }

  const rawStart = startIndex + startMarker.length;
  const rawEnd = source.indexOf('`;', rawStart);
  if (rawEnd === -1) {
    throw new Error(`Could not find end of HSK${level}_RAW in src/data/hsk.ts.`);
  }

  return source
    .slice(rawStart, rawEnd)
    .trim()
    .split('\n')
    .map((line, index) => {
      const [hanzi, pinyin] = line.trim().split('|');
      if (!hanzi) {
        return undefined;
      }

      return {
        id: `hsk${level}-${slugify(pinyin || hanzi)}-${index + 1}`,
        text: hanzi,
      };
    })
    .filter(Boolean);
}

async function parseLevelWords(level) {
  if (level === 1) {
    return parseHsk1Words();
  }

  return parseRawLevelWords(level);
}

async function parseLevelSentences(level) {
  const source = await readFile(path.join(repoRoot, `src/data/hsk${level}Sentences.ts`), 'utf8');

  return source
    .split('\n')
    .map((line) => {
      const match = line.match(/^\s*(?:'([^']+)'|([A-Za-z0-9_-]+)):\s*\{\s*hanzi:\s*'([^']+)'/);
      return match ? { id: match[1] ?? match[2], text: match[3] } : undefined;
    })
    .filter(Boolean);
}

function encodeBase64Url(value) {
  return Buffer.from(value).toString('base64url');
}

function createServiceAccountJwt(credentials) {
  if (!credentials.client_email || !credentials.private_key) {
    throw new Error('Service account JSON must include client_email and private_key.');
  }

  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };
  const claim = {
    aud: TOKEN_URL,
    exp: now + 3600,
    iat: now,
    iss: credentials.client_email,
    scope: CLOUD_PLATFORM_SCOPE,
  };
  const unsignedToken = `${encodeBase64Url(JSON.stringify(header))}.${encodeBase64Url(JSON.stringify(claim))}`;
  const signature = createSign('RSA-SHA256').update(unsignedToken).sign(credentials.private_key, 'base64url');

  return `${unsignedToken}.${signature}`;
}

async function getServiceAccountAccessToken(credentialsPath) {
  const credentials = JSON.parse(await readFile(path.resolve(credentialsPath), 'utf8'));
  const assertion = createServiceAccountJwt(credentials);
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      assertion,
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google OAuth token request failed (${response.status}): ${errorText}`);
  }

  const payload = await response.json();
  if (!payload.access_token) {
    throw new Error('Google OAuth token response did not include access_token.');
  }

  return payload.access_token;
}

async function getAccessToken() {
  if (process.env.GOOGLE_TTS_ACCESS_TOKEN) {
    return process.env.GOOGLE_TTS_ACCESS_TOKEN;
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return getServiceAccountAccessToken(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  }

  const commands = [
    ['gcloud', ['auth', 'application-default', 'print-access-token']],
    ['gcloud', ['auth', 'print-access-token']],
  ];

  for (const [command, args] of commands) {
    try {
      return execFileSync(command, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    } catch {
      // Try the next supported gcloud auth source.
    }
  }

  throw new Error(
    'No Google access token found. Run `gcloud auth application-default login`, set GOOGLE_APPLICATION_CREDENTIALS, or set GOOGLE_TTS_ACCESS_TOKEN.',
  );
}

async function synthesize({ accessToken, languageCode, speakingRate, text, voiceName }) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: { text },
      voice: {
        languageCode,
        name: voiceName,
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google TTS failed (${response.status}): ${errorText}`);
  }

  const payload = await response.json();
  if (!payload.audioContent) {
    throw new Error('Google TTS response did not include audioContent.');
  }

  return Buffer.from(payload.audioContent, 'base64');
}

async function generateTargets({ accessToken, dryRun, force, languageCode, limit, speakingRate, targets, voiceName }) {
  const selectedTargets = limit ? targets.slice(0, limit) : targets;
  let generated = 0;
  let skipped = 0;

  for (const target of selectedTargets) {
    try {
      if (!force) {
        await readFile(target.outputPath);
        skipped += 1;
        console.log(`skip ${target.id}`);
        continue;
      }
    } catch {
      // Missing file: synthesize it.
    }

    console.log(`${dryRun ? 'would generate' : 'generate'} ${target.id}: ${target.text}`);
    if (!dryRun) {
      await mkdir(path.dirname(target.outputPath), { recursive: true });
      const audio = await synthesize({
        accessToken,
        languageCode,
        speakingRate,
        text: target.text,
        voiceName,
      });
      await writeFile(target.outputPath, audio);
    }
    generated += 1;
  }

  return { generated, skipped, total: selectedTargets.length };
}

async function main() {
  const kind = parseKind();
  const levels = parseLevels();
  const limit = parseLimit();
  const dryRun = hasArg('dry-run');
  const force = hasArg('force');
  const languageCode = getArgValue('language') ?? process.env.GOOGLE_TTS_LANGUAGE ?? DEFAULT_LANGUAGE_CODE;
  const outputRoot = getArgValue('output-root') ?? 'public/audio';
  const voiceName = getArgValue('voice') ?? process.env.GOOGLE_TTS_VOICE ?? DEFAULT_VOICE_NAME;
  const speakingRate = Number.parseFloat(
    getArgValue('rate') ?? process.env.GOOGLE_TTS_RATE ?? String(DEFAULT_SPEAKING_RATE),
  );

  if (!Number.isFinite(speakingRate) || speakingRate <= 0) {
    throw new Error(`Invalid speaking rate: ${speakingRate}`);
  }

  const accessToken = dryRun ? 'dry-run' : await getAccessToken();
  const batches = [];

  for (const level of levels) {
    if (kind === 'words' || kind === 'all') {
      const words = await parseLevelWords(level);
      batches.push({
        label: `HSK${level} words`,
        targets: words.map((word) => ({
          ...word,
          outputPath: path.join(repoRoot, outputRoot, 'words', `${word.id}.mp3`),
        })),
      });
    }

    if (kind === 'sentences' || kind === 'all') {
      const sentences = await parseLevelSentences(level);
      batches.push({
        label: `HSK${level} sentences`,
        targets: sentences.map((sentence) => ({
          ...sentence,
          outputPath: path.join(repoRoot, outputRoot, 'sentences', `${sentence.id}.mp3`),
        })),
      });
    }
  }

  console.log(`levels ${levels.join(', ')}`);
  console.log(`voice ${voiceName}`);
  console.log(`language ${languageCode}`);
  console.log(`rate ${speakingRate}`);
  console.log(`output ${outputRoot}`);

  for (const batch of batches) {
    const result = await generateTargets({
      accessToken,
      dryRun,
      force,
      languageCode,
      limit,
      speakingRate,
      targets: batch.targets,
      voiceName,
    });
    console.log(`${batch.label}: ${result.generated} generated, ${result.skipped} skipped, ${result.total} checked`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

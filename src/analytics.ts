type AnalyticsValue = string | number | boolean | null | undefined;
export type AnalyticsProperties = Record<string, AnalyticsValue>;

type PostHogOptions = Record<string, unknown>;
type PostHogMethod = (...args: unknown[]) => void;

interface PostHogStub {
  [key: string]: unknown;
  __SV?: number;
  _i?: unknown[];
  capture?: PostHogMethod;
  init?: (token: string, options: PostHogOptions, name?: string) => void;
  people?: PostHogStub;
  push: (...items: unknown[]) => number;
  toString: (includeName?: boolean) => string;
}

declare global {
  interface Window {
    posthog?: PostHogStub;
  }
}

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
const POSTHOG_HOST = (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ?? 'https://us.i.posthog.com';
const POSTHOG_DISABLED = import.meta.env.VITE_POSTHOG_DISABLED === 'true';
const APP_NAME = 'hskmap';
const ATTRIBUTION_STORAGE_KEY = 'hskmap_attribution_v1';
const ATTRIBUTION_VALUE_LIMIT = 180;

const searchSources = new Set([
  'baidu',
  'bing',
  'duckduckgo',
  'ecosia',
  'google',
  'naver',
  'sogou',
  'yahoo',
  'yandex',
]);

const socialSources = new Set([
  'facebook',
  'instagram',
  'linkedin',
  'pinterest',
  'reddit',
  'threads',
  'tiktok',
  'twitter',
  'x',
  'youtube',
]);

const paidMediums = new Set([
  'ad',
  'ads',
  'banner',
  'cpc',
  'cpm',
  'display',
  'paid',
  'paid-search',
  'paid_social',
  'paidsocial',
  'ppc',
  'sem',
]);

const adClickParams = [
  'dclid',
  'fbclid',
  'gbraid',
  'gclid',
  'gclsrc',
  'igshid',
  'li_fat_id',
  'mc_cid',
  'msclkid',
  'ttclid',
  'twclid',
  'wbraid',
] as const;

const campaignParams = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  ...adClickParams,
] as const;

type CampaignParam = (typeof campaignParams)[number];

let initialized = false;

function compactProperties(properties: AnalyticsProperties = {}) {
  return Object.fromEntries(
    Object.entries({ app: APP_NAME, ...properties }).filter(([, value]) => value !== undefined),
  );
}

function cleanAttributionValue(value: string | null | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) {
    return undefined;
  }

  return trimmed.slice(0, ATTRIBUTION_VALUE_LIMIT);
}

function normalizeSource(value: string | null | undefined) {
  const cleaned = cleanAttributionValue(value)?.toLowerCase();
  if (!cleaned) {
    return undefined;
  }

  return cleaned
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .split(':')[0];
}

function parseUrl(value: string | null | undefined) {
  if (!value) {
    return undefined;
  }

  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

function getParam(searchParams: URLSearchParams, name: CampaignParam) {
  return cleanAttributionValue(searchParams.get(name));
}

function sourceFromReferrer(referrerUrl?: URL) {
  const hostname = referrerUrl?.hostname.replace(/^www\./, '').toLowerCase();
  if (!hostname) {
    return undefined;
  }

  const [source] = hostname.split('.');
  if (source === 'm' || source === 'l') {
    return hostname.split('.')[1] ?? hostname;
  }

  return source;
}

function hasAdClick(params: Partial<Record<CampaignParam, string>>) {
  return adClickParams.some((param) => params[param]);
}

function sourceFromAdClick(params: Partial<Record<CampaignParam, string>>) {
  if (params.gclid || params.gclsrc || params.gbraid || params.wbraid || params.dclid) {
    return 'google';
  }
  if (params.msclkid) {
    return 'bing';
  }
  if (params.fbclid || params.igshid) {
    return 'facebook';
  }
  if (params.ttclid) {
    return 'tiktok';
  }
  if (params.twclid) {
    return 'twitter';
  }
  if (params.li_fat_id) {
    return 'linkedin';
  }
  if (params.mc_cid) {
    return 'mailchimp';
  }

  return undefined;
}

function classifyTrafficChannel(source: string, medium: string, hasPaidClick: boolean) {
  const normalizedMedium = medium.toLowerCase();
  const normalizedSource = source.toLowerCase();
  const isPaid = hasPaidClick || paidMediums.has(normalizedMedium) || normalizedMedium.startsWith('paid');

  if (normalizedSource === 'direct') {
    return 'Direct';
  }
  if (normalizedMedium === 'email' || normalizedSource.includes('mail')) {
    return 'Email';
  }
  if (isPaid && searchSources.has(normalizedSource)) {
    return 'Paid Search';
  }
  if (isPaid && socialSources.has(normalizedSource)) {
    return 'Paid Social';
  }
  if (isPaid) {
    return 'Paid Other';
  }
  if (searchSources.has(normalizedSource)) {
    return 'Organic Search';
  }
  if (socialSources.has(normalizedSource)) {
    return 'Organic Social';
  }
  if (normalizedMedium === 'referral') {
    return 'Referral';
  }

  return 'Other';
}

function getCurrentAttributionProperties() {
  const url = new URL(window.location.href);
  const params = Object.fromEntries(
    campaignParams.map((param) => [param, getParam(url.searchParams, param)]),
  ) as Partial<Record<CampaignParam, string>>;
  const referrerUrl = parseUrl(document.referrer);
  const currentHost = url.hostname.replace(/^www\./, '').toLowerCase();
  const referrerHost = referrerUrl?.hostname.replace(/^www\./, '').toLowerCase();
  const externalReferrer = referrerHost && referrerHost !== currentHost ? referrerUrl : undefined;
  const referrerSource = sourceFromReferrer(externalReferrer);
  const paidClick = hasAdClick(params);
  const adClickSource = sourceFromAdClick(params);
  const source = normalizeSource(params.utm_source) ?? adClickSource ?? referrerSource ?? 'direct';
  const medium = cleanAttributionValue(params.utm_medium)?.toLowerCase()
    ?? (paidClick ? 'cpc' : externalReferrer ? (searchSources.has(source) ? 'organic' : 'referral') : 'none');
  const channel = classifyTrafficChannel(source, medium, paidClick);

  return compactProperties({
    landing_page: url.href,
    referrer: externalReferrer?.href,
    referring_domain: referrerHost,
    traffic_channel: channel,
    traffic_source: source,
    traffic_medium: medium,
    traffic_campaign: cleanAttributionValue(params.utm_campaign),
    traffic_term: cleanAttributionValue(params.utm_term),
    traffic_content: cleanAttributionValue(params.utm_content),
    gclid: params.gclid,
    fbclid: params.fbclid,
    msclkid: params.msclkid,
    ttclid: params.ttclid,
    li_fat_id: params.li_fat_id,
  }) as AnalyticsProperties;
}

function getStoredInitialAttribution() {
  try {
    const stored = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as AnalyticsProperties) : undefined;
  } catch {
    return undefined;
  }
}

function getInitialAttributionProperties(currentAttribution: AnalyticsProperties) {
  const existing = getStoredInitialAttribution();
  if (existing) {
    return existing;
  }

  const initialAttribution = compactProperties({
    initial_landing_page: currentAttribution.landing_page,
    initial_referrer: currentAttribution.referrer,
    initial_referring_domain: currentAttribution.referring_domain,
    initial_traffic_channel: currentAttribution.traffic_channel,
    initial_traffic_source: currentAttribution.traffic_source,
    initial_traffic_medium: currentAttribution.traffic_medium,
    initial_traffic_campaign: currentAttribution.traffic_campaign,
  }) as AnalyticsProperties;

  try {
    window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(initialAttribution));
  } catch {
    // Attribution is useful but non-critical, so storage failures should not block analytics.
  }

  return initialAttribution;
}

function getAttributionProperties() {
  const currentAttribution = getCurrentAttributionProperties();
  return {
    ...currentAttribution,
    ...getInitialAttributionProperties(currentAttribution),
  };
}

function addStubMethod(target: PostHogStub, methodPath: string) {
  const parts = methodPath.split('.');
  const methodName = parts.pop();
  if (!methodName) {
    return;
  }

  let scope = target;
  for (const part of parts) {
    scope[part] = scope[part] ?? ([] as unknown as PostHogStub);
    scope = scope[part] as PostHogStub;
  }

  scope[methodName] = function postHogStubMethod(...args: unknown[]) {
    scope.push([methodName, ...args]);
  } as PostHogMethod;
}

function installPostHogSnippet(documentRef: Document, posthog: PostHogStub) {
  if (posthog.__SV) {
    return;
  }

  window.posthog = posthog;
  posthog._i = [];
  posthog.init = (token: string, options: PostHogOptions, name = 'posthog') => {
    const script = documentRef.createElement('script');
    const firstScript = documentRef.getElementsByTagName('script')[0];
    script.type = 'text/javascript';
    script.crossOrigin = 'anonymous';
    script.async = true;
    script.src = `${String(options.api_host).replace('.i.posthog.com', '-assets.i.posthog.com')}/static/array.js`;
    firstScript.parentNode?.insertBefore(script, firstScript);

    const target = name === 'posthog' ? posthog : ((posthog[name] = []) as unknown as PostHogStub);
    target.people = target.people ?? ([] as unknown as PostHogStub);
    target.toString = (includeName?: boolean) => {
      const label = name === 'posthog' ? 'posthog' : `posthog.${name}`;
      return includeName ? `${label} (stub)` : label;
    };
    const people = target.people;
    people.toString = () => `${target.toString(true)}.people (stub)`;

    [
      'capture',
      'identify',
      'alias',
      'register',
      'register_once',
      'unregister',
      'set_config',
      'reset',
      'get_distinct_id',
      'get_property',
      'people.set',
      'people.set_once',
    ].forEach((method) => addStubMethod(target, method));

    posthog._i?.push([token, options, name]);
  };
  posthog.__SV = 1;
}

export function initAnalytics() {
  if (initialized || POSTHOG_DISABLED || !POSTHOG_KEY || typeof window === 'undefined') {
    return;
  }

  installPostHogSnippet(document, window.posthog ?? ([] as unknown as PostHogStub));
  window.posthog?.init?.(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: false,
    capture_pageleave: true,
    defaults: '2025-05-24',
    person_profiles: 'never',
  });
  initialized = true;
}

export function captureAnalyticsEvent(eventName: string, properties?: AnalyticsProperties) {
  if (POSTHOG_DISABLED || !POSTHOG_KEY || typeof window === 'undefined') {
    return;
  }

  window.posthog?.capture?.(eventName, compactProperties({ ...getAttributionProperties(), ...properties }));
}

export function captureAnalyticsPageView(properties?: AnalyticsProperties) {
  if (typeof window === 'undefined') {
    return;
  }

  captureAnalyticsEvent('$pageview', {
    ...properties,
    path: window.location.pathname,
    title: document.title,
    url: window.location.href,
  });
}

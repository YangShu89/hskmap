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

let initialized = false;

function compactProperties(properties: AnalyticsProperties = {}) {
  return Object.fromEntries(
    Object.entries({ app: APP_NAME, ...properties }).filter(([, value]) => value !== undefined),
  );
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

  window.posthog?.capture?.(eventName, compactProperties(properties));
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

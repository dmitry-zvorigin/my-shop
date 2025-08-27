// api/http.js
import { API_URL, API_TIMEOUT_MS } from "./config.js";

export class HttpError extends Error {
  constructor(message, { status, url, body }) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.url = url;
    this.body = body;
  }
}

export async function http(path, opts = {}) {
  const controller = new AbortController();
  const signal = mergeSignals(controller.signal, opts.signal);
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const url = buildUrl(API_URL, path, opts.searchParams);

    const hasBody = "body" in opts && opts.body != null;
    const isForm =
      hasBody &&
      (opts.body instanceof FormData ||
        opts.body instanceof Blob ||
        opts.body instanceof URLSearchParams);

    const headers = {
      Accept: "application/json",
      ...(opts.headers ?? {}),
    };
    // Content-Type ставим только если это НЕ FormData/Blob
    if (hasBody && !isForm && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }
    if (opts.authToken) headers.Authorization = `Bearer ${opts.authToken}`;

    const res = await fetch(url.toString(), {
      method: opts.method ?? "GET",
      headers,
      body: hasBody
        ? isForm
          ? opts.body
          : typeof opts.body === "string"
          ? opts.body
          : JSON.stringify(opts.body)
        : undefined,
      signal,
      credentials: opts.credentials ?? "same-origin", // поставь 'include' при Sanctum
      cache: opts.cache ?? "no-store",
    });

    const payload = await parsePayload(res);

    if (!res.ok) {
      throw new HttpError(
        `HTTP ${res.status} ${res.statusText}`,
        { status: res.status, url: url.toString(), body: payload }
      );
    }
    return payload; // JSON | string | undefined
  } finally {
    clearTimeout(timeoutId);
  }
}

function mergeSignals(a, b) {
  if (!b) return a;
  const ctrl = new AbortController();
  const onAbort = () => ctrl.abort();
  a.addEventListener("abort", onAbort);
  b.addEventListener("abort", onAbort);
  if (a.aborted || b.aborted) ctrl.abort();
  return ctrl.signal;
}

function joinUrl(base, path) {
  const b = String(base).replace(/\/+$/, "");
  const p = String(path).replace(/^\/+/, "");
  return `${b}/${p}`;
}

function isAbsolute(u) {
  return /^https?:\/\//i.test(u);
}

function buildUrl(base, path, searchParams) {
  const href = joinUrl(base, path);
  const url = isAbsolute(href)
    ? new URL(href)
    : new URL(href, window.location.origin);

  if (searchParams) {
    for (const [k, v] of Object.entries(searchParams)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }
  }
  return url;
}

async function parsePayload(res) {
  if (res.status === 204) return undefined;
  const type = res.headers.get("content-type") || "";
  if (type.includes("application/json")) {
    try { return await res.json(); } catch { return undefined; }
  }
  try { return await res.text(); } catch { return undefined; }
}

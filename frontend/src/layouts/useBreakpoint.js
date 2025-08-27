
import { useSyncExternalStore } from "react";
import { useMemo } from "react";

function cssVar(name, fallback) {
  if (typeof window === 'undefined') return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

const md = cssVar('--screen-md', '48rem');
const lg = cssVar('--screen-lg', '64rem');

const QUERIES = {
  mobile: `(max-width: calc(${md} - 0.02px))`,
  tablet: `(min-width: ${md}) and (max-width: calc(${lg} - 0.02px))`,
  desktop: `(min-width: ${lg})`,
};

function subscribe(query, cb) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(query);
  const handler = () => cb();
  mql.addEventListener("change", handler);
  return () => mql.removeEventListener("change", handler);
}

function getSnapshot(query) {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
}

export function useMediaQuery(query) {
  return useSyncExternalStore(
    (cb) => subscribe(query, cb),
    () => getSnapshot(query),
    () => false
  );
}

export function useBreakpoint() {
  const isMobile = useMediaQuery(QUERIES.mobile);
  const isTablet = useMediaQuery(QUERIES.tablet);
  const isDesktop = useMediaQuery(QUERIES.desktop);

  return useMemo(
    () => ({ isMobile, isTablet, isDesktop }),
    [isMobile, isTablet, isDesktop]
  );
}

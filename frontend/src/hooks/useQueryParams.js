import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

function normalize(v) {
  if (v === "true") return true;
  if (v === "false") return false;
  const n = Number(v);
  if (!Number.isNaN(n) && String(n) === v.trim()) return n;
  return v;
}

export function useQueryParams(options = {}) {
  const { commaLists = false } = options;
  const [params, setSearchParams] = useSearchParams();

  const query = useMemo(() => {
    const out = {};
    const seen = new Set(params.keys());

    for (const key of seen) {
      let values = params.getAll(key);
      if (commaLists) {
        values = values
          .flatMap((v) => String(v).split(","))
          .map((s) => s.trim())
          .filter(Boolean);
      }
      const normalized = values.map(normalize);
      out[key] = normalized.length > 1 ? normalized : normalized[0];
    }
    return out;
  }, [params, commaLists]);

  function setQuery(next, replace = true) {
    const sp = new URLSearchParams();

    for (const [key, raw] of Object.entries(next || {})) {
      if (raw === undefined || raw === null || raw === "") continue;

      if (Array.isArray(raw)) {
        // ✅ выбираем стратегию сериализации
        if (commaLists) {
          const vals = raw
            .map((v) => String(v))
            .filter(Boolean);
          if (vals.length) sp.set(key, vals.join(",")); // brand=amd,intel
        } else {
          for (const v of raw) {
            if (v === undefined || v === null || v === "") continue;
            sp.append(key, String(v)); // brand=amd&brand=intel
          }
        }
      } else {
        sp.set(key, String(raw));
      }
    }

    setSearchParams(sp, { replace });
  }

  function patchQuery(patch, replace = true) {
    // начинаем с текущих значений
    const base = { ...query };

    for (const [k, v] of Object.entries(patch || {})) {
      base[k] = v; // undefined/null/"" удалятся в setQuery (мы их не запишем)
    }

    setQuery(base, replace);
  }

  return [query, setQuery, patchQuery];
}

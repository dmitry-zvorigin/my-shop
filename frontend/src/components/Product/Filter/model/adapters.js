/** Разделитель для диапазона в query: price=1000-5000 */
export const RANGE_SEPARATOR = "-";

/** Привести значение из query к массиву (для comma-list формата) */
export function toArray(v) {
  if (v == null) return [];
  if (Array.isArray(v)) return v;
  return String(v).split(",").filter(s => s !== "");
}

/** Безопасно парсим число: ""/null/NaN -> null */
function toNumOrNull(v) {
  if (v === "" || v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

// helpers
const parseToken = (s) => {
  const [a, b] = String(s).split("-");
  const min = a === "" ? null : Number(a);
  const max = b === "" ? null : Number(b);
  return { min: Number.isNaN(min) ? null : min, max: Number.isNaN(max) ? null : max };
};
const toToken = (r) => `${r?.min ?? ""}-${r?.max ?? ""}`;

/**
 * Адаптеры: q <-> UI
 * Каждый тип обязан иметь .get(q, key) и .set(uiValue) => string|undefined
 * undefined означает «убрать параметр из query».
 */
export const adapters = {
  // Множественный список (чекбоксы): ?brand=intel,amd
  list: {
    get: (q, key) => toArray(q[key]),
    set: (arr) => (arr && arr.length ? arr : undefined), // для useQueryParams({ commaLists: true })
  },

  // Булево: ?in_stock=1
  boolean: {
    get: (q, key) => q[key] === "1",
    set: (bool) => (bool ? "1" : undefined),
  },

  // Диапазон: ?price=1000-5000  (пустые края разрешены: "-5000" или "1000-")
  range: {
    get: (q, key) => {
      const raw = String(q[key] ?? "");
      const [min, max] = raw.split(RANGE_SEPARATOR);
      return { min: toNumOrNull(min), max: toNumOrNull(max) };
    },
    set: (obj) => {
      const hasMin = obj?.min != null && obj.min !== "";
      const hasMax = obj?.max != null && obj.max !== "";
      if (!hasMin && !hasMax) return undefined;
      const left  = hasMin ? obj.min : "";
      const right = hasMax ? obj.max : "";
      return `${left}${RANGE_SEPARATOR}${right}`;
    },
  },

  price: {
    get: (q, key) =>
      q[key]
        ? String(q[key])
            .split(",")
            .filter(Boolean)
            .map(parseToken)
        : [],
    set: (arr) => {
      const tokens = (arr ?? [])
        .filter((r) => r && (r.min != null || r.max != null))
        .map(toToken);
      return tokens.length ? tokens.join(",") : undefined;
    },
  },
  // price: {
  //   get: (q, key) => {
  //     const raw = String(q[key] ?? "");
  //     const [min, max] = raw.split(RANGE_SEPARATOR);
  //     return { min: toNumOrNull(min), max: toNumOrNull(max) };
  //   },
  //   set: (arr) => {
  //     const tokens = (arr ?? [])
  //       .filter((r) => r && (r.min != null || r.max != null))
  //       .map(toToken);
  //     return tokens.length ? tokens.join(",") : undefined;
  //   },
  // }
};

/**
 * Достаём UI-значение фильтра из query по описанию фильтра.
 * filter: { id, type, ... }
 */
export function getValue(q, filter) {
  const adapter = adapters[filter.type];
  if (!adapter) return undefined;
  return adapter.get(q, filter.id);
}

/**
 * Готовим patch-объект для patchQuery.
 * next — новое UI-значение (массив для list, bool для boolean, объект {min,max} для range)
 *
 * Пример:
 *   const patch = makePatch(filter, next);
 *   patchQuery({ ...patch, page: 1 });
 */
export function makePatch(filter, next) {
  const adapter = adapters[filter.type];
  if (!adapter) return {};
  const encoded = adapter.set(next);
  return { [filter.id]: encoded };
}

/**
 * Удобный хелпер: активен ли фильтр сейчас (есть ли значение в query)
 */
export function isActive(q, filter) {
  const v = adapters[filter.type]?.get(q, filter.id);
  if (filter.type === "list")    return Array.isArray(v) && v.length > 0;
  if (filter.type === "boolean") return !!v;
  if (filter.type === "range")   return (v?.min != null) || (v?.max != null);
  if (filter.type === 'price')   return (v?.min != null) || (v?.max != null);
  return false;
}

/* 
 * Вариант на будущее (если захочешь min/max раздельно):
 *
 * rangeKeys: {
 *   get: (q, keyBase) => ({ min: toNumOrNull(q[keyBase + "_min"]), max: toNumOrNull(q[keyBase + "_max"]) }),
 *   set: (obj, keyBase) => ({
 *     [keyBase + "_min"]: obj?.min != null && obj.min !== "" ? obj.min : undefined,
 *     [keyBase + "_max"]: obj?.max != null && obj.max !== "" ? obj.max : undefined,
 *   }),
 * }
 */

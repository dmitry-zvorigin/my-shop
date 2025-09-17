// money формат для лейблов
const formatMoney = (n, unit = "₽") =>
  new Intl.NumberFormat("ru-RU").format(n) + (unit ? ` ${unit}` : "");

// подбираем «красивый» шаг по схеме 1–2–2.5–5–10
const niceStep = (raw) => {
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const base = raw / pow;
  const cand = base <= 1 ? 1 : base <= 2 ? 2 : base <= 2.5 ? 2.5 : base <= 5 ? 5 : 10;
  return cand * pow;
};

// генерим пресеты (около targetBins штук)
export function generatePriceBuckets(min, max, targetBins = 6, unit) {
  if (min == null || max == null || !(max > min)) return [];
  const raw = (max - min) / targetBins;
  const step = niceStep(raw);

  const start = Math.floor(min / step) * step;
  const end   = Math.ceil(max / step) * step;

  const buckets = [];
  let a = start;
  while (a < end) {
    const b = a + step;
    const from = Math.max(a, 0);
    const to   = b;
    // лейблы как у DNS
    let label;
    if (from <= 0) {
      label = `Менее ${formatMoney(to, unit)}`;
    } else if (b >= end) {
      label = `${formatMoney(from + 1, unit)} и более`;
    } else {
      label = `${formatMoney(from + 1, unit)} – ${formatMoney(to, unit)}`;
    }
    buckets.push({
      key: `${from}-${to}`, // удобно для onChange
      min: from,
      max: to,
      label,
      count: undefined,     // если приедут count’ы с бека — подставишь сюда
    });
    a = b;
  }
  return buckets;
}

import { http } from './http';

export const fetchBrands = ({ signal }) =>
  http('brand', { signal }); // ожидаем { data: [...] }

export const fetchBrandBySlug = (slug) => ({ signal }) =>
  http(`brand/${encodeURIComponent(slug)}`, { signal });
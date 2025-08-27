import { http } from "./http";


export function getBrandAll(opts) {
    return http(`brand`, opts);
}

export function getBrandBySlug(slug, opts = {}) {
  return http(`brand/${encodeURIComponent(slug)}`, opts);
}




// export const fetchBrandAll = async () => {
//   const response = await axios.get('http://localhost:8000/api/brand');
//   return response.data;
// }

// export const fetchBrandBySlug = async (slug) => {
//   const response = await axios.get(`http://localhost:8000/api/brand/${slug}`);
//   return response.data;
// }

// export function getBrandAll(slug, opts = {}) {
//   return http(`brand/`, opts);
// }
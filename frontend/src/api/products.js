import { http } from "./http";

// export const fetchProductAll = async () => {
//   const response = await axios.get('http://localhost:8000/api/product/all');
//   return response.data;
// }

// export const fetchProductShow = async (slug) => {
//   const response = await axios.get(`http://localhost:8000/api/product/${slug}`);
//   return response.data;
// }

export function getProductBySlug(slug, opts = {}) {
  return http(`product/${encodeURIComponent(slug)}`, opts);
}

// export async function fetchProducts(params = {}, options = {}) {
//   const query = new URLSearchParams(params).toString();
//   const path = query ? `products?${query}` : "products";
//   return http(path, options);
// }

export function fetchProducts(params = {}, opts = {}) {
  const query = new URLSearchParams(params).toString();
  const path = query ? `products?${query}` : "products";
  return http(path, opts);
}
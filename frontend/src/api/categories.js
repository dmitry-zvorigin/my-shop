import { http } from './http';

// export const fetchRootCategories = async () => {
//   const response = await axios.get('http://localhost:8000/api/categories/tree?depth=2');
//   return response.data;
// };

// export const fetchCategoryBySlug = async (slug) => {
//   const response = await axios.get(`http://localhost:8000/api/categories/slug/${slug}`);
//   return response.data;
// };

// export const fetchTreeCategories = async () => {
//   const response = await axios.get('http://localhost:8000/api/categories/tree?depth=4');
//   return response.data;
// }

// API для продуктов по категории
// export const fetchProductsByCategory = async (categorySlug, options = {}) => {
//   const {
//     page = 1,
//     limit = 20,
//     sort = 'created_at',
//     order = 'desc',
//     minPrice,
//     maxPrice,
//     brands = [],
//     attributes = {}
//   } = options;

//   // Строим query параметры
//   const params = new URLSearchParams({
//     page: page.toString(),
//     limit: limit.toString(),
//     sort,
//     order
//   });

//   // Добавляем фильтры по цене
//   if (minPrice !== undefined) params.append('min_price', minPrice.toString());
//   if (maxPrice !== undefined) params.append('max_price', maxPrice.toString());

//   // Добавляем бренды
//   if (brands.length > 0) {
//     brands.forEach(brand => params.append('brands[]', brand));
//   }

//   // Добавляем атрибуты
//   Object.entries(attributes).forEach(([key, value]) => {
//     if (Array.isArray(value)) {
//       value.forEach(v => params.append(`attributes[${key}][]`, v));
//     } else {
//       params.append(`attributes[${key}]`, value);
//     }
//   });

//   const response = await axios.get(`${API_URL}/categories/${categorySlug}/products?${params}`);
//   return response.data;
// };

// API для получения метаданных категории (количество продуктов, фильтры)
// export const fetchCategoryMetadata = async (categorySlug) => {
//   const response = await axios.get(`${API_URL}/categories/${categorySlug}/metadata`);
//   return response.data;
// };

// API для получения доступных фильтров категории
// export const fetchCategoryFilters = async (categorySlug) => {
//   const response = await axios.get(`${API_URL}/categories/${categorySlug}/filters`);
//   return response.data;
// };

export const fetchTreeCategories = ( depth = 2) => ({ signal }) =>
  http('categories/tree', { signal , searchParams: { depth }}); // ожидаем { data: [...] }

export const fetchCategoryBySlug = (slug) => ({ signal }) =>
  http(`categories/slug/${encodeURIComponent(slug)}`, { signal });
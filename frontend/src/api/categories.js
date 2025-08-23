import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const fetchRootCategories = async () => {
  const response = await axios.get('http://localhost:8000/api/categories/tree?depth=2');
  return response.data;
};

export const fetchCategoryBySlug = async (slug) => {
  const response = await axios.get(`http://localhost:8000/api/categories/slug/${slug}`);
  return response.data;
};

export const fetchTreeCategories = async () => {
  const response = await axios.get('http://localhost:8000/api/categories/tree?depth=4');
  return response.data;
}

export const fetchBrandAll = async () => {
  const response = await axios.get('http://localhost:8000/api/brand');
  return response.data;
}

export const fetchBrandBySlug = async (slug) => {
  const response = await axios.get(`http://localhost:8000/api/brand/${slug}`);
  return response.data;
}


// Test Api
export const fetchProductAll = async () => {
  const response = await axios.get('http://localhost:8000/api/product/all');
  return response.data;
}

export const fetchProductShow = async (slug) => {
  const response = await axios.get(`http://localhost:8000/api/product/${slug}`);
  return response.data;
}

// API для продуктов по категории
export const fetchProductsByCategory = async (categorySlug, options = {}) => {
  const {
    page = 1,
    limit = 20,
    sort = 'created_at',
    order = 'desc',
    minPrice,
    maxPrice,
    brands = [],
    attributes = {}
  } = options;

  // Строим query параметры
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort,
    order
  });

  // Добавляем фильтры по цене
  if (minPrice !== undefined) params.append('min_price', minPrice.toString());
  if (maxPrice !== undefined) params.append('max_price', maxPrice.toString());

  // Добавляем бренды
  if (brands.length > 0) {
    brands.forEach(brand => params.append('brands[]', brand));
  }

  // Добавляем атрибуты
  Object.entries(attributes).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => params.append(`attributes[${key}][]`, v));
    } else {
      params.append(`attributes[${key}]`, value);
    }
  });

  const response = await axios.get(`${API_URL}/categories/${categorySlug}/products?${params}`);
  return response.data;
};

// API для получения метаданных категории (количество продуктов, фильтры)
export const fetchCategoryMetadata = async (categorySlug) => {
  const response = await axios.get(`${API_URL}/categories/${categorySlug}/metadata`);
  return response.data;
};

// API для получения доступных фильтров категории
export const fetchCategoryFilters = async (categorySlug) => {
  const response = await axios.get(`${API_URL}/categories/${categorySlug}/filters`);
  return response.data;
};
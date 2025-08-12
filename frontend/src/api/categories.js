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

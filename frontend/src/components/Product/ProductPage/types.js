// Типы для компонентов ProductPage

/**
 * Основная информация о продукте
 */
export const ProductTypes = {
  // Базовый продукт
  product: {
    id: 'number',
    name: 'string',
    slug: 'string',
    price: 'number',
    image: 'string',
    brand: {
      id: 'number',
      name: 'string',
      slug: 'string',
      logo_url: 'string'
    },
    images: 'array',
    rating: 'number',
    reviews_count: 'number',
    questions_count: 'number'
  },

  // Комплект товаров
  bundle: {
    id: 'number',
    name: 'string',
    products: 'array',
    discountPrice: 'number',
    originalPrice: 'number'
  },

  // Аксессуар
  accessory: {
    id: 'number',
    name: 'string',
    slug: 'string',
    image: 'string',
    price: 'number'
  },

  // Характеристика
  specification: {
    group: 'string',
    items: [{
      name: 'string',
      value: 'string'
    }]
  },

  // Отзыв
  review: {
    id: 'number',
    author: {
      name: 'string'
    },
    rating: 'number',
    text: 'string',
    date: 'string',
    pros: 'string',
    cons: 'string'
  },

  // Статья/обзор
  article: {
    id: 'number',
    title: 'string',
    slug: 'string',
    excerpt: 'string',
    image: 'string',
    author: 'string',
    date: 'string',
    views: 'number',
    rating: 'number'
  },

  // Надежность
  reliability: {
    warranty: 'string',
    delivery: 'string',
    return: 'string',
    support: 'string'
  }
};

/**
 * Примеры использования типов
 */
export const Examples = {
  // Пример продукта
  productExample: {
    id: 1,
    name: "AMD Ryzen 9 7950X",
    slug: "amd-ryzen-9-7950x",
    price: 45000,
    image: "/images/products/ryzen-9-7950x.jpg",
    brand: {
      id: 1,
      name: "AMD",
      slug: "amd",
      logo_url: "/images/brands/amd-logo.png"
    },
    images: [
      "/images/products/ryzen-9-7950x-1.jpg",
      "/images/products/ryzen-9-7950x-2.jpg"
    ],
    rating: 4.8,
    reviews_count: 156,
    questions_count: 23
  },

  // Пример комплекта
  bundleExample: {
    id: 1,
    name: "Геймерский комплект",
    products: [
      { id: 1, name: "Процессор", image: "/images/cpu.jpg" },
      { id: 2, name: "Материнская плата", image: "/images/motherboard.jpg" }
    ],
    discountPrice: 45000,
    originalPrice: 52000
  },

  // Пример отзыва
  reviewExample: {
    id: 1,
    author: { name: "Алексей" },
    rating: 5,
    text: "Отличный процессор для игр и работы!",
    date: "2025-01-15",
    pros: "Высокая производительность, низкое энергопотребление",
    cons: "Дорогой"
  }
};

/**
 * Валидация пропсов
 */
export const validateProps = {
  // Валидация продукта
  product: (product) => {
    if (!product || typeof product !== 'object') return false;
    if (!product.id || !product.name || !product.slug) return false;
    return true;
  },

  // Валидация рейтинга
  rating: (rating) => {
    return typeof rating === 'number' && rating >= 0 && rating <= 5;
  },

  // Валидация даты
  date: (date) => {
    if (!date) return false;
    const dateObj = new Date(date);
    return !isNaN(dateObj.getTime());
  }
};

/**
 * Утилиты для компонентов
 */
export const Utils = {
  // Форматирование цены
  formatPrice: (price) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  },

  // Форматирование даты
  formatDate: (dateString) => {
    if (!dateString) return "Не указано";
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  },

  // Вычисление скидки
  calculateDiscount: (originalPrice, discountPrice) => {
    if (!originalPrice || !discountPrice) return 0;
    return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  },

  // Проверка срока действия
  isExpired: (dateString) => {
    if (!dateString) return false;
    const now = new Date();
    const targetDate = new Date(dateString);
    return now > targetDate;
  }
};

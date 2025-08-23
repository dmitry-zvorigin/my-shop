import { useEffect, useState } from 'react';
import { fetchRootCategories } from '../api/categories';
import Breadcrumbs from '@/components/Common/Breadcrumbs';
import CategoryCard from '@/components/CategoryCard';

export default function CatalogPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchRootCategories().then(setCategories);
  }, []);

  return (
    <div>
      <Breadcrumbs items={[{ id: 0, name: 'Каталог', slug: 'catalog' }]} />

      <h1 className="text-2xl font-bold mb-5">Каталог</h1>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            image={category.image_url}
            children={category.children}
            path={[category.slug]}
          />
        ))}
      </div>
    </div>
  );
}

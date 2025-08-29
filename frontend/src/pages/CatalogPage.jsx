import Breadcrumbs from '@/components/Common/Breadcrumbs';
import CategoryCard from '@/components/CategoryCard';
import { useCategoriesTree } from '@/hooks/categoryQueries';

export default function CatalogPage() {
  const { data: categories } = useCategoriesTree(4);

  return (
    <div>
      <Breadcrumbs items={[{ id: 0, name: 'Каталог', slug: 'catalog' }]} />

      <h1 className="text-2xl font-bold mb-5">Каталог</h1>

      <div 
        className="
          grid 
          sm:grid-cols-1
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-5"
      >
          {categories?.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              image={category.image_url}
              subcategories={category.children}
              path={[category.slug]}
            />
          ))}
      </div>
    </div>
  );
}
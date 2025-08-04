import { useEffect, useState } from "react";
import { fetchCategoryBySlug } from "../api/categories";
import Breadcrumbs from "../components/Breadcrumbs";
import CategoryCard from "../components/CategoryCard";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { slug } = useParams();

  const [category, setCategory] = useState(null);
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    fetchCategoryBySlug(slug).then((data) => {
      setCategory(data.category);

      const fullPath = [
        { id: 0, name: "Каталог", slug: "" },
        ...data.path,
      ];

      setPath(fullPath);
      setLoading(false);
    });
  }, [slug]);


  if (loading) return <div className="p-4">Загрузка...</div>;
  if (!category) return <div className="p-4 text-red-500">Категория не найдена</div>;

  return (
      <div>
        <Breadcrumbs items={path} base={'/catalog'} />
        <h1 className="text-2xl font-bold mb-5">{category.name}</h1>

        {category.children?.length > 0 ? (
          <div className="grid grid-cols-5 gap-5">
            {category.children.map((child) => (
              <CategoryCard
                key={child.id}
                name={child.name}
                image={child.image_url}
                path={[child.slug]}
                compact={true}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Нет подкатегорий</p>
        )}
      </div>
  );
}

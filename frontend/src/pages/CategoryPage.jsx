import { fetchCategoryBySlug } from "@/api/categories";
import CategoryCard from "@/components/CategoryCard";
import Breadcrumbs from "@/components/Common/Breadcrumbs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductPage from "./ProductPage";
import { CategoryView, ProductView } from "@/components/CategoryPage";

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

  console.log(category);
  return (
      <div>
        <Breadcrumbs items={path} base={'/catalog'} />
        <h1 className="text-2xl font-bold mb-5">{category.name}</h1>

        {category.is_group ? (
          <CategoryView category={category} />
        ) : (
          <ProductView categorySlug={category.slug} />
        )}

      </div>
  );
}

import Breadcrumbs from "@/components/Common/Breadcrumbs";
import { useParams } from "react-router-dom";
import { CategoryView, ProductView } from "@/components/CategoryPage";
import { useCategoryBySlug } from "@/hooks/categoryQueries";

export default function CategoryPage() {
  const { slug } = useParams();
  const { data } = useCategoryBySlug(slug);
  const { category, breadcrumbs } = data;

  return (
      <div>
        <Breadcrumbs items={breadcrumbs} base={'/catalog'} />
        <h1 className="text-2xl font-bold mb-5">{category.name}</h1>

        {category.is_group ? (
          <CategoryView category={category} />
        ) : (
          <ProductView categorySlug={category.slug} />
        )}

      </div>
  );
}

import { Link } from "react-router-dom";

export default function BrandCategoryGrid({ categories }) {
  if (!categories?.length) return null;

  return (
    <div className="grid grid-cols-7 gap-5">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/catalog/${category.slug}`}
          className="size-[200px] rounded-lg bg-white shadow flex items-center justify-center hover:shadow-2xl transition"
        >
          <div className="p-4 flex flex-col text-center h-full justify-center items-center">
            {category.image_url ? (
              <img src={category.image_url} alt={category.name} className="object-contain mb-2" />
            ) : (
              <div className="w-30 h-30 mb-2 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                Нет фото
              </div>
            )}
            <h3 className="text-sm font-medium">{category.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
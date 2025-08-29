import { Link } from "react-router-dom";
import CategoryCard from "../CategoryCard";

export default function BrandCategoryGrid({ categories }) {
  if (!categories?.length) return null;

  const visibleCategories = categories.slice(0, 11);
  const hasMore = categories.length > 11;

  return (
    <div className="
      grid grid-cols-[repeat(auto-fill,230px)] gap-5
          "
    >
      {visibleCategories.map((category) => (
        <CategoryCard
          key={category.id}
          name={category.name}
          image={category.image_url}
          path={[category.slug]}
          compact={true}
        />
      ))}
      {hasMore && (
        <div className="aspect-square rounded-lg bg-white group cursor-pointer flex flex-col justify-center items-center gap-5 shadow">
          <div className="flex flex-col justify-center items-center group-hover:text-orange-500 transition">
            <h3 className="text-base">еще</h3>
            <h3 className="text-4xl font-medium">{categories.length}</h3>
            <h3 className="text-base">категория</h3>
          </div>

          <button>Показать еще</button>
        </div>
      )}
    </div>

  );
}


    // <div className="grid grid-cols-7 gap-5">
    //   {categories.map((category) => (
    //     <Link
    //       key={category.id}
    //       to={`/catalog/${category.slug}`}
    //       className="size-[200px] rounded-lg bg-white shadow flex items-center justify-center hover:shadow-2xl transition"
    //     >
    //       <div className="p-4 flex flex-col text-center h-full justify-center items-center">
    //         {category.image_url ? (
    //           <img src={category.image_url} alt={category.name} className="object-contain mb-2" />
    //         ) : (
    //           <div className="w-30 h-30 mb-2 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
    //             Нет фото
    //           </div>
    //         )}
    //         <h3 className="text-sm font-medium">{category.name}</h3>
    //       </div>
    //     </Link>
    //   ))}
    // </div>
import { Link } from "react-router-dom";
import HorizontalScroller from "../Common/HorizontalScroller";
import { useBrands } from "@/hooks/brandQueries";

export default function BrandList() {

  const { data: brands, error } = useBrands();

  if (error)     return <div className="p-5 text-red-500">Ошибка загрузки</div>;
  if (!brands)   return <div className="p-5 text-red-500">Бренд не найден</div>;

  return (
    <div>
      <HorizontalScroller>
        {brands.map((brand) => (
          <Link
            to={`/brand/${brand.slug}`}
            key={brand.id}
            className="rounded-lg shadow hover:shadow-md transition bg-white"
          >
            <div className="w-[140px] h-[96px] p-5">
              {/* Если есть изображение: */}
              {brand.logo_url && (
                <img
                  src={brand.logo_url}
                  alt={brand.name}
                  className="h-full w-full object-contain"
                />
              )}
            </div>

          </Link>
        ))}
      </HorizontalScroller>
    </div>
  );
}

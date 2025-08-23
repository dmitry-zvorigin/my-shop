import { useEffect, useState } from "react";
// import { fetchBrandAll } from "../../api/categories";
import { Link } from "react-router-dom";
import HorizontalScroller from "../Common/HorizontalScroller";
import { fetchBrandAll } from "@/api/categories";

export default function BrandList() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrandAll()
      .then((data) => setBrands(data.data))
      .catch((err) => console.error("Ошибка при загрузке брендов: ", err))
      .finally(() => setLoading(false));
  }, [brands]);

  if (loading) {
    return <div className="p-5">Загрузка...</div>
  }

  if (!brands) {
    return <div className="p-5 text-red-500">Бренд не найден</div>;
  }


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

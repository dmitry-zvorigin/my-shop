import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import HorizontalScroller from "../Common/HorizontalScroller";
import { getBrandAll } from "@/api/brand";

export default function BrandList() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentRequestRef = useRef(null);

    useEffect(() => {    
      const abortController = new AbortController();
      const requestToken = {};
      currentRequestRef.current = requestToken;
    
      setLoading(true);
      setError(null);
    
      (async () => {
        try {
          const data = await getBrandAll({ signal: abortController.signal });
          if (currentRequestRef.current !== requestToken) return;
          setBrands(data.data);
        } catch (err) {
          if (err?.name !== 'AbortError') {
            console.error('Ошибка при загрузке:', err);
            if (currentRequestRef.current === requestToken) setError(err);
          }
        } finally {
          if (currentRequestRef.current === requestToken) setLoading(false);
        }
      })();
    
      return () => {
        currentRequestRef.current = null;
        abortController.abort();
      };
    }, []);

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

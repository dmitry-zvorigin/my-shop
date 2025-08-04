import { useEffect, useRef, useState } from "react";
import { fetchBrandAll } from "../../api/categories";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function BrandList() {
  const [brands, setBrands] = useState([]);
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [atStart, setAtStart] = useState(false);
  const [atEnd, setAtEnd] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchBrandAll().then((data) => {
      setBrands(data.data);
    });

  }, []);

    useEffect(() => {
      fetchBrandAll()
        .then((data) => setBrands(data.data))
        .catch((err) => console.error("Ошибка при загрузке брендов: ", err))
        .finally(() => setLoading(false));
    }, [brands]);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft === 0);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1); // -1 для погрешности
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState);
    updateScrollState(); // начальное состояние
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [brands]);


  if (loading) {
    return <div className="p-5">Загрузка...</div>
  }

  if (!brands) {
    return <div className="p-5 text-red-500">Бренд не найден</div>;
  }


  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >

      {/* Левая кнопка */}
      <button
        onClick={scrollLeft}
        disabled={atStart}
        className={clsx(
          "absolute left-0 top-1/2 -translate-y-1/2 z-10  shadow p-2 rounded-full hover:shadow-md transform duration-300 opacity-0",
          isHovered && "opacity-100", 
          atStart ? "bg-gray-400" : "bg-white"
        )}
      >
        <ChevronLeftIcon className="size-5"/>
      </button>

      <div ref={scrollRef} className="flex gap-5 overflow-x-hidden py-5">
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
                    className="h-full w-full object-contain "
                  />
                )}
              </div>

            </Link>
        ))}
      </div>

      {/* Правая кнопка */}
      <button
        onClick={scrollRight}
        disabled={atEnd}
        className={clsx(
          "absolute right-0 top-1/2 -translate-y-1/2 z-10  shadow p-2 rounded-full hover:shadow-md transform duration-300 opacity-0",
          isHovered && "opacity-100",
          atEnd ? "bg-gray-400" : "bg-white"
        )}
      >
        <ChevronRightIcon className="size-5"/>
      </button>

    </div>

  );
}

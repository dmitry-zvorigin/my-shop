import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBrandBySlug } from "../api/categories";

export default function BrandPage() {
  const { slug } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    fetchBrandBySlug(slug)
      .then((data) => setBrand(data.data))
      .catch((err) => console.error("Ошибка при загрузке бренда: ", err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="p-5">Загрузка...</div>
  }

  if (!brand) {
    return <div className="p-5 text-red-500">Бренд не найден</div>;
  }

  return (
    <div className="grid gap-5">

      <div className="flex justify-center items-center p-5">
        {brand.logo_url && (
          <img
            src={brand.logo_url}
            alt={brand.name}
            className="object-contain"
          />
        )}
      </div>

      <div className="grid grid-cols-7 gap-5">
        {Array.from({ length: 13 }).map((_, index) => (
          <div
            key={index}
            className="size-[200px] rounded-lg bg-white shadow"
          >
            {/* Содержимое блока */}
          </div>
        ))}
          <button
            className="size-[200px] rounded-lg bg-white shadow flex justify-center items-center"
          >
            Показать еще
          </button>
      </div>

      <div>
        <h1 className="text-2xl mb-5 font-bold">Лучшие предложения</h1>
        <div className="bg-white rounded-lg p-5">

        </div>
      </div>

      <div>
        <h1 className="text-2xl mb-5 font-bold">Новинки</h1>
        <div className="bg-white rounded-lg p-5">

        </div>
      </div>
      
      <div>
        <h1 className="text-2xl mb-5 font-bold">Отзывы на товары</h1>
        <div className="bg-white rounded-lg p-5">

        </div>
      </div>

      <div>
        <h1 className="text-2xl mb-5 font-bold">Сервисные центры</h1>
        <div className="bg-white rounded-lg p-5">
          <p className="text-sm">Для проведения гарантийного обслуживания вы можете обратиться в любой магазин MyShop.</p>
          <p className="text-sm mb-5">Для консультации по сервисному и гарантийному обслуживанию (в том числе по услуге вывоза крупногабаритной техники) вы можете обратиться по телефону:</p>
          <div>
            <span className="font-bold">8-888-88-88-888 </span>
            <span className="text-gray-500">С 10:00 до 19:00</span>
          </div>
          <p className="text-sm">MyShop Сервис в г. Екатеринбург</p>
        </div>
      </div>

      <div>
        <h1 className="text-2xl mb-5 font-bold">Обзоры</h1>
        <div className="bg-white rounded-lg p-5">

        </div>
      </div>

      <div>
        <h1 className="text-2xl mb-5 font-bold">{brand.name}</h1>
        <div className="bg-white rounded-lg p-5">
          <p className="">
            {brand.description}
          </p>
        </div>
      </div>

    </div>
  );
  
}

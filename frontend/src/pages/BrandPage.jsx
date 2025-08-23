import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";
import { fetchBrandBySlug } from "@/api/categories";
import HorizontalScroller from "@/components/Common/HorizontalScroller";

export default function BrandPage() {
  const { slug } = useParams();
  const [brand, setBrand] = useState(null);
  const [categories, setCategories] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    fetchBrandBySlug(slug)
      .then((data) => {
        setBrand(data.brand);
        setCategories(data.categories);
        setLatestProducts(data.latest_products);
        // вот здесь
      })
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
    <div className="gap-5 grid-cols-1 grid">
      <div className="flex justify-center items-center p-5">
        {brand.logo_url && (
          <img
            src={brand.logo_url}
            alt={brand.name}
            className="object-contain"
          />
        )}
      </div>
      
      {brand.test && (
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
      )}

      <div className="grid grid-cols-7 gap-5">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/catalog/${category.slug}`}
            className="size-[200px] rounded-lg bg-white shadow flex items-center justify-center hover:shadow-2xl transition"
          >
            <div className="p-4 flex flex-col text-center h-full justify-center items-center">
              {category.image_url ? (
                <img
                  src={category.image_url}
                  alt={category.name}
                  className="object-contain mb-2"
                />
              ) : (
                <div className="w-30 h-30 mb-2 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                  <span>Нет фото</span>
                </div>
              )}
              <h3 className="text-sm font-medium">{category.name}</h3>
            </div>

          </Link>
        ))}
      </div>

      {brand.test && (
        <div>
          <h1 className="text-2xl mb-5 font-bold">Лучшие предложения</h1>
          <div className="bg-white rounded-lg p-5">

          </div>
        </div>
      )}

      {latestProducts.length > 0 && (
        <div className="">
          <h1 className="text-2xl font-bold">Новинки</h1>
          <HorizontalScroller scrollStep={400}>
            <div className="flex gap-5">
              {latestProducts.map(product => (
                <Link
                  key={product.id}
                  className="w-[300px] bg-white rounded-xl shadow hover:shadow-lg flex-none transition-all"
                >
                  <div className="p-5 flex flex-col h-full">

                    {/* Фото товара */}
                    <div className="h-[280px] flex items-center justify-center mb-4">
                      {product.image_medium_url ? (
                        <img
                          src={product.image_medium_url}
                          alt={product.name}
                          className="max-h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm">
                          Нет фото
                        </div>
                      )}
                    </div>

                    {/* Название */}
                    <h3 className="text-base line-clamp-2 mb-2 text-center hover:text-orange-400 transition">
                      {product.name}
                    </h3>

                    {/* Цена + кнопка */}
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-bold text-2xl">{formatPrice(product.price)}</span>
                      <button 
                        className="px-4 py-2 bg-amber-500 bg-gradient-to-b from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500
                        text-white rounded-lg text-base font-bold cursor-pointer transition w-[100px] h-[45px]"
                      >
                        Купить
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </HorizontalScroller>
        </div>
      )}
      
      {brand.test && (
        <div>
          <h1 className="text-2xl mb-5 font-bold">Отзывы на товары</h1>
          <div className="bg-white rounded-lg p-5">

          </div>
        </div>
      )}

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

      {brand.reviews && (
        <div>
          <h1 className="text-2xl mb-5 font-bold">Обзоры</h1>
          <div className="bg-white rounded-lg p-5">

          </div>
        </div>
      )}

      {brand.description && (
        <div>
          <h1 className="text-2xl mb-5 font-bold">{brand.name}</h1>
          <div className="bg-white rounded-lg p-5">
            <p>{brand.description}</p>
          </div>
        </div>
      )}
    </div>
  );
  
}

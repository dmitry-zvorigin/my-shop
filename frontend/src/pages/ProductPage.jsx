import { useEffect, useState } from "react";
import { fetchProductShow } from "../api/categories";
import { Link, useParams } from "react-router-dom";
import ProductPrice from "../components/Product/ProductCard/ProductPrice";
import { HeartIcon } from "@heroicons/react/24/outline";
import ProductGallery from "../components/Product/ProductGallery/ProductGallery";

export default function ProductPage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!slug) return;

    fetchProductShow(slug)
      .then((data) => {
        setProduct(data.data);
      })
      .catch((err) => console.error("Ошибка при загрузке продуктов: ", err))
      .finally(() => setLoading(false));
  }, [slug]);

    if (loading) {
      return <div>Loading..</div>
    }

    return (
      <div className="space-y-5">
        <h1 className="text-2xl font-bold">{product.name}</h1>

        <div className="rounded-lg bg-white grid">
          <div className="grid grid-cols-[1fr_1fr]">
            <ProductGallery images={product.images} alt={product.name} height={500} thumbSize={80}/>
            <div className="flex flex-col gap-5 p-5">

              <div className="h-[80px] grid grid-cols-[1fr_100px]">
                <h1>AM5, 16 x 4.3 ГГц, L2 - 16 МБ, L3 - 64 МБ, 2 х DDR5-5600 МГц, AMD Radeon Graphics, TDP 170 В</h1>
                <div className="flex justify-center">
                  <Link to={`/brand/${product.brand.slug}`}>
                    <img src={product.brand.logo_url} alt={product.brand.name} className="object-contain" />
                  </Link>
                </div>
              </div>

              <div className="outline-1 h-[36px]"></div>

              <div className="h-[64px] grid grid-cols-[3fr_64px_150px] gap-5">
                <ProductPrice price={product.price} isGrid={true} classText="text-2xl" />
                <button type="button" className="rounded-lg flex justify-center items-center bg-gray-200 cursor-pointer hover:bg-gray-300 transition">
                  <HeartIcon className="size-[18px]" />
                </button>
                <button 
                  className="flex items-center justify-center rounded-lg text-lg font-medium cursor-pointer text-white
                    transition bg-gradient-to-b from-orange-300 to-orange-400
                  hover:from-orange-400 hover:to-orange-500 hover:text-white"
                >
                  Купить
                </button>
              </div>

              <div className="outline-1 h-[64px]"></div>
              <div className="outline-1 h-[64px]"></div>

            </div>

          </div>
          <div className="product-user-media-gallery h-[80px] outline-1 m-5">user-media-gallery</div>
        </div>

        <div className="bg-white rounded-lg h-[400px]">
          <h1>Выгодные комплекты</h1>
        </div>

        <div className="bg-white rounded-lg h-[400px]">
          <h1>Аксессуары</h1>
        </div>

        <div className="bg-white rounded-lg h-[400px]">
          <h1>Покупают вместе</h1>
        </div>

        <div className="bg-white rounded-lg h-[1000px]">
          <h1>Характеристики</h1>
        </div>

        <div className="bg-white rounded-lg h-[1200px]">
          <h1>Отзывы</h1>
        </div>

        <div className="bg-white rounded-lg h-[200px]">
          <h1>Надежность</h1>
        </div>

        <div className="bg-white rounded-lg h-[200px]">
          <h1>Обзоры</h1>
        </div>

        <div className="bg-white rounded-lg h-[200px]">
          <h1>Аналоги</h1>
        </div>

        <div className="bg-white rounded-lg h-[200px]">
          <h1>Вы недавно смотрели</h1>
        </div>

        <div className="bg-white rounded-lg h-[200px]">
          <h1>Указанное предложение действительно на 19.08.2025</h1>
        </div>

        <div className="bg-white rounded-lg h-[200px]">
          <h1>Новое в DNS</h1>
        </div>

      </div>

    );
}
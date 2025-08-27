import { getProductBySlug } from "@/api/products";
import Breadcrumbs from "@/components/Common/Breadcrumbs";
import ProductOverview from "@/components/Product/ProductPage/ProductOverview";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ProductPage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const currentRequestRef = useRef(null);
  
  // useEffect(() => {
  //   if (!slug) return;

  //   fetchProductShow(slug)
  //     .then((data) => {
  //       setProduct(data.data);
  //     })
  //     .catch((err) => console.error("Ошибка при загрузке продуктов: ", err))
  //     .finally(() => setLoading(false));

  // }, [slug]);

useEffect(() => {
  if (!slug) return;

  const abortController = new AbortController();
  const requestToken = {};
  currentRequestRef.current = requestToken;

  setLoading(true);
  setError(null);

  (async () => {
    try {
      const data = await getProductBySlug(slug, { signal: abortController.signal });
      if (currentRequestRef.current !== requestToken) return;
      setProduct(data.data);
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
}, [slug]);

  if (!slug) return <div>Нет товара</div>;
  if (loading) return <div>Загрузка..</div>;
  if (error) return <div>Ошибка загрузки</div>
  if (!product) return null;

  return (
    <div className="space-y-5">

      <Breadcrumbs items={product.path} base={'/catalog'}/>

      <h1 className="text-2xl font-bold">{product.name}</h1>

      <div>
        <ProductOverview
          product={product}
          ratingValue={0}
          ratingCount={0}
          questionsCount={0}
          onToggleFavorite={() => {}}
          onBuy={() => {}}
        />
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
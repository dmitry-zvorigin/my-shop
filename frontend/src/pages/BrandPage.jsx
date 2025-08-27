import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import BrandHero from "@/components/BrandPage/BrandHero";
import BrandCategoryGrid from "@/components/BrandPage/BrandCategoryGrid";
import BrandLatestProducts from "@/components/BrandPage/BrandLatestProducts";
import BrandServiceInfo from "@/components/BrandPage/BrandServiceInfo";
import BrandAbout from "@/components/BrandPage/BrandAbout";
import { getBrandBySlug } from "@/api/brand";

export default function BrandPage() {
  const { slug } = useParams();
  const [brand, setBrand] = useState(null);
  const [categories, setCategories] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentRequestRef = useRef(null);

  useEffect(() => {
    if (!slug) return;
  
    const abortController = new AbortController();
    const requestToken = {};
    currentRequestRef.current = requestToken;
  
    setLoading(true);
    setError(null);
  
    (async () => {
      try {
        const data = await getBrandBySlug(slug, { signal: abortController.signal });
        if (currentRequestRef.current !== requestToken) return;
        setBrand(data.brand);
        setCategories(data.categories);
        setLatestProducts(data.latest_products);
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
  

  if (loading) {
    return <div className="p-5">Загрузка...</div>
  }

  if (!brand) {
    return <div className="p-5 text-red-500">Бренд не найден</div>;
  }

  return (
    <div className="gap-5 grid-cols-1 grid">

      <BrandHero brand={brand}/>
      
      <BrandCategoryGrid categories={categories} />

      <BrandLatestProducts products={latestProducts} />
      
      <BrandServiceInfo />

      <BrandAbout name={brand.name} description={brand.description} />

    </div>
  );
  
}

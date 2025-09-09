import { useParams } from "react-router-dom";
import BrandHero from "@/components/BrandPage/BrandHero";
import BrandCategoryGrid from "@/components/BrandPage/BrandCategoryGrid";
import BrandLatestProducts from "@/components/BrandPage/BrandLatestProducts";
import BrandServiceInfo from "@/components/BrandPage/BrandServiceInfo";
import BrandAbout from "@/components/BrandPage/BrandAbout";
import { useBrand } from "@/hooks/brandQueries";

export default function BrandPage() {
  const { slug } = useParams();

  const { data, isLoading, error } = useBrand(slug);

  if (isLoading) return <div className="p-5">Загрузка…</div>;
  if (error)     return <div className="p-5 text-red-500">Ошибка загрузки</div>;  
  if (!data?.brand) return <div className="p-5 text-red-500">Бренд не найден</div>;

  const { brand, categories, latestProducts } = data;

  

  return (
    <div className="gap-5 grid-cols-1 grid">

      <BrandHero brand={brand}/>
      
      <BrandCategoryGrid categories={categories} brandSlug={brand.slug}/>

      <BrandLatestProducts products={latestProducts} />
      
      <BrandServiceInfo />

      <BrandAbout name={brand.name} description={brand.description} />

    </div>
  );
  
}

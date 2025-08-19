import { useState } from "react";
import ProductCard from "./ProductCard/ProductCard";
import ProductCardSkeleton from "./ProductCard/ProductCardSkeleton";

export default function ProductList({ items, loading, view }) {
  const [openId, setOpenId] = useState(null);

  if (loading) {
    return (
      <div className="space-y-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="p-5 text-red-500">Продуктов нет</div>;
  }

  return (
    <div className={view === "grid" ? "grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3   gap-5" : "space-y-5"}>
      {items.map((product) => (
        <ProductCard           
          key={product.id}
          product={product}
          view={view}
          isOpen={openId === product.id}
          onOpen={() => setOpenId(product.id)}
          onClose={() => setOpenId(null)} /> // ⬅ key обязателен
      ))}
    </div>
  );
}
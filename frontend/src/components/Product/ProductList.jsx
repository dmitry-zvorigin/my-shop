import { useState } from "react";
import ProductCard from "./ProductCard/ProductCard";
import ProductCardSkeleton from "./ProductCard/ProductCardSkeleton";
import clsx from "clsx";

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
    return (
      <div className="p-5 text-red-500 rounded-lg shadow bg-white flex justify-center items-center h-40 text-2xl font-medium">
        Продуктов нет
      </div>
    );
  }

  return (
    <div 
      className={clsx(
        view === "grid" ? "grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-5" : "space-y-5")}
      >
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
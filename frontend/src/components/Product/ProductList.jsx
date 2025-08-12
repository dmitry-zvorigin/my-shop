import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProductAll } from "../../api/categories";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    fetchProductAll()
      .then((data) => {
        setProducts(data.data);
      })
      .catch((err) => console.error("Ошибка при загрузке продуктов: ", err))
      .finally(() => setLoading(false));
  }, []); // ⬅ пустой массив зависимостей


  console.log(products);
  if (loading) {
    return <div className="p-5">Загрузка...</div>;
  }

  if (products.length === 0) {
    return <div className="p-5 text-red-500">Продуктов нет</div>;
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductCard           
          key={product.id}
          product={product}
          isOpen={openId === product.id}
          onOpen={() => setOpenId(product.id)}
          onClose={() => setOpenId(null)} /> // ⬅ key обязателен
      ))}
    </div>
  );
}
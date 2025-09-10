import { useProducts } from "@/hooks/productQueries";
import { lazy } from "react";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import Pagination from "../Pagination/Pagination";

const ProductList = lazy(() => import("./ProductList"));

export default function ProductsContainer({ params, view, onPageChange }) {
  const { data } = useProducts(params); // ← запрос стартует сразу
  const items = data?.data ?? [];
  const meta  = data?.meta ?? {};
  return (
    <div className="flex flex-col gap-5">
      <ProductList
        items={items}
        view={view}
        page={meta.current_page}
        perPage={meta.per_page}
        onPageChange={onPageChange}
      />
      <LoadMoreButton/>
      <Pagination/>
    </div>
  );
}
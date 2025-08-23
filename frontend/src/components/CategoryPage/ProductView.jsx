import { fetchProductsByCategory } from "@/api/categories";
import { useEffect, useState } from "react";
import ProductOverview from "../Product/ProductPage/ProductOverview";
import FiltersSidebar from "../Product/FiltersSidebar";
import ToolBar from "../Product/Toolbar";
import ProductList from "../Product/ProductList";
import { useSearchParams } from "react-router-dom";

export default function ProductView({ categorySlug }) {
  const [products, setProducts] = useState([]);
  const [params, setParams] = useSearchParams();
  // const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const sort = params.get('sort') || 'popularity';
  const group = params.get('group') || 'none';
  const view = params.get('view') || 'list';
  const page = Number(params.get('page') || 1);

  useEffect(() => {
    if (!categorySlug) return;
    
    setLoading(true);
    
    fetchProductsByCategory(categorySlug, {
      page,
      limit: 20, // или другое значение
      sort,
      order: 'desc', // или 'asc'
      // group убрал, так как его нет в API
    })
      .then(res => setProducts(res.data))
      .catch((err) => console.error("Ошибка при загрузке продуктов: ", err))
      .finally(() => setLoading(false));
  }, [categorySlug, sort, page]);

  const onChangeSort = (v) => setParams(p => { p.set('sort', v); p.set('page', '1'); return p; });
  const onChangeGroup = (v) => setParams(p => { p.set("group", v); p.set("page", "1"); return p; });
  const onChangeView =  (v) => setParams(p => { p.set("view", v); return p; });

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='grid grid-cols-[350px_1fr] gap-5 mt-5'>
      
      <FiltersSidebar />

      <div className=''>

        <ToolBar
          sort={sort}
          group={group}
          view={view}
          onSortChange={onChangeSort}
          onGroupChange={onChangeGroup}
          onViewChange={onChangeView}
        />

        <ProductList items={products} loading={loading} view={view}/>

      </div>
    </div>
  );
}
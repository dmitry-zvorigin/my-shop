import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProductAll } from '@/api/categories';
import Breadcrumbs from '@/components/Common/Breadcrumbs';
import FiltersSidebar from '@/components/Product/FiltersSidebar';
import ToolBar from '@/components/Product/Toolbar';
import ProductList from '@/components/Product/ProductList';

export default function ProductsPage() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const sort = params.get('sort') || 'popularity';
  const group = params.get('group') || 'none';
  const view = params.get('view') || 'list';
  const page = Number(params.get('page') || 1);

  useEffect(() => {
    setLoading(true);
    fetchProductAll({ sort, group, page })
      .then(res => setItems(res.data))
      .catch((err) => console.error("Ошибка при загрузке продуктов: ", err))
      .finally(() => setLoading(false));
  }, [sort, group, page]);

  const onChangeSort = (v) => setParams(p => { p.set('sort', v); p.set('page', '1'); return p; });
  const onChangeGroup = (v) => setParams(p => { p.set("group", v); p.set("page", "1"); return p; });
  const onChangeView =  (v) => setParams(p => { p.set("view", v); return p; });
  
  return (
    <div className=''>
      <Breadcrumbs items={[{ id: 0, name: 'Каталог', slug: 'catalog' }]} />

      <h1 className="text-2xl font-bold mb-5">Продукты</h1>

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
          <ProductList items={items} loading={loading} view={view}/>
        </div>

      </div>

    </div>
  );
}

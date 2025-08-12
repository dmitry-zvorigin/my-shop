import CategoryCard from '../components/CategoryCard';
import Breadcrumbs from "../components/Breadcrumbs";
import ProductList from '../components/Product/ProductList';
import FiltersSidebar from '../components/Product/FiltersSidebar';

export default function ProductsPage() {

  return (
    <div className='max-w-screen-2xl mx-auto'>
      <Breadcrumbs items={[{ id: 0, name: 'Каталог', slug: 'catalog' }]} />

      <h1 className="text-2xl font-bold mb-5">Продукты</h1>

      <div className='grid grid-cols-[250px_1fr] gap-5 mt-5'>
        <FiltersSidebar/>
        <div className=''>
          <ProductList/>
        </div>

      </div>


    </div>
  );
}

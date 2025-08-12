export default function FiltersSidebar() {
  return (
    <aside className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-4">Фильтры</h3>
      <div>
        <label className="flex items-center mb-2">
          <input
            type="checkbox"
            // checked={filters.inStock || false}
            // onChange={e => setFilters(prev => ({
            //   ...prev,
            //   inStock: e.target.checked
            // }))}
          />
          <span className="ml-2">В наличии</span>
        </label>
      </div>
      {/* Здесь можно накидать остальные фильтры: бренды, цена, память */}
    </aside>
  );
}

const CategoryList = ({ categories }) => {

    return (
      <ul className="space-y-2">
        {categories.map(cat => (
          <li key={cat.id}>
            <div className="flex items-center gap-2">
              <img
                src={cat.image_url || '/placeholder.png'}
                alt={cat.name}
                className="w-6 h-6 object-contain"
              />
              <span>{cat.name}</span>
            </div>
            {cat.children && cat.children.length > 0 && (
              <div className="ml-4">
                <CategoryList categories={cat.children} />
              </div>
            )}
          </li>
        ))}
      </ul>
      
    );
};

export default CategoryList;
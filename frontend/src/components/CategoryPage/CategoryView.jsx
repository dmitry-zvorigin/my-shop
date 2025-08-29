import CategoryCard from "../CategoryCard";

export default function CategoryView({ category }) {
  
  if (!category) return <div className="p-4 text-red-500">Категория не найдена</div>;
  
  return (
    <div 
      className="
        grid 
        sm:grid-cols-1
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-5"
    >
      {category.children.map((child) => (
        <CategoryCard
          key={child.id}
          name={child.name}
          image={child.image_url}
          path={[child.slug]}
          compact={true}
        />
      ))}
    </div>
  );
}

      // lg:grid-cols-4
      // xl:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] 
import CategoryCard from "../CategoryCard";

export default function CategoryView({ category }) {
  
  if (!category) return <div className="p-4 text-red-500">Категория не найдена</div>;
  
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5">
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
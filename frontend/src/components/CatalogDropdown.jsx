import { useEffect, useState } from "react";
import { fetchRootCategories } from "@/api/categories";

export default function CatalogDropdown() {
  const [categories, setCategories] = useState([]);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    fetchRootCategories().then(setCategories);
  }, []);

  return (
    <div className="flex">
      {/* Левая колонка — родительские категории */}
      <ul className="w-48 border-r">
        {categories.map((cat) => (
          <li
            key={cat.id}
            onMouseEnter={() => setHovered(cat)}
            className="px-4 py-2 hover:bg-orange-50 cursor-pointer"
          >
            {cat.name}
          </li>
        ))}
      </ul>

      {/* Правая колонка — подкатегории */}
      <div className="flex-1 p-4">
        {hovered?.children?.length > 0 ? (
          <ul className="grid grid-cols-2 gap-2">
            {hovered.children.map((child) => (
              <li key={child.id} className="text-sm text-gray-700 hover:underline">
                {child.name}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-gray-400 italic">Выберите раздел</div>
        )}
      </div>
    </div>
  );
}
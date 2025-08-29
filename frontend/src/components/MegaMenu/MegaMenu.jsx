import { useEffect, useRef, useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import { splitIntoColumns } from "../../utils/splitIntoColumns";
import SubMenuItem from "./SubMenuItem";
import Container from "../Shared/Container";
import { useCategoriesTree } from "@/hooks/categoryQueries";

const MegaMenu = forwardRef(({ onClose }, scrollContainerRef) => {
  const { data: categories } = useCategoriesTree(4);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const timerRef = useRef(null);

  // Выбор категории по умолчанию
  useEffect(() => {
    if (!selectedCategory && categories?.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  const handleMouseEnter = (category) => {
    timerRef.current = setTimeout(() => {
      setSelectedCategory(category);
    }, 300);
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
  };

  return (
    <>
      {/* Основное мегаменю */}
      <div
        ref={scrollContainerRef}
        style={{ scrollbarGutter: 'stable both-edges' }}
        className="absolute top-[96px] left-0 w-full bg-white shadow-2xl z-50 h-[calc(70vh)] overflow-y-scroll  border-t border-gray-200"
      >
        <Container>
          <div className="grid grid-cols-[320px_1fr] gap-5 py-5 h-full">
            {/* Левая колонка с категориями */}
            <ul className="text-base shrink-0 h-full">
              {categories?.map((category) => (
                    <li
                      key={category.id}
                      onMouseEnter={() => handleMouseEnter(category)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        to={`/catalog/${category.slug}`}
                        onClick={onClose}
                        className={`block text-left w-full p-3 hover:text-orange-500 hover:bg-gray-100 rounded-lg transition-colors ${
                          selectedCategory?.id === category.id
                            ? "text-orange-500 font-semibold bg-orange-50"
                            : ""
                        }`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
            </ul>

            {/* Правая часть с подкатегориями */}
            <div className="h-full w-full">
              {selectedCategory?.children?.map((child) => (
                  <div key={child.id} className="mb-5">
                    <Link
                      to={`/catalog/${child.slug}`}
                      onClick={onClose}
                      className="hover:text-orange-500 text-sm font-bold block py-3 transition-colors"
                    >
                      {child.name}
                    </Link>

                    <div className="grid grid-cols-3 gap-x-8 text-sm relative">
                      {splitIntoColumns(child.children ?? [], 3).map((col, colIdx) => (
                        <div key={colIdx} className="flex flex-col">
                          {col.map((sub) => (
                            <SubMenuItem 
                              key={sub.id} 
                              sub={sub} 
                              onClose={onClose} 
                              scrollRef={scrollContainerRef}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </Container>
      </div>
    </>
  );
});

export default MegaMenu;


import { useEffect, useRef, useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import { splitIntoColumns } from "../../utils/splitIntoColumns";
import SubMenuItem from "./SubMenuItem";

const MegaMenu = forwardRef(({ categories, onClose }, scrollContainerRef) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const isLoading = categories.length === 0;
  const timerRef = useRef(null);
  // const scrollContainerRef = useRef(null);

  // Выбор категории по умолчанию
  useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
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
    <div
      // ref={ref}
      ref={scrollContainerRef}
      style={{ scrollbarGutter: 'stable' }}
      className="bg-white absolute w-full top-[96px] rounded-b-2xl shadow-2xl z-104 h-[calc(70vh)] overflow-y-auto"
    >
      {/* <hr className="text-gray-200 shadow" /> */}
      <div className="max-w-screen-2xl m-auto flex gap-5 py-4 h-full">

        <ul className="text-base w-72 shrink-0 h-full">
          {isLoading
            ? Array.from({ length: 10 }).map((_, idx) => (
                <li key={idx} className="p-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
                </li>
              ))
            : categories.map((category) => (
                <li
                  key={category.id}
                  onMouseEnter={() => handleMouseEnter(category)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={`/catalog/${category.slug}`}
                    onClick={onClose}
                    className={`block text-left w-full p-3 hover:text-orange-500 hover:bg-gray-100 rounded-lg ${
                      selectedCategory?.id === category.id
                        ? "text-orange-500 font-semibold"
                        : ""
                    }`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
        </ul>

        {/* Правая часть */}
        <div  className=" p-2 h-full w-full">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-5">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx}>
                  <div className="h-5 w-60 bg-gray-200 rounded mb-3 animate-pulse" />
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 12 }).map((__, i) => (
                      <div
                        key={i}
                        className="h-4 w-44 bg-gray-100 rounded animate-pulse"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            selectedCategory?.children?.map((child) => (
              <div key={child.id} className="mb-5">
                <Link
                  to={`/catalog/${child.slug}`}
                  onClick={onClose}
                  className="hover:text-orange-500 text-sm font-bold block py-3"
                >
                  {child.name}
                </Link>

                <div className="grid grid-cols-3 gap-x-8 text-sm relative">
                  {splitIntoColumns(child.children ?? [], 3).map((col, colIdx) => (
                    <div key={colIdx} className="flex flex-col">
                      {col.map((sub) => (
                        <SubMenuItem key={sub.id} sub={sub} onClose={onClose} scrollRef={scrollContainerRef}/>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
});

export default MegaMenu;
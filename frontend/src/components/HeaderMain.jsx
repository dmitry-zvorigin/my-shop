import { useEffect, useRef, useState } from 'react';
import { FaHeart, FaShoppingCart, FaUser, FaSearch, FaBars } from 'react-icons/fa';
import { FaCodeCompare } from "react-icons/fa6";
import MegaMenu from './MegaMenu/MegaMenu';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { fetchTreeCategories } from "@/api/categories";

export default function HeaderMain () {
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuButtonRef.current?.contains(e.target) ||
        menuRef.current?.contains(e.target)
      ) {
        // Клик по кнопке или меню — не закрываем
        return;
      }

      setMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenMenu = () => {
    setMenuOpen((prev) => {
      const next = !prev;

      // загружаем категории только один раз
      if (next && !hasFetched) {
        fetchTreeCategories().then((data) => {
          setCategories(data);
          setHasFetched(true);
        });
      }

      return next;
    });
  };
  
  return (
    <div className="sticky top-0 z-50 bg-white shadow">
      {/* Шапка */}
      <header className="top-0 z-50 h-[96px] flex items-center">
        <div className="container mx-auto flex items-center justify-between gap-4 w-full">
          {/* Логотип + Каталог */}          
          <div className=' h-[64px] flex shadow-2xs rounded-lg'>
            <Link to="/" className="bg-gradient-to-b from-orange-300 to-orange-400 rounded-l-lg w-[120px] h-full flex justify-center items-center 
              hover:bg-gradient-to-b hover:from-orange-300 hover:to-orange-300 cursor-pointer">
              <span className='text-white font-bold text-xl '>
                MyShop
              </span>
            </Link>
            <div className='bg-gradient-to-b from-orange-300 to-orange-400 rounded-r-lg flex justify-center items-center px-5'>
              <button
                ref={menuButtonRef}
                onClick={handleOpenMenu}
                className="flex items-center gap-2 
                  bg-gradient-to-b to-orange-350 from-orange-300 
                  rounded-lg 
                  text-white px-3 py-1
                  hover:bg-gradient-to-b hover:to-orange-300 hover:from-orange-300 shadow-2xl
                  cursor-pointer h-[45px]"
              >
                <FaBars />
                <span className='font-bold'>Каталог</span>
                <div 
                    className={`transform translate-transform duration-300 ${isMenuOpen ? 'rotate-180 transform' : ''}`}
                >
                    <ChevronDownIcon className='size-5' />
                </div>
              </button>
            </div>
          </div>

          {/* Поиск */}
          <div className="flex-1">
            <div className="relative ">
              <input
                type="text"
                placeholder="Поиск по сайту"
                className="w-full border px-4 py-2 pr-10 focus:outline-orange-500 h-[64px] outline-none border-gray-200 hover:shadow hover:bg-white rounded-lg bg-gray-100"
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Иконки */}
          <div className="flex items-center gap-6">
            <HeaderIcon icon={<FaCodeCompare />} label="Сравнить" />
            <HeaderIcon icon={<FaHeart />} label="Избранное" />
            <HeaderIcon icon={<FaShoppingCart />} label="Корзина" />
            <HeaderIcon icon={<FaUser />} label="Войти" />
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <MegaMenu categories={categories} onClose={() => setMenuOpen(false)} ref={menuRef}/>
      )}
    </div>
  );
}

function HeaderIcon({ icon, label }) {
  return (
    <div className="flex flex-col items-center justify-center text-sm cursor-pointer hover:bg-gray-100 h-[64px] w-[90px] rounded-lg">
      <div className="text-lg">{icon}</div>
      <span>{label}</span>
    </div>
  );
}
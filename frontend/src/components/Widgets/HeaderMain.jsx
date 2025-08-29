import { lazy, useEffect, useRef, useState, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowPathRoundedSquareIcon, Bars3Icon, ChevronDownIcon, HeartIcon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import Container from '../Shared/Container';
import MegaMenuSkeleton from '../MegaMenu/MegaMenuSkeleton';

const importMegaMenu = () => import('../MegaMenu/MegaMenu');
const MegaMenu = lazy(importMegaMenu);

export default function HeaderMain () {
  const [isMenuOpen, setMenuOpen] = useState(false);
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
      return next;
    });
  };
  
  return (
    <div className="sticky top-0 z-50 bg-white shadow">
      {/* Шапка */}

      <header className="top-0 z-50 h-[96px] flex items-center">
        <Container>
        <div className="flex items-center justify-between gap-5 w-full">
          {/* Логотип + Каталог */}          
          <div className='h-[64px] shadow-2xs rounded-lg w-80 grid grid-cols-[auto_1fr]'>
            <Link to="/" className="bg-gradient-to-b from-orange-300 to-orange-400 rounded-l-lg w-[120px] h-full flex justify-center items-center 
              hover:bg-gradient-to-b hover:from-orange-300 hover:to-orange-300">
              <span className='text-white font-bold text-xl '>
                MyShop
              </span>
            </Link>
            <div className='bg-gradient-to-b from-orange-300 to-orange-400 rounded-r-lg flex justify-center items-center px-5'>
              <button
                ref={menuButtonRef}
                onClick={handleOpenMenu}
                className="flex items-center gap-2 
                  bg-gradient-to-b to-orange-400 from-orange-350 
                  rounded-lg 
                  text-white px-3 py-1
                  hover:bg-gradient-to-b hover:to-orange-300 hover:from-orange-350 shadow transition
                  h-[45px]"
              >
                <Bars3Icon width={25} />
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
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск по сайту"
                className="w-full border px-4 py-2 pr-10 focus:outline-orange-500 h-[64px] outline-none border-gray-200 hover:shadow hover:bg-white rounded-lg bg-gray-100"
              />
              <MagnifyingGlassIcon width={25} height={25} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" />
            </div>
          </div>

          {/* Иконки */}
          <div className="flex items-center gap-5">
            <HeaderIcon icon={<ArrowPathRoundedSquareIcon width={25} height={25}/>} label="Сравнить" />
            <HeaderIcon icon={<HeartIcon width={25} height={25} />} label="Избранное" />
            <HeaderIcon icon={<ShoppingCartIcon width={25} height={25} />} label="Корзина" />
            <HeaderIcon icon={<UserIcon width={25} height={25} />} label="Войти" />
          </div>
        </div>
        </Container>
      </header>

      {isMenuOpen && (
        <Suspense fallback={<MegaMenuSkeleton/>}>
          <MegaMenu onClose={() => setMenuOpen(false)} ref={menuRef}/>
        </Suspense>
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
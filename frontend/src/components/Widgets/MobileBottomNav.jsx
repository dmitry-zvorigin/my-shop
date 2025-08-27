import { Link, NavLink } from "react-router-dom";
import Container from "../Shared/Container";
import { Bars4Icon, HeartIcon, HomeIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";

const items = [
  { to: "/", label: "Главная", icon: <HomeIcon height={20} /> },
  { to: "/favorites", label: "Избранное", icon: <HeartIcon height={20}/> },
  { to: "/catalog", label: "Каталог", icon: <Bars4Icon height={20}/> },
  { to: "/cart", label: "Корзина", icon: <ShoppingCartIcon height={20} /> },
  { to: "/profile", label: "Профиль", icon: <UserIcon height={20} /> },
];

export default function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-gray-200 bg-white">
      <Container>
        <ul className="grid grid-cols-5 gap-2 py-5">
          {items.map((it) => (
            <li key={it.to} className="outline-1 rounded-lg outline-gray-200">
              <Link
                to={it.to}
                className="flex flex-col items-center justify-center py-2"
              >
                <span aria-hidden>{it.icon}</span>
                <span className="text-[12px] text-gray-600">{it.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        {/* отступ под таббар, чтобы контент не перекрывался */}
        {/* <div className="h-[96px]" aria-hidden /> */}
      </Container>
    </nav>
  );
}
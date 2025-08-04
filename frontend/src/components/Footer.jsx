
export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 text-sm">
      <div className="max-w-screen-2xl mx-auto  py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Блок 1: Логотип */}
        <div>
          <h2 className="text-orange-500 font-bold text-xl mb-2">MyShop</h2>
          <p className="text-zinc-400">Интернет-магазин техники и электроники</p>
        </div>

        {/* Блок 2: Компания */}
        <div>
          <h3 className="text-white font-semibold mb-2">Компания</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-orange-500 ">О нас</a></li>
            <li><a href="#" className="hover:text-orange-500 ">Новости</a></li>
            <li><a href="#" className="hover:text-orange-500 ">Карьера</a></li>
          </ul>
        </div>

        {/* Блок 3: Покупателям */}
        <div>
          <h3 className="text-white font-semibold mb-2">Покупателям</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-orange-500 ">Доставка</a></li>
            <li><a href="#" className="hover:text-orange-500 ">Гарантия</a></li>
            <li><a href="#" className="hover:text-orange-500 ">Контакты</a></li>
          </ul>
        </div>

        {/* Блок 4: Контакты */}
        <div>
          <h3 className="text-white font-semibold mb-2">Контакты</h3>
          <p className="text-zinc-400">Телефон: 8-888-88-88-888</p>
          <p className="text-zinc-400">Email: support@myshop.ru</p>
        </div>
      </div>

      <div className="bg-zinc-800 text-center text-xs text-zinc-500 py-4">
        © {new Date().getFullYear()} MyShop. Все права защищены.
      </div>
    </footer>

  );
}
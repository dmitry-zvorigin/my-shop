
export default function HeaderTop() {

    return (
    <div className="text-sm text-gray-700">
      <div className="container mx-auto flex justify-between items-center py-5">
        {/* Левая часть */}
        <div className="flex items-center gap-4 ">
          <span className="font-semibold hover:text-orange-500 text-gray-700 cursor-pointer">Екатеринбург</span>
        </div>

        {/* Центральная часть */}
        <div>
          <ul className="flex gap-4 text-sm">
            <li className="hover:text-orange-500 text-gray-700 cursor-pointer">Акции</li>
            <li className="hover:text-orange-500 text-gray-700 cursor-pointer">Магазины</li>
            <li className="hover:text-orange-500 text-gray-700 cursor-pointer">Доставка</li>
            <li className="hover:text-orange-500 text-gray-700 cursor-pointer">Покупателям</li>
            <li className="hover:text-orange-500 text-gray-700 cursor-pointer">Юридическим лицам</li>
          </ul>
        </div>

        {/* Правая часть */}
        <div className="flex items-center gap-4 text-sm">
          <span className="font-semibold text-gray-800">8-888-88-88-888</span>
        </div>
      </div>
    </div>
    );
}
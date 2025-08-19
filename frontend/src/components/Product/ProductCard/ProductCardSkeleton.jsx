// components/Product/ProductCardSkeleton.jsx
export default function ProductCardSkeleton() {
  return (
    <div
      className="
        grid gap-5 p-5 bg-white rounded-lg
        [grid-template-areas:'section_section_section''img_name_price''img_stat_price']
        [grid-template-columns:200px_1fr_200px]
        animate-pulse
      "
    >
      {/* Верхняя секция (закрыта по умолчанию) */}
      <div className="[grid-area:section] max-h-0 overflow-hidden" />

      {/* Левая колонка – место под картинку */}
      <div className="[grid-area:img]">
        <div className="h-[200px] w-full rounded-lg bg-gray-100" />
      </div>

      {/* Название */}
      <div className="[grid-area:name]">
        <div className="h-4 w-3/4 rounded bg-gray-100 mb-3" />
        <div className="h-4 w-1/2 rounded bg-gray-100" />
      </div>

      {/* Статистика/прочее */}
      <div className="[grid-area:stat] flex items-end">
        <div className="h-4 w-1/3 rounded bg-gray-100" />
      </div>

      {/* Цена и кнопки */}
      <div className="[grid-area:price] flex flex-col items-end gap-3">
        <div className="h-7 w-24 rounded bg-gray-100" />
        <div className="flex gap-2">
          <div className="h-[45px] w-[45px] rounded-lg bg-gray-100" />
          <div className="h-[45px] w-[110px] rounded-lg bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

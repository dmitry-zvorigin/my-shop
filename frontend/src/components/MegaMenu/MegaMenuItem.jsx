export default function MegaMenuItem({ category }) {
  return (
    <div className="flex items-center gap-2">
      {/* можно добавить иконку или заглушку */}
      <div className="w-5 h-5 bg-orange-100 text-orange-500 flex items-center justify-center rounded text-xs">
        {category.name[0]}
      </div>
      <span className="text-sm">{category.name}</span>
    </div>
  );
}
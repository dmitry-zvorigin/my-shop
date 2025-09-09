export default function FiltersFooter({
  hasFewOptions,
  isSearching,
  showAll,
  onToggleShowAll,
  hasSelection,
  onReset,
}) {
  return (
    <div className="grid grid-cols-2 items-center gap-2 px-3 h-[36px]">
      <div>
        {!hasFewOptions && !isSearching && (
          <button
            className="text-sm text-blue-700 justify-self-start flex items-center border-b border-dotted hover:text-orange-500 transition-colors"
            onClick={onToggleShowAll}
          >
            {showAll ? "Свернуть" : "Показать всё"}
          </button>
        )}
      </div>
      {hasSelection && (
        <button
          className="text-sm text-red-500 justify-self-end border-b border-dotted hover:text-orange-500 transition-colors"
          onClick={onReset}
        >
          Сбросить
        </button>
      )}
    </div>
  );
}



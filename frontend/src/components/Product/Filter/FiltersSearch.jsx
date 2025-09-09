import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function FiltersSearch({ value, onChange, show }) {
  if (!show) return null;
  return (
    <div className="px-3 my-2">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Поиск"
          className="text-sm w-full rounded-lg bg-gray-100 px-3 py-2 pl-10 pr-10 outline-none"
        />
        <MagnifyingGlassIcon className="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        {value.trim().length > 0 && (
          <button
            type="button"
            aria-label="Очистить поиск"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={() => onChange("")}
          >
            <XMarkIcon className="size-5 text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
}



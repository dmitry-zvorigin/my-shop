import { Bars3Icon, Squares2X2Icon } from "@heroicons/react/24/outline";
import DropdownSelect from "../../ui/DropdownSelect";

const SORT_OPTIONS = [
  { value: "price_asc",  label: "Сначала недорогие" },
  { value: "price_desc", label: "Сначала дорогие" },
  { value: "latest",     label: "Сначала новинки" },
];

const GROUP_OPTIONS = [
  { value: "none",  label: "Отсутствует" },
];

export default function ToolBar ({ sort, group, view, onSortChange, onGroupChange, onViewChange }) {

  return (
    <div className='h-[60px] rounded-lg bg-white mb-5 grid grid-cols-[1fr_100px] px-5 shadow'>
      <div className='flex gap-5 justify-start items-center'>
        <DropdownSelect labelPrefix="Сортировка:" value={sort} onChange={(v) => onSortChange?.(v)} options={SORT_OPTIONS}/>
        <DropdownSelect labelPrefix="Группировка:" value={group} onChange={(v) => onGroupChange?.(v)} options={GROUP_OPTIONS} />
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          aria-pressed={view === "list"}
          onClick={() => onViewChange("list")}
          className="p-1 rounded hover:bg-gray-100 cursor-pointer"
          title="Список"
        >
          <Bars3Icon className={`w-6 ${view === "list" ? "text-black" : "text-gray-600"}`} />
        </button>
        <button
          aria-pressed={view === "grid"}
          onClick={() => onViewChange("grid")}
          className="p-1 rounded hover:bg-gray-100 cursor-pointer"
          title="Плитка"
        >
          <Squares2X2Icon className={`w-6 ${view === "grid" ? "text-black" : "text-gray-600"}`} />
        </button>
      </div>
    </div>
  );
}

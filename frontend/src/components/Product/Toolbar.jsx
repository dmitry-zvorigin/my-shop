import { Bars3Icon, Squares2X2Icon } from "@heroicons/react/24/outline";

export default function ToolBar ({ sort, group, view, onSortChange, onGroupChange, onViewChange }) {

  return (
    <div className='h-[60px] rounded-lg bg-white mb-5 grid grid-cols-[1fr_100px] px-5'>
      <div className='flex gap-5 justify-start items-center'>
        <div>sort</div>
        <div>group</div>
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

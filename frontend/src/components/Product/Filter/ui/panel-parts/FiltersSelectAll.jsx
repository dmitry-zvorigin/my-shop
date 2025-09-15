import AnimatedCheckbox from "../../../../ui/AnimatedCheckbox";

export default function FiltersSelectAll({ show, allSelected, someSelected, onToggle, selectAllRef }) {
  if (!show) return null;
  return (
    <div className="relative">
      <div 
        ref={selectAllRef}
        className=" mr-4 cursor-pointer relative hover:bg-orange-50 transition" 
        onClick={onToggle}
      >
        <div className="flex items-center gap-2 px-3 py-2">
          <AnimatedCheckbox checked={allSelected} indeterminate={someSelected} />
          <span className="text-sm">Выбрать всё</span>
        </div>

      </div>

      <div className="absolute bottom-0 border w-full text-gray-100"/>
    </div>
  );
}


    // <div className="relative">
    //   <div 
    //     ref={selectAllRef}
    //     className=" mr-4 cursor-pointer relative hover:bg-orange-50 transition" 
    //     onClick={onToggle}
    //   >
    //     <div className="flex items-center gap-2 px-3 py-2">
    //       <AnimatedCheckbox checked={allSelected} indeterminate={someSelected} />
    //       <span className="text-sm">Выбрать всё</span>
    //     </div>

    //   </div>

    //   <div className="absolute bottom-0 border w-full text-gray-100"/>
    // </div>


    // <div ref={selectAllRef} className="px-3 pt-2 pb-1 cursor-pointer hover:bg-orange-50 relative" onClick={onToggle}>
    //   <div className="border-b border-gray-200 flex items-center gap-2 w-full pb-2">
    //     <AnimatedCheckbox checked={allSelected} indeterminate={someSelected} />
    //     <span className="text-sm">{allSelected ? "Снять всё" : "Выбрать всё"}</span>
    //   </div>
    // </div>
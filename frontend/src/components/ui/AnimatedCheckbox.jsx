import clsx from "clsx";
import { CheckIcon } from "@heroicons/react/20/solid";

export default function AnimatedCheckbox({ checked = false, className = "", sizeClass = "size-4" }) {
  return (
    <span
      className={clsx(
        "relative inline-flex items-center justify-center rounded-sm",
        sizeClass,
        "bg-white outline-1 outline-gray-300 transition-colors duration-300",
        checked && "outline-orange-500",
        className
      )}
    >
      <span
        className={clsx(
          "absolute inset-0 rounded-sm outline-1 outline-orange-500 bg-orange-500",
          "transition-opacity duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
          checked ? "opacity-100" : "opacity-0"
        )}
      />
      <CheckIcon
        className={clsx(
          "relative text-white transition-all duration-300 ease-out",
          sizeClass,
          checked ? "opacity-100 scale-100" : "opacity-0 scale-0"
        )}
      />
    </span>
  );
}



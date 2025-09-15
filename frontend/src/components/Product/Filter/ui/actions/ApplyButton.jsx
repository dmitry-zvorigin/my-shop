import clsx from "clsx";

export default function ApplyButton({ onClick, disabled, className = "", children = "Применить" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "h-[44px] w-full rounded-lg text-white",
        "bg-gradient-to-b from-orange-400 to-orange-500",
        "hover:from-orange-300 hover:to-orange-400 transition",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
}
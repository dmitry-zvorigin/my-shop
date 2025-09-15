import clsx from "clsx";

export default function ResetButton({ onClick, disabled, className = "", children = "Сбросить" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "h-[44px] w-full rounded-lg transition",
        "outline-1 outline-gray-300 hover:bg-gray-100",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
}
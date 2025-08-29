// components/Shared/Skeleton/Skeleton.jsx

export default function Skeleton({
  className = "",
  style,
}) {
  return (
    <div
      aria-hidden="true"
      className={[
        "bg-gray-200 dark:bg-gray-700",
        "animate-pulse motion-reduce:animate-none",
        "rounded-lg",
        className,
      ].join(" ")}
      style={style}
      data-skeleton // удобно для e2e- или unit-тестов
    />
  );
}

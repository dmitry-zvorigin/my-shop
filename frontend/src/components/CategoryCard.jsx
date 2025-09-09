import clsx from "clsx";
import { createSearchParams, Link } from "react-router-dom";
import NoImagePlaceholder from "@/components/Common/NoImagePlaceholder";

export default function CategoryCard({
  className,
  name,
  image,
  path = [],
  subcategories = [],   // <-- раньше children
  compact = false,
  brandSlug = null,
}) {
  const hasOverlay = !compact && subcategories.length > 0;
  const containerClasses = clsx(
    "rounded-lg aspect-square bg-white shadow transition hover:shadow-2xl p-2 grid grid-rows-[1fr_auto] gap-2",
    hasOverlay && "relative group",
    className
  );

  // В compact режиме оборачиваем всю карточку в Link.
  // В режиме с оверлеем нельзя оборачивать всё в Link (внутри есть свои ссылки).
  const Wrapper = compact ? Link : "div";
  // const to = compact ? `/catalog/${path}?brand=${brandSlug}` : undefined;

  const pathStr = Array.isArray(path) ? path.filter(Boolean).join("/") : String(path || "");
  const to = compact
    ? {
        pathname: `/catalog/${pathStr}`,
        search: brandSlug
          ? `?${createSearchParams({ brand: String(brandSlug) }).toString()}`
          : "",
      }
    : undefined;

  return (
    <Wrapper to={to} className={containerClasses}>
      {/* Верх: картинка */}
      <div className={clsx(
        "flex items-center justify-center",
        hasOverlay && "transition-all ease-in-out group-hover:opacity-0"
      )}>
        {image
          ? <img src={image} alt={name} className="max-h-full max-w-full object-contain" />
          : <NoImagePlaceholder />
        }
      </div>

      {/* Низ: заголовок */}
      <h3 className={clsx(
        "text-sm font-bold text-gray-700 text-center line-clamp-3",
        hasOverlay && "transition-all ease-in-out group-hover:opacity-0"
      )}>
        {name}
      </h3>

      {/* Оверлей на всю карточку (только если НЕ compact) */}
      {hasOverlay && (
        <div className="
          absolute inset-0 z-20 rounded-lg
          opacity-0 group-hover:opacity-100
          transition-all ease-in-out
          bg-white/95 p-4
          flex flex-col items-start justify-start text-left
        ">
          <Link to={`/catalog/${path}`} className="hover:text-orange-500">
            <h4 className="font-semibold mb-2 text-sm">{name}</h4>
          </Link>

          <ul className="text-xs text-gray-600 space-y-1 overflow-y-auto w-full">
            {subcategories.slice(0, 6).map((child) => (
              <li key={child.id}>
                <Link
                  to={`/catalog/${child.slug}`}
                  className="hover:text-orange-500 text-gray-700 block"
                >
                  {child.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Wrapper>
  );
}

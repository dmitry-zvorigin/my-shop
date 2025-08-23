import { Link } from "react-router-dom";
import { buildBreadcrumbPath } from "@/utils/breadcrumbs";
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';

export default function Breadcrumbs({ items = [], base = '', showHome = true }) {
  const pathItems = buildBreadcrumbPath(items, base);

  return (
    <nav className="text-sm text-gray-500 mb-5" aria-label="Breadcrumb">
      <ul className="flex flex-wrap items-center gap-2">
        {showHome && (
          <li key={"home"}>
            <Link to="/" className="hover:text-orange-500 text-gray-700">Главная</Link>
          </li>
        )}

        {pathItems.map((item, index) => (
          <li key={item.id || item.slug || index} className="flex items-center gap-2">
            <div><ChevronRightIcon className="w-4"/></div>
            {index === pathItems.length - 1 ? (
              <span className="text-black font-semibold">{item.name}</span>
            ) : (
              <Link to={item.url} className="hover:text-orange-500 text-gray-700">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

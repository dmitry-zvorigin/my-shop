import { Link } from 'react-router-dom';

export default function CategoryCard({ name, image, path = [], children = [], compact = false }) {

  if (compact) {
    return (
      <Link to={`/catalog/${path}`} className="block aspect-square w-full">
        <div className="bg-white rounded-lg shadow hover:shadow-2xl transition p-4 flex flex-col items-center justify-center text-center h-full">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-30 h-30 object-contain mb-2"
            />
          ) : (
            <div className="w-30 h-30 mb-2 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
              <span>Нет фото</span>
            </div>
          )}
          <h3 className="text-sm font-medium">{name}</h3>
        </div>
      </Link>
    );
  }

  return (
    <div className="block aspect-square w-full">
      <div className="group relative bg-white rounded-lg shadow hover:shadow-2xl transition overflow-hidden w-full h-full p-4 flex items-center justify-center text-center">
        <div className="group-hover:opacity-0 group-hover:scale-95 transition-all duration-300 ease-in-out flex flex-col items-center justify-center absolute inset-0 z-10">
          {image ? (
            <img 
              src={image}
              alt={name}
              className="w-30 h-30 object-contain mb-2"
            />
          ) : (
            <div className="w-30 h-30 mb-2 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
              <span>Нет фото</span>
            </div>
          )}
          <h3 className="text-sm font-medium">{name}</h3>
        </div>

        {children.length > 0 && (
          <div className="opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out absolute inset-0 z-20 p-4 flex flex-col items-start justify-start text-left">
            <Link to={`/catalog/${path}`} className='hover:text-orange-500'>
              <h4 className="font-semibold mb-2 text-sm">{name}</h4>
            </Link>
            <ul className="text-xs text-gray-600 space-y-1 overflow-hidden">
              {children.slice(0, 6).map((child) => (
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
      </div>
    </div>
  );
}
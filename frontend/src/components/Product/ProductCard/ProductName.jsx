import { memo } from "react";
import { Link } from "react-router-dom";

function ProductName({ name, slug }) {

    return (
        <Link to={`/product/${slug}`} className="line-clamp-2 text-base font-medium text-gray-900 hover:text-orange-500 transition">
            {name}
        </Link>
    );
}

export default memo (ProductName);
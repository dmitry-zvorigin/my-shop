import clsx from "clsx";
import { formatPrice } from "../../../utils/formatPrice";
import { memo } from "react";

function ProductPrice({ price, isGrid, classText = 'text-lg' }) {

  return (
    <span 
      className={clsx(
        "px-2 font-bold text-gray-900 h-full flex items-center ",
        classText,
        isGrid ? "bg-gray-100 rounded-lg" : "justify-end",
      )}
    >
      {formatPrice(price)}
    </span>
  );
}

export default memo (ProductPrice);
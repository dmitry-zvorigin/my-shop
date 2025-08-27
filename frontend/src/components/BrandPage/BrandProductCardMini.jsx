import { Link } from "react-router-dom";
import { NoImagePlaceholder } from "../Common";

export default function BrandProductCardMini({ name, slug, image, priceText }) {

  return (
    <Link 
      to={`/product/${slug}`}
      className="grid grid-cols-1 w-[340px] bg-white rounded-lg hover:shadow-custom transition-all duration-200 p-5 gap-5"
    >
      <div className="h-[250px] flex justify-center items-center">
        {image 
          ? <img src={image} alt={name} className="object-contain max-h-full"/>
          : <NoImagePlaceholder />
        }
      </div>

      <h3 className="text-base text-center hover:text-orange-500 transition line-clamp-2">
        {name}
      </h3>
      <div className="flex justify-between items-center">
        <span className="text-[24px] font-medium">{priceText}</span>
        <button className="w-[90px] h-[45px] flex items-center justify-center rounded-lg text-base font-bold text-white
                         transition bg-gradient-to-b from-orange-300 to-orange-400
                         hover:from-orange-400 hover:to-orange-500">
          Купить
        </button>
      </div>
    </Link>
  );
}
import clsx from "clsx";
import ProductSection from "./ProductSection";
import ProductName from "./ProductName";
import ProductOther from "./ProductOther";
import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";
import ProductActionButtons from "./ProductActionButtons";
import { useEffect } from "react";

const LIST_AREAS = "[grid-template-areas:'section_section_section''img_name_price''img_name_buttons''img_other_other']";
const LIST_COLS_CLOSED = "[grid-template-columns:200px_1fr_200px]";
const LIST_COLS_OPEN   = "[grid-template-columns:0px_1fr_200px]";
const LIST_ROWS        = "[grid-template-rows:auto_auto_auto_auto]";

const GRID_AREAS = "[grid-template-areas:'img_img_img''name_name_name''other_other_other''price_price_buttons']";
const GRID_COLS  = "[grid-template-columns:1fr_1fr_1fr] md:[grid-template-columns:1fr_1fr] ";
const GRID_ROWS  = "[grid-template-rows:200px_75px_75px_50px] ";

export default function ProductCard({
  product,
  view = "list",           // "list" | "grid"
  isOpen = false,          // раскрытие секции актуально только для list
  onOpen,
  onClose,
  isFavorite = false,
  onAddToCart,
  onToggleFavorite,             
}) {

  const isGrid = view === 'grid';
  
  const hasImages =
    Boolean(product.images?.medium?.length) ||
    Boolean(product.image_medium_url);

  // Для галереи возьмём medium → одиночный url
  const gallery = product.images?.medium?.length
    ? product.images.medium
    : product.image_medium_url
    ? [product.image_medium_url]
    : [];

  // закрытие по Esc (только когда открыто)
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);
  
  const templateAreas = isGrid ? GRID_AREAS : LIST_AREAS;
  const templateColumns = isGrid
    ? GRID_COLS
    : (isOpen && hasImages ? LIST_COLS_OPEN : LIST_COLS_CLOSED);
  const templateRows = isGrid ? GRID_ROWS : LIST_ROWS;

  return (
    <div
      className={clsx(
        "grid gap-2 p-5 bg-white rounded-lg relative shadow-sm hover:shadow-md group transition",
        templateAreas,
        templateColumns,
        templateRows,
        !isGrid && "transition-[grid-template-columns] duration-300 ease-in-out"
      )}
    >
      {/* SECTION */}
      {!isGrid && (
        <div className="[grid-area:section]">
          <ProductSection open={isOpen} hasImages={hasImages} gallery={gallery} name={product.name}/> 
        </div>
      )}

      {/* IMG */}
      <div className="[grid-area:img]">
        <ProductImage gallery={gallery} name={product.name} className={"h-[200px]"} interactive={!isGrid} onToggleOpen={() => (isOpen ? onClose?.() : onOpen?.())} />
      </div>
      
      {/* NAME */}
      <div className="[grid-area:name] ">
        <ProductName name={product.name} slug={product.slug}/>
      </div>
      
      {/* STAT */}
      <div className="[grid-area:other] ">
        <ProductOther/>
      </div>
      
      {/* PRICE */}
      <div className="[grid-area:price] ">
        <ProductPrice price={product.price} isGrid={isGrid} />
      </div>

      {/* PRICE & BUTTONS */}
      <div className="[grid-area:buttons] ">
        <ProductActionButtons product={product} isFavorite={isFavorite} onAddToCart={onAddToCart} onToggleFavorite={onToggleFavorite} isGrid={isGrid} />
      </div>
      
      {/* CLOSE (только когда открыт и есть изображения) */}
      {!isGrid && isOpen && hasImages && (
        <button
          onClick={() => onClose?.()}
          className="absolute top-2 right-2 grid place-items-center size-8 rounded-full bg-white shadow hover:bg-gray-100 cursor-pointer"
          aria-label="Закрыть изображения"
        >
          &times;
        </button>
      )}
    </div>
  );
}

import HorizontalScroller from "@/components/Common/HorizontalScroller";
import { formatPrice } from "@/utils/formatPrice";
import BrandProductCardMini from "./BrandProductCardMini";

export default function BrandLatestProducts({ products }) {
  if (!products?.length) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Новинки</h2>
      <HorizontalScroller >
        <div className="flex gap-5">
          {products.map((p) => (
            <BrandProductCardMini 
              key={p.id}
              name={p.name}
              slug={p.slug}
              image={p.images?.medium?.[0] ?? null}
              priceText={formatPrice(p.price)}
            />
          ))}
        </div>
      </HorizontalScroller>
    </div>
  );
}
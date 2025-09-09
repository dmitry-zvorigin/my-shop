import HorizontalScroller from "@/components/Common/HorizontalScroller";
import clsx from "clsx";
// import HorizontalScroller from "../Common/HorizontalScroller";
import { memo } from "react";

function ProductSection({ open, hasImages, gallery, name }) {

  return (
    <section
      className={clsx(
      " overflow-hidden",
      "transition-[max-height,opacity] duration-500 ease-in-out",
      open && hasImages ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
      )}
    >
        <HorizontalScroller>
          <div className="flex items-center justify-start h-[200px] gap-5">
            {gallery.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`${name} ${idx + 1}`}
                className="max-h-full w-auto object-contain"
                loading="lazy"
              />
            ))}
          </div>
        </HorizontalScroller>

    </section>
  );
}

export default memo (ProductSection);
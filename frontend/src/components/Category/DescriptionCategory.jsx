import clsx from "clsx";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function DescriptionCategory({ children, lines = 3 }) {
  const [open, setOpen] = useState(false);
  const [maxH, setMaxH] = useState(0);
  const [collapsedH, setCollapsedH] = useState(0);
  const [expandedH, setExpandedH] = useState(0);
  const ref = useRef(null);

  // посчитать высоты (свернуто/развернуто)
  const measure = () => {
    const el = ref.current;
    if (!el) return;
    // высота строки
    const cs = window.getComputedStyle(el);
    const lh = parseFloat(cs.lineHeight || "0") || 24; // fallback
    const cH = Math.ceil(lh * lines);
    // полная высота
    const eH = el.scrollHeight;
    setCollapsedH(cH);
    setExpandedH(eH);
    setMaxH(open ? eH : cH);
  };

  useLayoutEffect(() => { measure(); }, [open, lines]);
  // пересчет при ресайзе/переносах
  useEffect(() => {
    const ro = "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    if (ro && ref.current) ro.observe(ref.current);
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, []);

  return (
    <div className="rounded-lg shadow bg-white p-5">
      <div
        id="desc"
        ref={ref}
        className={clsx(
          "relative overflow-hidden transition-[max-height] duration-300 ease-in-out",
          // фиксируем line-height, чтобы расчеты были стабильны
          "leading-6"
        )}
        style={{ maxHeight: open ? expandedH || maxH : collapsedH || maxH }}
        aria-live="polite"
      >
        Встраиваемые микроволновые печи – компактные приборы, для которых места достаточно практически на каждой кухне. Фасады моделей мало отличаются от обычных СВЧ, а 
        корпуса, не усложненные декоративной отделкой, размещаются в гарнитуре.
        Покупка микроволновой печи начинается с измерения величины ниши для встраивания. На последующем этапе определяют, какого объема камеры будет достаточно для нужд 
        вашего домохозяйства. Самые маленькие устройства обладают емкостью 20 и менее литров, а крупные достигают 40 л.
        Для многих людей необходимо, чтобы прибор был оснащен грилем и конвекцией, которые позволяют равномерно пропечь крупные куски, чтобы на выходе получилось сочное и 
        нежное мясо. Кроме одиночных, имеются еще совмещенные программы, когда модель задействует одновременно несколько режимов.
        Встраиваемые микроволновые печи обладают удобными электронными меню управления, часто дополненными информативными дисплеями. Таймер, который поможет засечь 
        фактически любой промежуток времени, позволяет в точности соблюсти рекомендации из кулинарного рецепта.
        Кухонные приборы отличаются эргономичностью, а также высокой износостойкостью. Внутреннее покрытие камер производится из таких материалов, как эмалированный 
        нержавеющий металл и керамика.
        Интернет-магазин DNS предлагает осуществить онлайн-заказ. В интуитивно понятном каталоге нашего сайта вы найдете обширный выбор микроволновых печей.	

        {!open && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls="desc"
        onClick={() => setOpen(v => !v)}
        className="py-2 mt-1 items-center gap-1 text-blue-600 hover:text-orange-500 transition w-full"
      >
        <span>{open ? "Свернуть" : "Развернуть"}</span>
        <span className={clsx("transition-transform", open && "rotate-180")}>&or;</span>
      </button>
    </div>
  );
}
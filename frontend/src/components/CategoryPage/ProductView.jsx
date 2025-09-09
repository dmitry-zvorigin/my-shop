import { lazy, Suspense } from "react";
import { ApplyFiltersButton } from "../Product/Filter";
import useFloatingApplyAnchor from "../Product/Filter/useFloatingApplyAnchor";
import ToolBar from "../Product/Toolbar";
import { useProducts } from "@/hooks/productQueries";
// import { useFilters } from "@/hooks/filterQueries";
import { useQueryParams } from "@/hooks/useQueryParams";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

// ленивим только презентационный UI
const FiltersSidebar = lazy(() => import("../Product/Filter/FiltersSidebar"));
const ProductList    = lazy(() => import("../Product/ProductList"));

export default function ProductView({ categorySlug }) {
  const [q, , patchQuery] = useQueryParams({ commaLists: true });

  const sort     = q.sort ?? "latest";
  const group    = q.group ?? "none";
  const view     = q.view ?? "list";
  const page     = Number(q.page ?? 1);
  const per_page = Number(q.per_page ?? 12);

  const productParams = { category_slug: categorySlug, ...q, sort, page, per_page };
  // const filtersParams = { category_slug: categorySlug };

  // (опционально) прогреть чанки, чтобы при первом показе не ждать загрузку кода
  // useEffect(() => {
  //   import("../Product/FiltersSidebar");
  //   import("../Product/ProductList");
  // }, []);

  const onChangeSort  = (v) => patchQuery({ sort: v, page: 1 });
  const onChangeGroup = (v) => patchQuery({ group: v });
  const onChangeView  = (v) => patchQuery({ view: v });
  const onChangePage  = (v) => patchQuery({ page: v });
  
  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-[320px_1fr] gap-5 mt-5 items-start ">
        {/* ЛЕВАЯ КОЛОНКА — собственный Suspense + контейнер с запросом */}
        <Suspense fallback={<FiltersSkeleton />}>
          <FiltersContainer q={q} patchQuery={patchQuery} />
        </Suspense>

        {/* ПРАВАЯ КОЛОНКА */}
        <div>
          <ToolBar
            sort={sort}
            group={group}
            view={view}
            onSortChange={onChangeSort}
            onGroupChange={onChangeGroup}
            onViewChange={onChangeView}
          />

          <Suspense fallback={<ProductListSkeleton view={view} />}>
            <Results
              params={productParams}
              view={view}
              onPageChange={onChangePage}
            />
          </Suspense>
        </div>
      </div>

      <div className="rounded-lg shadow bg-white h-[400px] p-5">
        <h3 className="text-2xl font-bold mb-5">Вы недавно смотрели</h3>
      </div>

      <div className="rounded-lg shadow bg-white h-[400px] p-5">
        <p>1</p>
      </div>
    </div>
  );
}

// --- тонкие контейнеры: не lazy, внутри — запросы с suspense:true
function FiltersContainer({q, patchQuery}) {
  const { wrapRef, btnTop, btnShow, showApplyAtEl, setBtnShow } = useFloatingApplyAnchor();
  const toArray = (v) => v == null ? [] : Array.isArray(v) ? v : String(v).split(",");

  // const { data } = useFilters(params); // ← запрос стартует сразу
  const groups  = [
    {
      title: "Бренд",
      value: "brand",
      options: [
        { value: 'intel', label: 'Intel' },
        { value: 'amd', label: 'Amd' },
      ],
    },
    {
      title: "Сокет",
      value: "s[64s]",
      options: [
        { value: 'am5', label: 'AM5', count: 10},
        { value: 'am4', label: 'AM4'},
        { value: 'lga1851', label: 'LGA 1851'},
        { value: 'lga1700', label: 'LGA 1700'},
        { value: 'lga1200', label: 'LGA 1200'},
        { value: 'lga1151-v2', label: 'LGA 1151-v2'},
        { value: 'lga1151', label: 'LGA 1151'},
        { value: 'lga2066', label: 'LGA 2066'},
        { value: 'fm+', label: 'FM+'},
      ],
    },
    {
      title: "Поколение процессоров",
      value: "f[6ig]",
      options: [
        { value: '1q', label: 'AMD Ryzen 9000'},
        { value: '2w', label: 'AMD Ryzen 8000'},
        { value: '3e', label: 'AMD Ryzen 7000'},
        { value: '4r', label: 'AMD Ryzen 5000'},
        { value: '5t', label: 'AMD Ryzen 4000'},
        { value: '6y', label: 'AMD Ryzen 3000'},
        { value: '7u', label: 'AMD Ryzen 2000'},
        { value: '8i', label: 'AMD 7-е поколение'},
        { value: '9o', label: 'AMD 6-е поколение'},
        { value: '10w', label: 'Intel Core Ultra (серия 2)'},
        { value: '11e', label: 'Intel 14-е поколение'},
        { value: '12r', label: 'Intel 13-е поколение'},
        { value: '13t', label: 'Intel 12-е поколение'},
        { value: '14y', label: 'Intel 11-е поколение'},
        { value: '15u', label: 'Intel 10-е поколение'},
        { value: '16i', label: 'Intel 9-е поколение'},
        { value: '17o', label: 'Intel 8-е поколение'},
        { value: '18p', label: 'Intel 7-е поколение'},
      ],
    },
    {
      title: "Тип памяти",
      value: "q[gf4]",
      options: [
        { value: 'ddr3', label: 'DDR3'},
        { value: 'ddr3l', label: 'DDR3L'},
        { value: 'ddr4', label: 'DDR4'},
        { value: 'ddr5', label: 'DDR5'},
      ],
    },
    {
      title: "Год релиза",
      value: "god_reliza",
      options: [
        { value: 'gfdgs', label: '201 500 500 500 600  0880  7546 53453 4353'},
        { value: 'dfgs', label: '202 201 500 500 500 600  0880  7546 53453 4353'},
        { value: '20sfgfd3', label: '203 201 500 500 500 600  0880  7546 53453 4353'},
        { value: '20sfgsdf4', label: '204 201 500 500 500 600  0880  7546 53453 4353'},
        { value: 'cvbcvb', label: '205 201 500 500 500 600  0880  7546 53453 4353'},
        { value: 'hfgdh', label: '206 201 500 500 500 600  0880  7546 53453 4353'},
        { value: 'rthfgd', label: '207 201 500 500 500 600  0880  7546 53453 4353'},
        { value: 'jfgbc', label: '208 201 500 500 500 600  0880  7546 53453 4353'},
        { value: 'qwer', label: '209 201 500 500 500 600  0880  7546 53453 4353'},
        { value: 'kiuk', label: '210 201 500 500 500 600  0880  7546 53453 4353'},
        { value: 'uyvbn', label: '211 201 500 500 500 600  0880  7546 53453 4353'},
        { value: 'wert', label: '212 201 500 500 500 600  0880  7546 53453 4353'},
        { value: 'sdfgser', label: '213 201 500 500 500 600  0880  7546 53453 4353'},
        { value: 'bvc', label: '214 201 500 500 500 600  0880  7546 53453 4353'},
        { value: 'mnghd', label: '215 201 500 500 500 600  0880  7546 53453 4353'},
        { value: 'uip', label: '1'},
        { value: 'hkj', label: '2'},
        { value: 'nmb', label: '3'},
        { value: 'zxcv', label: '4'},
        { value: 'vcxz', label: '5'},
        { value: 'vcxfdg', label: '6'},
        { value: 'fgh', label: '7'},
        { value: 'rtyu', label: '8'},
        { value: 'werq', label: '9'},
      ],
    },
  ];

  return (
    <div ref={wrapRef} className="relative">
      <div  className="bg-white rounded-lg overflow-hidden shadow">
        {groups.map((filter) => {
          const selected = toArray(q[filter.value]);
          
          const handleChange = (nextArr) => {
            patchQuery({
              [filter.value]: nextArr.length ? nextArr : undefined,
              page: 1,
            });
          };

          return (
            <FiltersSidebar
              key={filter.value}
              title={filter.title}
              options={filter.options}
              value={selected}
              onChange={handleChange} // ← получаем next + anchorEl
              defaultOpen={false }
              maxCollapsed={7}
              showApplyAtEl={showApplyAtEl}
            />
          )
        })}
        {btnShow && (
          <ApplyFiltersButton
            top={btnTop}
            onClick={() => { console.log("apply filters"); setBtnShow(false); }}
          />
        )}

        <div className="flex gap-2 flex-col m-5">
          <button 
            className="rounded-lg bg-orange-300 text-white h-[44px] transition
              from-orange-400 to-orange-500 hover:from-orange-300 hover:to-orange-400 hover:outline-0 bg-gradient-to-b" 
            onClick={() => { console.log("apply filters"); setBtnShow(false); }}
          >
            Применить
          </button>

          <button 
            className="rounded-lg outline-1 outline-gray-300 h-[44px] hover:bg-gray-100 transition" 
            onClick={() => { console.log("reset filters"); setBtnShow(false); }}
          >
            Сбросить
          </button>
        </div>
        
        <div className="flex flex-col mx-5 mb-5">
          <button 
            className="flex justify-center items-center text-blue-600 hover:text-orange-500 h-[44px] gap-2 transition"
            onClick={() => { console.log("all filters"); setBtnShow(false); }}
          >
            <span>Все фильтры </span>
            
            <span><ArrowRightIcon className="size-4"/></span>
          </button>
        </div>


      </div>



    </div>
  );
}

function Results({ params, view, onPageChange }) {
  const { data } = useProducts(params); // ← запрос стартует сразу
  const items = data?.data ?? [];
  const meta  = data?.meta ?? {};
  return (
    <div>
      <ProductList
        items={items}
        view={view}
        page={meta.current_page}
        perPage={meta.per_page}
        onPageChange={onPageChange}
      />
    </div>
  );
}

// --- скелеты под каждую колонку
function FiltersSkeleton() {
  return (
    <div className="rounded-lg bg-white p-4 space-y-1">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="h-10 rounded bg-gray-200 animate-pulse" />
      ))}
    </div>
  );
}
function ProductListSkeleton({ view }) {
  return view === "grid" ? (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-5">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="h-[465px] rounded-lg bg-gray-200 animate-pulse" />
      ))}
    </div>
  ) : (
    <div className="space-y-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-[250px] rounded-lg bg-gray-200 animate-pulse" />
      ))}
    </div>
  );
}

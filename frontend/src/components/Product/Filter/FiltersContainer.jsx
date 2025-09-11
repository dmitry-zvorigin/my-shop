import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ApplyFiltersButton, FiltersSearch } from ".";
import useFloatingApplyAnchor from "./useFloatingApplyAnchor";
import { lazy, Suspense, useState } from "react";
import FiltersModal from "./FiltersModal";

const FiltersSidebar = lazy(() => import("./FiltersSidebar"));

export default function FiltersContainer({q, patchQuery}) {
  const { wrapRef, btnTop, btnShow, showApplyAtEl, setBtnShow } = useFloatingApplyAnchor();
  const [isAllFiltersOpen, setIsAllFiltersOpen] = useState(false);
  const toArray = (v) => v == null ? [] : Array.isArray(v) ? v : String(v).split(",");

  // const { data } = useFilters(params); // ← запрос стартует сразу
  const groups = [
    { id: 1,  title: "Основные", order: 1 },
    { id: 2, title: "Рейтинг и обзоры", order: 2},
    { id: 3, title: "Общие параметры", order: 3,},
    { id: 4, title: "Ядро и архитектура", order: 4},
    { id: 5, title: "Частота и возможность разгона", order: 5},
    { id: 6, title: "Параметры оперативной памяти", order: 6},
    { id: 7, title: "Тепловые характеристики", order: 7},
    { id: 8, title: "Графическое ядро", order: 8},
    { id: 9, title: "Шина и контроллеры", order: 9},
  ];

  const filters = [
    {
      value: "brand",
      title: "Бренд",
      groupId: 1,           
      type: "list",
      order: 10,
      showIn: ["sidebar","modal"],
      options: [
        { value: "intel", label: "Intel", count: 123 },
        { value: "amd",   label: "AMD",   count: 98 }
      ]
    },
    {
      title: "Гарантия",
      value: 1,
      order: 2,
      groupId: 1,
      options: [
        { value: '1_god', label: '1 год'},
        { value: '2_god', label: '2 года'},
        { value: '3_god', label: '3 года'},
        { value: '4_god', label: '4 года'},
        { value: '5_god', label: '5 лет'},
      ]
    },
    {
      title: "Сокет",
      value: "s[64s]",
      order: 1,
      groupId: 3,
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
      title: "Год релиза",
      value: "god_reliza",
      order: 1,
      groupId: 3,
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
    {
      title: "Поколение процессоров",
      value: "f[6ig]",
      order: 1,
      groupId: 3,
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
      order: 1,
      groupId: 6,
      options: [
        { value: 'ddr3', label: 'DDR3'},
        { value: 'ddr3l', label: 'DDR3L'},
        { value: 'ddr4', label: 'DDR4'},
        { value: 'ddr5', label: 'DDR5'},
      ],
    },
  ];

  const renderGroups = (variant) =>
    filters.map((filter) => {
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
          onChange={handleChange}
          defaultOpen={variant === "sidebar" ? false : selected.length > 0}
          maxCollapsed={variant === "sidebar" ? 7 : 12}
          showApplyAtEl={variant === "sidebar" ? showApplyAtEl : undefined}
        />
      );
    });



  return (
    <div ref={wrapRef} className="relative gap-5 grid">

      <div className="rounded-lg bg-white shadow h-12">
        <FiltersSearch value={''}  show={true} className={'bg-white'} placeholder={"Поиск по фильтрам"}/>
      </div>
      
      <div  className="bg-white rounded-lg overflow-hidden shadow">
        {filters.map((filter) => {
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
            className="flex justify-center items-center text-blue-600 hover:text-orange-500 h-[44px] gap-2 transition align-middle outline-none"
            onClick={() => { setIsAllFiltersOpen(true); setBtnShow(false); }}
          >
            <span>Все фильтры </span>
            <span><ArrowRightIcon className="size-4"/></span>
          </button>
        </div>
      </div>

      <FiltersModal
        open={isAllFiltersOpen}
        onClose={() => setIsAllFiltersOpen(false)}
        title="Все фильтры"
        groups={groups}
        renderGroups={renderGroups("modal")}
      />
    </div>
  );
}

// const filters = [
//   {
//     "groups": [
//       { "id": "main", "title": "Основные", "order": 1, "showIn": ["sidebar","modal"] },
//       { "id": "more", "title": "Дополнительно", "order": 2, "showIn": ["modal"] }
//     ],
//     "filters": [
//       {
//         "id": "brand",
//         "label": "Бренд",
//         "group": [
//           {"groupId": "main", "groupName": "Основные", "order": 1} 
//         ],
//         "type": "list",
//         "operator": "or",
//         "showIn": ["sidebar","modal"],
//         "order": 10,
//         "options": [
//           { "value": "intel", "label": "Intel", "count": 123, "selected": false },
//           { "value": "amd",   "label": "AMD",   "count": 98,  "selected": true  }
//         ],
//         "optionsMeta": { "total": 45, "limit": 20, "hasMore": true, "cursor": "abc" }
//       },
//       {
//         "id": "price",
//         "label": "Цена",
//         "groupId": "main",
//         "type": "range",
//         "min": 1000, "max": 100000, "from": 2000, "to": 50000
//       }
//     ],
//     "meta": { "totalProducts": 1375 }
//   }
// ];

          // <div className="grid gap-5 grid-cols-[auto_1fr]">
          //   <Suspense fallback={<div>Загрузка…</div>}>
          //     {/* {renderGroups("modal")} */}
      
          //     <div className="outline-1">
                
          //       <div className="overflow-auto h-full">
          //         {Array.from({ length: 10 }).map((_, i) => (
          //           <h3 key={i}>Основная группа фильтров</h3>
          //         ))}
          //         {topGroup.map((i) => (
          //           <div className="py-2 px-2 cursor-pointer">{i.title}</div>
          //         ))}
          //       </div>

                // <div className="mt-5 flex flex-col gap-2 mx-5">
                //   <button
                //     className="rounded-lg h-[44px] px-4 text-white bg-gradient-to-b from-orange-400 to-orange-500 hover:from-orange-300 hover:to-orange-400 transition"
                //     onClick={() => {
                //       console.log("apply filters (modal)");
                //       setIsAllFiltersOpen(false);
                //     }}
                //   >
                //     Применить
                //   </button>
                //   <button
                //     className="rounded-lg h-[44px] px-4 outline-1 outline-gray-300 hover:bg-gray-100 transition"
                //     onClick={() => console.log("reset filters (modal)")}
                //   >
                //     Сбросить
                //   </button>
                // </div>

          //     </div>

          //     <div className="outline-1 overflow-auto">
          //       {renderGroups("modal")}
          //     </div>

          //   </Suspense>
          // </div>
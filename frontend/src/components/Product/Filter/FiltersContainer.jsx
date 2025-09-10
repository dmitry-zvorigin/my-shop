import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { ApplyFiltersButton } from ".";
import useFloatingApplyAnchor from "./useFloatingApplyAnchor";
import { lazy } from "react";

const FiltersSidebar = lazy(() => import("./FiltersSidebar"));

export default function FiltersContainer({q, patchQuery}) {
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
            className="flex justify-center items-center text-blue-600 hover:text-orange-500 h-[44px] gap-2 transition align-middle"
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
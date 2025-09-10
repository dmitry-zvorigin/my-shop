import { Suspense } from "react";
import ToolBar from "../Product/Toolbar/Toolbar";
// import { useFilters } from "@/hooks/filterQueries";
import { useQueryParams } from "@/hooks/useQueryParams";
import ProductsContainer from "../Product/ProductList/ProductsContainer";
import FiltersContainer from "../Product/Filter/FiltersContainer";
import DescriptionCategory from "../Category/DescriptionCategory";

export default function ProductView({ categorySlug }) {
  const [q, , patchQuery] = useQueryParams({ commaLists: true });

  const sort     = q.sort ?? "latest";
  const group    = q.group ?? "none";
  const view     = q.view ?? "list";
  const page     = Number(q.page ?? 1);
  const per_page = Number(q.per_page ?? 12);

  const productParams = { category_slug: categorySlug, ...q, sort, page, per_page };
  // const filtersParams = { category_slug: categorySlug };

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
            <ProductsContainer
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

      <DescriptionCategory/>
    </div>
  );
}

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

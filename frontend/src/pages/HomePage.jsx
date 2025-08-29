import { lazy, Suspense } from "react";

const BrandList = lazy(() => import("@/components/Brand/BrandList"))

export default function HomePage() {

    return (
      <div>
        <div>
            <Suspense fallback={<BrandListSkeleton />}>
              <BrandList />
            </Suspense>
        </div>
      </div>

    )
}

function BrandListSkeleton() {
  
  return (
    <div className="h-[96px] rounded-lg bg-gray-200 animate-pulse"></div>
  );
}
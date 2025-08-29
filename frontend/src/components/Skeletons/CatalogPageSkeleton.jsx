import Skeleton from "../Shared/Skeleton/Skeleton";

export default function CatalogPageSkeleton() {
  return (
    <div className="gap-5 grid">
      <Skeleton className="h-5"/>
      <Skeleton className="h-8 w-40"/>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Skeleton key={idx} className="aspect-square"/>
        ))}
      </div>
    </div>
  );
}
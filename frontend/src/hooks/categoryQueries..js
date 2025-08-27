import { fetchTreeCategories } from "@/api/categories";
import { useQuery } from "@tanstack/react-query";

export function useCategoriesTree(depth = 4) {
  return useQuery({
    queryKey: ['categories', 'tree', { depth }],
    queryFn: fetchTreeCategories(depth),
    select: (res) => res.data,
    staleTime: 5 * 60_000, 
    suspense: true,
  });
}
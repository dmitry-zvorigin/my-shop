import { fetchTreeCategories, fetchCategoryBySlug } from "@/api/categories";
import { useQuery } from "@tanstack/react-query";

export function useCategoriesTree(depth = 1) {
  return useQuery({
    queryKey: ['categories', 'tree', { depth }],
    queryFn: fetchTreeCategories(depth),
    select: (res) => res.data,
    staleTime: 5 * 60_000, 
    suspense: true,
  });
}

export function useCategoryBySlug(slug) {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: fetchCategoryBySlug(slug),
    enabled: !!slug,
    // Сразу соберём хлебные крошки, чтобы в компоненте было меньше логики
    select: (res) => ({
      category: res.category,
      breadcrumbs: [
        { id: 0, name: 'Каталог', slug: '' },
        ...(res.path ?? []),
      ],
    }),
    // Ошибки
    useErrorBoundary: (err) => err?.status !== 404,
    retry: (count, err) => err?.status === 404 ? false : count < 1,
    staleTime: 5 * 60_000, 
    suspense: true,
    keepPreviousData: true, // плавно при смене slug
  });
}
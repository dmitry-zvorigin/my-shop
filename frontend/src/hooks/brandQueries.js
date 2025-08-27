import { fetchBrandBySlug, fetchBrands } from "@/api/brand";
import { useQuery } from "@tanstack/react-query";

export function useBrands() {
    return useQuery({
        queryKey: ['brands'],
        suspense: true,
        queryFn: fetchBrands,
        select: (res) => res.data,
    });
}

export function useBrand(slug) {
    return useQuery({
        queryKey: ['brand', slug],
        queryFn: fetchBrandBySlug(slug),
        enabled: !!slug,
        select: (res) => ({
            brand: res.brand,
            categories: res.categories,
            latestProducts: res.latest_products,
        }),
        suspense: true,
        keepPreviousData: true, 
    });
}
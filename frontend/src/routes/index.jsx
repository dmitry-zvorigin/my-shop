import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

// НЕ ленивые: попадают в первый бандл
import MainLayout from "@/layouts/MainLayout";
import CatalogPageSkeleton from "@/components/Skeletons/CatalogPageSkeleton";
import BrandPageSkeleton from "@/components/Skeletons/BrandPageSkeleton";
import PageErrorFallback from "@/components/Shared/PageErrorFallback";

// ЛЕНИВЫЕ страницы
const HomePage     = lazy(() => import("@/pages/HomePage"));
const CatalogPage  = lazy(() => import("@/pages/CatalogPage"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const BrandPage    = lazy(() => import("@/pages/BrandPage"));
// const ProductsPage = lazy(() => import("@/pages/ProductsPage"));
const ProductPage  = lazy(() => import("@/pages/ProductPage"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

          <Route index element={<HomePage />} />

          <Route path="/catalog" element={
            <Suspense fallback={<CatalogPageSkeleton />}>
              <CatalogPage />
            </Suspense>
          } />

          <Route path="/catalog/:slug" element={
            <Suspense fallback={null}>
              <CategoryPage />
            </Suspense>
            
          } />

          <Route path="/brand/:slug" element={
            <Suspense fallback={<BrandPageSkeleton />}>
              <BrandPage />
            </Suspense>
          } />

          {/* <Route path="/products" element={<ProductPage />} /> */}

          <Route path="/product/:slug" element={<ProductPage />} />

          <Route
            path="*"
            element={
              <PageErrorFallback error={{ status: 404 }}/>
            }
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

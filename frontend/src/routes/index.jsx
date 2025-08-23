// routes/AppRoutes.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

// НЕ ленивые: попадают в первый бандл
import MainLayout from "@/layouts/MainLayout";

// ЛЕНИВЫЕ страницы
const HomePage     = lazy(() => import("@/pages/HomePage"));
const CatalogPage  = lazy(() => import("@/pages/CatalogPage"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const BrandPage    = lazy(() => import("@/pages/BrandPage"));
const ProductsPage = lazy(() => import("@/pages/ProductsPage"));
const ProductPage  = lazy(() => import("@/pages/ProductPage"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:slug" element={<CategoryPage />} />
          <Route path="/brand/:slug" element={<BrandPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

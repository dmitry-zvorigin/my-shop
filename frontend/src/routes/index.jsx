import { BrowserRouter, Route, Routes } from "react-router-dom";
import CatalogPage from "../pages/CatalogPage";
import HomePage from "../pages/HomePage";
import MainLayout from "../layouts/MainLayout";
import CategoryPage from "../pages/CategoryPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:slug" element={<CategoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
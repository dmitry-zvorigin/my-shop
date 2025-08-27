import { Outlet } from 'react-router-dom';
import Container from '@/components/Shared/Container';
import { lazy, Suspense } from 'react';
import { useBreakpoint } from './useBreakpoint';

// ленивые — чтобы реально не попадали в бандл на ненужных размерах
const BannerTop = lazy(() => import("@/components/Widgets/BannerTop"));
const HeaderTop = lazy(() => import("@/components/Widgets/HeaderTop"));
const HeaderMain = lazy(() => import("@/components/Widgets/HeaderMain"));
// const HeaderMobile = lazy(() => import("@/components/Widgets/HeaderMobile"));
const MobileBottomNav = lazy(() => import("@/components/Widgets/MobileBottomNav"))
const MobileTopAction = lazy(() => import("@/components/Widgets/MobileTopAction"));
const Footer = lazy(() => import("@/components/Widgets/Footer"));
const FooterCompact = lazy(() => import("@/components/Widgets/FooterCompact"));
const ScrollToTopButton = lazy(() => import("@/components/Common/ScrollToTopButton"));
const ContentSkeleton = lazy(() => import("@/components/Shared/ContentSkeleton"));

export default function MainLayout() {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Suspense fallback={null}>
        <BannerTop/>
      </Suspense>

      <Suspense fallback={null}>
        {isDesktop && <HeaderTop />}
        {isDesktop && <HeaderMain />}
        {isMobile && <MobileTopAction />}
      </Suspense>

      <div className="bg-gray-100 flex-1">
        <Container size="2xl" className="my-5">
          <Suspense fallback={<ContentSkeleton />}> 
            <Outlet />
          </Suspense>
        </Container>
      </div>

      <Suspense fallback={null}>
        {isMobile && <MobileBottomNav />}
      </Suspense>

      <Suspense fallback={null}>
        {!isDesktop ? <FooterCompact /> : <Footer />}
      </Suspense>

      {/* Кнопка вверх — на планшете/десктопе */}
      <Suspense fallback={null}>
        {!isDesktop ? null : <ScrollToTopButton />}
      </Suspense>
    </div>
  );
}
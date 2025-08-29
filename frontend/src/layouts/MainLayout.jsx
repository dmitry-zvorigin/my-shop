import { Link, Outlet, useLocation } from 'react-router-dom';
import Container from '@/components/Shared/Container';
import { lazy, Suspense } from 'react';
import { useBreakpoint } from './useBreakpoint';
// import ContentSkeleton from '@/components/Shared/ContentSkeleton';
// import { BannerTopSkeleton, HeaderMainSkeleton, HeaderTopSkeleton } from '@/components/Widgets';
import BannerTopSkeleton from "@/components/Widgets/BannerTopSkeleton";
import HeaderTopSkeleton from "@/components/Widgets/HeaderTopSkeleton";
import HeaderMainSkeleton from "@/components/Widgets/HeaderMainSkeleton";
import { ErrorBoundary } from 'react-error-boundary';
import PageErrorFallback from '@/components/Shared/PageErrorFallback';

// ленивые — чтобы реально не попадали в бандл на ненужных размерах
const BannerTop = lazy(() => import("@/components/Widgets/BannerTop"));
const HeaderTop = lazy(() => import("@/components/Widgets/HeaderTop"));
const HeaderMain = lazy(() => import("@/components/Widgets/HeaderMain"));
const MobileBottomNav = lazy(() => import("@/components/Widgets/MobileBottomNav"))
const MobileTopAction = lazy(() => import("@/components/Widgets/MobileTopAction"));
const Footer = lazy(() => import("@/components/Widgets/Footer"));
const FooterCompact = lazy(() => import("@/components/Widgets/FooterCompact"));
const ScrollToTopButton = lazy(() => import("@/components/Common/ScrollToTopButton"));

export default function MainLayout() {
  const location = useLocation();
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  return (
    <div className="flex flex-col min-h-screen bg-white">

      <Suspense fallback={<BannerTopSkeleton />}>
        <BannerTop/>
      </Suspense>

      {isDesktop && 
        <Suspense fallback={<HeaderTopSkeleton />}>
          <HeaderTop />
        </Suspense>
      }

      {isDesktop && 
        <Suspense fallback={<HeaderMainSkeleton />}>
          <HeaderMain />
        </Suspense>
      }

      <Suspense fallback={null}>
        {isMobile && <MobileTopAction />}
      </Suspense>

      <div className="bg-gray-100 flex-1">
        <Container size="2xl" className="my-5">
          <ErrorBoundary FallbackComponent={PageErrorFallback} resetKeys={[location.pathname]}>
            <Suspense fallback={null}> 
              <Outlet />
            </Suspense>
          </ErrorBoundary>
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
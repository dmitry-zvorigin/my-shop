import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Container from '@/shared/ui/Container';
import HeaderTop from '@/components/HeaderTop';
import HeaderMain from '@/components/HeaderMain';
import Footer from '@/components/Footer';
import BannerTop from '@/components/BannerTop';
import ContentSkeleton from '@/components/Shared/ContentSkeleton';

export default function MainLayout_2() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top utility bar */}
      <div className="w-full bg-gray-50 border-b">
        <Container size="2xl">
          <HeaderTop />
        </Container>
      </div>

      {/* Main header with nav/search */}
      <div className="w-full bg-white">
        <Container size="2xl">
          <HeaderMain />
        </Container>
      </div>

      {/* Optional marketing banner area (full-width background, centered content) */}
      <div className="w-full">
        <Container size="2xl" padded>
          <BannerTop />
        </Container>
      </div>

      {/* Main content area */}
      <div className="bg-gray-100 flex-1">
        <Container size="2xl" className="my-5">
          <Suspense fallback={<ContentSkeleton />}> 
            <Outlet />
          </Suspense>
        </Container>
      </div>

      {/* Footer */}
      <div className="w-full bg-white border-t">
        <Container size="2xl">
          <Footer />
        </Container>
      </div>
    </div>
  );
}




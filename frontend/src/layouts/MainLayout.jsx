import { Outlet } from 'react-router-dom';
import ScrollToTopButton from '@/components/Common/ScrollToTopButton';
import { BannerTop, Footer, HeaderMain, HeaderTop } from '@/components/Widgets';
import Container from '@/components/Shared/Container';
import ContentSkeleton from '@/components/Shared/ContentSkeleton';
import { Suspense } from 'react';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BannerTop/>
      <HeaderTop />
      <HeaderMain />

      <div className="bg-gray-100 flex-1">
        <Container size="2xl" className="my-5">
          <Suspense fallback={<ContentSkeleton />}> 
            <Outlet />
          </Suspense>
        </Container>
      </div>


      <Footer />
      <ScrollToTopButton/>
    </div>
  );
}
import { Outlet } from 'react-router-dom';
import HeaderTop from '../components/HeaderTop';
import HeaderMain from '../components/HeaderMain';
import Footer from '../components/Footer';
import BannerTop from '../components/BannerTop';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BannerTop/>
      <HeaderTop />
      <HeaderMain />

      <div className='bg-gray-100 flex-1'>
        <main className="max-w-screen-2xl mx-auto w-full mb-5 mt-5">
          <Outlet />
        </main>
      </div>


      <Footer />
    </div>
  );
}
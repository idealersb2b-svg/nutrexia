import { ReactNode } from 'react';
import Ticker from '../../components/layout/Ticker';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CartDrawer from '../../components/shop/CartDrawer';
import SocialProofPopup from '../../components/ui/SocialProofPopup';

export default function StorefrontLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Ticker />
      <Navbar />
      <CartDrawer />
      <main>
        {children}
      </main>
      <Footer />
      <SocialProofPopup />
    </>
  );
}

import { ReactNode } from 'react';
import { Inter, Space_Grotesk } from 'next/font/google';
import { UIProvider } from '../../context/UIContext';
import Ticker from '../../components/layout/Ticker';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CartDrawer from '../../components/shop/CartDrawer';
import Toast from '../../components/ui/Toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export default function StorefrontLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <UIProvider>
        <Ticker />
        <Navbar />
        <CartDrawer />
        <main>
          {children}
        </main>
        <Footer />
        <Toast />
      </UIProvider>
    </div>
  );
}

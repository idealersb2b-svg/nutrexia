'use client';

import { useUI } from '@/context/UIContext';
import Link from 'next/link';

export default function Navbar() {
  const { openCart, isMobileMenuOpen, openMobileMenu, closeMobileMenu } = useUI();

  return (
    <>
      <header>
        <nav>
          <Link href="/" className="brand">
            <h2 style={{ color: 'var(--char)' }}>NUTREXIA</h2>
          </Link>
          <div className="navlinks">
            <a href="#audience">Who it's for</a>
            <a href="#nutrition">Nutrition</a>
            <a href="#shop">Shop</a>
            <a href="#story">Our story</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="nav-right">
            <button className="cart-btn" onClick={openCart}>
              🛒 Cart <span className="cart-count">1</span>
            </button>
            <div className="burger" onClick={openMobileMenu}>☰</div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'show' : ''}`} onClick={closeMobileMenu}></div>
      <div className={`mobile-menu ${isMobileMenuOpen ? 'show' : ''}`}>
        <div className="mobile-menu-close" onClick={closeMobileMenu}>✕</div>
        <a href="#audience" onClick={closeMobileMenu}>Who it's for</a>
        <a href="#nutrition" onClick={closeMobileMenu}>Nutrition</a>
        <a href="#shop" onClick={closeMobileMenu}>Shop</a>
        <a href="#story" onClick={closeMobileMenu}>Our story</a>
        <a href="#faq" onClick={closeMobileMenu}>FAQ</a>
      </div>
    </>
  );
}

'use client';

import { useUI } from '../../context/UIContext';
import Link from 'next/link';

export default function Navbar() {
  const { openCart, isMobileMenuOpen, openMobileMenu, closeMobileMenu, cartCount } = useUI();

  return (
    <>
      <header>
        <nav>
          <Link href="/" className="brand">
            <img src="/logo.png" alt="Nutrexia logo" />
          </Link>
          <div className="navlinks">
            <a href="#audience">Who it's for</a>
            <a href="/#nutrition">Nutrition</a>
            <a href="/#shop">Shop</a>
            <a href="/#story">Our story</a>
            <a href="/#faq">FAQ</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="nav-right">
            <Link href="/account" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--cream-2)', color: 'var(--char)', textDecoration: 'none', transition: 'background 0.2s' }}>
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{ width: '20px', height: '20px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </Link>
            <button className="cart-btn" onClick={openCart}>
              🛒 Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
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
        <a href="/#nutrition" onClick={closeMobileMenu}>Nutrition</a>
        <a href="/#shop" onClick={closeMobileMenu}>Shop</a>
        <a href="/#story" onClick={closeMobileMenu}>Our story</a>
        <a href="/#faq" onClick={closeMobileMenu}>FAQ</a>
        <a href="/contact" onClick={closeMobileMenu}>Contact</a>
        <a href="/account" onClick={closeMobileMenu} style={{ color: 'var(--gold)' }}>My Account</a>
      </div>
    </>
  );
}

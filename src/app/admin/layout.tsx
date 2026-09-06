'use client';

import './admin.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊', section: null },
  { href: '', label: '', icon: '', section: 'Commerce' },
  { href: '/admin/products', label: 'Products', icon: '📦' },
  { href: '/admin/orders', label: 'Orders', icon: '🛒' },
  { href: '/admin/customers', label: 'Customers', icon: '👥' },
  { href: '/admin/coupons', label: 'Coupons', icon: '🏷️' },
  { href: '', label: '', icon: '', section: 'Operations' },
  { href: '/admin/inventory', label: 'Inventory', icon: '📋' },
  { href: '/admin/reviews', label: 'Reviews', icon: '⭐' },
  { href: '', label: '', icon: '', section: 'Content' },
  { href: '/admin/content', label: 'Content & CMS', icon: '📝' },
];

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/orders': 'Orders',
  '/admin/customers': 'Customers',
  '/admin/coupons': 'Coupons',
  '/admin/inventory': 'Inventory',
  '/admin/reviews': 'Reviews',
  '/admin/content': 'Content & CMS',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentTitle = pageTitles[pathname] || 'Admin';

  return (
    <html lang="en">
      <body>
        <div className="admin-shell">
          {/* Overlay for mobile */}
          <div
            className={`admin-overlay ${sidebarOpen ? 'visible' : ''}`}
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar */}
          <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="admin-sidebar-brand">
              <h2>NUTREXIA</h2>
              <span>Admin Panel</span>
            </div>

            <nav className="admin-nav">
              {navItems.map((item, i) => {
                if (item.section) {
                  return (
                    <div key={`section-${i}`} className="admin-nav-section">
                      {item.section}
                    </div>
                  );
                }
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={isActive ? 'active' : ''}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="admin-nav-icon">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="admin-sidebar-footer">
              <Link href="/" onClick={() => setSidebarOpen(false)}>
                <span className="admin-nav-icon">🌐</span>
                View Storefront
              </Link>
            </div>
          </aside>

          {/* Topbar */}
          <header className="admin-topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                className="admin-hamburger"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle sidebar"
              >
                ☰
              </button>
              <span className="admin-topbar-title">{currentTitle}</span>
            </div>
            <div className="admin-topbar-actions">
              <span className="admin-topbar-badge">● Live</span>
            </div>
          </header>

          {/* Main Content */}
          <main className="admin-main">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

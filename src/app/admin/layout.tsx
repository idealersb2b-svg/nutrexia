import { ReactNode } from 'react';
import './admin.css';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-layout">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>NUTREXIA</h2>
          <span>Admin Portal</span>
        </div>
        <nav className="admin-nav">
          <a href="/admin" className="active">Overview</a>
          <a href="/admin/products">Products</a>
          <a href="/admin/orders">Orders</a>
          <a href="/admin/customers">Customers</a>
        </nav>
        <div className="admin-sidebar-footer">
          <form action="/auth/signout" method="post">
            <button type="submit" className="logout-btn">Sign out</button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        <header className="admin-header">
          <div className="admin-search">
            <input type="text" placeholder="Search orders, products..." />
          </div>
          <div className="admin-profile">
            <span>Admin User</span>
            <div className="avatar">A</div>
          </div>
        </header>
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}

'use client';

import '../admin.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Placeholder auth — will be replaced with real API auth
    if (email === 'admin@nutrexia.in' && password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123')) {
      // Set a simple cookie for middleware to check
      document.cookie = `nutrexia-admin-token=authenticated; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      router.push('/admin');
    } else {
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <h1>NUTREXIA</h1>
          <p>Admin Panel Login</p>
        </div>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              className="admin-input"
              type="email"
              placeholder="admin@nutrexia.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              className="admin-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '8px' }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.78rem', color: 'var(--admin-text-muted)' }}>
          Default: admin@nutrexia.in / admin123
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { signIn } from '../../actions/storefrontAuthActions';
import Link from 'next/link';

export default function LoginPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    setStatus('loading');
    setErrorMessage('');
    
    const result = await signIn(formData);
    
    if (result.success) {
      window.location.href = '/account';
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Failed to sign in');
    }
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh', paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="wrap" style={{ maxWidth: '440px', margin: '0 auto' }}>
        
        <div style={{ background: 'var(--white)', padding: '40px', borderRadius: '24px', border: '1px solid var(--line)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontFamily: 'var(--font-space)', fontSize: '32px', marginBottom: '8px', color: 'var(--char)' }}>Welcome Back</h1>
            <p style={{ color: 'var(--char-soft)', fontSize: '15px' }}>Sign in to your Nutrexia account</p>
          </div>

          <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {status === 'error' && (
              <div style={{ color: '#ef4444', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }}>
                {errorMessage}
              </div>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="email" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--char)' }}>Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required
                placeholder="you@example.com"
                style={{ background: 'var(--cream-2)', border: '1px solid var(--line)', padding: '14px 16px', borderRadius: '12px', color: 'var(--char)', fontSize: '15px' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label htmlFor="password" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--char)' }}>Password</label>
              </div>
              <input 
                type="password" 
                id="password" 
                name="password" 
                required
                placeholder="••••••••"
                style={{ background: 'var(--cream-2)', border: '1px solid var(--line)', padding: '14px 16px', borderRadius: '12px', color: 'var(--char)', fontSize: '15px' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={status === 'loading'}
              style={{ 
                background: 'var(--char)', 
                color: 'var(--cream)', 
                border: 'none', 
                padding: '16px', 
                borderRadius: '12px', 
                fontSize: '15px', 
                fontWeight: 700, 
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.8 : 1,
                marginTop: '10px'
              }}
            >
              {status === 'loading' ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--char-soft)', fontWeight: 500 }}>
            Don't have an account? <Link href="/register" style={{ color: 'var(--pea-deep)', fontWeight: 700 }}>Create one</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

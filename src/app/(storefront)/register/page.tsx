'use client';

import { useState } from 'react';
import { signUp } from '../../actions/storefrontAuthActions';
import Link from 'next/link';

export default function RegisterPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    setStatus('loading');
    setErrorMessage('');
    
    const result = await signUp(formData);
    
    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Failed to register account');
    }
  }

  if (status === 'success') {
    return (
      <div style={{ background: 'var(--cream)', minHeight: '80vh', paddingTop: '100px', paddingBottom: '120px' }}>
        <div className="wrap" style={{ maxWidth: '440px', margin: '0 auto' }}>
          <div style={{ background: 'var(--white)', padding: '50px 40px', borderRadius: '24px', border: '1px solid var(--line)', textAlign: 'center' }}>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="var(--pea-deep)" style={{ width: '48px', height: '48px', margin: '0 auto 16px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 style={{ fontFamily: 'var(--font-space)', fontSize: '28px', marginBottom: '12px', color: 'var(--char)' }}>Check your email</h1>
            <p style={{ color: 'var(--char-soft)', fontSize: '15px', marginBottom: '24px', lineHeight: 1.5 }}>
              We've sent a verification link to your email address. Please click the link to activate your account.
            </p>
            <Link href="/login" style={{ display: 'inline-block', background: 'var(--char)', color: 'var(--cream)', padding: '14px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '14px' }}>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh', paddingTop: '80px', paddingBottom: '120px' }}>
      <div className="wrap" style={{ maxWidth: '440px', margin: '0 auto' }}>
        
        <div style={{ background: 'var(--white)', padding: '40px', borderRadius: '24px', border: '1px solid var(--line)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontFamily: 'var(--font-space)', fontSize: '32px', marginBottom: '8px', color: 'var(--char)' }}>Create Account</h1>
            <p style={{ color: 'var(--char-soft)', fontSize: '15px' }}>Join the Nutrexia community</p>
          </div>

          <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {status === 'error' && (
              <div style={{ color: '#ef4444', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }}>
                {errorMessage}
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <label htmlFor="firstName" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--char)' }}>First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  required
                  style={{ background: 'var(--cream-2)', border: '1px solid var(--line)', padding: '14px 16px', borderRadius: '12px', color: 'var(--char)', fontSize: '15px' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <label htmlFor="lastName" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--char)' }}>Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  style={{ background: 'var(--cream-2)', border: '1px solid var(--line)', padding: '14px 16px', borderRadius: '12px', color: 'var(--char)', fontSize: '15px' }}
                />
              </div>
            </div>

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
              <label htmlFor="password" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--char)' }}>Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                required
                placeholder="Min. 8 characters"
                minLength={8}
                style={{ background: 'var(--cream-2)', border: '1px solid var(--line)', padding: '14px 16px', borderRadius: '12px', color: 'var(--char)', fontSize: '15px' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={status === 'loading'}
              style={{ 
                background: 'var(--gold)', 
                color: 'var(--char)', 
                border: 'none', 
                padding: '16px', 
                borderRadius: '12px', 
                fontSize: '15px', 
                fontWeight: 800, 
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.8 : 1,
                marginTop: '10px'
              }}
            >
              {status === 'loading' ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--char-soft)', fontWeight: 500 }}>
            Already have an account? <Link href="/login" style={{ color: 'var(--pea-deep)', fontWeight: 700 }}>Sign in</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { createGuestTicket } from '../../actions/chatActions';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(formData: FormData) {
    setStatus('loading');
    setErrorMessage('');
    
    const result = await createGuestTicket(formData);
    
    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Failed to submit ticket');
    }
  }

  return (
    <div style={{ background: '#0a0a0a', minHeight: '80vh', paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="wrap" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'var(--font-space)', fontSize: '48px', marginBottom: '16px', textAlign: 'center' }}>Contact Support</h1>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '48px' }}>
          Have a question about your order, our ingredients, or just want to say hi? Send us a message and our team will get back to you shortly.
        </p>

        {status === 'success' ? (
          <div style={{ background: 'rgba(163, 230, 53, 0.1)', border: '1px solid var(--primary)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="var(--primary)" style={{ width: '48px', height: '48px', margin: '0 auto 16px' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 style={{ fontFamily: 'var(--font-space)', fontSize: '24px', marginBottom: '8px', color: '#fff' }}>Message Sent!</h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              We've received your ticket. Our support team will reply to your email address soon.
            </p>
          </div>
        ) : (
          <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px', background: '#121212', padding: '40px', borderRadius: '24px', border: '1px solid #222' }}>
            {status === 'error' && (
              <div style={{ color: '#ef4444', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', fontSize: '14px' }}>
                {errorMessage}
              </div>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="email" style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required
                placeholder="you@example.com"
                style={{ background: '#050505', border: '1px solid #333', padding: '14px 16px', borderRadius: '12px', color: '#fff', fontSize: '15px' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="subject" style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                required
                placeholder="How can we help you?"
                style={{ background: '#050505', border: '1px solid #333', padding: '14px 16px', borderRadius: '12px', color: '#fff', fontSize: '15px' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="message" style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>Message</label>
              <textarea 
                id="message" 
                name="message" 
                required
                placeholder="Type your message here..."
                style={{ background: '#050505', border: '1px solid #333', padding: '14px 16px', borderRadius: '12px', color: '#fff', fontSize: '15px', minHeight: '150px', resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={status === 'loading'}
              style={{ 
                background: 'var(--primary)', 
                color: '#000', 
                border: 'none', 
                padding: '16px', 
                borderRadius: '12px', 
                fontSize: '16px', 
                fontWeight: 700, 
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.7 : 1,
                marginTop: '8px',
                fontFamily: 'var(--font-space)'
              }}
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

import { createClient } from '../../../utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { signOut } from '../../actions/storefrontAuthActions';

export const dynamic = 'force-dynamic';

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh', paddingTop: '60px', paddingBottom: '120px' }}>
      <div className="wrap">
        
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'var(--font-space)', fontSize: '40px', fontWeight: 700, color: 'var(--char)' }}>My Account</h1>
          <p style={{ color: 'var(--char-soft)', fontSize: '16px', marginTop: '8px' }}>Welcome back, manage your orders, messages, and profile here.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '40px', alignItems: 'start' }}>
          
          {/* Sidebar Menu */}
          <div style={{ background: 'var(--white)', padding: '24px 20px', borderRadius: '20px', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            
            <Link href="/account" style={{ padding: '12px 16px', borderRadius: '12px', background: 'var(--cream-2)', color: 'var(--char)', fontWeight: 700, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{ width: '20px', height: '20px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              My Profile
            </Link>

            <Link href="/account/orders" style={{ padding: '12px 16px', borderRadius: '12px', color: 'var(--char-soft)', fontWeight: 600, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '10px', transition: 'background 0.2s' }}>
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{ width: '20px', height: '20px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              Order History
            </Link>

            <Link href="/account/messages" style={{ padding: '12px 16px', borderRadius: '12px', color: 'var(--char-soft)', fontWeight: 600, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '10px', transition: 'background 0.2s' }}>
              <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{ width: '20px', height: '20px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
              Support Messages
            </Link>

            <div style={{ height: '1px', background: 'var(--line)', margin: '12px 0' }}></div>

            <form action={signOut}>
              <button type="submit" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', color: '#b04a4a', fontWeight: 600, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(176, 74, 74, 0.05)', textAlign: 'left', border: 'none', cursor: 'pointer' }}>
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{ width: '20px', height: '20px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                Sign Out
              </button>
            </form>
          </div>

          {/* Main Content Area */}
          <div style={{ background: 'var(--white)', padding: '40px', borderRadius: '24px', border: '1px solid var(--line)', boxShadow: '0 20px 40px rgba(0,0,0,0.03)' }}>
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}

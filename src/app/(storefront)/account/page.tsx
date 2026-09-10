import { createClient } from '../../../utils/supabase/server';
import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AccountProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { profile: true }
  });

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-space)', fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: 'var(--char)' }}>My Profile</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: 700, color: 'var(--char-soft)' }}>First Name</label>
          <div style={{ background: 'var(--cream-2)', padding: '14px 16px', borderRadius: '12px', fontSize: '15px', color: 'var(--char)', border: '1px solid var(--line)' }}>
            {dbUser?.profile?.firstName || 'Not set'}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: 700, color: 'var(--char-soft)' }}>Last Name</label>
          <div style={{ background: 'var(--cream-2)', padding: '14px 16px', borderRadius: '12px', fontSize: '15px', color: 'var(--char)', border: '1px solid var(--line)' }}>
            {dbUser?.profile?.lastName || 'Not set'}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '40px' }}>
        <label style={{ fontSize: '14px', fontWeight: 700, color: 'var(--char-soft)' }}>Email Address</label>
        <div style={{ background: 'var(--cream-2)', padding: '14px 16px', borderRadius: '12px', fontSize: '15px', color: 'var(--char)', border: '1px solid var(--line)', opacity: 0.8 }}>
          {dbUser?.email}
        </div>
        <p style={{ fontSize: '12px', color: 'var(--char-soft)' }}>Email address cannot be changed.</p>
      </div>

      <button style={{ background: 'var(--char)', color: 'var(--cream)', border: 'none', padding: '14px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: 700, cursor: 'not-allowed', opacity: 0.5 }}>
        Edit Profile (Coming Soon)
      </button>
    </div>
  );
}

import { createClient } from '../../../../../utils/supabase/server';
import { prisma } from '../../../../../lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AccountMessageDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const conversation = await prisma.conversation.findUnique({
    where: { id },
    include: {
      messages: { orderBy: { createdAt: 'asc' } }
    }
  });

  if (!conversation) {
    return notFound();
  }

  // Ensure this user owns this conversation
  if (conversation.userId !== user.id && conversation.guestEmail !== user.email) {
    return notFound();
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Link href="/account/messages" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--char-soft)', fontWeight: 600, fontSize: '14px', textDecoration: 'none', marginBottom: '16px' }}>
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{ width: '16px', height: '16px' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Messages
        </Link>
        <h2 style={{ fontFamily: 'var(--font-space)', fontSize: '24px', fontWeight: 700, color: 'var(--char)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          {conversation.subject}
          {conversation.status === 'OPEN' ? (
            <span style={{ background: 'rgba(63,122,31,0.1)', color: 'var(--pea-deep)', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>OPEN</span>
          ) : (
            <span style={{ background: 'var(--cream-2)', color: 'var(--char-soft)', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>CLOSED</span>
          )}
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
        {conversation.messages.map(msg => {
          const isMe = msg.sender === 'USER' || msg.sender === 'GUEST';
          return (
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
              <div style={{ 
                maxWidth: '80%', 
                padding: '16px 20px', 
                borderRadius: '16px', 
                background: isMe ? 'var(--char)' : 'var(--cream-2)', 
                color: isMe ? 'var(--cream)' : 'var(--char)',
                borderBottomRightRadius: isMe ? '4px' : '16px',
                borderBottomLeftRadius: !isMe ? '4px' : '16px',
              }}>
                <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '6px', fontWeight: 600 }}>
                  {isMe ? 'You' : 'Nutrexia Support'} • {msg.createdAt.toLocaleString()}
                </div>
                <div style={{ fontSize: '15px', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {conversation.status === 'OPEN' && (
        <div style={{ background: 'var(--cream-2)', padding: '24px', borderRadius: '16px', border: '1px solid var(--line)' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px', color: 'var(--char)' }}>Reply to Support</h4>
          {/* Note: In a real app we'd add a form action to submit a reply here. For now it's UI. */}
          <form style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <textarea 
              placeholder="Type your message..."
              required
              style={{ width: '100%', minHeight: '120px', padding: '16px', borderRadius: '12px', border: '1px solid var(--line)', background: 'var(--white)', fontSize: '15px', fontFamily: 'inherit', resize: 'vertical' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button disabled type="submit" style={{ background: 'var(--char)', color: 'var(--cream)', padding: '12px 24px', borderRadius: '10px', fontWeight: 700, fontSize: '14px', cursor: 'not-allowed', opacity: 0.5 }}>
                Send Reply (Coming Soon)
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

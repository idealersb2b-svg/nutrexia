import { prisma } from '../../../../lib/prisma';
import { notFound } from 'next/navigation';
import { adminReplyToChat, closeConversation } from '../../../actions/chatActions';

export const dynamic = 'force-dynamic';

export default async function ChatThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const conversation = await prisma.conversation.findUnique({
    where: { id },
    include: {
      user: { include: { profile: true } },
      messages: { orderBy: { createdAt: 'asc' } }
    }
  });

  if (!conversation) return notFound();

  const customerName = conversation.user ? `${conversation.user.profile?.firstName || ''} ${conversation.user.profile?.lastName || ''}` : 'Guest';
  const customerEmail = conversation.user ? conversation.user.email : conversation.guestEmail;

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <a href="/admin/chats" style={{ color: 'var(--admin-text-light)', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{width: 16, height: 16}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Tickets
        </a>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-space)', fontSize: '28px' }}>{conversation.subject}</h1>
            <p style={{ color: 'var(--admin-text-light)', marginTop: '8px', fontSize: '14px' }}>
              Ticket from: <strong style={{color: 'white'}}>{customerName}</strong> ({customerEmail})
            </p>
          </div>
          <span className={`status-badge ${conversation.status === 'OPEN' ? 'pending' : 'active'}`}>
            {conversation.status}
          </span>
        </div>
      </div>

      <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', height: '60vh', minHeight: '500px' }}>
        <div style={{ flex: 1, padding: '32px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px', background: '#0a0a0a' }}>
          {conversation.messages.map((msg) => {
            const isAdmin = msg.sender === 'ADMIN';
            return (
              <div key={msg.id} style={{ display: 'flex', justifyContent: isAdmin ? 'flex-end' : 'flex-start' }}>
                <div style={{ 
                  maxWidth: '70%', 
                  padding: '16px 20px', 
                  borderRadius: '16px',
                  background: isAdmin ? 'var(--admin-primary)' : 'var(--admin-surface)',
                  color: isAdmin ? '#000' : '#fff',
                  border: isAdmin ? 'none' : '1px solid var(--admin-border)',
                  borderBottomRightRadius: isAdmin ? '4px' : '16px',
                  borderBottomLeftRadius: !isAdmin ? '4px' : '16px'
                }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px', opacity: 0.7 }}>
                    {isAdmin ? 'Nutrexia Support' : customerName} • {msg.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                  <div style={{ fontSize: '15px', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                    {msg.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {conversation.status === 'OPEN' ? (
          <div style={{ padding: '24px', borderTop: '1px solid var(--admin-border)', background: 'var(--admin-surface)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <form action={async (formData) => {
                'use server';
                const content = formData.get('content') as string;
                if (content.trim()) {
                  await adminReplyToChat(conversation.id, content);
                }
              }}>
                <textarea 
                  name="content"
                  placeholder="Type your reply here..." 
                  required
                  style={{ width: '100%', padding: '16px', background: 'var(--admin-bg)', border: '1px solid var(--admin-border)', borderRadius: '12px', color: 'white', minHeight: '100px', resize: 'vertical', marginBottom: '16px', fontFamily: 'inherit' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="btn-primary">
                    Send Reply
                  </button>
                </div>
              </form>
              
              <div style={{ display: 'flex', justifyContent: 'flex-start', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                <form action={async () => {
                  'use server';
                  await closeConversation(conversation.id);
                }}>
                  <button type="submit" style={{ padding: '10px 20px', background: 'transparent', border: '1px solid var(--admin-border)', color: 'var(--admin-text-light)', borderRadius: '8px', cursor: 'pointer' }}>
                    Close Ticket
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: '24px', textAlign: 'center', borderTop: '1px solid var(--admin-border)', color: 'var(--admin-text-light)' }}>
            This ticket is closed.
          </div>
        )}
      </div>
    </div>
  );
}

import { createClient } from '../../../../utils/supabase/server';
import { prisma } from '../../../../lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AccountMessagesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const conversations = await prisma.conversation.findMany({
    where: { 
      OR: [
        { userId: user.id },
        { guestEmail: user.email }
      ]
    },
    orderBy: { updatedAt: 'desc' },
    include: {
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    }
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontFamily: 'var(--font-space)', fontSize: '24px', fontWeight: 700, color: 'var(--char)' }}>Support Messages</h2>
        <a href="/contact" style={{ background: 'var(--char)', color: 'var(--cream)', padding: '10px 18px', borderRadius: '10px', fontSize: '13.5px', fontWeight: 700 }}>
          New Ticket
        </a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {conversations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 40px', border: '1px dashed var(--line)', borderRadius: '16px', color: 'var(--char-soft)' }}>
            <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: '48px', height: '48px', margin: '0 auto 16px', opacity: 0.5 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
            <p style={{ fontSize: '15px', fontWeight: 500 }}>You don't have any support tickets yet.</p>
          </div>
        ) : (
          conversations.map(conv => (
            <Link href={`/account/messages/${conv.id}`} key={conv.id} style={{ display: 'block', border: '1px solid var(--line)', borderRadius: '16px', padding: '24px', transition: 'border-color 0.2s, box-shadow 0.2s', textDecoration: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--char)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {conv.subject}
                  {conv.status === 'OPEN' ? (
                    <span style={{ background: 'rgba(63,122,31,0.1)', color: 'var(--pea-deep)', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>OPEN</span>
                  ) : (
                    <span style={{ background: 'var(--cream-2)', color: 'var(--char-soft)', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 800 }}>CLOSED</span>
                  )}
                </h4>
                <span style={{ fontSize: '12px', color: 'var(--char-soft)', fontWeight: 600 }}>{conv.updatedAt.toLocaleDateString()}</span>
              </div>
              <p style={{ fontSize: '14.5px', color: 'var(--char-soft)', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                <span style={{ fontWeight: 600, color: 'var(--char)', marginRight: '6px' }}>{conv.messages[0]?.sender === 'ADMIN' ? 'Support:' : 'You:'}</span>
                {conv.messages[0]?.content}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

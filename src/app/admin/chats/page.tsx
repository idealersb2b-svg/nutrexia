import { prisma } from '../../../lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminChatsPage() {
  const conversations = await prisma.conversation.findMany({
    orderBy: { updatedAt: 'desc' },
    include: {
      user: true,
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    }
  });

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ margin: 0, fontFamily: 'var(--font-space)', fontSize: '32px', letterSpacing: '-0.02em' }}>Support Tickets</h1>
        <p style={{ color: 'var(--admin-text-light)', marginTop: '8px', fontSize: '14px' }}>
          Manage customer inquiries and support requests.
        </p>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Subject</th>
              <th>Last Message</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {conversations.map((conv) => (
              <tr key={conv.id}>
                <td style={{ fontWeight: 500 }}>
                  <Link href={`/admin/chats/${conv.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                    {conv.user ? `${conv.user.profile?.firstName || ''} ${conv.user.profile?.lastName || ''}` : conv.guestEmail}
                    <div style={{ fontSize: '12px', color: 'var(--admin-text-light)', marginTop: '4px' }}>
                      {conv.user ? conv.user.email : 'Guest'}
                    </div>
                  </Link>
                </td>
                <td style={{ fontWeight: 600 }}>
                  <Link href={`/admin/chats/${conv.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                    {conv.subject}
                  </Link>
                </td>
                <td style={{ color: 'var(--admin-text-light)', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {conv.messages[0]?.content || 'No messages'}
                </td>
                <td>
                  <span className={`status-badge ${conv.status === 'OPEN' ? 'pending' : 'active'}`}>
                    {conv.status}
                  </span>
                </td>
                <td style={{ fontSize: '13px', color: 'var(--admin-text-light)' }}>
                  {conv.updatedAt.toLocaleDateString()}
                </td>
              </tr>
            ))}
            
            {conversations.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '32px' }}>
                  No support tickets found. You are all caught up!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

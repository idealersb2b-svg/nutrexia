export const dynamic = 'force-dynamic';

export default function AccountOrdersPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontFamily: 'var(--font-space)', fontSize: '24px', fontWeight: 700, color: 'var(--char)' }}>Order History</h2>
        <a href="/#shop" style={{ background: 'var(--char)', color: 'var(--cream)', padding: '10px 18px', borderRadius: '10px', fontSize: '13.5px', fontWeight: 700 }}>
          Shop Now
        </a>
      </div>

      {/* Mocked Orders */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        <div style={{ border: '1px solid var(--line)', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ background: 'var(--cream-2)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--line)' }}>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--char-soft)', fontWeight: 600, marginBottom: '4px' }}>Order Placed</div>
              <div style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--char)' }}>Sept 10, 2026</div>
            </div>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--char-soft)', fontWeight: 600, marginBottom: '4px' }}>Total Amount</div>
              <div style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--char)' }}>₹2,499.00</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', color: 'var(--char-soft)', fontWeight: 600, marginBottom: '4px' }}>Order #</div>
              <div style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--char)' }}>ORD-99381-X</div>
            </div>
          </div>
          <div style={{ padding: '24px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '64px', height: '64px', background: 'var(--cream-2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                📦
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--char)' }}>Nutrexia Daily Blend (1kg Pouch)</h4>
                <p style={{ fontSize: '13.5px', color: 'var(--char-soft)', marginTop: '4px' }}>Qty: 1</p>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--char)', padding: '6px 12px', borderRadius: '99px', fontSize: '11px', fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Delivered
              </span>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '40px', border: '1px dashed var(--line)', borderRadius: '16px', color: 'var(--char-soft)' }}>
          <p style={{ fontSize: '15px', fontWeight: 500 }}>No other recent orders found.</p>
        </div>

      </div>
    </div>
  );
}

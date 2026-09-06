'use client';

import { useUI } from '../../context/UIContext';

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, cartTotal, removeFromCart, updateQuantity } = useUI();

  return (
    <>
      <div className={`overlay ${isCartOpen ? 'show' : ''}`} onClick={closeCart}></div>
      <div className={`drawer ${isCartOpen ? 'show' : ''}`}>
        <div className="drawer-head">
          <h4>Your Cart</h4>
          <button className="drawer-close" onClick={closeCart}>×</button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="drawer-empty">
            Your cart is currently empty.
          </div>
        ) : (
          <div className="drawer-items">
            {cartItems.map((item) => (
              <div className="d-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div style={{ flex: 1 }}>
                  <div className="di-name">{item.name}</div>
                  <div className="di-meta">{item.meta}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                    <div className="qty-box" style={{ height: '30px' }}>
                      <button style={{ width: '24px', height: '100%', fontSize: '14px' }} onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span style={{ width: '20px', fontSize: '13px' }}>{item.quantity}</span>
                      <button style={{ width: '24px', height: '100%', fontSize: '14px' }} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button className="di-remove" style={{ marginTop: 0 }} onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
                <div className="di-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
              </div>
            ))}
          </div>
        )}

        <div className="drawer-foot">
          <div className="drawer-sub">
            <span>Subtotal</span>
            <span>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
          <button className="checkout-btn" onClick={() => alert('Checkout flow not implemented yet!')} disabled={cartItems.length === 0}>
            Checkout
          </button>
          <div className="founding-note">Founding member pricing applied.</div>
        </div>
      </div>
    </>
  );
}

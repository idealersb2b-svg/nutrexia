'use client';

import { useUI } from '../../context/UIContext';

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useUI();

  return (
    <>
      <div className={`overlay ${isCartOpen ? 'show' : ''}`} onClick={closeCart}></div>
      <div className={`drawer ${isCartOpen ? 'show' : ''}`}>
        <div className="drawer-head">
          <h4>Your Cart</h4>
          <button className="drawer-close" onClick={closeCart}>×</button>
        </div>
        
        {/* Placeholder for empty state */}
        <div className="drawer-empty" style={{ display: 'none' }}>
          Your cart is currently empty.
        </div>

        {/* Placeholder for items */}
        <div className="drawer-items">
          <div className="d-item">
            <img src="/pack.png" alt="Item" />
            <div>
              <div className="di-name">Trial Pack</div>
              <div className="di-meta">5 × 30g sachets</div>
              <button className="di-remove">Remove</button>
            </div>
            <div className="di-price">₹249</div>
          </div>
        </div>

        <div className="drawer-foot">
          <div className="drawer-sub">
            <span>Subtotal</span>
            <span>₹249</span>
          </div>
          <button className="checkout-btn">Checkout</button>
          <div className="founding-note">Founding member pricing applied.</div>
        </div>
      </div>
    </>
  );
}

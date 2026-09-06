'use client';

import { useState } from 'react';
import { useUI } from '../../context/UIContext';

export default function ShopGrid() {
  const { addToCart, openCart } = useUI();
  
  const [qtyTrial, setQtyTrial] = useState(1);
  const [qtyPouch, setQtyPouch] = useState(1);

  const handleAddToCart = (id: string, name: string, meta: string, price: number, quantity: number, image: string) => {
    addToCart({ id, name, meta, price, quantity, image });
    openCart();
  };

  return (
    <section id="shop">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-tag">Pick your entry point</span>
          <h2>Shop Nutrexia</h2>
          <p>Try it before you commit, or lock founding pricing on a full pouch. All prices are founding-batch, tax included.</p>
        </div>
        
        <div className="shop-grid">
          {/* Trial Pack */}
          <div className="prod-card">
            <div className="prod-img">
              <img src="/pack.png" alt="Nutrexia trial sachets" style={{ maxWidth: 120, filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.2))' }} />
            </div>
            <div className="prod-body">
              <h4>Trial Pack</h4>
              <div className="sub">5 × 30g single-serve sachets</div>
              <div className="prod-price-row">
                <span className="prod-price">₹249</span>
                <span className="prod-was">₹399</span>
              </div>
              <div className="prod-meta">₹49.80 / serving</div>
              <div className="qty-add">
                <div className="qty-box">
                  <button onClick={() => setQtyTrial(Math.max(1, qtyTrial - 1))}>-</button>
                  <span>{qtyTrial}</span>
                  <button onClick={() => setQtyTrial(qtyTrial + 1)}>+</button>
                </div>
                <button 
                  className="add-btn" 
                  onClick={() => handleAddToCart('trial', 'Trial Pack', '5 × 30g sachets', 249, qtyTrial, '/pack.png')}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* 1kg Pouch */}
          <div className="prod-card best">
            <div className="prod-ribbon">Most Popular</div>
            <div className="prod-img">
              <img src="/pack.png" alt="Nutrexia 1kg pouch" style={{ maxWidth: 140, filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.2))' }} />
            </div>
            <div className="prod-body">
              <h4>1kg Foundation Pouch</h4>
              <div className="sub">33 servings · Resealable</div>
              <div className="prod-price-row">
                <span className="prod-price">₹1,650</span>
                <span className="prod-was">₹2,250</span>
              </div>
              <div className="prod-meta">₹50.00 / serving</div>
              <div className="qty-add">
                <div className="qty-box">
                  <button onClick={() => setQtyPouch(Math.max(1, qtyPouch - 1))}>-</button>
                  <span>{qtyPouch}</span>
                  <button onClick={() => setQtyPouch(qtyPouch + 1)}>+</button>
                </div>
                <button 
                  className="add-btn" 
                  onClick={() => handleAddToCart('pouch-1kg', '1kg Foundation Pouch', '33 servings', 1650, qtyPouch, '/pack.png')}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Subscribe */}
          <div className="prod-card">
            <div className="prod-ribbon" style={{ background: 'var(--char)', color: 'var(--cream)' }}>Lock Price</div>
            <div className="prod-img">
              <img src="/pack.png" alt="Nutrexia quarterly subscription" style={{ maxWidth: 140, filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.2))' }} />
            </div>
            <div className="prod-body">
              <h4>Quarterly Subscription</h4>
              <div className="sub">3 × 1kg Pouches delivered every 90 days</div>
              <div className="prod-price-row">
                <span className="prod-price">₹4,450</span>
                <span className="prod-was">₹6,750</span>
              </div>
              <div className="prod-meta">₹44.90 / serving (Best Value)</div>
              <div className="qty-add">
                <button 
                  className="add-btn" 
                  style={{ width: '100%' }} 
                  onClick={() => handleAddToCart('sub-quarterly', 'Quarterly Subscription', '3 × 1kg Pouches', 4450, 1, '/pack.png')}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

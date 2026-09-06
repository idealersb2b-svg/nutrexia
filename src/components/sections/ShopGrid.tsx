'use client';

import { useUI } from '../../context/UIContext';

export default function ShopGrid() {
  const { openCart } = useUI();

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
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
                <button className="add-btn" onClick={openCart}>Add to Cart</button>
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
                  <button>-</button>
                  <span>1</span>
                  <button>+</button>
                </div>
                <button className="add-btn" onClick={openCart}>Add to Cart</button>
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
                <button className="add-btn" style={{ width: '100%' }} onClick={openCart}>Subscribe</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

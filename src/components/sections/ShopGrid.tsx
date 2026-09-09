'use client';

import { useState } from 'react';
import { useUI } from '../../context/UIContext';

type VariantProps = {
  id: string;
  sku: string;
  name: string;
  price: number;
  mrp: number;
  servings: number;
  pricePerServing: number;
  isSubscription: boolean;
  product: {
    images: { url: string }[];
  };
};

export default function ShopGrid({ variants = [] }: { variants?: VariantProps[] }) {
  const { addToCart, openCart } = useUI();
  
  // State for quantities keyed by variant ID
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getQty = (id: string) => quantities[id] || 1;
  const setQty = (id: string, qty: number) => setQuantities({ ...quantities, [id]: qty });

  const handleAddToCart = (variant: VariantProps, quantity: number) => {
    const meta = variant.isSubscription ? 'Delivered every 90 days' : `${variant.servings} servings`;
    const image = variant.product?.images?.[0]?.url || '/pack.png';
    addToCart({ id: variant.id, name: variant.name, meta, price: variant.price, quantity, image });
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
          {variants.map((v) => {
            const isPouch = v.sku === 'NTRX-1KG';
            const isSub = v.sku === 'NTRX-SUB-QTR';
            const imgUrl = v.product?.images?.[0]?.url || '/pack.png';
            
            return (
              <div key={v.id} className={`prod-card ${isPouch ? 'best' : ''}`}>
                {isPouch && <div className="prod-ribbon">Most Popular</div>}
                {isSub && <div className="prod-ribbon" style={{ background: 'var(--char)', color: 'var(--cream)' }}>Lock Price</div>}
                
                <div className="prod-img">
                  <img src={imgUrl} alt={v.name} style={{ maxWidth: isPouch || isSub ? 140 : 120, filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.2))' }} />
                </div>
                
                <div className="prod-body">
                  <h4>{v.name}</h4>
                  <div className="sub">{isSub ? '3 × 1kg Pouches delivered every 90 days' : `${v.servings} servings`}</div>
                  
                  <div className="prod-price-row">
                    <span className="prod-price">₹{v.price.toLocaleString()}</span>
                    <span className="prod-was">₹{v.mrp.toLocaleString()}</span>
                  </div>
                  
                  <div className="prod-meta">₹{v.pricePerServing.toFixed(2)} / serving {isSub && '(Best Value)'}</div>
                  
                  <div className="qty-add">
                    {!isSub ? (
                      <div className="qty-box">
                        <button onClick={() => setQty(v.id, Math.max(1, getQty(v.id) - 1))}>-</button>
                        <span>{getQty(v.id)}</span>
                        <button onClick={() => setQty(v.id, getQty(v.id) + 1)}>+</button>
                      </div>
                    ) : null}
                    
                    <button 
                      className="add-btn" 
                      style={isSub ? { width: '100%' } : {}}
                      onClick={() => handleAddToCart(v, isSub ? 1 : getQty(v.id))}
                    >
                      {isSub ? 'Subscribe' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

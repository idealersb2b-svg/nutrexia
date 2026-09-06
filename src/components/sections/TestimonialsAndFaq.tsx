'use client';

import { useState } from 'react';

export default function TestimonialsAndFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  return (
    <>
      <section style={{ background: 'var(--cream-2)' }}>
        <div className="wrap">
          <div className="sec-head center">
            <span className="sec-tag">Don't take our word for it</span>
            <h2>Founding Members speak.</h2>
          </div>
          <div className="test-grid">
            <div className="test-card">
              <div className="stars">★★★★★</div>
              <p>"I have tried every vegan protein on Amazon. They all taste like chalk or mud. This actually tastes like a thick chocolate milkshake. I mix it with oat milk and it keeps me full till 1 PM."</p>
              <div className="test-who">
                <div className="test-avatar">P</div>
                <div>
                  <div className="test-name">Priya S.</div>
                  <div className="test-role">Verified Buyer · 1kg Pouch</div>
                </div>
              </div>
            </div>
            <div className="test-card">
              <div className="stars">★★★★★</div>
              <p>"The zero bloat claim is real. Usually pea protein destroys my stomach, but whatever prebiotic blend they use in here works. The millets give it a nice earthy texture."</p>
              <div className="test-who">
                <div className="test-avatar">R</div>
                <div>
                  <div className="test-name">Rahul M.</div>
                  <div className="test-role">Verified Buyer · Trial Pack</div>
                </div>
              </div>
            </div>
            <div className="test-card">
              <div className="stars">★★★★★</div>
              <p>"My 8-year old drinks it. That's the review. Getting 20g of clean protein into him before school without adding a mountain of sugar is a massive win for me."</p>
              <div className="test-who">
                <div className="test-avatar">A</div>
                <div>
                  <div className="test-name">Anjali T.</div>
                  <div className="test-role">Verified Buyer · Subscriber</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq">
        <div className="wrap">
          <div className="sec-head center">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            
            <div className={`faq-item ${openFaq === 0 ? 'open' : ''}`}>
              <div className="faq-q" onClick={() => toggleFaq(0)}>
                Is it safe for diabetics? <span className="plus">+</span>
              </div>
              <div className="faq-a">
                <p>Yes. Nutrexia contains exactly 0g of added sugar and uses Stevia (a plant-based zero-calorie sweetener). The core carb source is finger millet, which has a very low Glycemic Index, meaning it won't cause sudden blood sugar spikes.</p>
              </div>
            </div>

            <div className={`faq-item ${openFaq === 1 ? 'open' : ''}`}>
              <div className="faq-q" onClick={() => toggleFaq(1)}>
                How does it mix without a blender? <span className="plus">+</span>
              </div>
              <div className="faq-a">
                <p>We use a specialized micro-milling process on the millets and pea protein so it mixes instantly in a standard shaker bottle. No blender required. Just add 250ml of cold water or milk, shake for 10 seconds, and drink.</p>
              </div>
            </div>

            <div className={`faq-item ${openFaq === 2 ? 'open' : ''}`}>
              <div className="faq-q" onClick={() => toggleFaq(2)}>
                Why is it a "Founding Batch"? <span className="plus">+</span>
              </div>
              <div className="faq-a">
                <p>We source our millets directly from a specific cooperative of dryland farmers. We only manufacture what we can sustainably source. This first 1000kg batch is our "Founding Batch" — and anyone who buys it locks in the discounted introductory pricing for life on their subscriptions.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

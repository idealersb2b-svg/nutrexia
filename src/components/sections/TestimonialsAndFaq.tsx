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
            {[
              {
                q: "What is Cleantech Mart and how does it work?",
                a: "Cleantech Mart is the world’s first full‑stack sustainability intelligence platform, combining marketplace, AI carbon scoring, verification, and ESG procurement."
              },
              {
                q: "How does Cleantech Mart help reduce Scope‑3 corporate emissions?",
                a: "Our Gemini‑powered CM Carbon Rating engine auto‑generates LCA‑aligned carbon scores, enabling corporates to achieve verified Scope‑3 decarbonization."
              },
              {
                q: "What types of products and services are listed on Cleantech Mart?",
                a: "We curate 15+ categories including solar, water, waste, air, organic food, eco‑garments, bamboo, millets, and sustainable personal care."
              },
              {
                q: "How does Cleantech Mart eliminate greenwashing?",
                a: "Every product receives a verified sustainability report and “CMSR- Cleantech Mart Sustainability Report and Score” backed by certification procedures, and AI powered LCA documentation."
              },
              {
                q: "Can rural SHGs and FPOs sell on Cleantech Mart?",
                a: "Yes. We digitize rural green supply chains, giving SHGs/FPOs direct access to corporate buyers through our ESG Procurement Hub."
              },
              {
                q: "What makes Cleantech Mart different from IndiaMART or TradeIndia?",
                a: "Unlike generic B2B marketplaces, we provide AI‑powered carbon scoring, verified procurement, and compliance alignment with BRSR mandates. We also help Tier 2/3 and Rural sellers and manufacturers in their Digital Transformation (cm-eservices.com)"
              },
              {
                q: "How does Cleantech Mart support corporate ESG compliance?",
                a: "Our platform maps directly to BRSR Core disclosure requirements, offering verified suppliers and procurement analytics."
              },
              {
                q: "What revenue streams sustain Cleantech Mart?",
                a: "We generate revenue through marketplace fees, verification services, ESG data licensing, and digital transformation/advertising for cleantech sellers."
              },
              {
                q: "Is Cleantech Mart available globally or only in India?",
                a: "We are expanding from India into international markets, offering carbon rating, consultancy, and blockchain‑enabled traceability for global buyers."
              },
              {
                q: "How does Cleantech Mart contribute to a Net‑Zero future?",
                a: "By connecting verified green supply to demand, reducing Scope‑3 emissions, digitizing rural producers, and evolving into full‑stack climate infrastructure."
              }
            ].map((faq, index) => (
              <div key={index} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
                <div className="faq-q" onClick={() => toggleFaq(index)}>
                  {faq.q} <span className="plus">+</span>
                </div>
                <div className="faq-a">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function Hero() {
  return (
    <section className="hero" style={{ paddingTop: '56px' }}>
      <div className="hero-diag"></div>
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow-chip">
            <span className="dot"></span>Founding batch · 742/1000 kg claimed
          </span>
          <h1>Breakfast that finally <em>keeps up</em> with you.</h1>
          <p className="lede">
            30g of complete plant protein, prebiotics and daily-value micronutrients — blended into rainfed millets your grandmother would recognise. Ready in 40 seconds. No bloat, no sugar crash, no guilt.
          </p>
          <div className="hero-ctas">
            <a href="#shop" className="btn btn-primary">Get founding price — ₹50/serving →</a>
            <a href="#nutrition" className="btn btn-ghost">See the lab report</a>
          </div>
          <div className="hero-trust">
            <div className="trust-item"><span className="ic">🧪</span> NABL lab-tested</div>
            <div className="trust-item"><span className="ic">🌾</span> Millet + pea + chana protein</div>
            <div className="trust-item"><span className="ic">🚫</span> No added sugar</div>
            <div className="trust-item"><span className="ic">🌍</span> Climate-smart sourcing</div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="pack-shot">
            {/* Placeholder image for the pack shot */}
            <div style={{ width: 360, height: 480, background: 'var(--pea)', borderRadius: 18, boxShadow: '0 30px 60px rgba(0,0,0,0.35)', transform: 'rotate(-3deg)' }}></div>
            <div className="float-chip chip-1"><span className="num">24.9g</span><span className="lbl">Protein / serving</span></div>
            <div className="float-chip chip-2"><span className="num">13.6</span><span className="lbl">Nutraceuticals</span></div>
            <div className="float-chip chip-3"><span className="num">0g</span><span className="lbl">Added sugar</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function StoryAndClimate() {
  return (
    <>
      <section id="story">
        <div className="wrap story">
          <div className="story-img">
            {/* Placeholder image for farming/founders */}
            <div style={{ width: '100%', aspectRatio: '4/3', background: 'var(--pea)', borderRadius: 20 }}></div>
            <div className="story-badge">Sourced from 1,200+<br/>dryland farmers</div>
          </div>
          <div className="story-copy">
            <span className="sec-tag">The origin</span>
            <h3>We didn't invent millets. We just made them fit your morning.</h3>
            <p>For 4,000 years, millets powered the Indian subcontinent. They grew with rain, not irrigation. They required zero pesticides. They were the ultimate climate-smart superfood.</p>
            <p>But they took 40 minutes to cook.</p>
            <p>Carbin Naturals was built to bridge the gap between ancient agronomy and modern mornings. We extract the protein, preserve the fibre, and blend it for instant mixing — so you can drink 4,000 years of agricultural wisdom on your commute.</p>
            <div className="story-tags">
              <span>🌾 Direct farmer sourcing</span>
              <span>💧 Zero-irrigation grains</span>
              <span>🏭 Solar-powered roasting</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="climate">
            <h3>Your breakfast just offset itself.</h3>
            <p>By switching one whey protein shake (heavy water/methane footprint) to a millet-pea-chana blend, your morning routine is actively restorative.</p>
            <div className="climate-stats">
              <div className="cstat"><div className="num">40L</div><div className="lbl">Water saved vs Whey</div></div>
              <div className="cstat"><div className="num">1.2kg</div><div className="lbl">CO2e mitigated</div></div>
              <div className="cstat"><div className="num">0</div><div className="lbl">Chemical pesticides</div></div>
              <div className="cstat"><div className="num">100%</div><div className="lbl">Fairtrade premium</div></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

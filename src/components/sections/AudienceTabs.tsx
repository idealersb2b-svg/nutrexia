'use client';

import { useState } from 'react';

type Tab = 'genz' | 'mom' | 'fit';

export default function AudienceTabs() {
  const [activeTab, setActiveTab] = useState<Tab>('genz');

  return (
    <section id="audience">
      <div className="wrap">
        <div className="sec-head center">
          <span className="sec-tag">Built for your morning, specifically</span>
          <h2>One pouch. Three very different mornings.</h2>
          <p>Tap your world — the formulation stays the same, the reason you'll love it doesn't.</p>
        </div>
        <div className="aud-tabs">
          <button 
            className={`aud-tab ${activeTab === 'genz' ? 'active' : ''}`} 
            onClick={() => setActiveTab('genz')}
          >
            🎧 Gen Z hustlers
          </button>
          <button 
            className={`aud-tab ${activeTab === 'mom' ? 'active' : ''}`} 
            onClick={() => setActiveTab('mom')}
          >
            👩‍👧 Health-conscious moms
          </button>
          <button 
            className={`aud-tab ${activeTab === 'fit' ? 'active' : ''}`} 
            onClick={() => setActiveTab('fit')}
          >
            💪 Fitness devotees
          </button>
        </div>

        {activeTab === 'genz' && (
          <div className="aud-panel active">
            <div className="aud-copy">
              <h3>Zero prep. Zero bloat. Maximum plot armor for your 9am.</h3>
              <p>You're not skipping breakfast because you don't care — you're skipping it because a 40-minute meal doesn't fit a 4-minute morning. This does.</p>
              <ul className="aud-list">
                <li><span className="chk">✓</span> Shaker + water + 30 seconds = done before your alarm snoozes twice</li>
                <li><span className="chk">✓</span> Climate-smart flex that's actually screenshot-worthy for your story</li>
                <li><span className="chk">✓</span> Rich chocolate flavour, no "health drink" chalkiness</li>
                <li><span className="chk">✓</span> Founding member pricing you can brag about later</li>
              </ul>
            </div>
            <div className="aud-visual">
              <div style={{ textAlign: 'center' }}>
                <div className="big-stat">40s</div>
                <div className="sub-stat">from pouch to protein — faster than your coffee order</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mom' && (
          <div className="aud-panel active">
            <div className="aud-copy">
              <h3>Complete nutrition you can trust before school, before work, every day.</h3>
              <p>Every batch is independently tested — heavy metals, allergens, amino acids, the works — so you're not taking a marketing claim's word for it, you're taking a lab's.</p>
              <ul className="aud-list">
                <li><span className="chk">✓</span> Lead, arsenic, cadmium & mercury — all below detectable limits</li>
                <li><span className="chk">✓</span> Peanut, gluten, milk, soya & mustard allergens — not detected</li>
                <li><span className="chk">✓</span> No added sugar — safe for non-diabetic-friendly family routines</li>
                <li><span className="chk">✓</span> Mix into atta for a protein-boosted family roti — full recipe inside pack</li>
              </ul>
            </div>
            <div className="aud-visual">
              <div style={{ textAlign: 'center' }}>
                <div className="big-stat">5/5</div>
                <div className="sub-stat">allergen panels came back clean in independent lab testing</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fit' && (
          <div className="aud-panel active">
            <div className="aud-copy">
              <h3>Complete amino acid profile, not just a protein number.</h3>
              <p>25g on a label means nothing if the essential aminos aren't there. Ours are lab-mapped, all 20 — leucine, lysine and friends included — for real recovery, not just a marketing macro.</p>
              <ul className="aud-list">
                <li><span className="chk">✓</span> Pea + roasted chana blend for a complete amino profile</li>
                <li><span className="chk">✓</span> Beta-glucan & turmeric for joint and immune support</li>
                <li><span className="chk">✓</span> Iron, zinc & B12 fortification for performance and recovery</li>
                <li><span className="chk">✓</span> No gums or thickeners — coconut milk keeps it naturally creamy</li>
              </ul>
            </div>
            <div className="aud-visual">
              <div style={{ textAlign: 'center' }}>
                <div className="big-stat">20/20</div>
                <div className="sub-stat">essential + non-essential amino acids mapped in every batch</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

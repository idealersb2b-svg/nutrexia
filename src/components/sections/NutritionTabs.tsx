'use client';

import { useState } from 'react';

type NutriTab = 'vit' | 'min' | 'aa' | 'safe';

export default function NutritionTabs() {
  const [activeTab, setActiveTab] = useState<NutriTab>('vit');

  return (
    <section id="nutrition">
      <div className="wrap">
        <div className="sec-head">
          <span className="sec-tag">The receipts</span>
          <h2>Independently lab-verified, not self-declared.</h2>
          <p>Every number below comes from NABL-accredited testing (ITC Labs / Qualitek Labs) on our millet-plant-protein premix, or from our published fortification blueprint built on ICMR-NIN RDA 2020 guidance.</p>
        </div>
        
        <div className="nutri">
          <div className="nutri-grid">
            <div className="nutri-left">
              <h3>Per 30g serving</h3>
              <p>Rich Chocolate premix, mixed with 200–250ml cold water or plant milk.</p>
              <div className="macro-row"><span className="m-name">Plant protein</span><span className="m-val">24.9 g</span></div>
              <div className="macro-row"><span className="m-name">Carbohydrates</span><span className="m-val">6.4 g</span></div>
              <div className="macro-row"><span className="m-name">Fats</span><span className="m-val">3.1 g</span></div>
              <div className="macro-row"><span className="m-name">Dietary fibre</span><span className="m-val">2.5 g</span></div>
              <div className="macro-row"><span className="m-name">Energy</span><span className="m-val">~145 kcal</span></div>
              <div className="macro-row"><span className="m-name">Added sugar</span><span className="m-val">0 g</span></div>
              <div className="serving-note">Macro figures reflect our front-of-pack declaration for the Rich Chocolate SKU; fibre and energy are scaled from NABL lab analysis (ITC Labs report TR02FD-2606181716) of the base millet-protein premix per 100g.</div>
            </div>
            
            <div>
              <div className="nutri-tabs">
                <button className={`ntab ${activeTab === 'vit' ? 'active' : ''}`} onClick={() => setActiveTab('vit')}>Vitamins</button>
                <button className={`ntab ${activeTab === 'min' ? 'active' : ''}`} onClick={() => setActiveTab('min')}>Minerals</button>
                <button className={`ntab ${activeTab === 'aa' ? 'active' : ''}`} onClick={() => setActiveTab('aa')}>Amino acids</button>
                <button className={`ntab ${activeTab === 'safe' ? 'active' : ''}`} onClick={() => setActiveTab('safe')}>Safety panel</button>
              </div>

              {activeTab === 'vit' && (
                <div className="npanel active">
                  <div className="vit-grid">
                    <div className="vit-item"><div className="vit-top"><span className="vn">Vitamin B12 (Methylcobalamin)</span><span className="vv">40% RDA</span></div><div className="bar-track"><div className="bar-fill" style={{ width: '40%' }}></div></div></div>
                    <div className="vit-item"><div className="vit-top"><span className="vn">Vitamin D3 (Cholecalciferol)</span><span className="vv">50% RDA</span></div><div className="bar-track"><div className="bar-fill" style={{ width: '50%' }}></div></div></div>
                    <div className="vit-item"><div className="vit-top"><span className="vn">Vitamin C (lab-detected)</span><span className="vv">16.7mg/100g</span></div><div className="bar-track"><div className="bar-fill" style={{ width: '65%' }}></div></div></div>
                    <div className="vit-item"><div className="vit-top"><span className="vn">Vitamin E (lab-detected)</span><span className="vv">0.66mg/100g</span></div><div className="bar-track"><div className="bar-fill" style={{ width: '20%' }}></div></div></div>
                    <div className="vit-item"><div className="vit-top"><span className="vn">Niacin — B3 (lab-detected)</span><span className="vv">5.5mg/100g</span></div><div className="bar-track"><div className="bar-fill" style={{ width: '55%' }}></div></div></div>
                    <div className="vit-item"><div className="vit-top"><span className="vn">Pantothenic acid — B5</span><span className="vv">265µg/100g</span></div><div className="bar-track"><div className="bar-fill" style={{ width: '45%' }}></div></div></div>
                  </div>
                  <div className="lab-credit">B12 & D3 shown as our fortification blueprint target (ICMR-NIN RDA 2020 reference). C, E, B3 & B5 are directly lab-detected values from the base premix, ITC Labs report.</div>
                </div>
              )}

              {activeTab === 'min' && (
                <div className="npanel active">
                  <div className="vit-grid">
                    <div className="vit-item"><div className="vit-top"><span className="vn">Iron (chelated bisglycinate)</span><span className="vv">25% RDA</span></div><div className="bar-track"><div className="bar-fill" style={{ width: '25%' }}></div></div></div>
                    <div className="vit-item"><div className="vit-top"><span className="vn">Zinc (bisglycinate)</span><span className="vv">20% RDA</span></div><div className="bar-track"><div className="bar-fill" style={{ width: '20%' }}></div></div></div>
                    <div className="vit-item"><div className="vit-top"><span className="vn">Calcium (lab-detected)</span><span className="vv">147mg/100g</span></div><div className="bar-track"><div className="bar-fill" style={{ width: '35%' }}></div></div></div>
                    <div className="vit-item"><div className="vit-top"><span className="vn">Magnesium (lab-detected)</span><span className="vv">109mg/100g</span></div><div className="bar-track"><div className="bar-fill" style={{ width: '40%' }}></div></div></div>
                    <div className="vit-item"><div className="vit-top"><span className="vn">Potassium (lab-detected)</span><span className="vv">308mg/100g</span></div><div className="bar-track"><div className="bar-fill" style={{ width: '50%' }}></div></div></div>
                    <div className="vit-item"><div className="vit-top"><span className="vn">Sodium (lab-detected)</span><span className="vv">449mg/100g</span></div><div className="bar-track"><div className="bar-fill" style={{ width: '60%' }}></div></div></div>
                  </div>
                  <div className="lab-credit">Iron & Zinc shown as fortification blueprint targets using gentle, high-absorption chelated forms. All other minerals are directly lab-detected per 100g of premix.</div>
                </div>
              )}

              {activeTab === 'aa' && (
                <div className="npanel active">
                  <div className="aa-tags">
                    <span><b>10.2g</b>Glutamic acid</span>
                    <span><b>5.5g</b>Aspartic acid</span>
                    <span><b>2.8g</b>Lysine</span>
                    <span><b>2.8g</b>Threonine</span>
                    <span><b>2.4g</b>Arginine</span>
                    <span><b>1.8g</b>Alanine</span>
                    <span><b>1.4g</b>Histidine</span>
                    <span><b>0.9g</b>Valine</span>
                    <span><b>0.8g</b>Phenylalanine</span>
                    <span><b>0.6g</b>Leucine</span>
                    <span><b>0.6g</b>Isoleucine</span>
                    <span><b>0.04g</b>Tryptophan</span>
                  </div>
                  <div className="lab-credit">All 20 amino acids (essential + non-essential) mapped per 100g via LCMSMS — figures shown per gram of base premix, ITC Labs report TR02FD-2606181716.</div>
                </div>
              )}

              {activeTab === 'safe' && (
                <div className="npanel active">
                  <div className="safety-grid">
                    <div className="safety-item"><span className="tick">✓</span> Lead — below quantification</div>
                    <div className="safety-item"><span className="tick">✓</span> Arsenic — below quantification</div>
                    <div className="safety-item"><span className="tick">✓</span> Cadmium — below quantification</div>
                    <div className="safety-item"><span className="tick">✓</span> Mercury — below quantification</div>
                    <div className="safety-item"><span className="tick">✓</span> Peanut & soya allergen — not detected</div>
                    <div className="safety-item"><span className="tick">✓</span> Gluten & mustard allergen — not detected</div>
                    <div className="safety-item"><span className="tick">✓</span> Milk & sesame allergen — not detected</div>
                    <div className="safety-item"><span className="tick">✓</span> Water activity 0.63 — shelf-stable</div>
                  </div>
                  <div className="lab-credit">Sourced from independent NABL-accredited reports: ITC Labs (heavy metals & nutraceuticals) and Qualitek Labs (allergen panel), 2026.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

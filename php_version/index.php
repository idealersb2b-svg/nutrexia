<?php
$pageTitle = "Bio-Optimized Climate-Smart Superfood Breakfast";
require_once __DIR__ . '/includes/header.php';

// Sample products array or database fallback
$products = [
    [
        'id' => 'v-founding-1',
        'name' => 'Nutrexia Founding Pouch',
        'subtitle' => 'Rainfed Millets + Plant Protein',
        'price' => 799.00,
        'mrp' => 1199.00,
        'servings' => 30,
        'image' => '/assets/images/pack.png',
        'badge' => 'MOST POPULAR'
    ],
    [
        'id' => 'v-duo-2',
        'name' => 'Nutrexia Duo Bundle (2 Pack)',
        'subtitle' => '60 Servings · Extra 15% Off',
        'price' => 1449.00,
        'mrp' => 2398.00,
        'servings' => 60,
        'image' => '/assets/images/pack.png',
        'badge' => 'BEST VALUE'
    ],
    [
        'id' => 'v-family-3',
        'name' => 'Nutrexia Family Stack (4 Pack)',
        'subtitle' => '120 Servings · Free Shipping',
        'price' => 2699.00,
        'mrp' => 4796.00,
        'servings' => 120,
        'image' => '/assets/images/pack.png',
        'badge' => 'FAMILY SAVINGS'
    ]
];
?>

<!-- Hero Section -->
<section class="hero">
  <div class="hero-diag"></div>
  <div class="wrap">
    <div class="hero-grid">
      <div class="hero-copy">
        <div class="eyebrow-chip">
          <span class="dot"></span>
          FOUNDING BATCH LIVE · LIMITED TO 1,000 UNITS
        </div>
        <h1>Fuel Your Body With <em>Bio-Optimized</em> Superfood Breakfast</h1>
        <p class="lede">Engineered with rainfed millets, pea protein isolate, and prebiotic fiber. Zero added sugar. Crafted for sustainable everyday energy.</p>
        <div class="hero-ctas">
          <a href="#shop" class="btn btn-primary">Shop Founding Batch →</a>
          <a href="#nutrition" class="btn btn-ghost">View Lab Analysis</a>
        </div>
        <div class="hero-trust">
          <div class="trust-item"><span class="ic">🧪</span> NABL Lab Certified</div>
          <div class="trust-item"><span class="ic">🌾</span> 100% Rainfed Millets</div>
          <div class="trust-item"><span class="ic">⚡</span> 15g Protein / Serving</div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="pack-shot">
          <img src="/assets/images/pack.png" alt="Nutrexia Superfood Pouch" />
          <div class="float-chip chip-1">
            <span class="num">15g</span>
            <span class="lbl">Bio Protein</span>
          </div>
          <div class="float-chip chip-2">
            <span class="num">0g</span>
            <span class="lbl">Added Sugar</span>
          </div>
          <div class="float-chip chip-3">
            <span class="num">100%</span>
            <span class="lbl">Plant Based</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Audience Section -->
<section id="audience" class="wrap">
  <div class="sec-head center">
    <span class="sec-tag">WHO IT'S FOR</span>
    <h2>Formulated For Busy Professionals, Athletes & Families</h2>
    <p>A complete 60-second breakfast replacement built to maintain stable blood sugar levels and eliminate morning fog.</p>
  </div>

  <div class="aud-panel active">
    <div class="aud-copy">
      <h3>For High Performers & Founders</h3>
      <p>Clean, sustained glucose release without insulin spikes. Keep your brain focused through back-to-back morning meetings.</p>
      <ul class="aud-list">
        <li><span class="chk">✓</span> Sustained 4-hour cognitive focus</li>
        <li><span class="chk">✓</span> Zero caffeine crash or jitters</li>
        <li><span class="chk">✓</span> Ready in under 60 seconds with milk or warm water</li>
      </ul>
    </div>
    <div class="aud-visual">
      <span class="big-stat">4 Hours</span>
      <span class="sub-stat">Sustained cellular energy without insulin spikes</span>
    </div>
  </div>
</section>

<!-- Formulation Section (What's actually in the pouch) -->
<section id="formulation" style="background:var(--cream-2); padding:96px 0;">
  <div class="wrap">
    <div class="sec-head center">
      <span class="sec-tag">What's actually in the pouch</span>
      <h2>Four systems, working together — not just a protein spike.</h2>
      <p>Nutrexia isn't a single ingredient wearing a protein badge. It's a formulation built across four functions your body actually needs at breakfast.</p>
    </div>
    <div class="form-grid">
      <div class="form-card">
        <div class="form-ic">🌾</div>
        <h4>Core grains</h4>
        <p>Finger millet and sprouted ragi form a rainfed, low-GI, heritage-grain foundation — climate-smart by nature, not by marketing.</p>
      </div>
      <div class="form-card">
        <div class="form-ic">💪</div>
        <h4>Protein matrix</h4>
        <p>Pea protein isolate + roasted chana deliver a complete amino profile for real muscle recovery, not just a headline gram count.</p>
      </div>
      <div class="form-card">
        <div class="form-ic">🌿</div>
        <h4>Gut health</h4>
        <p>Inulin and beta-glucan prebiotics support easy digestion — the "zero bloat" claim, backed by fibre science, not luck.</p>
      </div>
      <div class="form-card">
        <div class="form-ic">🛡️</div>
        <h4>Immunity shield</h4>
        <p>Turmeric, black pepper and Vitamin D3 combine for daily immune resilience — small doses, consistently, every morning.</p>
      </div>
    </div>
  </div>
</section>

<!-- Lab Verification & Nutrition Section -->
<section id="nutrition" class="wrap" style="padding:96px 0;">
  <div class="sec-head" style="margin-bottom: 40px;">
    <span class="sec-tag" style="color:var(--pea-deep); font-weight:700; font-size:13.5px; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:10px; display:block;">The receipts</span>
    <h2 style="font-size:clamp(28px,3.4vw,42px); font-weight:700; color:var(--char); line-height:1.15; margin-bottom:14px;">Independently lab-verified, not self-declared.</h2>
    <p style="font-size:16.5px; color:var(--char-soft); line-height:1.6; max-width:660px;">Every number below comes from NABL-accredited testing (ITC Labs / Qualitek Labs) on our millet-plant-protein premix, or from our published fortification blueprint built on ICMR-NIN RDA 2020 guidance.</p>
  </div>

  <div class="nutri" style="background:#121410; color:#FAF6EA; border-radius:28px; padding:48px; position:relative; overflow:hidden; border:1px solid rgba(255,255,255,0.08); box-shadow:0 30px 70px rgba(0,0,0,0.35);">
    <div class="nutri-grid" style="display:grid; grid-template-columns:0.85fr 1.15fr; gap:48px; position:relative; z-index:1; align-items:start;">
      
      <!-- Left Column: Per 30g serving Macros & Lab Seal Image -->
      <div class="nutri-left">
        <h3 style="font-size:26px; font-weight:700; color:#FFFFFF; margin-bottom:6px;">Per 30g serving</h3>
        <p style="color:#D1D5DB; font-size:14px; line-height:1.5; margin-bottom:20px;">Rich Chocolate premix, mixed with 200–250ml cold water or plant milk.</p>
        
        <div style="display:flex; flex-direction:column; gap:0;">
          <div class="macro-row" style="display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.1);">
            <span class="m-name" style="font-weight:600; font-size:14.5px; color:#E5E7EB;">Plant protein</span>
            <span class="m-val" style="font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:20px; color:#F0B429; background:rgba(240,180,41,0.1); padding:2px 10px; border-radius:8px;">24.9 g</span>
          </div>
          <div class="macro-row" style="display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.1);">
            <span class="m-name" style="font-weight:600; font-size:14.5px; color:#E5E7EB;">Carbohydrates</span>
            <span class="m-val" style="font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:20px; color:#F0B429;">6.4 g</span>
          </div>
          <div class="macro-row" style="display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.1);">
            <span class="m-name" style="font-weight:600; font-size:14.5px; color:#E5E7EB;">Fats</span>
            <span class="m-val" style="font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:20px; color:#F0B429;">3.1 g</span>
          </div>
          <div class="macro-row" style="display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.1);">
            <span class="m-name" style="font-weight:600; font-size:14.5px; color:#E5E7EB;">Dietary fibre</span>
            <span class="m-val" style="font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:20px; color:#F0B429;">2.5 g</span>
          </div>
          <div class="macro-row" style="display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.1);">
            <span class="m-name" style="font-weight:600; font-size:14.5px; color:#E5E7EB;">Energy</span>
            <span class="m-val" style="font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:20px; color:#F0B429;">~145 kcal</span>
          </div>
          <div class="macro-row" style="display:flex; justify-content:space-between; align-items:center; padding:12px 0;">
            <span class="m-name" style="font-weight:600; font-size:14.5px; color:#E5E7EB;">Added sugar</span>
            <span class="m-val" style="font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:20px; color:#7CB233; background:rgba(124,178,51,0.15); padding:2px 10px; border-radius:8px;">0 g</span>
          </div>
        </div>

        <div class="serving-note" style="margin-top:16px; font-size:12px; color:rgba(250,246,234,0.6); line-height:1.5; padding-top:14px; border-top:1px dashed rgba(255,255,255,0.12);">
          Macro figures reflect our front-of-pack declaration for the Rich Chocolate SKU; fibre and energy are scaled from NABL lab analysis (ITC Labs report TR02FD-2606181716) of the base millet-protein premix per 100g.
        </div>

        <!-- NABL Lab Seal Image Badge Card -->
        <div style="margin-top: 24px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 18px; display: flex; align-items: center; gap: 16px;">
          <img src="/assets/images/lab_seal.png" alt="NABL Accredited Lab Verified" style="width: 72px; height: 72px; object-fit: contain; border-radius: 10px; flex-shrink: 0;" />
          <div>
            <div style="font-weight: 800; font-size: 13.5px; color: #7CB233; text-transform: uppercase; letter-spacing: 0.04em;">NABL Accredited Verification</div>
            <div style="font-size: 12px; color: #E5E7EB; margin-top: 2px;">ITC Labs Report No. <b>TR02FD-2606181716</b></div>
            <div style="font-size: 11px; color: #9CA3AF; margin-top: 4px;">✔ Heavy Metals Passed · 0 Pesticides · Gluten Free</div>
          </div>
        </div>
      </div>

      <!-- Right Column: Single Active Tab Panel (Fail-Safe Display Toggling) -->
      <div>
        <div class="nutri-tabs" style="display:flex; gap:10px; margin-bottom:24px; flex-wrap:wrap;">
          <button id="ntab-vit" class="ntab active" onclick="switchNutriTab('vit')" style="padding:10px 20px; border-radius:999px; font-weight:700; font-size:13.5px; cursor:pointer; background:#F0B429; color:#181712;">Vitamins</button>
          <button id="ntab-min" class="ntab" onclick="switchNutriTab('min')" style="padding:10px 20px; border-radius:999px; font-weight:700; font-size:13.5px; cursor:pointer; background:rgba(255,255,255,0.08); color:#FAF6EA;">Minerals</button>
          <button id="ntab-aa" class="ntab" onclick="switchNutriTab('aa')" style="padding:10px 20px; border-radius:999px; font-weight:700; font-size:13.5px; cursor:pointer; background:rgba(255,255,255,0.08); color:#FAF6EA;">Amino acids</button>
          <button id="ntab-safe" class="ntab" onclick="switchNutriTab('safe')" style="padding:10px 20px; border-radius:999px; font-weight:700; font-size:13.5px; cursor:pointer; background:rgba(255,255,255,0.08); color:#FAF6EA;">Safety panel</button>
        </div>

        <!-- Vitamins Panel (Active by Default) -->
        <div id="npanel-vit" class="npanel active" style="display:block;">
          <div class="vit-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:16px 28px;">
            <div class="vit-item" style="padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.1);">
              <div class="vit-top" style="display:flex; justify-content:space-between; font-size:13.5px; font-weight:700; margin-bottom:8px;">
                <span class="vn" style="color:#FFFFFF;">Vitamin B12 (Methylcobalamin)</span>
                <span class="vv" style="color:#7CB233;">40% RDA</span>
              </div>
              <div class="bar-track" style="height:6px; background:rgba(255,255,255,0.12); border-radius:99px; overflow:hidden;">
                <div class="bar-fill" style="height:100%; background:linear-gradient(90deg,#7CB233,#F0B429); border-radius:99px; width:40%;"></div>
              </div>
            </div>

            <div class="vit-item" style="padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.1);">
              <div class="vit-top" style="display:flex; justify-content:space-between; font-size:13.5px; font-weight:700; margin-bottom:8px;">
                <span class="vn" style="color:#FFFFFF;">Vitamin D3 (Cholecalciferol)</span>
                <span class="vv" style="color:#7CB233;">50% RDA</span>
              </div>
              <div class="bar-track" style="height:6px; background:rgba(255,255,255,0.12); border-radius:99px; overflow:hidden;">
                <div class="bar-fill" style="height:100%; background:linear-gradient(90deg,#7CB233,#F0B429); border-radius:99px; width:50%;"></div>
              </div>
            </div>

            <div class="vit-item" style="padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.1);">
              <div class="vit-top" style="display:flex; justify-content:space-between; font-size:13.5px; font-weight:700; margin-bottom:8px;">
                <span class="vn" style="color:#FFFFFF;">Vitamin C (lab-detected)</span>
                <span class="vv" style="color:#7CB233;">16.7mg/100g</span>
              </div>
              <div class="bar-track" style="height:6px; background:rgba(255,255,255,0.12); border-radius:99px; overflow:hidden;">
                <div class="bar-fill" style="height:100%; background:linear-gradient(90deg,#7CB233,#F0B429); border-radius:99px; width:65%;"></div>
              </div>
            </div>

            <div class="vit-item" style="padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.1);">
              <div class="vit-top" style="display:flex; justify-content:space-between; font-size:13.5px; font-weight:700; margin-bottom:8px;">
                <span class="vn" style="color:#FFFFFF;">Vitamin E (lab-detected)</span>
                <span class="vv" style="color:#7CB233;">0.66mg/100g</span>
              </div>
              <div class="bar-track" style="height:6px; background:rgba(255,255,255,0.12); border-radius:99px; overflow:hidden;">
                <div class="bar-fill" style="height:100%; background:linear-gradient(90deg,#7CB233,#F0B429); border-radius:99px; width:30%;"></div>
              </div>
            </div>

            <div class="vit-item" style="padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.1);">
              <div class="vit-top" style="display:flex; justify-content:space-between; font-size:13.5px; font-weight:700; margin-bottom:8px;">
                <span class="vn" style="color:#FFFFFF;">Niacin — B3 (lab-detected)</span>
                <span class="vv" style="color:#7CB233;">5.5mg/100g</span>
              </div>
              <div class="bar-track" style="height:6px; background:rgba(255,255,255,0.12); border-radius:99px; overflow:hidden;">
                <div class="bar-fill" style="height:100%; background:linear-gradient(90deg,#7CB233,#F0B429); border-radius:99px; width:55%;"></div>
              </div>
            </div>

            <div class="vit-item" style="padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.1);">
              <div class="vit-top" style="display:flex; justify-content:space-between; font-size:13.5px; font-weight:700; margin-bottom:8px;">
                <span class="vn" style="color:#FFFFFF;">Pantothenic acid — B5</span>
                <span class="vv" style="color:#7CB233;">265µg/100g</span>
              </div>
              <div class="bar-track" style="height:6px; background:rgba(255,255,255,0.12); border-radius:99px; overflow:hidden;">
                <div class="bar-fill" style="height:100%; background:linear-gradient(90deg,#7CB233,#F0B429); border-radius:99px; width:45%;"></div>
              </div>
            </div>
          </div>
          <div class="lab-credit" style="margin-top:22px; font-size:12.5px; color:rgba(250,246,234,0.5); line-height:1.5;">
            B12 & D3 shown as our fortification blueprint target (ICMR-NIN RDA 2020 reference). C, E, B3 & B5 are directly lab-detected values from the base premix, ITC Labs report.
          </div>
        </div>

        <!-- Minerals Panel (Hidden by Default) -->
        <div id="npanel-min" class="npanel" style="display:none;">
          <div class="vit-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:16px 28px;">
            <div class="vit-item" style="padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.1);"><div class="vit-top" style="display:flex; justify-content:space-between; font-size:13.5px; font-weight:700; margin-bottom:8px;"><span class="vn" style="color:#FFFFFF;">Iron (chelated bisglycinate)</span><span class="vv" style="color:#7CB233;">25% RDA</span></div><div class="bar-track" style="height:6px; background:rgba(255,255,255,0.12); border-radius:99px; overflow:hidden;"><div class="bar-fill" style="height:100%; background:linear-gradient(90deg,#7CB233,#F0B429); border-radius:99px; width:25%;"></div></div></div>
            <div class="vit-item" style="padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.1);"><div class="vit-top" style="display:flex; justify-content:space-between; font-size:13.5px; font-weight:700; margin-bottom:8px;"><span class="vn" style="color:#FFFFFF;">Zinc (bisglycinate)</span><span class="vv" style="color:#7CB233;">20% RDA</span></div><div class="bar-track" style="height:6px; background:rgba(255,255,255,0.12); border-radius:99px; overflow:hidden;"><div class="bar-fill" style="height:100%; background:linear-gradient(90deg,#7CB233,#F0B429); border-radius:99px; width:20%;"></div></div></div>
            <div class="vit-item" style="padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.1);"><div class="vit-top" style="display:flex; justify-content:space-between; font-size:13.5px; font-weight:700; margin-bottom:8px;"><span class="vn" style="color:#FFFFFF;">Calcium (lab-detected)</span><span class="vv" style="color:#7CB233;">147mg/100g</span></div><div class="bar-track" style="height:6px; background:rgba(255,255,255,0.12); border-radius:99px; overflow:hidden;"><div class="bar-fill" style="height:100%; background:linear-gradient(90deg,#7CB233,#F0B429); border-radius:99px; width:35%;"></div></div></div>
            <div class="vit-item" style="padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.1);"><div class="vit-top" style="display:flex; justify-content:space-between; font-size:13.5px; font-weight:700; margin-bottom:8px;"><span class="vn" style="color:#FFFFFF;">Magnesium (lab-detected)</span><span class="vv" style="color:#7CB233;">109mg/100g</span></div><div class="bar-track" style="height:6px; background:rgba(255,255,255,0.12); border-radius:99px; overflow:hidden;"><div class="bar-fill" style="height:100%; background:linear-gradient(90deg,#7CB233,#F0B429); border-radius:99px; width:40%;"></div></div></div>
            <div class="vit-item" style="padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.1);"><div class="vit-top" style="display:flex; justify-content:space-between; font-size:13.5px; font-weight:700; margin-bottom:8px;"><span class="vn" style="color:#FFFFFF;">Potassium (lab-detected)</span><span class="vv" style="color:#7CB233;">308mg/100g</span></div><div class="bar-track" style="height:6px; background:rgba(255,255,255,0.12); border-radius:99px; overflow:hidden;"><div class="bar-fill" style="height:100%; background:linear-gradient(90deg,#7CB233,#F0B429); border-radius:99px; width:50%;"></div></div></div>
            <div class="vit-item" style="padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.1);"><div class="vit-top" style="display:flex; justify-content:space-between; font-size:13.5px; font-weight:700; margin-bottom:8px;"><span class="vn" style="color:#FFFFFF;">Sodium (lab-detected)</span><span class="vv" style="color:#7CB233;">449mg/100g</span></div><div class="bar-track" style="height:6px; background:rgba(255,255,255,0.12); border-radius:99px; overflow:hidden;"><div class="bar-fill" style="height:100%; background:linear-gradient(90deg,#7CB233,#F0B429); border-radius:99px; width:60%;"></div></div></div>
          </div>
          <div class="lab-credit" style="margin-top:22px; font-size:12.5px; color:rgba(250,246,234,0.5); line-height:1.5;">
            Iron & Zinc shown as fortification blueprint targets using gentle, high-absorption chelated forms. All other minerals are directly lab-detected per 100g of premix.
          </div>
        </div>

        <!-- Amino Acids Panel (Hidden by Default) -->
        <div id="npanel-aa" class="npanel" style="display:none;">
          <div class="aa-tags" style="display:flex; flex-wrap:wrap; gap:10px;">
            <span style="background:rgba(255,255,255,0.08); padding:10px 15px; border-radius:12px; font-size:13px; font-weight:700; color:#FAF6EA;"><b style="color:#F0B429; margin-right:6px;">10.2g</b>Glutamic acid</span>
            <span style="background:rgba(255,255,255,0.08); padding:10px 15px; border-radius:12px; font-size:13px; font-weight:700; color:#FAF6EA;"><b style="color:#F0B429; margin-right:6px;">5.5g</b>Aspartic acid</span>
            <span style="background:rgba(255,255,255,0.08); padding:10px 15px; border-radius:12px; font-size:13px; font-weight:700; color:#FAF6EA;"><b style="color:#F0B429; margin-right:6px;">2.8g</b>Lysine</span>
            <span style="background:rgba(255,255,255,0.08); padding:10px 15px; border-radius:12px; font-size:13px; font-weight:700; color:#FAF6EA;"><b style="color:#F0B429; margin-right:6px;">2.8g</b>Threonine</span>
            <span style="background:rgba(255,255,255,0.08); padding:10px 15px; border-radius:12px; font-size:13px; font-weight:700; color:#FAF6EA;"><b style="color:#F0B429; margin-right:6px;">2.4g</b>Arginine</span>
            <span style="background:rgba(255,255,255,0.08); padding:10px 15px; border-radius:12px; font-size:13px; font-weight:700; color:#FAF6EA;"><b style="color:#F0B429; margin-right:6px;">1.8g</b>Alanine</span>
            <span style="background:rgba(255,255,255,0.08); padding:10px 15px; border-radius:12px; font-size:13px; font-weight:700; color:#FAF6EA;"><b style="color:#F0B429; margin-right:6px;">1.4g</b>Histidine</span>
            <span style="background:rgba(255,255,255,0.08); padding:10px 15px; border-radius:12px; font-size:13px; font-weight:700; color:#FAF6EA;"><b style="color:#F0B429; margin-right:6px;">0.9g</b>Valine</span>
            <span style="background:rgba(255,255,255,0.08); padding:10px 15px; border-radius:12px; font-size:13px; font-weight:700; color:#FAF6EA;"><b style="color:#F0B429; margin-right:6px;">0.8g</b>Phenylalanine</span>
            <span style="background:rgba(255,255,255,0.08); padding:10px 15px; border-radius:12px; font-size:13px; font-weight:700; color:#FAF6EA;"><b style="color:#F0B429; margin-right:6px;">0.6g</b>Leucine</span>
            <span style="background:rgba(255,255,255,0.08); padding:10px 15px; border-radius:12px; font-size:13px; font-weight:700; color:#FAF6EA;"><b style="color:#F0B429; margin-right:6px;">0.6g</b>Isoleucine</span>
            <span style="background:rgba(255,255,255,0.08); padding:10px 15px; border-radius:12px; font-size:13px; font-weight:700; color:#FAF6EA;"><b style="color:#F0B429; margin-right:6px;">0.04g</b>Tryptophan</span>
          </div>
          <div class="lab-credit" style="margin-top:22px; font-size:12.5px; color:rgba(250,246,234,0.5); line-height:1.5;">
            All 20 amino acids (essential + non-essential) mapped per 100g via LCMSMS — figures shown per gram of base premix, ITC Labs report TR02FD-2606181716.
          </div>
        </div>

        <!-- Safety Panel (Hidden by Default) -->
        <div id="npanel-safe" class="npanel" style="display:none;">
          <div class="safety-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">
            <div class="safety-item" style="display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.06); padding:14px 16px; border-radius:12px; font-size:13.5px; font-weight:700;"><span class="tick" style="color:#7CB233; font-size:16px;">✓</span> Lead — below quantification</div>
            <div class="safety-item" style="display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.06); padding:14px 16px; border-radius:12px; font-size:13.5px; font-weight:700;"><span class="tick" style="color:#7CB233; font-size:16px;">✓</span> Arsenic — below quantification</div>
            <div class="safety-item" style="display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.06); padding:14px 16px; border-radius:12px; font-size:13.5px; font-weight:700;"><span class="tick" style="color:#7CB233; font-size:16px;">✓</span> Cadmium — below quantification</div>
            <div class="safety-item" style="display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.06); padding:14px 16px; border-radius:12px; font-size:13.5px; font-weight:700;"><span class="tick" style="color:#7CB233; font-size:16px;">✓</span> Mercury — below quantification</div>
            <div class="safety-item" style="display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.06); padding:14px 16px; border-radius:12px; font-size:13.5px; font-weight:700;"><span class="tick" style="color:#7CB233; font-size:16px;">✓</span> Peanut & soya allergen — not detected</div>
            <div class="safety-item" style="display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.06); padding:14px 16px; border-radius:12px; font-size:13.5px; font-weight:700;"><span class="tick" style="color:#7CB233; font-size:16px;">✓</span> Gluten & mustard allergen — not detected</div>
            <div class="safety-item" style="display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.06); padding:14px 16px; border-radius:12px; font-size:13.5px; font-weight:700;"><span class="tick" style="color:#7CB233; font-size:16px;">✓</span> Milk & sesame allergen — not detected</div>
            <div class="safety-item" style="display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.06); padding:14px 16px; border-radius:12px; font-size:13.5px; font-weight:700;"><span class="tick" style="color:#7CB233; font-size:16px;">✓</span> Water activity 0.63 — shelf-stable</div>
          </div>
          <div class="lab-credit" style="margin-top:22px; font-size:12.5px; color:rgba(250,246,234,0.5); line-height:1.5;">
            Sourced from independent NABL-accredited reports: ITC Labs (heavy metals & nutraceuticals) and Qualitek Labs (allergen panel), 2026.
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- Shop Section -->
<section id="shop" style="background:var(--cream-2); padding:96px 0;">
  <div class="wrap">
    <div class="sec-head center">
      <span class="sec-tag">DIRECT FROM FARMER COOPERATIVES</span>
      <h2>Claim Your Founding Batch Supply</h2>
      <p>Lock in early-bird pricing permanently on your inaugural subscription or one-time purchase.</p>
    </div>

    <div class="shop-grid">
      <?php foreach ($products as $p): ?>
        <div class="prod-card <?php echo $p['badge'] === 'MOST POPULAR' ? 'best' : ''; ?>">
          <?php if ($p['badge']): ?>
            <div class="prod-ribbon"><?php echo $p['badge']; ?></div>
          <?php endif; ?>
          <div class="prod-img">
            <img src="<?php echo $p['image']; ?>" alt="<?php echo sanitize($p['name']); ?>" />
          </div>
          <div class="prod-body">
            <h4><?php echo sanitize($p['name']); ?></h4>
            <div class="sub"><?php echo sanitize($p['subtitle']); ?></div>
            <div class="prod-price-row">
              <span class="prod-price"><?php echo formatPrice($p['price']); ?></span>
              <span class="prod-was"><?php echo formatPrice($p['mrp']); ?></span>
            </div>
            <div class="prod-meta">Contains <?php echo $p['servings']; ?> Servings (<?php echo formatPrice($p['price'] / $p['servings']); ?> / serving)</div>
            <div class="qty-add">
              <button class="add-btn" onclick="addToCart('<?php echo $p['id']; ?>', '<?php echo addslashes($p['name']); ?>', <?php echo $p['price']; ?>, '<?php echo $p['image']; ?>')">
                🛒 Add To Cart
              </button>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- FAQ Section -->
<section id="faq" class="wrap">
  <div class="sec-head center">
    <span class="sec-tag">FREQUENTLY ASKED QUESTIONS</span>
    <h2>Everything You Need To Know</h2>
  </div>

  <div style="max-width:760px; margin:0 auto;">
    <div class="faq-item">
      <div class="faq-q">
        <span>What ingredients are inside Nutrexia?</span>
        <span class="plus">+</span>
      </div>
      <div class="faq-a">
        <p>Nutrexia combines sprouted rainfed millets (Ragi, Bajra, Jowar), yellow pea protein isolate, gut-healthy chicory root fiber, cardamom, and natural stevia leaf extracts.</p>
      </div>
    </div>

    <div class="faq-item">
      <div class="faq-q">
        <span>Is Nutrexia safe for diabetics?</span>
        <span class="plus">+</span>
      </div>
      <div class="faq-a">
        <p>Yes. Nutrexia contains 0g added refined sugar and relies on low-glycemic complex carbohydrates that release glucose gradually.</p>
      </div>
    </div>

    <div class="faq-item">
      <div class="faq-q">
        <span>How do I prepare Nutrexia?</span>
        <span class="plus">+</span>
      </div>
      <div class="faq-a">
        <p>Mix 2 scoops (35g) with 250ml of cold or warm milk, water, or plant-based milk. Shake or stir for 15 seconds and enjoy!</p>
      </div>
    </div>
  </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

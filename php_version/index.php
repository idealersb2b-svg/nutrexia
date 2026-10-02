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
        'image' => 'https://via.placeholder.com/200x200/3F7A1F/FFFFFF?text=Founding+Pouch',
        'badge' => 'MOST POPULAR'
    ],
    [
        'id' => 'v-duo-2',
        'name' => 'Nutrexia Duo Bundle (2 Pack)',
        'subtitle' => '60 Servings · Extra 15% Off',
        'price' => 1449.00,
        'mrp' => 2398.00,
        'servings' => 60,
        'image' => 'https://via.placeholder.com/200x200/2C5715/FFFFFF?text=Duo+Pack',
        'badge' => 'BEST VALUE'
    ],
    [
        'id' => 'v-family-3',
        'name' => 'Nutrexia Family Stack (4 Pack)',
        'subtitle' => '120 Servings · Free Shipping',
        'price' => 2699.00,
        'mrp' => 4796.00,
        'servings' => 120,
        'image' => 'https://via.placeholder.com/200x200/F0B429/181712?text=Family+Stack',
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
          <img src="https://via.placeholder.com/340x420/3F7A1F/FFFFFF?text=NUTREXIA+POUCH" alt="Nutrexia Superfood Pouch" />
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

<!-- Lab Verification & Nutrition Section (Matching Uploaded Image) -->
<section id="nutrition" class="wrap" style="padding:96px 0;">
  <div class="sec-head">
    <span class="sec-tag">The receipts</span>
    <h2>Independently lab-verified, not self-declared.</h2>
    <p>Every number below comes from NABL-accredited testing (ITC Labs / Qualitek Labs) on our millet-plant-protein premix, or from our published fortification blueprint built on ICMR-NIN RDA 2020 guidance.</p>
  </div>

  <div class="nutri">
    <div class="nutri-grid">
      <!-- Left: Per 30g serving -->
      <div class="nutri-left">
        <h3>Per 30g serving</h3>
        <p>Rich Chocolate premix, mixed with 200–250ml cold water or plant milk.</p>
        <div class="macro-row"><span class="m-name">Plant protein</span><span class="m-val">24.9 g</span></div>
        <div class="macro-row"><span class="m-name">Carbohydrates</span><span class="m-val">6.4 g</span></div>
        <div class="macro-row"><span class="m-name">Fats</span><span class="m-val">3.1 g</span></div>
        <div class="macro-row"><span class="m-name">Dietary fibre</span><span class="m-val">2.5 g</span></div>
        <div class="macro-row"><span class="m-name">Energy</span><span class="m-val">~145 kcal</span></div>
        <div class="macro-row"><span class="m-name">Added sugar</span><span class="m-val">0 g</span></div>
        <div class="serving-note">Macro figures reflect our front-of-pack declaration for the Rich Chocolate SKU; fibre and energy are scaled from NABL lab analysis (ITC Labs report TR02FD-2606181716) of the base millet-protein premix per 100g.</div>
      </div>

      <!-- Right: Interactive Tabs -->
      <div>
        <div class="nutri-tabs">
          <button id="ntab-vit" class="ntab active" onclick="switchNutriTab('vit')">Vitamins</button>
          <button id="ntab-min" class="ntab" onclick="switchNutriTab('min')">Minerals</button>
          <button id="ntab-aa" class="ntab" onclick="switchNutriTab('aa')">Amino acids</button>
          <button id="ntab-safe" class="ntab" onclick="switchNutriTab('safe')">Safety panel</button>
        </div>

        <!-- Vitamins Panel -->
        <div id="npanel-vit" class="npanel active">
          <div class="vit-grid">
            <div class="vit-item"><div class="vit-top"><span class="vn">Vitamin B12 (Methylcobalamin)</span><span class="vv">40% RDA</span></div><div class="bar-track"><div class="bar-fill" style="width: 40%;"></div></div></div>
            <div class="vit-item"><div class="vit-top"><span class="vn">Vitamin D3 (Cholecalciferol)</span><span class="vv">50% RDA</span></div><div class="bar-track"><div class="bar-fill" style="width: 50%;"></div></div></div>
            <div class="vit-item"><div class="vit-top"><span class="vn">Vitamin C (lab-detected)</span><span class="vv">16.7mg/100g</span></div><div class="bar-track"><div class="bar-fill" style="width: 65%;"></div></div></div>
            <div class="vit-item"><div class="vit-top"><span class="vn">Vitamin E (lab-detected)</span><span class="vv">0.66mg/100g</span></div><div class="bar-track"><div class="bar-fill" style="width: 20%;"></div></div></div>
            <div class="vit-item"><div class="vit-top"><span class="vn">Niacin — B3 (lab-detected)</span><span class="vv">5.5mg/100g</span></div><div class="bar-track"><div class="bar-fill" style="width: 55%;"></div></div></div>
            <div class="vit-item"><div class="vit-top"><span class="vn">Pantothenic acid — B5</span><span class="vv">265µg/100g</span></div><div class="bar-track"><div class="bar-fill" style="width: 45%;"></div></div></div>
          </div>
          <div class="lab-credit">B12 & D3 shown as our fortification blueprint target (ICMR-NIN RDA 2020 reference). C, E, B3 & B5 are directly lab-detected values from the base premix, ITC Labs report.</div>
        </div>

        <!-- Minerals Panel -->
        <div id="npanel-min" class="npanel">
          <div class="vit-grid">
            <div class="vit-item"><div class="vit-top"><span class="vn">Iron (chelated bisglycinate)</span><span class="vv">25% RDA</span></div><div class="bar-track"><div class="bar-fill" style="width: 25%;"></div></div></div>
            <div class="vit-item"><div class="vit-top"><span class="vn">Zinc (bisglycinate)</span><span class="vv">20% RDA</span></div><div class="bar-track"><div class="bar-fill" style="width: 20%;"></div></div></div>
            <div class="vit-item"><div class="vit-top"><span class="vn">Calcium (lab-detected)</span><span class="vv">147mg/100g</span></div><div class="bar-track"><div class="bar-fill" style="width: 35%;"></div></div></div>
            <div class="vit-item"><div class="vit-top"><span class="vn">Magnesium (lab-detected)</span><span class="vv">109mg/100g</span></div><div class="bar-track"><div class="bar-fill" style="width: 40%;"></div></div></div>
            <div class="vit-item"><div class="vit-top"><span class="vn">Potassium (lab-detected)</span><span class="vv">308mg/100g</span></div><div class="bar-track"><div class="bar-fill" style="width: 50%;"></div></div></div>
            <div class="vit-item"><div class="vit-top"><span class="vn">Sodium (lab-detected)</span><span class="vv">449mg/100g</span></div><div class="bar-track"><div class="bar-fill" style="width: 60%;"></div></div></div>
          </div>
          <div class="lab-credit">Iron & Zinc shown as fortification blueprint targets using gentle, high-absorption chelated forms. All other minerals are directly lab-detected per 100g of premix.</div>
        </div>

        <!-- Amino Acids Panel -->
        <div id="npanel-aa" class="npanel">
          <div class="aa-tags">
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
          <div class="lab-credit">All 20 amino acids (essential + non-essential) mapped per 100g via LCMSMS — figures shown per gram of base premix, ITC Labs report TR02FD-2606181716.</div>
        </div>

        <!-- Safety Panel -->
        <div id="npanel-safe" class="npanel">
          <div class="safety-grid">
            <div class="safety-item"><span class="tick">✓</span> Lead — below quantification</div>
            <div class="safety-item"><span class="tick">✓</span> Arsenic — below quantification</div>
            <div class="safety-item"><span class="tick">✓</span> Cadmium — below quantification</div>
            <div class="safety-item"><span class="tick">✓</span> Mercury — below quantification</div>
            <div class="safety-item"><span class="tick">✓</span> Peanut & soya allergen — not detected</div>
            <div class="safety-item"><span class="tick">✓</span> Gluten & mustard allergen — not detected</div>
            <div class="safety-item"><span class="tick">✓</span> Milk & sesame allergen — not detected</div>
            <div class="safety-item"><span class="tick">✓</span> Water activity 0.63 — shelf-stable</div>
          </div>
          <div class="lab-credit">Sourced from independent NABL-accredited reports: ITC Labs (heavy metals & nutraceuticals) and Qualitek Labs (allergen panel), 2026.</div>
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

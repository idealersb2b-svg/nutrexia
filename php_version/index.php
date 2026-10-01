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

<!-- Shop Section -->
<section id="shop" style="background:var(--cream-2); padding:80px 0;">
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
                Add To Cart
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

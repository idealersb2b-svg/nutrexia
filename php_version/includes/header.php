<?php
require_once __DIR__ . '/functions.php';
$user = getCurrentUser();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo isset($pageTitle) ? sanitize($pageTitle) . ' | Nutrexia' : 'Nutrexia — Bio-Optimized Climate-Smart Nutrition'; ?></title>
  <meta name="description" content="Nutrexia delivers climate-smart, bio-optimized superfood breakfast formulations enriched with rainfed millets and plant proteins.">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">

  <!-- Main Stylesheet -->
  <link rel="stylesheet" href="/assets/css/style.css">
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</head>
<body>

  <!-- Top Announcement Ticker -->
  <div class="ticker">
    <div class="ticker-track">
      <span>🔥 Founding Batch pricing ends soon — <b>lock it forever</b></span>
      <span>🌾 Rainfed millets, farmer-cooperative sourced</span>
      <span>🧪 Every batch lab-verified by <b>NABL-accredited ITC Labs</b></span>
      <span>🌍 Every pouch offsets a slice of your breakfast carbon footprint</span>
      <span>👩‍👧 Zero added sugar · Non-diabetic friendly</span>
      <span>🔥 Founding Batch pricing ends soon — <b>lock it forever</b></span>
      <span>🌾 Rainfed millets, farmer-cooperative sourced</span>
      <span>🧪 Every batch lab-verified by <b>NABL-accredited ITC Labs</b></span>
    </div>
  </div>

  <!-- Header Navigation Bar -->
  <header>
    <nav>
      <a href="/" class="brand">
        <img src="/assets/images/logo.png" alt="Nutrexia Logo" style="height: 42px; width: auto; display: block; object-fit: contain;" />
      </a>
      <div class="navlinks">
        <a href="/#audience">Who it's for</a>
        <a href="/#nutrition">Nutrition</a>
        <a href="/#shop">Shop</a>
        <a href="/#story">Our story</a>
        <a href="/#faq">FAQ</a>
        <a href="/contact.php">Contact</a>
      </div>
      <div class="nav-right">
        <?php if ($user): ?>
          <a href="/account.php" style="display:flex; align-items:center; justify-center:center; width:38px; height:38px; border-radius:50%; background:var(--cream-2); color:var(--char); text-decoration:none; font-weight:700; font-size:14px; text-align:center; line-height:38px;">
            <?php echo strtoupper(substr($user['first_name'], 0, 1)); ?>
          </a>
        <?php else: ?>
          <a href="/login.php" style="display:flex; align-items:center; justify-content:center; width:38px; height:38px; border-radius:50%; background:var(--cream-2); color:var(--char); text-decoration:none;" title="Login">
            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="width:20px; height:20px;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </a>
        <?php endif; ?>

        <button className="cart-btn" onclick="openCartDrawer()" class="cart-btn">
          🛒 Cart <span id="cartCountBadge" class="cart-count">0</span>
        </button>
        <div class="burger" onclick="toggleMobileMenu()">☰</div>
      </div>
    </nav>
  </header>

  <!-- Mobile Navigation Menu -->
  <div id="mobileOverlay" class="mobile-menu-overlay" onclick="toggleMobileMenu()"></div>
  <div id="mobileMenu" class="mobile-menu">
    <div class="mobile-menu-close" onclick="toggleMobileMenu()">✕</div>
    <a href="/#audience" onclick="toggleMobileMenu()">Who it's for</a>
    <a href="/#nutrition" onclick="toggleMobileMenu()">Nutrition</a>
    <a href="/#shop" onclick="toggleMobileMenu()">Shop</a>
    <a href="/#story" onclick="toggleMobileMenu()">Our story</a>
    <a href="/#faq" onclick="toggleMobileMenu()">FAQ</a>
    <a href="/contact.php" onclick="toggleMobileMenu()">Contact</a>
    <?php if ($user): ?>
      <a href="/account.php" style="color:var(--gold);">My Account (<?php echo sanitize($user['first_name']); ?>)</a>
    <?php else: ?>
      <a href="/login.php" style="color:var(--gold);">Login / Register</a>
    <?php endif; ?>
  </div>

  <!-- Cart Drawer -->
  <div id="cartOverlay" class="overlay" onclick="closeCartDrawer()"></div>
  <div id="cartDrawer" class="drawer">
    <div class="drawer-head">
      <h4>Your Shopping Cart</h4>
      <div class="drawer-close" onclick="closeCartDrawer()">✕</div>
    </div>
    <div id="cartDrawerItems" class="drawer-items">
      <div class="drawer-empty">Your cart is currently empty.</div>
    </div>
    <div class="drawer-foot">
      <div class="drawer-sub">
        <span>Subtotal</span>
        <span id="cartSubtotalAmount">₹0.00</span>
      </div>
      <a href="/checkout.php" class="checkout-btn">Proceed to Checkout →</a>
      <div class="founding-note">🔒 Secure 256-bit Razorpay Checkout</div>
    </div>
  </div>

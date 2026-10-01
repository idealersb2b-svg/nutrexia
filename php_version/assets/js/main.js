/**
 * Nutrexia Client-side Cart & UI Manager
 */

let cart = JSON.parse(localStorage.getItem('nutrexia_cart') || '[]');

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  initFAQ();
});

// Cart Functions
function saveCart() {
  localStorage.setItem('nutrexia_cart', JSON.stringify(cart));
  renderCart();
}

function addToCart(variantId, name, price, image) {
  const existing = cart.find(item => item.variantId === variantId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ variantId, name, price: parseFloat(price), image, quantity: 1 });
  }
  saveCart();
  showToast(`Added ${name} to cart!`);
  openCartDrawer();
}

function updateQuantity(variantId, delta) {
  const item = cart.find(i => i.variantId === variantId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.variantId !== variantId);
  }
  saveCart();
}

function removeFromCart(variantId) {
  cart = cart.filter(i => i.variantId !== variantId);
  saveCart();
}

function renderCart() {
  const countBadge = document.getElementById('cartCountBadge');
  const itemsContainer = document.getElementById('cartDrawerItems');
  const subtotalElem = document.getElementById('cartSubtotalAmount');

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (countBadge) countBadge.textContent = totalItems;
  if (subtotalElem) subtotalElem.textContent = '₹' + subtotal.toFixed(2);

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = '<div class="drawer-empty">Your cart is currently empty.</div>';
    return;
  }

  itemsContainer.innerHTML = cart.map(item => `
    <div class="d-item">
      <img src="${item.image || 'https://via.placeholder.com/48'}" alt="${item.name}">
      <div>
        <div class="di-name">${item.name}</div>
        <div class="di-meta">Qty: ${item.quantity} × ₹${item.price}</div>
        <div class="di-remove" onclick="removeFromCart('${item.variantId}')">Remove</div>
      </div>
      <div class="di-price">₹${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  `).join('');
}

// Drawer Controls
function openCartDrawer() {
  document.getElementById('cartOverlay')?.classList.add('show');
  document.getElementById('cartDrawer')?.classList.add('show');
}

function closeCartDrawer() {
  document.getElementById('cartOverlay')?.classList.remove('show');
  document.getElementById('cartDrawer')?.classList.remove('show');
}

function toggleMobileMenu() {
  document.getElementById('mobileOverlay')?.classList.toggle('show');
  document.getElementById('mobileMenu')?.classList.toggle('show');
}

// Toast
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// FAQ Accordion
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const parent = q.parentElement;
      parent.classList.toggle('open');
    });
  });
}

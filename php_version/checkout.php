<?php
$pageTitle = "Checkout & Razorpay Payment";
require_once __DIR__ . '/includes/header.php';
?>

<div class="wrap" style="padding: 60px 28px; max-width: 900px;">
  <div style="background: var(--white); border: 1px solid var(--line); border-radius: 22px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
    <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 24px;">Shipping & Order Checkout</h2>
    
    <div id="checkoutError" style="display:none; padding:14px; background:#fce8e8; color:#b04a4a; border-radius:10px; margin-bottom:20px; font-weight:600; font-size:14px;"></div>

    <form id="checkoutForm" onsubmit="handleCheckout(event)">
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:18px; margin-bottom:18px;">
        <div>
          <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">Full Name *</label>
          <input type="text" id="fullName" required placeholder="John Doe" style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid var(--line); font-size:14.5px;">
        </div>
        <div>
          <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">Email Address *</label>
          <input type="email" id="email" required placeholder="john@example.com" style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid var(--line); font-size:14.5px;">
        </div>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:18px; margin-bottom:18px;">
        <div>
          <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">Phone Number *</label>
          <input type="tel" id="phone" required placeholder="+91 9876543210" style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid var(--line); font-size:14.5px;">
        </div>
        <div>
          <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">Pincode *</label>
          <input type="text" id="pincode" required placeholder="560001" style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid var(--line); font-size:14.5px;">
        </div>
      </div>

      <div style="margin-bottom:18px;">
        <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">Street Address *</label>
        <input type="text" id="addressLine1" required placeholder="House No, Building, Street Name" style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid var(--line); font-size:14.5px;">
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:18px; margin-bottom:24px;">
        <div>
          <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">City *</label>
          <input type="text" id="city" required placeholder="Bengaluru" style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid var(--line); font-size:14.5px;">
        </div>
        <div>
          <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">State *</label>
          <input type="text" id="state" required placeholder="Karnataka" style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid var(--line); font-size:14.5px;">
        </div>
      </div>

      <button type="submit" id="payBtn" style="width:100%; background:var(--gold); color:var(--char); padding:16px; border-radius:12px; font-weight:800; font-size:16px;">
        Proceed to Razorpay Payment →
      </button>
    </form>
  </div>
</div>

<script>
async function handleCheckout(e) {
  e.preventDefault();
  const errorDiv = document.getElementById('checkoutError');
  const payBtn = document.getElementById('payBtn');
  errorDiv.style.display = 'none';

  if (!cart || cart.length === 0) {
    errorDiv.textContent = 'Your cart is empty. Please add products to checkout.';
    errorDiv.style.display = 'block';
    return;
  }

  payBtn.disabled = true;
  payBtn.textContent = 'Creating Order...';

  const payload = {
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    addressLine1: document.getElementById('addressLine1').value,
    city: document.getElementById('city').value,
    state: document.getElementById('state').value,
    pincode: document.getElementById('pincode').value,
    items: cart
  };

  try {
    const res = await fetch('/api/checkout.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error || 'Failed to initialize payment');
    }

    // Launch Razorpay Payment Gateway Modal
    const options = {
      key: data.razorpayKeyId,
      amount: data.amount,
      currency: data.currency,
      name: "Nutrexia",
      description: "Superfood Order #" + data.orderNumber,
      order_id: data.razorpayOrderId,
      handler: function (response) {
        localStorage.removeItem('nutrexia_cart');
        alert("Payment Successful! Order Number: " + data.orderNumber);
        window.location.href = "/account.php";
      },
      prefill: {
        name: payload.fullName,
        email: payload.email,
        contact: payload.phone
      },
      theme: { color: "#3F7A1F" }
    };

    const rzp = new Razorpay(options);
    rzp.open();

  } catch (err) {
    errorDiv.textContent = err.message;
    errorDiv.style.display = 'block';
  } finally {
    payBtn.disabled = false;
    payBtn.textContent = 'Proceed to Razorpay Payment →';
  }
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

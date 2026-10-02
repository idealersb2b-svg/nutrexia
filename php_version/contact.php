<?php
$pageTitle = "Contact Us & Location";
require_once __DIR__ . '/includes/header.php';
?>

<!-- Contact Hero Section -->
<section style="background: linear-gradient(180deg, var(--cream) 0%, var(--cream-2) 100%); padding: 64px 0 40px;">
  <div class="wrap">
    <div class="sec-head center" style="margin-bottom: 24px;">
      <span class="sec-tag">GET IN TOUCH</span>
      <h2>We'd Love To Hear From You</h2>
      <p>Have questions about Nutrexia products, founding batch orders, or farmer cooperatives? Our team is here to help.</p>
    </div>
  </div>
</section>

<!-- Contact Form & Company Details Section -->
<section class="wrap" style="padding: 64px 0 96px;">
  <div class="contact-grid">
    
    <!-- Left Column: Company Info & Static Location Map -->
    <div>
      <div class="contact-card" style="margin-bottom: 24px;">
        <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 24px;">Company Information</h3>

        <div class="contact-item">
          <div class="c-icon">📍</div>
          <div>
            <h5>Headquarters Address</h5>
            <p>HB Colony, Bhimatangi, Phase-1, Bhubaneswar, Near Airport, Odisha-751002</p>
          </div>
        </div>

        <div class="contact-item">
          <div class="c-icon">📧</div>
          <div>
            <h5>Email Support</h5>
            <p><a href="mailto:support@nutrexia.in" style="color:var(--pea-deep); font-weight:700;">support@nutrexia.in</a></p>
          </div>
        </div>

        <div class="contact-item" style="margin-bottom: 0;">
          <div class="c-icon">📞</div>
          <div>
            <h5>Phone Helpline</h5>
            <p>+91 (800) 555-NUTR</p>
          </div>
        </div>
      </div>

      <!-- Static Map Embed -->
      <div class="contact-card" style="padding: 20px;">
        <h4 style="font-size: 16px; font-weight: 700; margin-bottom: 12px; display:flex; align-items:center; gap:8px;">
          📍 Location Pin: HB Colony, Bhimatangi, Bhubaneswar
        </h4>
        <iframe 
          class="map-frame"
          src="https://maps.google.com/maps?q=HB%20Colony,%20Bhimatangi,%20Bhubaneswar,%20Odisha&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>

    <!-- Right Column: Contact Inquiry Form -->
    <div class="contact-card">
      <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">Send Us A Message</h3>
      <p style="color:var(--char-soft); font-size:14.5px; margin-bottom: 28px;">Fill out the form below and we will get back to you within 24 hours.</p>

      <div id="contactAlert" style="display:none; padding:14px 18px; border-radius:12px; margin-bottom:24px; font-weight:600; font-size:14px;"></div>

      <form id="contactForm" onsubmit="handleContactSubmit(event)">
        <div style="margin-bottom: 18px;">
          <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">Full Name *</label>
          <input type="text" id="contactName" required placeholder="John Doe" style="width:100%; padding:14px 18px; border-radius:12px; border:1px solid var(--line); font-size:14.5px;">
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:18px;">
          <div>
            <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">Email Address *</label>
            <input type="email" id="contactEmail" required placeholder="john@example.com" style="width:100%; padding:14px 18px; border-radius:12px; border:1px solid var(--line); font-size:14.5px;">
          </div>
          <div>
            <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">Phone Number</label>
            <input type="tel" id="contactPhone" placeholder="+91 9876543210" style="width:100%; padding:14px 18px; border-radius:12px; border:1px solid var(--line); font-size:14.5px;">
          </div>
        </div>

        <div style="margin-bottom: 24px;">
          <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">Message *</label>
          <textarea id="contactMessage" required rows="5" placeholder="How can we help you?" style="width:100%; padding:14px 18px; border-radius:12px; border:1px solid var(--line); font-size:14.5px; font-family:inherit; resize:vertical;"></textarea>
        </div>

        <button type="submit" id="contactBtn" class="add-btn" style="width:100%; padding:16px; font-size:15.5px;">
          Send Message →
        </button>
      </form>
    </div>

  </div>
</section>

<script>
async function handleContactSubmit(e) {
  e.preventDefault();
  const alertBox = document.getElementById('contactAlert');
  const btn = document.getElementById('contactBtn');
  alertBox.style.display = 'none';
  btn.disabled = true;
  btn.textContent = 'Sending Message...';

  try {
    const res = await fetch('/api/contact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        message: document.getElementById('contactMessage').value
      })
    });

    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || 'Failed to submit contact message');

    alertBox.style.background = '#e8f5e9';
    alertBox.style.color = '#2e7d32';
    alertBox.textContent = data.message;
    alertBox.style.display = 'block';
    document.getElementById('contactForm').reset();
  } catch (err) {
    alertBox.style.background = '#fce8e8';
    alertBox.style.color = '#b04a4a';
    alertBox.textContent = err.message;
    alertBox.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send Message →';
  }
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

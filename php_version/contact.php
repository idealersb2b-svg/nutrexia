<?php
$pageTitle = "Contact Us & Location";
require_once __DIR__ . '/includes/header.php';
?>

<!-- Contact Hero Header -->
<section style="background: linear-gradient(180deg, var(--cream) 0%, var(--cream-2) 100%); padding: 72px 0 48px; text-align: center;">
  <div class="wrap">
    <div style="max-width: 680px; margin: 0 auto;">
      <div style="display: inline-flex; align-items: center; gap: 8px; background: var(--char); color: var(--gold); font-weight: 700; font-size: 12px; padding: 6px 14px; border-radius: 999px; margin-bottom: 18px; text-transform: uppercase; letter-spacing: 0.08em;">
        📍 HUB & HEADQUARTERS
      </div>
      <h1 style="font-size: clamp(32px, 4vw, 52px); font-weight: 700; color: var(--char); margin-bottom: 16px; line-height: 1.1;">We'd Love To Hear From You</h1>
      <p style="font-size: 17px; color: var(--char-soft); line-height: 1.6; font-weight: 500;">Have questions about Nutrexia superfoods, founding batch orders, or farmer cooperatives? Our team is here to assist you 24/7.</p>
    </div>
  </div>
</section>

<!-- Contact Form & Info Grid Section -->
<section class="wrap" style="padding: 64px 28px 96px;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 36px; align-items: start;">
    
    <!-- Left Column: Company Details & Interactive Location Map -->
    <div style="display: flex; flex-direction: column; gap: 28px;">
      
      <!-- Company Information Card -->
      <div style="background: #FFFFFF; border: 1px solid var(--line); border-radius: 24px; padding: 36px; box-shadow: 0 16px 40px rgba(0,0,0,0.05);">
        <h3 style="font-size: 22px; font-weight: 700; color: var(--char); margin-bottom: 24px; border-bottom: 2px solid var(--cream-2); padding-bottom: 12px;">Company Details</h3>

        <!-- Address Item -->
        <div style="display: flex; gap: 16px; margin-bottom: 22px; align-items: flex-start;">
          <div style="width: 46px; height: 46px; border-radius: 14px; background: var(--cream-2); color: var(--pea-deep); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
            📍
          </div>
          <div>
            <h5 style="font-size: 15px; font-weight: 700; color: var(--char); margin-bottom: 4px;">Headquarters Address</h5>
            <p style="font-size: 14px; color: var(--char-soft); line-height: 1.55; margin: 0;">
              HB Colony, Bhimatangi, Phase-1, Bhubaneswar, Near Airport, Odisha-751002
            </p>
          </div>
        </div>

        <!-- Email Item -->
        <div style="display: flex; gap: 16px; align-items: flex-start;">
          <div style="width: 46px; height: 46px; border-radius: 14px; background: var(--cream-2); color: var(--pea-deep); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
            📧
          </div>
          <div>
            <h5 style="font-size: 15px; font-weight: 700; color: var(--char); margin-bottom: 4px;">Email Support</h5>
            <p style="font-size: 14px; color: var(--char-soft); margin: 0;">
              <a href="mailto:support@nutrexia.in" style="color: var(--pea-deep); font-weight: 700; text-decoration: underline;">support@nutrexia.in</a>
            </p>
          </div>
        </div>
      </div>

      <!-- Static Location Map Card -->
      <div style="background: #FFFFFF; border: 1px solid var(--line); border-radius: 24px; padding: 24px; box-shadow: 0 16px 40px rgba(0,0,0,0.05);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
          <div>
            <h4 style="font-size: 16px; font-weight: 700; color: var(--char); margin: 0;">Location Map</h4>
            <p style="font-size: 12.5px; color: var(--char-soft); margin-top: 2px;">HB Colony, Bhimatangi, Bhubaneswar, Odisha</p>
          </div>
          <span style="background: var(--pea-bright); color: white; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 999px;">NEAR AIRPORT</span>
        </div>

        <iframe 
          src="https://maps.google.com/maps?q=HB%20Colony,%20Bhimatangi,%20Bhubaneswar,%20Odisha&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          style="width: 100%; height: 280px; border-radius: 16px; border: 1px solid var(--line); box-shadow: 0 6px 18px rgba(0,0,0,0.06);"
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>

    </div>

    <!-- Right Column: Premium Contact Inquiry Form Card -->
    <div style="background: #FFFFFF; border: 1px solid var(--line); border-radius: 24px; padding: 40px; box-shadow: 0 16px 40px rgba(0,0,0,0.05);">
      <h3 style="font-size: 24px; font-weight: 700; color: var(--char); margin-bottom: 6px;">Send Us A Message</h3>
      <p style="color: var(--char-soft); font-size: 14.5px; margin-bottom: 28px;">Fill out the details below and our team will get back to you within 24 hours.</p>

      <div id="contactAlert" style="display:none; padding:14px 18px; border-radius:12px; margin-bottom:24px; font-weight:600; font-size:14px;"></div>

      <form id="contactForm" onsubmit="handleContactSubmit(event)">
        <!-- Full Name -->
        <div style="margin-bottom: 20px;">
          <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:8px; color:var(--char);">Full Name *</label>
          <input type="text" id="contactName" required placeholder="John Doe" style="width:100%; padding:14px 18px; border-radius:12px; border:1.5px solid var(--line); font-size:14.5px; outline:none; transition:border-color 0.2s;">
        </div>

        <!-- Email & Phone Grid -->
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:16px; margin-bottom:20px;">
          <div>
            <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:8px; color:var(--char);">Email Address *</label>
            <input type="email" id="contactEmail" required placeholder="john@gmail.com" style="width:100%; padding:14px 18px; border-radius:12px; border:1.5px solid var(--line); font-size:14.5px; outline:none; transition:border-color 0.2s;">
          </div>
          <div>
            <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:8px; color:var(--char);">Phone Number * (10-Digit Mobile)</label>
            <input type="tel" id="contactPhone" required placeholder="9876543210" maxlength="14" style="width:100%; padding:14px 18px; border-radius:12px; border:1.5px solid var(--line); font-size:14.5px; outline:none; transition:border-color 0.2s;">
          </div>
        </div>

        <!-- Subject Select -->
        <div style="margin-bottom: 20px;">
          <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:8px; color:var(--char);">Inquiry Subject</label>
          <select id="contactSubject" style="width:100%; padding:14px 18px; border-radius:12px; border:1.5px solid var(--line); font-size:14.5px; outline:none; background:white; font-weight:600; color:var(--char);">
            <option value="General Inquiry">General Product Inquiry</option>
            <option value="Order Status">Order Status / Delivery</option>
            <option value="Wholesale Bulk">Wholesale / Bulk Orders</option>
            <option value="Partnerships">Press & Partnerships</option>
          </select>
        </div>

        <!-- Message Textarea -->
        <div style="margin-bottom: 28px;">
          <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:8px; color:var(--char);">Your Message *</label>
          <textarea id="contactMessage" required rows="5" placeholder="How can we help you today?" style="width:100%; padding:14px 18px; border-radius:12px; border:1.5px solid var(--line); font-size:14.5px; font-family:inherit; resize:vertical; outline:none; transition:border-color 0.2s;"></textarea>
        </div>

        <!-- Submit Button -->
        <button type="submit" id="contactBtn" style="width:100%; background:var(--char); color:var(--cream); padding:16px; border-radius:14px; font-weight:800; font-size:15.5px; border:none; cursor:pointer; box-shadow:0 8px 24px rgba(24,23,18,0.2); transition:transform 0.2s, background 0.2s;">
          Send Message →
        </button>
      </form>
    </div>

  </div>
</section>

<script>
// Known disposable / temporary mail services list for instant client-side check
const DISPOSABLE_DOMAINS = [
  'tmail.io', 'tmail.com', 'tmailor.com', 'tmail.ws', 'tmail.link', 'tmpmail.org', 'tmpmail.net',
  'tempmail.com', 'temp-mail.org', 'mailinator.com', '10minutemail.com', 'guerrillamail.com',
  'guerrillamail.net', 'guerrillamail.org', 'guerrillamailblock.com', 'dispostable.com', 'trashmail.com',
  'yopmail.com', 'sharklasers.com', 'throwawaymail.com', 'getnada.com', 'binkmail.com', 'maildrop.cc',
  'fakeinbox.com', 'tempinbox.com', 'generator.email', 'burnermail.io', 'mytemp.email', 'crazymailing.com',
  'inboxalias.com', 'mohmal.com', 'disposablemail.com', 'mailnesia.com', 'mailcatch.com', 'spamgourmet.com',
  'disposable.com', 'fake.com', 'test.com', 'example.com'
];

async function handleContactSubmit(e) {
  e.preventDefault();
  const alertBox = document.getElementById('contactAlert');
  const btn = document.getElementById('contactBtn');

  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const phone = document.getElementById('contactPhone').value.trim();
  const subject = document.getElementById('contactSubject').value;
  const message = document.getElementById('contactMessage').value.trim();

  alertBox.style.display = 'none';

  // 1. Mandatory Field Check
  if (!name || !email || !phone || !message) {
    alertBox.style.background = '#fce8e8';
    alertBox.style.color = '#b04a4a';
    alertBox.textContent = 'All fields including Full Name, Email, Phone Number, and Message are required.';
    alertBox.style.display = 'block';
    return;
  }

  // 2. Email Validation (Format + Spam/Disposable domain check)
  const emailDomain = email.split('@')[1]?.toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email) || !emailDomain) {
    alertBox.style.background = '#fce8e8';
    alertBox.style.color = '#b04a4a';
    alertBox.textContent = 'Please enter a valid email address (e.g., name@gmail.com).';
    alertBox.style.display = 'block';
    return;
  }

  if (DISPOSABLE_DOMAINS.includes(emailDomain)) {
    alertBox.style.background = '#fce8e8';
    alertBox.style.color = '#b04a4a';
    alertBox.textContent = 'Temporary/disposable emails are not allowed. Please use a legitimate email provider (Gmail, Yahoo, Outlook, work email, etc.).';
    alertBox.style.display = 'block';
    return;
  }

  // 3. Indian Phone Number Validation (10 digits starting 6-9)
  let cleanPhone = phone.replace(/[^\d]/g, '');
  if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) {
    cleanPhone = cleanPhone.substring(2);
  } else if (cleanPhone.length === 11 && cleanPhone.startsWith('0')) {
    cleanPhone = cleanPhone.substring(1);
  }

  const indianPhoneRegex = /^[6-9]\d{9}$/;
  if (!indianPhoneRegex.test(cleanPhone)) {
    alertBox.style.background = '#fce8e8';
    alertBox.style.color = '#b04a4a';
    alertBox.textContent = 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9 (e.g., 9876543210).';
    alertBox.style.display = 'block';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Sending Message...';

  try {
    const res = await fetch('/api/contact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone: cleanPhone,
        subject,
        message
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

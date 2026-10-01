<?php
$pageTitle = "Create Your Account";
require_once __DIR__ . '/includes/header.php';

if (getCurrentUserId()) {
    header("Location: /account.php");
    exit();
}
?>

<div class="wrap" style="padding: 70px 28px; max-width: 480px;">
  <div style="background: var(--white); border: 1px solid var(--line); border-radius: 22px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
    <h2 style="font-size: 26px; font-weight: 700; margin-bottom: 8px; text-align:center;">Create Account</h2>
    <p style="text-align:center; color:var(--char-soft); font-size:14px; margin-bottom:26px;">Join Nutrexia for exclusive founding offers</p>
    
    <div id="regError" style="display:none; padding:12px; background:#fce8e8; color:#b04a4a; border-radius:10px; margin-bottom:18px; font-weight:600; font-size:13.5px;"></div>

    <form id="regForm" onsubmit="handleRegister(event)">
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px;">
        <div>
          <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">First Name *</label>
          <input type="text" id="regFn" required placeholder="John" style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid var(--line); font-size:14.5px;">
        </div>
        <div>
          <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">Last Name</label>
          <input type="text" id="regLn" placeholder="Doe" style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid var(--line); font-size:14.5px;">
        </div>
      </div>

      <div style="margin-bottom:16px;">
        <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">Email Address *</label>
        <input type="email" id="regEmail" required placeholder="your@email.com" style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid var(--line); font-size:14.5px;">
      </div>

      <div style="margin-bottom:22px;">
        <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">Password (Min 6 characters) *</label>
        <input type="password" id="regPassword" required minlength="6" placeholder="••••••••" style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid var(--line); font-size:14.5px;">
      </div>

      <button type="submit" id="regBtn" style="width:100%; background:var(--gold); color:var(--char); padding:14px; border-radius:10px; font-weight:800; font-size:15px; margin-bottom:18px;">
        Create Account →
      </button>

      <p style="text-align:center; font-size:14px; color:var(--char-soft);">
        Already have an account? <a href="/login.php" style="color:var(--pea-deep); font-weight:700;">Sign In</a>
      </p>
    </form>
  </div>
</div>

<script>
async function handleRegister(e) {
  e.preventDefault();
  const err = document.getElementById('regError');
  const btn = document.getElementById('regBtn');
  err.style.display = 'none';
  btn.disabled = true;

  try {
    const res = await fetch('/api/auth.php?action=register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: document.getElementById('regFn').value,
        lastName: document.getElementById('regLn').value,
        email: document.getElementById('regEmail').value,
        password: document.getElementById('regPassword').value
      })
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || 'Registration failed');

    window.location.href = '/account.php';
  } catch (ex) {
    err.textContent = ex.message;
    err.style.display = 'block';
  } finally {
    btn.disabled = false;
  }
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

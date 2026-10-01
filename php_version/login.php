<?php
$pageTitle = "Login to Your Account";
require_once __DIR__ . '/includes/header.php';

if (getCurrentUserId()) {
    header("Location: /account.php");
    exit();
}
?>

<div class="wrap" style="padding: 70px 28px; max-width: 480px;">
  <div style="background: var(--white); border: 1px solid var(--line); border-radius: 22px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
    <h2 style="font-size: 26px; font-weight: 700; margin-bottom: 8px; text-align:center;">Welcome Back</h2>
    <p style="text-align:center; color:var(--char-soft); font-size:14px; margin-bottom:26px;">Sign in to access your Nutrexia orders</p>
    
    <div id="authError" style="display:none; padding:12px; background:#fce8e8; color:#b04a4a; border-radius:10px; margin-bottom:18px; font-weight:600; font-size:13.5px;"></div>

    <form id="loginForm" onsubmit="handleLogin(event)">
      <div style="margin-bottom:16px;">
        <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">Email Address</label>
        <input type="email" id="loginEmail" required placeholder="your@email.com" style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid var(--line); font-size:14.5px;">
      </div>

      <div style="margin-bottom:22px;">
        <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">Password</label>
        <input type="password" id="loginPassword" required placeholder="••••••••" style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid var(--line); font-size:14.5px;">
      </div>

      <button type="submit" id="loginBtn" style="width:100%; background:var(--char); color:var(--cream); padding:14px; border-radius:10px; font-weight:800; font-size:15px; margin-bottom:18px;">
        Sign In →
      </button>

      <p style="text-align:center; font-size:14px; color:var(--char-soft);">
        Don't have an account? <a href="/register.php" style="color:var(--pea-deep); font-weight:700;">Create One</a>
      </p>
    </form>
  </div>
</div>

<script>
async function handleLogin(e) {
  e.preventDefault();
  const err = document.getElementById('authError');
  const btn = document.getElementById('loginBtn');
  err.style.display = 'none';
  btn.disabled = true;

  try {
    const res = await fetch('/api/auth.php?action=login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
      })
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || 'Login failed');

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

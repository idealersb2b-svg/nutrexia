<?php
$pageTitle = "My Account & Orders";
require_once __DIR__ . '/includes/header.php';

$user = getCurrentUser();
if (!$user) {
    header("Location: /login.php");
    exit();
}

$db = getDBConnection();

// Fetch User Orders with items
$stmtOrders = $db->prepare("
    SELECT o.id, o.order_number, o.status, o.total_amount, o.subtotal, o.shipping_fee, o.created_at
    FROM `order` o
    WHERE o.user_id = :uid OR o.guest_email = :email
    ORDER BY o.created_at DESC
");
$stmtOrders->execute(['uid' => $user['id'], 'email' => $user['email']]);
$orders = $stmtOrders->fetchAll();
?>

<div class="wrap" style="padding: 60px 28px; max-width: 1000px;">
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 30px; flex-wrap:wrap; gap:16px;">
    <div>
      <h2 style="font-size: 28px; font-weight: 700;">My Account</h2>
      <p style="color:var(--char-soft); font-size:14.5px;">Logged in as <b><?php echo sanitize($user['first_name'] . ' ' . ($user['last_name'] ?? '')); ?></b> (<?php echo sanitize($user['email']); ?>)</p>
    </div>
    <div style="display:flex; gap:10px;">
      <?php if ($user['role'] === 'ADMIN'): ?>
        <a href="/admin/index.php" style="background:var(--char); color:var(--gold); text-decoration:none; padding:10px 18px; border-radius:10px; font-weight:700; font-size:14px;">
          ⚡ Admin Dashboard →
        </a>
      <?php endif; ?>
      <button onclick="handleLogout()" style="background:var(--cream-2); border:1px solid var(--line); padding:10px 18px; border-radius:10px; font-weight:700; font-size:14px; cursor:pointer;">
        Sign Out
      </button>
    </div>
  </div>

  <div style="background: var(--white); border: 1px solid var(--line); border-radius: 22px; padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); margin-bottom: 30px;">
    <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 18px;">Order History</h3>
    
    <?php if (empty($orders)): ?>
      <div style="text-align:center; padding:40px 20px;">
        <p style="color:var(--char-soft); font-size:15px; margin-bottom:16px;">You haven't placed any orders yet.</p>
        <a href="/#shop" style="background:var(--gold); color:var(--char); padding:12px 24px; border-radius:10px; font-weight:700; text-decoration:none; display:inline-block;">Browse Superfood Shop →</a>
      </div>
    <?php else: ?>
      <table style="width:100%; border-collapse:collapse;">
        <thead>
          <tr style="border-bottom:2px solid var(--line); text-align:left; font-size:12.5px; color:var(--char-soft); text-transform:uppercase;">
            <th style="padding:12px 0;">Order #</th>
            <th style="padding:12px 0;">Date</th>
            <th style="padding:12px 0;">Status</th>
            <th style="padding:12px 0;">Total</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($orders as $ord): ?>
            <tr style="border-bottom:1px solid var(--line); font-size:14.5px;">
              <td style="padding:16px 0; font-weight:700; font-family:'Space Grotesk';"><?php echo sanitize($ord['order_number']); ?></td>
              <td style="padding:16px 0; color:var(--char-soft);"><?php echo date('M d, Y', strtotime($ord['created_at'])); ?></td>
              <td style="padding:16px 0;">
                <span style="background:var(--cream-2); padding:4px 10px; border-radius:99px; font-size:12px; font-weight:700; color:var(--pea-deep);">
                  <?php echo sanitize($ord['status']); ?>
                </span>
              </td>
              <td style="padding:16px 0; font-weight:800; color:var(--pea-deep);"><?php echo formatPrice($ord['total_amount']); ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    <?php endif; ?>
  </div>
</div>

<script>
async function handleLogout() {
  await fetch('/api/auth.php?action=logout');
  window.location.href = '/login.php';
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

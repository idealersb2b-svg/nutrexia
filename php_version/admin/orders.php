<?php
$pageTitle = "Order & Fulfillment Management";
$activeTab = "orders";
require_once __DIR__ . '/layout.php';

$db = getDBConnection();

// Update order status if submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['order_id'], $_POST['status'])) {
    $stmtUpdate = $db->prepare("UPDATE `order` SET status = :st WHERE id = :id");
    $stmtUpdate->execute([
        'st' => sanitize($_POST['status']),
        'id' => sanitize($_POST['order_id'])
    ]);
    header("Location: /admin/orders.php");
    exit();
}

$orders = $db->query("
    SELECT o.id, o.order_number, o.guest_email, o.guest_phone, o.status, o.subtotal, o.shipping_fee, o.total_amount, o.created_at,
           p.first_name, p.last_name
    FROM `order` o
    LEFT JOIN `user` u ON o.user_id = u.id
    LEFT JOIN `user_profile` p ON u.id = p.user_id
    ORDER BY o.created_at DESC
")->fetchAll();
?>

<div class="admin-card">
  <div class="admin-card-header">
    <h3>All Customer Orders (<?php echo count($orders); ?>)</h3>
  </div>

  <table class="admin-table">
    <thead>
      <tr>
        <th>Order #</th>
        <th>Customer</th>
        <th>Contact</th>
        <th>Total Amount</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <?php if (empty($orders)): ?>
        <tr>
          <td colspan="6" style="text-align:center; padding:30px; color:var(--admin-text-light);">No orders found.</td>
        </tr>
      <?php else: ?>
        <?php foreach ($orders as $ord): ?>
          <tr>
            <td style="font-weight:700; font-family:'Space Grotesk';"><?php echo sanitize($ord['order_number']); ?></td>
            <td>
              <?php 
                $custName = trim(($ord['first_name'] ?? '') . ' ' . ($ord['last_name'] ?? ''));
                echo sanitize($custName ?: 'Guest Customer'); 
              ?>
            </td>
            <td style="font-size:13px; color:var(--admin-text-light);">
              <?php echo sanitize($ord['guest_email'] ?: 'N/A'); ?><br>
              <?php echo sanitize($ord['guest_phone'] ?: ''); ?>
            </td>
            <td style="font-weight:700; color:var(--admin-primary);"><?php echo formatPrice($ord['total_amount']); ?></td>
            <td>
              <?php 
                $statusClass = 'badge-pending';
                if ($ord['status'] === 'PAID') $statusClass = 'badge-paid';
                elseif ($ord['status'] === 'SHIPPED' || $ord['status'] === 'DELIVERED') $statusClass = 'badge-shipped';
                elseif ($ord['status'] === 'CANCELLED') $statusClass = 'badge-cancelled';
              ?>
              <span class="badge <?php echo $statusClass; ?>"><?php echo sanitize($ord['status']); ?></span>
            </td>
            <td>
              <form method="POST" style="display:inline-flex; gap:8px;">
                <input type="hidden" name="order_id" value="<?php echo $ord['id']; ?>">
                <select name="status" onchange="this.form.submit()" style="background:#1A1A1A; color:white; border:1px solid var(--admin-border); padding:6px 10px; border-radius:8px; font-size:12px; font-weight:600;">
                  <option value="PENDING" <?php echo $ord['status'] === 'PENDING' ? 'selected' : ''; ?>>PENDING</option>
                  <option value="PAID" <?php echo $ord['status'] === 'PAID' ? 'selected' : ''; ?>>PAID</option>
                  <option value="PROCESSING" <?php echo $ord['status'] === 'PROCESSING' ? 'selected' : ''; ?>>PROCESSING</option>
                  <option value="SHIPPED" <?php echo $ord['status'] === 'SHIPPED' ? 'selected' : ''; ?>>SHIPPED</option>
                  <option value="DELIVERED" <?php echo $ord['status'] === 'DELIVERED' ? 'selected' : ''; ?>>DELIVERED</option>
                  <option value="CANCELLED" <?php echo $ord['status'] === 'CANCELLED' ? 'selected' : ''; ?>>CANCELLED</option>
                </select>
              </form>
            </td>
          </tr>
        <?php endforeach; ?>
      <?php endif; ?>
    </tbody>
  </table>
</div>

    </main>
  </div>
</div>
</body>
</html>

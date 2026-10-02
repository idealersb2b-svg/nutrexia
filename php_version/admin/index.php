<?php
$pageTitle = "Dashboard Overview";
$activeTab = "dashboard";
require_once __DIR__ . '/layout.php';

$db = getDBConnection();

// Metrics queries
$totalRevenue = $db->query("SELECT COALESCE(SUM(total_amount), 0) FROM `order` WHERE status != 'CANCELLED'")->fetchColumn();
$totalOrders = $db->query("SELECT COUNT(*) FROM `order`")->fetchColumn();
$totalCustomers = $db->query("SELECT COUNT(*) FROM `user` WHERE role = 'CUSTOMER'")->fetchColumn();
$lowStockCount = $db->query("SELECT COUNT(*) FROM `product_variant` WHERE stock <= 10")->fetchColumn();

// Recent orders query
$recentOrders = $db->query("
    SELECT o.id, o.order_number, o.guest_email, o.status, o.total_amount, o.created_at, p.first_name, p.last_name
    FROM `order` o
    LEFT JOIN `user` u ON o.user_id = u.id
    LEFT JOIN `user_profile` p ON u.id = p.user_id
    ORDER BY o.created_at DESC
    LIMIT 10
")->fetchAll();
?>

<div class="dash-grid">
  <div class="stat-card">
    <div class="stat-title">TOTAL REVENUE</div>
    <div class="stat-value" style="color:var(--admin-primary);"><?php echo formatPrice($totalRevenue); ?></div>
  </div>

  <div class="stat-card">
    <div class="stat-title">TOTAL ORDERS</div>
    <div class="stat-value"><?php echo number_format($totalOrders); ?></div>
  </div>

  <div class="stat-card">
    <div class="stat-title">REGISTERED CUSTOMERS</div>
    <div class="stat-value"><?php echo number_format($totalCustomers); ?></div>
  </div>

  <div class="stat-card">
    <div class="stat-title">LOW STOCK ITEMS</div>
    <div class="stat-value" style="color:#FBBF24;"><?php echo number_format($lowStockCount); ?></div>
  </div>
</div>

<div class="admin-card">
  <div class="admin-card-header">
    <h3>Recent Storefront Orders</h3>
    <a href="/admin/orders.php" style="color:var(--admin-primary); font-weight:700; font-size:13px; text-decoration:none;">View All Orders →</a>
  </div>

  <table class="admin-table">
    <thead>
      <tr>
        <th>Order Number</th>
        <th>Customer</th>
        <th>Status</th>
        <th>Total Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      <?php if (empty($recentOrders)): ?>
        <tr>
          <td colspan="5" style="text-align:center; padding:30px; color:var(--admin-text-light);">No orders recorded yet.</td>
        </tr>
      <?php else: ?>
        <?php foreach ($recentOrders as $ord): ?>
          <tr>
            <td style="font-weight:700; font-family:'Space Grotesk';"><?php echo sanitize($ord['order_number']); ?></td>
            <td>
              <?php 
                $custName = trim(($ord['first_name'] ?? '') . ' ' . ($ord['last_name'] ?? ''));
                echo sanitize($custName ?: ($ord['guest_email'] ?: 'Guest Customer')); 
              ?>
            </td>
            <td>
              <?php 
                $statusClass = 'badge-pending';
                if ($ord['status'] === 'PAID') $statusClass = 'badge-paid';
                elseif ($ord['status'] === 'SHIPPED' || $ord['status'] === 'DELIVERED') $statusClass = 'badge-shipped';
                elseif ($ord['status'] === 'CANCELLED') $statusClass = 'badge-cancelled';
              ?>
              <span class="badge <?php echo $statusClass; ?>"><?php echo sanitize($ord['status']); ?></span>
            </td>
            <td style="font-weight:700;"><?php echo formatPrice($ord['total_amount']); ?></td>
            <td style="color:var(--admin-text-light);"><?php echo date('M d, Y H:i', strtotime($ord['created_at'])); ?></td>
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

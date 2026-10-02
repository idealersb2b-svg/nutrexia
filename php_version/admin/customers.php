<?php
$pageTitle = "Registered Customers";
$activeTab = "customers";
require_once __DIR__ . '/layout.php';

$db = getDBConnection();

$customers = $db->query("
    SELECT u.id, u.email, u.role, u.created_at, p.first_name, p.last_name, p.phone
    FROM `user` u
    LEFT JOIN `user_profile` p ON u.id = p.user_id
    ORDER BY u.created_at DESC
")->fetchAll();
?>

<div class="admin-card">
  <div class="admin-card-header">
    <h3>Registered Users & Customers (<?php echo count($customers); ?>)</h3>
  </div>

  <table class="admin-table">
    <thead>
      <tr>
        <th>Customer Name</th>
        <th>Email Address</th>
        <th>Phone</th>
        <th>Role</th>
        <th>Joined Date</th>
      </tr>
    </thead>
    <tbody>
      <?php if (empty($customers)): ?>
        <tr>
          <td colspan="5" style="text-align:center; padding:30px; color:var(--admin-text-light);">No users registered yet.</td>
        </tr>
      <?php else: ?>
        <?php foreach ($customers as $c): ?>
          <tr>
            <td style="font-weight:700;">
              <?php echo sanitize(trim(($c['first_name'] ?? '') . ' ' . ($c['last_name'] ?? '')) ?: 'User'); ?>
            </td>
            <td><?php echo sanitize($c['email']); ?></td>
            <td style="color:var(--admin-text-light);"><?php echo sanitize($c['phone'] ?: 'N/A'); ?></td>
            <td>
              <span class="badge <?php echo $c['role'] === 'ADMIN' ? 'badge-paid' : 'badge-pending'; ?>">
                <?php echo sanitize($c['role']); ?>
              </span>
            </td>
            <td style="color:var(--admin-text-light);"><?php echo date('M d, Y', strtotime($c['created_at'])); ?></td>
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

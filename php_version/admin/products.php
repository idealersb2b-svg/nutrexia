<?php
$pageTitle = "Product Catalog & Inventory";
$activeTab = "products";
require_once __DIR__ . '/layout.php';

$db = getDBConnection();

// Update stock/price if posted
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['variant_id'], $_POST['stock'], $_POST['price'])) {
    $stmtUp = $db->prepare("UPDATE `product_variant` SET stock = :st, price = :pr WHERE id = :id");
    $stmtUp->execute([
        'st' => (int)$_POST['stock'],
        'pr' => (float)$_POST['price'],
        'id' => sanitize($_POST['variant_id'])
    ]);
    header("Location: /admin/products.php");
    exit();
}

$variants = $db->query("
    SELECT v.id, v.sku, v.name as variant_name, v.price, v.mrp, v.servings, v.stock,
           p.name as product_name, c.name as category_name
    FROM `product_variant` v
    JOIN `product` p ON v.product_id = p.id
    LEFT JOIN `category` c ON p.category_id = c.id
    ORDER BY p.name ASC
")->fetchAll();
?>

<div class="admin-card">
  <div class="admin-card-header">
    <h3>Product Variants & Stock Inventory</h3>
  </div>

  <table class="admin-table">
    <thead>
      <tr>
        <th>SKU / Product</th>
        <th>Variant Name</th>
        <th>Servings</th>
        <th>Price (₹)</th>
        <th>Stock Count</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <?php if (empty($variants)): ?>
        <tr>
          <td colspan="6" style="text-align:center; padding:30px; color:var(--admin-text-light);">No product variants found in database. Run seed SQL or add products.</td>
        </tr>
      <?php else: ?>
        <?php foreach ($variants as $v): ?>
          <tr>
            <td>
              <div style="font-weight:700;"><?php echo sanitize($v['product_name']); ?></div>
              <div style="font-size:11px; color:var(--admin-text-light);">SKU: <?php echo sanitize($v['sku']); ?></div>
            </td>
            <td style="font-weight:600;"><?php echo sanitize($v['variant_name']); ?></td>
            <td style="color:var(--admin-text-light);"><?php echo $v['servings']; ?> Servings</td>
            <td style="font-weight:700; color:var(--admin-primary);"><?php echo formatPrice($v['price']); ?></td>
            <td>
              <span class="badge <?php echo $v['stock'] <= 10 ? 'badge-cancelled' : 'badge-paid'; ?>">
                <?php echo $v['stock']; ?> In Stock
              </span>
            </td>
            <td>
              <form method="POST" style="display:inline-flex; gap:6px; align-items:center;">
                <input type="hidden" name="variant_id" value="<?php echo $v['id']; ?>">
                <input type="number" name="price" value="<?php echo $v['price']; ?>" step="10" placeholder="Price" style="width:70px; background:#1A1A1A; color:white; border:1px solid var(--admin-border); padding:4px 6px; border-radius:6px; font-size:12px;">
                <input type="number" name="stock" value="<?php echo $v['stock']; ?>" placeholder="Stock" style="width:60px; background:#1A1A1A; color:white; border:1px solid var(--admin-border); padding:4px 6px; border-radius:6px; font-size:12px;">
                <button type="submit" style="background:var(--admin-primary); color:black; border:none; padding:4px 10px; border-radius:6px; font-weight:700; font-size:11px; cursor:pointer;">Update</button>
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

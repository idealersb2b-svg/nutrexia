<?php
$pageTitle = "My Account Portal";
require_once __DIR__ . '/includes/header.php';

$user = getCurrentUser();
if (!$user) {
    header("Location: /login.php");
    exit();
}

$db = getDBConnection();
$tab = sanitize($_GET['tab'] ?? 'profile');

// Fetch User Orders
$stmtOrders = $db->prepare("
    SELECT o.id, o.order_number, o.status, o.total_amount, o.subtotal, o.shipping_fee, o.created_at
    FROM `order` o
    WHERE o.user_id = :uid OR o.guest_email = :email
    ORDER BY o.created_at DESC
");
$stmtOrders->execute(['uid' => $user['id'], 'email' => $user['email']]);
$orders = $stmtOrders->fetchAll();

// Fetch User Addresses
$stmtAddr = $db->prepare("
    SELECT id, full_name, phone, address_line1, address_line2, city, state, pincode, landmark, is_default
    FROM `address`
    WHERE user_id = :uid
    ORDER BY is_default DESC, created_at DESC
");
$stmtAddr->execute(['uid' => $user['id']]);
$addresses = $stmtAddr->fetchAll();

// Sample Wishlist items or fetch from wishlist table
$wishlistProducts = [
    [
        'id' => 'v-founding-1',
        'name' => 'Nutrexia Founding Pouch',
        'subtitle' => 'Rainfed Millets + Plant Protein',
        'price' => 799.00,
        'image' => 'https://via.placeholder.com/150x150/3F7A1F/FFFFFF?text=Founding+Pouch'
    ]
];
?>

<div class="wrap" style="padding: 60px 28px; max-width: 1100px;">
  <!-- Header Bar -->
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 30px; flex-wrap:wrap; gap:16px;">
    <div>
      <h2 style="font-size: 28px; font-weight: 700;">My Account</h2>
      <p style="color:var(--char-soft); font-size:14.5px;">Welcome back, <b><?php echo sanitize($user['first_name'] . ' ' . ($user['last_name'] ?? '')); ?></b> (<?php echo sanitize($user['email']); ?>)</p>
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

  <!-- Account Grid Layout -->
  <div style="display:grid; grid-template-columns: 240px 1fr; gap: 32px;">
    <!-- Sidebar Navigation Menu -->
    <div style="background: var(--white); border: 1px solid var(--line); border-radius: 18px; padding: 16px; height: fit-content; box-shadow: 0 10px 25px rgba(0,0,0,0.03);">
      <div style="display:flex; flex-direction:column; gap:6px;">
        <a href="?tab=profile" style="padding:12px 16px; border-radius:10px; text-decoration:none; font-weight:700; font-size:14.5px; display:flex; align-items:center; gap:10px; transition:all 0.2s; <?php echo $tab === 'profile' ? 'background:var(--char); color:var(--cream);' : 'color:var(--char-soft);'; ?>">
          👤 Profile Details
        </a>
        <a href="?tab=orders" style="padding:12px 16px; border-radius:10px; text-decoration:none; font-weight:700; font-size:14.5px; display:flex; align-items:center; gap:10px; transition:all 0.2s; <?php echo $tab === 'orders' ? 'background:var(--char); color:var(--cream);' : 'color:var(--char-soft);'; ?>">
          📦 My Orders
        </a>
        <a href="?tab=wishlist" style="padding:12px 16px; border-radius:10px; text-decoration:none; font-weight:700; font-size:14.5px; display:flex; align-items:center; gap:10px; transition:all 0.2s; <?php echo $tab === 'wishlist' ? 'background:var(--char); color:var(--cream);' : 'color:var(--char-soft);'; ?>">
          ❤️ My Wishlist
        </a>
        <a href="?tab=addresses" style="padding:12px 16px; border-radius:10px; text-decoration:none; font-weight:700; font-size:14.5px; display:flex; align-items:center; gap:10px; transition:all 0.2s; <?php echo $tab === 'addresses' ? 'background:var(--char); color:var(--cream);' : 'color:var(--char-soft);'; ?>">
          📍 My Addresses
        </a>
      </div>
    </div>

    <!-- Main Content Area -->
    <div style="background: var(--white); border: 1px solid var(--line); border-radius: 22px; padding: 36px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">

      <!-- Tab 1: Profile Details -->
      <?php if ($tab === 'profile'): ?>
        <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 24px;">Personal Profile</h3>
        
        <div id="profAlert" style="display:none; padding:12px 16px; border-radius:10px; margin-bottom:20px; font-weight:600; font-size:14px;"></div>

        <!-- Update Name & Phone Form -->
        <form onsubmit="handleProfileUpdate(event)" style="margin-bottom: 40px; padding-bottom:30px; border-bottom:1px solid var(--line);">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-bottom:18px;">
            <div>
              <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">First Name *</label>
              <input type="text" id="profFn" value="<?php echo sanitize($user['first_name'] ?? ''); ?>" required style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid var(--line); font-size:14.5px;">
            </div>
            <div>
              <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">Last Name</label>
              <input type="text" id="profLn" value="<?php echo sanitize($user['last_name'] ?? ''); ?>" style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid var(--line); font-size:14.5px;">
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-bottom:24px;">
            <div>
              <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">Email Address (Non-editable)</label>
              <input type="email" value="<?php echo sanitize($user['email']); ?>" disabled style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid var(--line); background:var(--cream-2); font-size:14.5px; color:#666;">
            </div>
            <div>
              <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">Phone Number</label>
              <input type="tel" id="profPhone" value="<?php echo sanitize($user['phone'] ?? ''); ?>" placeholder="+91 9876543210" style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid var(--line); font-size:14.5px;">
            </div>
          </div>

          <button type="submit" id="profBtn" style="background:var(--char); color:var(--cream); padding:12px 24px; border-radius:10px; font-weight:700; font-size:14.5px; cursor:pointer;">
            Save Profile Changes
          </button>
        </form>

        <!-- Change Password Form -->
        <h4 style="font-size: 18px; font-weight: 700; margin-bottom: 18px;">Change Password</h4>
        <form onsubmit="handlePasswordChange(event)">
          <div style="margin-bottom:16px; max-width:400px;">
            <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">Current Password *</label>
            <input type="password" id="currPass" required placeholder="••••••••" style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid var(--line); font-size:14.5px;">
          </div>
          <div style="margin-bottom:22px; max-width:400px;">
            <label style="display:block; font-weight:700; font-size:13.5px; margin-bottom:6px;">New Password (min 6 chars) *</label>
            <input type="password" id="newPass" required minlength="6" placeholder="••••••••" style="width:100%; padding:12px 16px; border-radius:10px; border:1px solid var(--line); font-size:14.5px;">
          </div>

          <button type="submit" id="passBtn" style="background:var(--pea-deep); color:#fff; padding:12px 24px; border-radius:10px; font-weight:700; font-size:14.5px; cursor:pointer;">
            Update Password
          </button>
        </form>

      <!-- Tab 2: My Orders -->
      <?php elseif ($tab === 'orders'): ?>
        <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 24px;">My Purchased Orders</h3>
        
        <?php if (empty($orders)): ?>
          <div style="text-align:center; padding:50px 20px;">
            <p style="color:var(--char-soft); font-size:15px; margin-bottom:18px;">You haven't placed any orders yet.</p>
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

      <!-- Tab 3: My Wishlist -->
      <?php elseif ($tab === 'wishlist'): ?>
        <h3 style="font-size: 22px; font-weight: 700; margin-bottom: 24px;">My Wishlist</h3>
        
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:20px;">
          <?php foreach ($wishlistProducts as $wp): ?>
            <div style="border:1px solid var(--line); border-radius:16px; padding:20px; text-align:center;">
              <img src="<?php echo $wp['image']; ?>" alt="<?php echo sanitize($wp['name']); ?>" style="width:100px; height:100px; object-fit:contain; margin:0 auto 14px;">
              <h4 style="font-size:16px; font-weight:700; margin-bottom:6px;"><?php echo sanitize($wp['name']); ?></h4>
              <div style="font-size:18px; font-weight:800; color:var(--pea-deep); margin-bottom:14px;"><?php echo formatPrice($wp['price']); ?></div>
              <button onclick="addToCart('<?php echo $wp['id']; ?>', '<?php echo addslashes($wp['name']); ?>', <?php echo $wp['price']; ?>, '<?php echo $wp['image']; ?>')" style="width:100%; background:var(--gold); color:var(--char); padding:10px; border-radius:8px; font-weight:700; font-size:13.5px; cursor:pointer;">
                Add To Cart
              </button>
            </div>
          <?php endforeach; ?>
        </div>

      <!-- Tab 4: My Addresses -->
      <?php elseif ($tab === 'addresses'): ?>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
          <h3 style="font-size: 22px; font-weight: 700;">My Delivery Addresses</h3>
          <button onclick="toggleAddressForm()" style="background:var(--pea-deep); color:#fff; padding:10px 18px; border-radius:10px; font-weight:700; font-size:13.5px; cursor:pointer;">
            + Add New Address
          </button>
        </div>

        <div id="addrAlert" style="display:none; padding:12px 16px; border-radius:10px; margin-bottom:20px; font-weight:600; font-size:14px;"></div>

        <!-- Add Address Form -->
        <form id="addAddressForm" onsubmit="handleAddressAdd(event)" style="display:none; background:var(--cream); padding:24px; border-radius:16px; margin-bottom:30px; border:1px solid var(--line);">
          <h4 style="font-size:16px; font-weight:700; margin-bottom:16px;">New Delivery Address</h4>
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px;">
            <div>
              <label style="display:block; font-weight:700; font-size:12.5px; margin-bottom:4px;">Full Name *</label>
              <input type="text" id="addrName" required style="width:100%; padding:10px 14px; border-radius:8px; border:1px solid var(--line);">
            </div>
            <div>
              <label style="display:block; font-weight:700; font-size:12.5px; margin-bottom:4px;">Phone Number *</label>
              <input type="tel" id="addrPhone" required style="width:100%; padding:10px 14px; border-radius:8px; border:1px solid var(--line);">
            </div>
          </div>

          <div style="margin-bottom:14px;">
            <label style="display:block; font-weight:700; font-size:12.5px; margin-bottom:4px;">Address Line 1 *</label>
            <input type="text" id="addrL1" required placeholder="Building / Street" style="width:100%; padding:10px 14px; border-radius:8px; border:1px solid var(--line);">
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; margin-bottom:18px;">
            <div>
              <label style="display:block; font-weight:700; font-size:12.5px; margin-bottom:4px;">City *</label>
              <input type="text" id="addrCity" required style="width:100%; padding:10px 14px; border-radius:8px; border:1px solid var(--line);">
            </div>
            <div>
              <label style="display:block; font-weight:700; font-size:12.5px; margin-bottom:4px;">State *</label>
              <input type="text" id="addrState" required style="width:100%; padding:10px 14px; border-radius:8px; border:1px solid var(--line);">
            </div>
            <div>
              <label style="display:block; font-weight:700; font-size:12.5px; margin-bottom:4px;">Pincode *</label>
              <input type="text" id="addrPin" required style="width:100%; padding:10px 14px; border-radius:8px; border:1px solid var(--line);">
            </div>
          </div>

          <button type="submit" style="background:var(--char); color:var(--cream); padding:10px 20px; border-radius:8px; font-weight:700; font-size:13.5px; cursor:pointer;">
            Save Delivery Address
          </button>
        </form>

        <!-- Saved Addresses List -->
        <?php if (empty($addresses)): ?>
          <p style="color:var(--char-soft); font-size:14.5px;">No saved delivery addresses yet.</p>
        <?php else: ?>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
            <?php foreach ($addresses as $a): ?>
              <div style="border:1px solid var(--line); border-radius:16px; padding:20px; position:relative;">
                <h4 style="font-size:16px; font-weight:700; margin-bottom:6px;"><?php echo sanitize($a['full_name']); ?></h4>
                <p style="font-size:13.5px; color:var(--char-soft); line-height:1.5;">
                  <?php echo sanitize($a['address_line1']); ?><br>
                  <?php echo sanitize($a['city'] . ', ' . $a['state'] . ' - ' . $a['pincode']); ?><br>
                  📞 <?php echo sanitize($a['phone']); ?>
                </p>
                <button onclick="handleAddressDelete('<?php echo $a['id']; ?>')" style="margin-top:14px; background:#fce8e8; color:#b04a4a; border:none; padding:6px 12px; border-radius:6px; font-weight:700; font-size:12px; cursor:pointer;">
                  Delete Address
                </button>
              </div>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>

      <?php endif; ?>

    </div>
  </div>
</div>

<script>
async function handleLogout() {
  await fetch('/api/auth.php?action=logout');
  window.location.href = '/login.php';
}

function toggleAddressForm() {
  const f = document.getElementById('addAddressForm');
  f.style.display = f.style.display === 'none' ? 'block' : 'none';
}

async function handleProfileUpdate(e) {
  e.preventDefault();
  const alertBox = document.getElementById('profAlert');
  alertBox.style.display = 'none';

  try {
    const res = await fetch('/api/account.php?action=update_profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: document.getElementById('profFn').value,
        last_name: document.getElementById('profLn').value,
        phone: document.getElementById('profPhone').value
      })
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || 'Failed to update profile');

    alertBox.style.background = '#e8f5e9';
    alertBox.style.color = '#2e7d32';
    alertBox.textContent = 'Profile updated successfully!';
    alertBox.style.display = 'block';
  } catch (err) {
    alertBox.style.background = '#fce8e8';
    alertBox.style.color = '#b04a4a';
    alertBox.textContent = err.message;
    alertBox.style.display = 'block';
  }
}

async function handlePasswordChange(e) {
  e.preventDefault();
  const alertBox = document.getElementById('profAlert');
  alertBox.style.display = 'none';

  try {
    const res = await fetch('/api/account.php?action=change_password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        current_password: document.getElementById('currPass').value,
        new_password: document.getElementById('newPass').value
      })
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || 'Failed to change password');

    alertBox.style.background = '#e8f5e9';
    alertBox.style.color = '#2e7d32';
    alertBox.textContent = 'Password changed successfully!';
    alertBox.style.display = 'block';
  } catch (err) {
    alertBox.style.background = '#fce8e8';
    alertBox.style.color = '#b04a4a';
    alertBox.textContent = err.message;
    alertBox.style.display = 'block';
  }
}

async function handleAddressAdd(e) {
  e.preventDefault();
  try {
    const res = await fetch('/api/account.php?action=add_address', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: document.getElementById('addrName').value,
        phone: document.getElementById('addrPhone').value,
        address_line1: document.getElementById('addrL1').value,
        city: document.getElementById('addrCity').value,
        state: document.getElementById('addrState').value,
        pincode: document.getElementById('addrPin').value
      })
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || 'Failed to add address');

    window.location.reload();
  } catch (err) {
    alert(err.message);
  }
}

async function handleAddressDelete(id) {
  if (!confirm('Are you sure you want to delete this address?')) return;
  try {
    const res = await fetch('/api/account.php?action=delete_address', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address_id: id })
    });
    const data = await res.json();
    if (!res.ok || !data.success) throw new Error(data.error || 'Failed to delete address');

    window.location.reload();
  } catch (err) {
    alert(err.message);
  }
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>

<?php
require_once __DIR__ . '/../includes/functions.php';

$adminUser = getCurrentUser();

if (!$adminUser || $adminUser['role'] !== 'ADMIN') {
    header("Location: /login.php");
    exit();
}

$activeTab = $activeTab ?? 'dashboard';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo isset($pageTitle) ? sanitize($pageTitle) . ' | Nutrexia Admin' : 'Nutrexia Admin Control Center'; ?></title>
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="/admin/admin.css">
</head>
<body>

<div class="admin-layout">
  <!-- Floating Dark Sidebar -->
  <div class="admin-sidebar-wrapper">
    <div class="admin-sidebar">
      <div class="admin-brand">
        <h2>NUTREXIA</h2>
        <span>ADMIN DASHBOARD</span>
      </div>

      <nav class="admin-nav">
        <a href="/admin/index.php" class="<?php echo $activeTab === 'dashboard' ? 'active' : ''; ?>">
          📊 Overview
        </a>
        <a href="/admin/orders.php" class="<?php echo $activeTab === 'orders' ? 'active' : ''; ?>">
          📦 Orders & Fulfillment
        </a>
        <a href="/admin/products.php" class="<?php echo $activeTab === 'products' ? 'active' : ''; ?>">
          🌾 Products & Variants
        </a>
        <a href="/admin/customers.php" class="<?php echo $activeTab === 'customers' ? 'active' : ''; ?>">
          👥 Customers
        </a>
        <a href="/" target="_blank">
          🌐 View Storefront ↗
        </a>
      </nav>

      <div class="admin-sidebar-footer">
        <a href="/api/auth.php?action=logout" class="logout-btn">
          🚪 Logout
        </a>
      </div>
    </div>
  </div>

  <!-- Main View -->
  <div class="admin-main">
    <header class="admin-header">
      <h1><?php echo isset($pageTitle) ? sanitize($pageTitle) : 'Overview'; ?></h1>
      <div class="admin-profile">
        <span>Admin: <b><?php echo sanitize($adminUser['first_name']); ?></b></span>
        <div class="avatar"><?php echo strtoupper(substr($adminUser['first_name'], 0, 1)); ?></div>
      </div>
    </header>

    <main class="admin-content">

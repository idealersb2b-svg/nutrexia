<?php
/**
 * Nutrexia PHP Checkout API
 */

require_once __DIR__ . '/../includes/functions.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input'), true);

if (empty($input['items']) || !is_array($input['items'])) {
    jsonResponse(['error' => 'Cart items are required'], 400);
}

$fullName = sanitize($input['fullName'] ?? '');
$email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
$phone = sanitize($input['phone'] ?? '');
$addressLine1 = sanitize($input['addressLine1'] ?? '');
$city = sanitize($input['city'] ?? '');
$state = sanitize($input['state'] ?? '');
$pincode = sanitize($input['pincode'] ?? '');

if (!$email || !$fullName || !$addressLine1 || !$city || !$pincode) {
    jsonResponse(['error' => 'Please fill in all required shipping fields'], 400);
}

try {
    $db = getDBConnection();
    $db->beginTransaction();

    // Calculate Order Subtotal & Total
    $subtotal = 0;
    $orderItems = [];

    foreach ($input['items'] as $item) {
        $price = (float)$item['price'];
        $qty = (int)$item['quantity'];
        $total = $price * $qty;
        $subtotal += $total;

        $orderItems[] = [
            'variant_id' => $item['variantId'],
            'name' => $item['name'],
            'price' => $price,
            'quantity' => $qty,
            'total' => $total
        ];
    }

    $shippingFee = 0.00; // Free shipping
    $totalAmount = $subtotal + $shippingFee;

    // Generate Unique Order Details
    $orderId = generateUuid();
    $orderNumber = 'NUTR-' . strtoupper(substr(md5(uniqid()), 0, 8));
    $userId = getCurrentUserId();

    // Insert Order
    $stmtOrder = $db->prepare("
        INSERT INTO `order` (id, order_number, user_id, guest_email, guest_phone, status, subtotal, shipping_fee, total_amount)
        VALUES (:id, :order_number, :user_id, :guest_email, :guest_phone, 'PENDING', :subtotal, :shipping_fee, :total_amount)
    ");
    $stmtOrder->execute([
        'id' => $orderId,
        'order_number' => $orderNumber,
        'user_id' => $userId,
        'guest_email' => $email,
        'guest_phone' => $phone,
        'subtotal' => $subtotal,
        'shipping_fee' => $shippingFee,
        'total_amount' => $totalAmount
    ]);

    // Insert Order Address
    $stmtAddr = $db->prepare("
        INSERT INTO `order_address` (id, order_id, full_name, phone, address_line1, city, state, pincode)
        VALUES (:id, :order_id, :full_name, :phone, :address_line1, :city, :state, :pincode)
    ");
    $stmtAddr->execute([
        'id' => generateUuid(),
        'order_id' => $orderId,
        'full_name' => $fullName,
        'phone' => $phone,
        'address_line1' => $addressLine1,
        'city' => $city,
        'state' => $state,
        'pincode' => $pincode
    ]);

    // Insert Order Items
    $stmtItem = $db->prepare("
        INSERT INTO `order_item` (id, order_id, variant_id, name, sku, price, quantity, total)
        VALUES (:id, :order_id, :variant_id, :name, :sku, :price, :quantity, :total)
    ");

    foreach ($orderItems as $item) {
        $stmtItem->execute([
            'id' => generateUuid(),
            'order_id' => $orderId,
            'variant_id' => $item['variant_id'],
            'name' => $item['name'],
            'sku' => $item['variant_id'],
            'price' => $item['price'],
            'quantity' => $item['quantity'],
            'total' => $item['total']
        ]);
    }

    // Call Razorpay API to create Order ID
    $rzpOrderId = 'order_rzp_' . substr(md5(uniqid()), 0, 12); // Simulated if no live keys

    if (RAZORPAY_KEY_ID !== 'rzp_test_YourKeyId') {
        $ch = curl_init('https://api.razorpay.com/v1/orders');
        curl_setopt($ch, CURLOPT_USERPWD, RAZORPAY_KEY_ID . ':' . RAZORPAY_KEY_SECRET);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
            'amount' => intval($totalAmount * 100), // in paise
            'currency' => 'INR',
            'receipt' => $orderNumber
        ]));
        $res = curl_exec($ch);
        curl_close($ch);
        $rzpData = json_decode($res, true);
        if (!empty($rzpData['id'])) {
            $rzpOrderId = $rzpData['id'];
        }
    }

    // Save Payment record
    $stmtPay = $db->prepare("
        INSERT INTO `payment` (id, order_id, razorpay_order_id, amount, status)
        VALUES (:id, :order_id, :rzp_id, :amount, 'CREATED')
    ");
    $stmtPay->execute([
        'id' => generateUuid(),
        'order_id' => $orderId,
        'rzp_id' => $rzpOrderId,
        'amount' => $totalAmount
    ]);

    $db->commit();

    jsonResponse([
        'success' => true,
        'orderId' => $orderId,
        'orderNumber' => $orderNumber,
        'razorpayOrderId' => $rzpOrderId,
        'razorpayKeyId' => RAZORPAY_KEY_ID,
        'amount' => $totalAmount * 100, // in paise for Razorpay JS
        'currency' => 'INR'
    ]);

} catch (\Exception $e) {
    if (isset($db) && $db->inTransaction()) {
        $db->rollBack();
    }
    jsonResponse(['error' => 'Checkout failed: ' . $e->getMessage()], 500);
}
?>

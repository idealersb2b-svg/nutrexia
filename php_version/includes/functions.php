<?php
/**
 * Nutrexia Helper Functions
 */

require_once __DIR__ . '/../config/db.php';

// Sanitize user inputs
function sanitize($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

// Format INR Price
function formatPrice($amount) {
    return '₹' . number_format((float)$amount, 2);
}

// Get logged in user ID or null
function getCurrentUserId() {
    return $_SESSION['user_id'] ?? null;
}

// Get Session ID for guest carts
function getCartSessionId() {
    if (empty($_SESSION['cart_session_id'])) {
        $_SESSION['cart_session_id'] = generateUuid();
    }
    return $_SESSION['cart_session_id'];
}

// Fetch Active User details
function getCurrentUser() {
    $userId = getCurrentUserId();
    if (!$userId) return null;

    $db = getDBConnection();
    $stmt = $db->prepare("
        SELECT u.id, u.email, u.role, p.first_name, p.last_name, p.phone, p.avatar_url
        FROM `user` u
        LEFT JOIN `user_profile` p ON u.id = p.user_id
        WHERE u.id = :id
    ");
    $stmt->execute(['id' => $userId]);
    return $stmt->fetch();
}

// JSON Response helper
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit();
}
?>

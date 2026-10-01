<?php
/**
 * Nutrexia E-Commerce - Hostinger MySQL Database Configuration
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Hostinger Database Credentials (Replace with your actual Hostinger MySQL details)
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: 'u352183534_nutrexia_db');
define('DB_USER', getenv('DB_USER') ?: 'u352183534_nutrexia_user');
define('DB_PASS', getenv('DB_PASS') ?: 'YourHostingerPasswordHere');
define('DB_CHARSET', 'utf8mb4');

// Razorpay Credentials
define('RAZORPAY_KEY_ID', getenv('RAZORPAY_KEY_ID') ?: 'rzp_test_YourKeyId');
define('RAZORPAY_KEY_SECRET', getenv('RAZORPAY_KEY_SECRET') ?: 'YourKeySecret');

// Site URL Config
define('SITE_URL', getenv('SITE_URL') ?: 'https://nutrexia.in');

function getDBConnection() {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (\PDOException $e) {
            // For production safety: avoid dumping raw credentials
            http_response_code(500);
            die("Database Connection Error: Please verify Hostinger MySQL credentials in config/db.php.");
        }
    }
    return $pdo;
}

// Generate unique UUID v4 for primary keys
function generateUuid() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}
?>

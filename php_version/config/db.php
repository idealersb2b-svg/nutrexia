<?php
/**
 * Nutrexia E-Commerce - Hostinger MySQL Database Configuration
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Hostinger Database Credentials
define('DB_HOST', 'localhost');
define('DB_NAME', 'u352183534_nutrexia_db');
define('DB_USER', 'u352183534_nutrexia_user');
define('DB_PASS', 'YourHostingerPasswordHere'); // Replace with your actual Hostinger MySQL Password
define('DB_CHARSET', 'utf8mb4');

// Razorpay Credentials
define('RAZORPAY_KEY_ID', 'rzp_test_YourKeyId');
define('RAZORPAY_KEY_SECRET', 'YourKeySecret');

// Site URL Config
define('SITE_URL', 'https://nutrexia.in');

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
            http_response_code(500);
            header('Content-Type: application/json');
            echo json_encode([
                "error" => "Database Connection Failed: Please update DB_NAME, DB_USER, and DB_PASS in config/db.php on Hostinger."
            ]);
            exit();
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

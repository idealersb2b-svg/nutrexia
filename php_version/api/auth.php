<?php
/**
 * Nutrexia Auth API Controller
 */

require_once __DIR__ . '/../includes/functions.php';

header('Content-Type: application/json');

$action = $_GET['action'] ?? '';
$input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

if ($action === 'register') {
    $email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $password = $input['password'] ?? '';
    $firstName = sanitize($input['firstName'] ?? '');
    $lastName = sanitize($input['lastName'] ?? '');

    if (!$email || strlen($password) < 6 || !$firstName) {
        jsonResponse(['error' => 'Please provide valid email, first name, and password (min 6 chars)'], 400);
    }

    try {
        $db = getDBConnection();

        // Check if email already exists
        $stmtCheck = $db->prepare("SELECT id FROM `user` WHERE email = :email");
        $stmtCheck->execute(['email' => $email]);
        if ($stmtCheck->fetch()) {
            jsonResponse(['error' => 'An account with this email already exists'], 400);
        }

        $userId = generateUuid();
        $passwordHash = password_hash($password, PASSWORD_BCRYPT);

        $db->beginTransaction();

        $stmtUser = $db->prepare("
            INSERT INTO `user` (id, email, password_hash, role)
            VALUES (:id, :email, :pass, 'CUSTOMER')
        ");
        $stmtUser->execute(['id' => $userId, 'email' => $email, 'pass' => $passwordHash]);

        $stmtProf = $db->prepare("
            INSERT INTO `user_profile` (id, user_id, first_name, last_name)
            VALUES (:id, :user_id, :fn, :ln)
        ");
        $stmtProf->execute(['id' => generateUuid(), 'user_id' => $userId, 'fn' => $firstName, 'ln' => $lastName]);

        $db->commit();

        $_SESSION['user_id'] = $userId;
        jsonResponse(['success' => true, 'message' => 'Account created successfully']);

    } catch (\Exception $e) {
        if (isset($db) && $db->inTransaction()) $db->rollBack();
        jsonResponse(['error' => 'Registration error: ' . $e->getMessage()], 500);
    }

} elseif ($action === 'login') {
    $email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $password = $input['password'] ?? '';

    if (!$email || !$password) {
        jsonResponse(['error' => 'Please fill in both email and password'], 400);
    }

    try {
        $db = getDBConnection();
        $stmt = $db->prepare("SELECT id, password_hash FROM `user` WHERE email = :email");
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            jsonResponse(['error' => 'Invalid email or password'], 401);
        }

        $_SESSION['user_id'] = $user['id'];
        jsonResponse(['success' => true, 'message' => 'Logged in successfully']);

    } catch (\Exception $e) {
        jsonResponse(['error' => 'Login error: ' . $e->getMessage()], 500);
    }

} elseif ($action === 'logout') {
    session_destroy();
    jsonResponse(['success' => true]);
} else {
    jsonResponse(['error' => 'Invalid action'], 400);
}
?>

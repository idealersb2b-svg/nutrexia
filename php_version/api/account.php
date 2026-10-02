<?php
/**
 * Nutrexia User Account API Controller
 */

require_once __DIR__ . '/../includes/functions.php';

header('Content-Type: application/json');

$userId = getCurrentUserId();
if (!$userId) {
    jsonResponse(['error' => 'Unauthorized'], 401);
}

$action = $_GET['action'] ?? '';
$input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
$db = getDBConnection();

if ($action === 'update_profile') {
    $firstName = sanitize($input['first_name'] ?? '');
    $lastName = sanitize($input['last_name'] ?? '');
    $phone = sanitize($input['phone'] ?? '');

    if (!$firstName) {
        jsonResponse(['error' => 'First Name is required'], 400);
    }

    try {
        $stmt = $db->prepare("
            INSERT INTO `user_profile` (id, user_id, first_name, last_name, phone)
            VALUES (:id, :user_id, :fn, :ln, :ph)
            ON DUPLICATE KEY UPDATE first_name = :fn2, last_name = :ln2, phone = :ph2
        ");
        $stmt->execute([
            'id' => generateUuid(),
            'user_id' => $userId,
            'fn' => $firstName,
            'ln' => $lastName,
            'ph' => $phone,
            'fn2' => $firstName,
            'ln2' => $lastName,
            'ph2' => $phone
        ]);

        jsonResponse(['success' => true, 'message' => 'Profile updated successfully']);
    } catch (\Exception $e) {
        jsonResponse(['error' => 'Failed to update profile: ' . $e->getMessage()], 500);
    }

} elseif ($action === 'change_password') {
    $currentPass = $input['current_password'] ?? '';
    $newPass = $input['new_password'] ?? '';

    if (strlen($newPass) < 6) {
        jsonResponse(['error' => 'New password must be at least 6 characters long'], 400);
    }

    try {
        $stmtUser = $db->prepare("SELECT password_hash FROM `user` WHERE id = :id");
        $stmtUser->execute(['id' => $userId]);
        $user = $stmtUser->fetch();

        if (!password_verify($currentPass, $user['password_hash'])) {
            jsonResponse(['error' => 'Incorrect current password'], 400);
        }

        $newHash = password_hash($newPass, PASSWORD_BCRYPT);
        $stmtUp = $db->prepare("UPDATE `user` SET password_hash = :pass WHERE id = :id");
        $stmtUp->execute(['pass' => $newHash, 'id' => $userId]);

        jsonResponse(['success' => true, 'message' => 'Password changed successfully']);
    } catch (\Exception $e) {
        jsonResponse(['error' => 'Failed to change password: ' . $e->getMessage()], 500);
    }

} elseif ($action === 'add_address') {
    $fullName = sanitize($input['full_name'] ?? '');
    $phone = sanitize($input['phone'] ?? '');
    $line1 = sanitize($input['address_line1'] ?? '');
    $line2 = sanitize($input['address_line2'] ?? '');
    $city = sanitize($input['city'] ?? '');
    $state = sanitize($input['state'] ?? '');
    $pincode = sanitize($input['pincode'] ?? '');
    $landmark = sanitize($input['landmark'] ?? '');

    if (!$fullName || !$phone || !$line1 || !$city || !$pincode) {
        jsonResponse(['error' => 'Please fill in all required address fields'], 400);
    }

    try {
        $stmt = $db->prepare("
            INSERT INTO `address` (id, user_id, full_name, phone, address_line1, address_line2, city, state, pincode, landmark)
            VALUES (:id, :uid, :fn, :ph, :l1, :l2, :city, :state, :pin, :lm)
        ");
        $stmt->execute([
            'id' => generateUuid(),
            'uid' => $userId,
            'fn' => $fullName,
            'ph' => $phone,
            'l1' => $line1,
            'l2' => $line2,
            'city' => $city,
            'state' => $state,
            'pin' => $pincode,
            'lm' => $landmark
        ]);

        jsonResponse(['success' => true, 'message' => 'Delivery address added successfully']);
    } catch (\Exception $e) {
        jsonResponse(['error' => 'Failed to add address: ' . $e->getMessage()], 500);
    }

} elseif ($action === 'delete_address') {
    $addressId = sanitize($input['address_id'] ?? '');

    try {
        $stmt = $db->prepare("DELETE FROM `address` WHERE id = :id AND user_id = :uid");
        $stmt->execute(['id' => $addressId, 'uid' => $userId]);

        jsonResponse(['success' => true, 'message' => 'Address deleted successfully']);
    } catch (\Exception $e) {
        jsonResponse(['error' => 'Failed to delete address: ' . $e->getMessage()], 500);
    }

} else {
    jsonResponse(['error' => 'Invalid action'], 400);
}
?>

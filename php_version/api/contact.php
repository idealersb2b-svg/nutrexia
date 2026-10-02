<?php
/**
 * Nutrexia Contact Form API Controller
 */

require_once __DIR__ . '/../includes/functions.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

$name = sanitize($input['name'] ?? '');
$email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
$phone = sanitize($input['phone'] ?? '');
$message = sanitize($input['message'] ?? '');

if (!$name || !$email || !$message) {
    jsonResponse(['error' => 'Please fill in all required fields (Name, Email, Message)'], 400);
}

try {
    $db = getDBConnection();
    
    // Save to conversation / message table or audit log
    $convId = generateUuid();
    $stmtConv = $db->prepare("
        INSERT INTO `conversation` (id, guest_email, subject, status)
        VALUES (:id, :email, :subj, 'OPEN')
    ");
    $stmtConv->execute([
        'id' => $convId,
        'email' => $email,
        'subj' => 'Inquiry from ' . $name . ($phone ? ' (' . $phone . ')' : '')
    ]);

    $stmtMsg = $db->prepare("
        INSERT INTO `message` (id, conversation_id, sender, content)
        VALUES (:id, :conv_id, 'GUEST', :content)
    ");
    $stmtMsg->execute([
        'id' => generateUuid(),
        'conv_id' => $convId,
        'content' => $message
    ]);

    jsonResponse([
        'success' => true,
        'message' => 'Thank you for reaching out! Our team will respond to your inquiry shortly.'
    ]);

} catch (\Exception $e) {
    jsonResponse(['error' => 'Failed to submit contact message: ' . $e->getMessage()], 500);
}
?>

<?php
/**
 * Nutrexia Contact Form API Controller
 * Sends email notification to support@nutrexia.in & logs inquiry to Database if tables exist
 */

require_once __DIR__ . '/../includes/functions.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input'), true) ?? $_POST;

$name = sanitize($input['name'] ?? '');
$rawEmail = trim($input['email'] ?? '');
$rawPhone = trim($input['phone'] ?? '');
$subject = sanitize($input['subject'] ?? 'General Inquiry');
$message = sanitize($input['message'] ?? '');

// 1. Mandatory Fields Check
if (!$name || !$rawEmail || !$rawPhone || !$message) {
    jsonResponse(['error' => 'All fields (Full Name, Email Address, Phone Number, and Message) are required.'], 400);
}

// 2. Email Validation (Format + Spam/Disposable domain filter)
$email = filter_var($rawEmail, FILTER_VALIDATE_EMAIL);
if (!$email) {
    jsonResponse(['error' => 'Please enter a valid email address (e.g. name@gmail.com).'], 400);
}

$emailParts = explode('@', strtolower($email));
$domain = end($emailParts);

$disposableDomains = [
    'tmail.io', 'tmail.com', 'tmailor.com', 'tmail.ws', 'tmail.link', 'tmpmail.org', 'tmpmail.net',
    'tempmail.com', 'temp-mail.org', 'mailinator.com', '10minutemail.com', 'guerrillamail.com',
    'dispostable.com', 'trashmail.com', 'yopmail.com', 'sharklasers.com', 'throwawaymail.com',
    'getnada.com', 'binkmail.com', 'maildrop.cc', 'fakeinbox.com', 'tempinbox.com', 'generator.email',
    'burnermail.io', 'mytemp.email', 'crazymailing.com', 'inboxalias.com', 'mohmal.com',
    'disposablemail.com', 'guerrillamailblock.com', 'guerrillamail.net', 'guerrillamail.org',
    'disposable.com', 'fake.com', 'test.com', 'example.com', 'invalid.com', 'mailnesia.com'
];

if (in_array($domain, $disposableDomains)) {
    jsonResponse(['error' => 'Spam or temporary email addresses (@' . htmlspecialchars($domain) . ') are not accepted. Please use a legitimate email address (Gmail, Yahoo, Outlook, work email, etc.).'], 400);
}

if (!preg_match('/^[a-z0-9.-]+\.[a-z]{2,}$/', $domain)) {
    jsonResponse(['error' => 'Please enter a valid email address with a recognized domain name.'], 400);
}

// Live DNS MX Check: Ensures the domain has active mail server records on the Internet
if (function_exists('checkdnsrr')) {
    if (!@checkdnsrr($domain, 'MX') && !@checkdnsrr($domain, 'A')) {
        jsonResponse(['error' => 'The email domain (@' . htmlspecialchars($domain) . ') does not exist or has no active mail server. Please enter a valid email address.'], 400);
    }
}

// 3. Indian Phone Number Validation (Mandatory 10-digit starting 6, 7, 8, 9)
$cleanPhone = preg_replace('/[^\d]/', '', $rawPhone);
if (strlen($cleanPhone) === 12 && substr($cleanPhone, 0, 2) === '91') {
    $cleanPhone = substr($cleanPhone, 2);
} else if (strlen($cleanPhone) === 11 && substr($cleanPhone, 0, 1) === '0') {
    $cleanPhone = substr($cleanPhone, 1);
}

if (!preg_match('/^[6-9]\d{9}$/', $cleanPhone)) {
    jsonResponse(['error' => 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9 (e.g. 9876543210).'], 400);
}

$phone = $cleanPhone;

// 1. Send HTML Email Notification to support@nutrexia.in FIRST
$to = 'support@nutrexia.in';
$mailSubject = "Website Inquiry: " . $subject . " - " . $name;

$htmlContent = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Website Inquiry</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #FAF6EA; padding: 20px; color: #181712;">
  <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; padding: 30px; border: 1px solid rgba(24,23,18,0.12); box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
    <div style="border-bottom: 2px solid #3F7A1F; padding-bottom: 15px; margin-bottom: 20px;">
      <h2 style="color: #2C5715; margin: 0; font-size: 22px;">🌾 New Nutrexia Website Inquiry</h2>
    </div>
    
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
      <tr>
        <td style="padding: 8px 0; font-weight: bold; width: 130px; color: #555;">Full Name:</td>
        <td style="padding: 8px 0; font-weight: 600; color: #181712;">' . htmlspecialchars($name) . '</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #555;">Email Address:</td>
        <td style="padding: 8px 0; font-weight: 600; color: #2C5715;"><a href="mailto:' . htmlspecialchars($email) . '">' . htmlspecialchars($email) . '</a></td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #555;">Phone Number:</td>
        <td style="padding: 8px 0; color: #181712;">' . htmlspecialchars($phone ?: 'Not provided') . '</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #555;">Subject:</td>
        <td style="padding: 8px 0; font-weight: 600; color: #181712;">' . htmlspecialchars($subject) . '</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; font-weight: bold; color: #555;">Submitted At:</td>
        <td style="padding: 8px 0; color: #777;">' . date('Y-m-d H:i:s T') . '</td>
      </tr>
    </table>

    <div style="background: #F1ECDB; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
      <h4 style="margin: 0 0 8px 0; color: #181712; font-size: 14px;">Message Body:</h4>
      <p style="margin: 0; line-height: 1.6; font-size: 14px; white-space: pre-wrap; color: #2A2822;">' . nl2br(htmlspecialchars($message)) . '</p>
    </div>

    <div style="font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 15px; text-align: center;">
      This message was sent automatically from the contact form on <b>nutrexia.in</b>.
    </div>
  </div>
</body>
</html>
';

// Send Email Notification via SMTP / Fail-safe PHP mailer
$mailSent = sendNutrexiaEmail($to, $mailSubject, $htmlContent, $email, $name);

// 2. Try to log to database if tables exist (wrapped in try-catch so DB failure won't block email acknowledgment)
try {
    $db = getDBConnection();
    if ($db) {
        $convId = generateUuid();
        $stmtConv = $db->prepare("
            INSERT INTO `conversation` (id, guest_email, subject, status)
            VALUES (:id, :email, :subj, 'OPEN')
        ");
        $stmtConv->execute([
            'id' => $convId,
            'email' => $email,
            'subj' => '[' . $subject . '] Inquiry from ' . $name
        ]);

        $stmtMsg = $db->prepare("
            INSERT INTO `message` (id, conversation_id, sender, content)
            VALUES (:id, :conv_id, 'GUEST', :content)
        ");
        $stmtMsg->execute([
            'id' => generateUuid(),
            'conv_id' => $convId,
            'content' => "Phone: " . ($phone ?: 'N/A') . "\n\n" . $message
        ]);
    }
} catch (\Throwable $e) {
    // Silently handle missing DB tables or DB failure; email is primary channel
    error_log("Contact API DB logging error (ignored): " . $e->getMessage());
}

jsonResponse([
    'success' => true,
    'message' => 'Thank you for reaching out! Your message has been sent to support@nutrexia.in. We will respond shortly.'
]);
?>

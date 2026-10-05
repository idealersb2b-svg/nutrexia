<?php
/**
 * Nutrexia Contact Form API Controller
 * Saves inquiry to Database & Emails support@nutrexia.in
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
$subject = sanitize($input['subject'] ?? 'General Inquiry');
$message = sanitize($input['message'] ?? '');

if (!$name || !$email || !$message) {
    jsonResponse(['error' => 'Please fill in all required fields (Name, Email, Message)'], 400);
}

try {
    $db = getDBConnection();
    
    // 1. Save to Database (conversation & message tables)
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

    // 2. Send HTML Email Notification to support@nutrexia.in
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

    // Headers for HTML Mail & Direct Reply-To
    $headers = array(
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: Nutrexia Website <no-reply@nutrexia.in>',
        'Reply-To: ' . $name . ' <' . $email . '>',
        'X-Mailer: PHP/' . phpversion()
    );

    @mail($to, $mailSubject, $htmlContent, implode("\r\n", $headers));

    jsonResponse([
        'success' => true,
        'message' => 'Thank you for reaching out! Your message has been sent to support@nutrexia.in. We will respond shortly.'
    ]);

} catch (\Exception $e) {
    jsonResponse(['error' => 'Failed to submit contact message: ' . $e->getMessage()], 500);
}
?>

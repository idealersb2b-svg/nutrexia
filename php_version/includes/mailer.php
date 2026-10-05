<?php
/**
 * Nutrexia Helper Mailer
 * Handles email delivery via SMTP (smtp.hostinger.com) with PHP mail() fallback
 */

if (!defined('SMTP_HOST')) define('SMTP_HOST', 'smtp.hostinger.com');
if (!defined('SMTP_PORT')) define('SMTP_PORT', 465);
if (!defined('SMTP_USER')) define('SMTP_USER', 'support@nutrexia.in');
if (!defined('SMTP_PASS')) define('SMTP_PASS', 'Kharghar@2020'); // Hostinger Email Password

/**
 * Send Email via Direct Socket SMTP (SSL on port 465)
 */
function sendMailViaSMTP($to, $subject, $htmlBody, $replyToEmail = null, $replyToName = null) {
    $smtpHost = SMTP_HOST;
    $smtpPort = SMTP_PORT;
    $smtpUser = SMTP_USER;
    $smtpPass = SMTP_PASS;

    if (empty($smtpUser) || empty($smtpPass)) {
        return false;
    }

    $socket = @fsockopen("ssl://" . $smtpHost, $smtpPort, $errno, $errstr, 8);
    if (!$socket) {
        // Try TLS port 587 if SSL 465 failed
        $socket = @fsockopen($smtpHost, 587, $errno, $errstr, 8);
        if (!$socket) {
            return false;
        }
    }

    $read = function($sock) {
        $data = "";
        while ($str = fgets($sock, 512)) {
            $data .= $str;
            if (substr($str, 3, 1) == " ") break;
        }
        return $data;
    };

    $send = function($sock, $cmd) use ($read) {
        fputs($sock, $cmd . "\r\n");
        return $read($sock);
    };

    $greeting = $read($socket);
    if (substr($greeting, 0, 3) !== '220') {
        fclose($socket);
        return false;
    }

    $hostName = $_SERVER['SERVER_NAME'] ?? 'nutrexia.in';
    $send($socket, "EHLO " . $hostName);

    $authResp = $send($socket, "AUTH LOGIN");
    if (substr($authResp, 0, 3) !== '334') {
        fclose($socket);
        return false;
    }

    $send($socket, base64_encode($smtpUser));
    $passResp = $send($socket, base64_encode($smtpPass));
    if (substr($passResp, 0, 3) !== '235') {
        fclose($socket);
        return false;
    }

    $send($socket, "MAIL FROM: <" . $smtpUser . ">");
    $send($socket, "RCPT TO: <" . $to . ">");
    $send($socket, "DATA");

    $headers = [
        "MIME-Version: 1.0",
        "Content-Type: text/html; charset=UTF-8",
        "From: Nutrexia Support <" . $smtpUser . ">",
        "To: <" . $to . ">",
        "Subject: " . $subject,
        "Date: " . date("r")
    ];

    if ($replyToEmail) {
        $headers[] = "Reply-To: " . ($replyToName ? "$replyToName <$replyToEmail>" : $replyToEmail);
    }

    $message = implode("\r\n", $headers) . "\r\n\r\n" . $htmlBody . "\r\n.";
    $send($socket, $message);
    $send($socket, "QUIT");
    fclose($socket);

    return true;
}

/**
 * Robust Fail-safe Nutrexia Email Delivery Function
 */
function sendNutrexiaEmail($to, $subject, $htmlContent, $replyToEmail = null, $replyToName = null) {
    // 1. First attempt: Direct SMTP socket send
    try {
        $smtpResult = sendMailViaSMTP($to, $subject, $htmlContent, $replyToEmail, $replyToName);
        if ($smtpResult) {
            return true;
        }
    } catch (\Throwable $e) {
        error_log("SMTP send error: " . $e->getMessage());
    }

    // 2. Second attempt: Native PHP mail() with strict From & envelope sender -f support@nutrexia.in
    $fromEmail = SMTP_USER ?: 'support@nutrexia.in';
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: Nutrexia Support <' . $fromEmail . '>',
        'X-Mailer: PHP/' . phpversion()
    ];

    if ($replyToEmail) {
        $headers[] = 'Reply-To: ' . ($replyToName ? "$replyToName <$replyToEmail>" : $replyToEmail);
    }

    $sent = @mail($to, $subject, $htmlContent, implode("\r\n", $headers), "-f" . $fromEmail);
    return $sent;
}
?>

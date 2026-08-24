<?php
function sanitize_header($value) {
  return str_replace(["\r", "\n"], '', (string) $value);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  if (isset($_POST['action']) && $_POST['action'] === 'career-application') {
    $name = sanitize_header($_POST['name'] ?? '');
    $whatsapp = sanitize_header($_POST['whatsapp'] ?? '');
    $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL) ?: '';
    $notificacoes = isset($_POST['notificacoes']) ? 'Sim' : 'Não';

    $to = "rh@arxadm.com.br";
    $subject = "Nova candidatura - Trabalhe conosco";
    $boundary = md5(uniqid((string) time(), true));

    $headers = "From: Site Ancore <rh@arxadm.com.br>\r\n";
    if ($email) {
      $headers .= "Reply-To: " . sanitize_header($email) . "\r\n";
    }
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    $messageBody = "
      <strong>Nome:</strong> " . htmlspecialchars($name) . "<br>
      <strong>WhatsApp:</strong> " . htmlspecialchars($whatsapp) . "<br>
      <strong>Email:</strong> " . htmlspecialchars($email) . "<br>
      <strong>Aceita receber notificações:</strong> $notificacoes<br>
    ";

    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $messageBody . "\r\n\r\n";

    if (isset($_FILES['curriculo']) && $_FILES['curriculo']['error'] === UPLOAD_ERR_OK) {
      $fileTmpPath = $_FILES['curriculo']['tmp_name'];
      $fileName = basename($_FILES['curriculo']['name']);
      $fileType = $_FILES['curriculo']['type'] ?: 'application/octet-stream';
      $fileContent = chunk_split(base64_encode(file_get_contents($fileTmpPath)));

      $body .= "--$boundary\r\n";
      $body .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
      $body .= "Content-Transfer-Encoding: base64\r\n";
      $body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
      $body .= $fileContent . "\r\n\r\n";
    }

    $body .= "--$boundary--";

    if (mail($to, $subject, $body, $headers)) {
      echo "success";
    } else {
      echo "error";
    }
  } elseif (isset($_POST['action']) && $_POST['action'] === 'subscribe') {
    $email = $_POST["email"];
    $subject = "Subject Subscribe Email"; // Replace your Subject Here
    $to = "recipient@example.com"; // Replace with your email
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-type: text/html\r\n";
    $message = "Subscribe Email " . $email;

    $messageBody = "Email: $email<br>Message: $message";

    if (mail($to, $subject, $messageBody, $headers)) {
      echo "success";
    } else {
      echo "error";
    }
  } elseif (isset($_POST['action']) && $_POST['action'] === 'contact-full') {
    // New full contact form
    $name = $_POST['fullname'];
    $email = $_POST["emailaddress"];
    $phone = $_POST["phone"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    $to = "recipient@example.com"; // Replace with your email
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-type: text/html\r\n";

    $messageBody = "
      <strong>Name:</strong> $name<br>
      <strong>Email:</strong> $email<br>
      <strong>Phone:</strong> $phone<br>
      <strong>Subject:</strong> $subject<br>
      <strong>Message:</strong><br>$message
    ";

    if (mail($to, $subject, $messageBody, $headers)) {
      echo "success";
    } else {
      echo "error";
    }
  } else {
    // Handle other (maybe legacy) form
    $name = $_POST['name'];
    $email = $_POST["email"];
    $message = $_POST["message"];
    $service = $_POST["service"];
    $subject = "Service Inquiry";

    $to = "recipient@example.com"; // Replace with your email
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-type: text/html\r\n";

    $messageBody = "
      <strong>Name:</strong> $name<br>
      <strong>Email:</strong> $email<br>
      <strong>Service:</strong> $service<br>
      <strong>Message:</strong><br>$message
    ";

    if (mail($to, $subject, $messageBody, $headers)) {
      echo "success";
    } else {
      echo "error";
    }
  }
}

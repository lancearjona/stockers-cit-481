<?php 
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];
  $formcontent="From: $name \n Message: $message";
  $recipient = $_POST['ninushki@gmail.com'];

  $email_from = "name";
  $subject = "Contact Form";
  $mailheader = "From: $email \r\n";
  $email_to = $recipient;
  
  mail($email_from, $subject, $formcontent, $mailheader, email_to) or die("Error!");
  echo "Thank You!";
?>

<?php 
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];
  $formcontent="From: $name \n Message: $message";
  $recipient = "nino.shtromberg.598@my.csun.edu";

  $email_from = "name";
  $subject = "Contact Form";
  $mailheader = "From: $email \r\n";
  $email_to = $recipient;
  
  mail($email_from, $subject, $formcontent, $mailheader, $email_to) or die("Error!");
  echo "Thank You for contacting us, one of our representatives will contact you soon!";
?>

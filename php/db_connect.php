<?php
$host = 'localhost';
$db = 'task_manager_db';
$user = 'root';
$pass = '123456@Abc';
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset("utf8mb4");
?>

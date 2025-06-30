<?php
$host = 'localhost';
$db   = 'task_manager_db';
$user = 'root';
$pass = '123456@Abc'; // điền mật khẩu nếu có
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    die('Lỗi kết nối DB: ' . $e->getMessage());
}
?>

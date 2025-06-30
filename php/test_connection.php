<?php
// Bật hiển thị lỗi
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Thông tin kết nối
$host = 'localhost';
$db   = 'task_manager_db';   // Đảm bảo database này đã được tạo trong phpMyAdmin
$user = 'root';
$pass = '123456@Abc';         // Đúng mật khẩu của MySQL
$charset = 'utf8mb4';

// Tạo kết nối
$conn = new mysqli($host, $user, $pass, $db);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("❌ Kết nối thất bại: " . $conn->connect_error);
} else {
    echo "✅ Kết nối thành công tới database!";
}

// Đóng kết nối
$conn->close();
?>

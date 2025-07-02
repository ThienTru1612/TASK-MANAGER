<?php
// Bắt đầu session nếu chưa được bắt đầu
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

function check_logged_in() {
    // Kiểm tra cả 'user_id' và cờ 'logged_in' để đảm bảo session hợp lệ
    if (!isset($_SESSION['user_id']) || $_SESSION['logged_in'] !== true) {
        // Chuyển hướng về trang đăng nhập/giới thiệu
        header("Location: ../html/index.html"); // Vẫn chuyển hướng về index.html
        exit(); // Dừng thực thi script ngay lập tức
    }
}
?>
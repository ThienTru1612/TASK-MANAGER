<?php
// 1. Include auth.php để kiểm tra trạng thái đăng nhập
// auth.php nằm cùng cấp với dashboard_protected.php trong thư mục php
require_once 'auth.php';
check_logged_in(); // Gọi hàm kiểm tra đăng nhập

// 2. Nếu người dùng đã đăng nhập (hàm check_logged_in không chuyển hướng),
//    thì đọc và xuất nội dung của dashboard.html
// dashboard.html nằm trong thư mục html, tức là lùi 1 cấp rồi vào html
readfile('../html/dashboard.html');
exit(); // Dừng thực thi script sau khi gửi nội dung HTML
?>
<?php
session_start();

// Hủy bỏ tất cả các biến session
$_SESSION = array();

// Nếu muốn hủy bỏ session hoàn toàn, cũng xóa cookie session.
// Lưu ý: Điều này sẽ phá hủy session, và không chỉ dữ liệu session.
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Cuối cùng, hủy session.
session_destroy();

// Xóa username khỏi sessionStorage của trình duyệt
echo "<script>sessionStorage.removeItem('loggedInUsername');</script>";

// Chuyển hướng về trang đăng nhập
header("Location: ../html/index.html"); // Đã điều chỉnh đường dẫn
exit();
?>
<?php
session_start();
include 'db_connect.php'; // Kết nối cơ sở dữ liệu

header('Content-Type: application/json');
$response = ['status' => 'error', 'message' => ''];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = trim($_POST['email'] ?? ''); // Lấy email thay vì username
    $password = $_POST['password'] ?? '';
    $remember_me = $_POST['remember_me'] ?? '0'; // '1' nếu checkbox được chọn, '0' nếu không

    // Lấy địa chỉ IP của người dùng để theo dõi số lần thử đăng nhập
    $ip_address = $_SERVER['REMOTE_ADDR'];

    if (empty($email) || empty($password)) {
        $response['message'] = 'Vui lòng điền đầy đủ email và mật khẩu.';
        echo json_encode($response);
        exit();
    }

    // Ghi lại mỗi lần thử đăng nhập
    $insert_attempt_stmt = $conn->prepare("INSERT INTO login_attempts (ip_address, username, success) VALUES (?, ?, ?)");
    $is_success_attempt = FALSE; // Mặc định là thất bại

    // Sử dụng prepared statement để ngăn chặn SQL Injection
    // Thay đổi truy vấn để tìm kiếm theo email
    $stmt = $conn->prepare("SELECT id, username, email, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email); // Bind email
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        // Xác minh mật khẩu băm
        if (password_verify($password, $user['password'])) {
            // Đăng nhập thành công, tạo session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username']; // Vẫn lưu username vào session
            $_SESSION['logged_in'] = true; // Đặt cờ logged_in

            $response['status'] = 'success';
            $response['message'] = 'Đăng nhập thành công!';
            $response['username'] = $user['username']; // Trả về username cho frontend

            $is_success_attempt = TRUE; // Đánh dấu là thành công

            // --- Logic "Ghi nhớ đăng nhập" (Remember Me) ---
            if ($remember_me === '1') {
                // Tạo token "remember me"
                $selector = bin2hex(random_bytes(8)); // Phần công khai
                $authenticator = random_bytes(32); // Phần riêng tư
                $hashed_authenticator = hash('sha256', $authenticator);

                // Thời gian hết hạn của token (ví dụ: 30 ngày)
                $expiry_date = date('Y-m-d H:i:s', strtotime('+30 days'));

                // Lưu token vào bảng persistent_logins
                $insert_token_stmt = $conn->prepare("INSERT INTO persistent_logins (user_id, selector, token, expires) VALUES (?, ?, ?, ?)");
                $insert_token_stmt->bind_param("isss", $user['id'], $selector, $hashed_authenticator, $expiry_date);
                $insert_token_stmt->execute();
                $insert_token_stmt->close();

                // Đặt cookie cho trình duyệt
                setcookie(
                    'remember_me',
                    $selector . ':' . base64_encode($authenticator),
                    [
                        'expires' => strtotime('+30 days'),
                        'path' => '/',
                        'secure' => true, // Chỉ gửi qua HTTPS
                        'httponly' => true, // Không thể truy cập bằng JavaScript
                        'samesite' => 'Lax' // Bảo vệ CSRF
                    ]
                );
            } else {
                // Nếu không chọn "Ghi nhớ đăng nhập", đảm bảo cookie "remember_me" bị xóa
                if (isset($_COOKIE['remember_me'])) {
                    setcookie('remember_me', '', time() - 3600, '/');
                }
            }

        } else {
            // Thông báo lỗi chung chung để tăng cường bảo mật
            $response['message'] = 'Email hoặc mật khẩu không hợp lệ.';
        }
    } else {
        // Thông báo lỗi chung chung để tăng cường bảo mật
        $response['message'] = 'Email hoặc mật khẩu không hợp lệ.';
    }

    // Ghi lại kết quả của lần thử đăng nhập
    $insert_attempt_stmt->bind_param("ssi", $ip_address, $email, $is_success_attempt); // Ghi lại email
    $insert_attempt_stmt->execute();
    $insert_attempt_stmt->close();

} else {
    $response['message'] = 'Phương thức yêu cầu không hợp lệ.';
}

$conn->close();
echo json_encode($response);

?>
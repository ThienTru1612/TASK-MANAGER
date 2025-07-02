<?php
session_start();
include 'db_connect.php'; // Kết nối cơ sở dữ liệu

// Import PHPMailer classes into the global namespace
// (Đã bỏ PHPMailer nếu không cần gửi email, nhưng vẫn giữ autoload nếu có các thư viện khác cần)
// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// require __DIR__ . '/../vendor/autoload.php'; // Có thể bỏ nếu không dùng Composer cho bất kỳ thứ gì khác

header('Content-Type: application/json');
$response = ['status' => 'error', 'message' => ''];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';

    // (Đã bỏ các xác thực chi tiết như độ dài username, email hợp lệ, phức tạp mật khẩu)
    // Chỉ kiểm tra các trường cơ bản và mật khẩu khớp
    if (empty($username) || empty($email) || empty($password) || empty($confirm_password)) {
        $response['message'] = 'Vui lòng điền đầy đủ thông tin đăng ký.';
        echo json_encode($response);
        exit();
    }

    if ($password !== $confirm_password) {
        $response['message'] = 'Mật khẩu xác nhận không khớp.';
        echo json_encode($response);
        exit();
    }

    // Kiểm tra xem email hoặc username đã tồn tại trong bảng users chưa
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $response['message'] = 'Tên người dùng hoặc Email đã tồn tại. Vui lòng chọn thông tin khác.';
        echo json_encode($response);
        exit();
    }
    $stmt->close();

    // Băm mật khẩu trước khi lưu
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Tiến hành lưu thông tin người dùng vào bảng `users`
    $insert_user_stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $insert_user_stmt->bind_param("sss", $username, $email, $hashed_password);

    if ($insert_user_stmt->execute()) {
        $user_id = $conn->insert_id; // Lấy ID của người dùng vừa đăng ký

        // Đăng ký thành công, tự động đăng nhập người dùng
        $_SESSION['user_id'] = $user_id;
        $_SESSION['username'] = $username; // Lưu username vào session
        $_SESSION['logged_in'] = true; // Đặt cờ logged_in

        $response['status'] = 'success';
        $response['message'] = 'Đăng ký thành công! Bạn đã được đăng nhập.';
        $response['username'] = $username; // Trả về username cho frontend

        // Tự động thiết lập "Ghi nhớ đăng nhập" sau khi đăng ký
        $selector = bin2hex(random_bytes(8)); // Phần công khai
        $authenticator = random_bytes(32); // Phần riêng tư
        $hashed_authenticator = hash('sha256', $authenticator);

        // Thời gian hết hạn của token (ví dụ: 30 ngày)
        $expiry_date = date('Y-m-d H:i:s', strtotime('+30 days'));

        // Lưu token vào bảng persistent_logins
        $insert_token_stmt = $conn->prepare("INSERT INTO persistent_logins (user_id, selector, token, expires) VALUES (?, ?, ?, ?)");
        $insert_token_stmt->bind_param("isss", $user_id, $selector, $hashed_authenticator, $expiry_date);
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
        $response['message'] = 'Lỗi khi lưu thông tin người dùng: ' . $insert_user_stmt->error;
    }
    $insert_user_stmt->close();

} else {
    $response['message'] = 'Phương thức yêu cầu không hợp lệ.';
}

$conn->close();
echo json_encode($response);

?>
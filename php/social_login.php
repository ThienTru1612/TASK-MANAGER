<?php
session_start();
include 'db_connect.php'; // Kết nối cơ sở dữ liệu

header('Content-Type: application/json');
$response = ['status' => 'error', 'message' => ''];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $action = $_POST['action'] ?? '';

    switch ($action) {
        case 'google_login':
            $id_token = $_POST['id_token'] ?? '';

            if (empty($id_token)) {
                $response['message'] = 'Không tìm thấy Google ID token.';
                echo json_encode($response);
                exit();
            }

            // BƯỚC QUAN TRỌNG: XÁC MINH ID TOKEN VỚI GOOGLE API
            // Bạn cần cài đặt thư viện Google API Client cho PHP.
            // Cài đặt qua Composer: composer require google/apiclient "^2.0"
            // Sau đó, thêm dòng này vào đầu file (nếu chưa có):
            // require_once __DIR__ . '/../vendor/autoload.php';

            try {
                // Thay thế 'YOUR_GOOGLE_CLIENT_ID' bằng Client ID thực tế của bạn
                // Client ID này phải khớp với Client ID bạn đã đặt trong signin.html
                $CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; 

                // Khởi tạo Google Client
                $client = new Google_Client(['client_id' => $CLIENT_ID]);
                
                // Xác minh ID token
                $payload = $client->verifyIdToken($id_token);

                if ($payload) {
                    $google_id = $payload['sub']; // ID duy nhất của người dùng Google
                    $email = $payload['email'];
                    $name = $payload['name'] ?? $email; // Lấy tên hoặc dùng email nếu không có

                    // Kiểm tra xem người dùng đã tồn tại trong DB chưa
                    $stmt = $conn->prepare("SELECT id, username, email FROM users WHERE google_id = ? OR email = ? LIMIT 1");
                    $stmt->bind_param("ss", $google_id, $email);
                    $stmt->execute();
                    $result = $stmt->get_result();

                    if ($result->num_rows > 0) {
                        // Người dùng đã tồn tại, đăng nhập họ
                        $user = $result->fetch_assoc();
                        $_SESSION['user_id'] = $user['id'];
                        $_SESSION['username'] = $user['username']; // Hoặc dùng $name từ Google nếu muốn
                        $response['status'] = 'success';
                        $response['message'] = 'Đăng nhập bằng Google thành công!';
                        $response['username'] = $user['username'];
                    } else {
                        // Người dùng chưa tồn tại, đăng ký họ
                        // Tạo một username duy nhất, có thể dựa trên tên hoặc email
                        $new_username = str_replace(['.', '@'], '_', $email); // Thay thế ký tự không hợp lệ
                        $new_username = substr($new_username, 0, 40); // Giới hạn độ dài

                        // Đảm bảo username là duy nhất, thêm số nếu cần
                        $original_username = $new_username;
                        $counter = 1;
                        while (true) {
                            $check_username_stmt = $conn->prepare("SELECT id FROM users WHERE username = ? LIMIT 1");
                            $check_username_stmt->bind_param("s", $new_username);
                            $check_username_stmt->execute();
                            $check_username_result = $check_username_stmt->get_result();
                            if ($check_username_result->num_rows == 0) {
                                break;
                            }
                            $new_username = $original_username . $counter;
                            $counter++;
                        }
                        $check_username_stmt->close();

                        // Mật khẩu giả cho tài khoản Google (không cần mật khẩu thực vì đăng nhập qua Google)
                        // Có thể dùng một chuỗi ngẫu nhiên hoặc NULL nếu cột cho phép
                        $dummy_password = password_hash(random_bytes(32), PASSWORD_DEFAULT); 

                        $insert_stmt = $conn->prepare("INSERT INTO users (username, email, google_id, password) VALUES (?, ?, ?, ?)");
                        $insert_stmt->bind_param("ssss", $new_username, $email, $google_id, $dummy_password);

                        if ($insert_stmt->execute()) {
                            $_SESSION['user_id'] = $conn->insert_id;
                            $_SESSION['username'] = $new_username;
                            $response['status'] = 'success';
                            $response['message'] = 'Đăng ký và đăng nhập bằng Google thành công!';
                            $response['username'] = $new_username;
                        } else {
                            $response['message'] = 'Lỗi khi đăng ký người dùng Google: ' . $insert_stmt->error;
                        }
                        $insert_stmt->close();
                    }
                } else {
                    $response['message'] = 'Không thể xác minh Google ID token.';
                }
            } catch (Exception $e) {
                $response['message'] = 'Lỗi xác minh Google token: ' . $e->getMessage();
            }
            break;

        // Các case khác (ví dụ: facebook_login)
        default:
            $response['message'] = 'Hành động không xác định.';
            break;
    }
} else {
    $response['message'] = 'Phương thức yêu cầu không hợp lệ.';
}

$conn->close();
echo json_encode($response);

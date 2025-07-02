CREATE DATABASE IF NOT EXISTS task_manager_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Sử dụng database
USE task_manager_db;

-- Tạo bảng users
CREATE TABLE IF NOT EXISTS users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    facebook_id VARCHAR(255) UNIQUE NULL, -- Thêm cột cho liên kết Facebook
    google_id VARCHAR(255) UNIQUE NULL,   -- Thêm cột cho liên kết Google
    phone_number VARCHAR(20) NULL         -- Thêm cột cho số điện thoại
);

-- Tạo bảng otp_codes
CREATE TABLE IF NOT EXISTS otp_codes (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    otp_code VARCHAR(10) NOT NULL, -- Có thể cân nhắc băm OTP nếu cần bảo mật cao hơn
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME NOT NULL,
    is_used BOOLEAN DEFAULT FALSE
);

-- Tạo bảng tasks (ví dụ cho ứng dụng quản lý tác vụ)
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, -- Thêm user_id để liên kết tác vụ với người dùng
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    status ENUM('todo', 'inprogress', 'done') DEFAULT 'todo',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Khóa ngoại
);

-- Bảng mới: password_reset_tokens cho chức năng quên mật khẩu
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng mới: login_attempts để giới hạn số lần thử đăng nhập
CREATE TABLE IF NOT EXISTS login_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    attempt_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    username VARCHAR(50) NULL, -- Có thể lưu username để theo dõi
    success BOOLEAN NOT NULL DEFAULT FALSE -- True nếu đăng nhập thành công, False nếu thất bại
);

-- Bảng mới: persistent_logins cho chức năng "Ghi nhớ đăng nhập"
CREATE TABLE IF NOT EXISTS persistent_logins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    selector VARCHAR(12) NOT NULL UNIQUE, -- Phần công khai của token
    token VARCHAR(64) NOT NULL,           -- Phần riêng tư (hashed) của token
    expires DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Dữ liệu mẫu cho bảng tasks (có thể xóa nếu không cần)
INSERT INTO tasks (user_id, title, description, due_date, priority, status)
VALUES
(1, 'Hoàn thành báo cáo dự án', 'Viết báo cáo tổng kết môn học Lập trình Web', '2023-12-15', 'high', 'inprogress'),
(1, 'Thiết kế giao diện người dùng', 'Thiết kế wireframe cho ứng dụng quản lý tác vụ', '2023-12-10', 'medium', 'todo'),
(1, 'Kiểm thử tính năng đăng nhập', 'Kiểm tra tính năng đăng nhập với các trường hợp khác nhau', '2023-12-05', 'low', 'done');

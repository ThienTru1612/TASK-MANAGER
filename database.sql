-- Tạo database mới
CREATE DATABASE task_manager_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Sử dụng database
USE task_manager_db;

-- Tạo bảng tasks
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    status ENUM('todo', 'inprogress', 'done') DEFAULT 'todo'
);

INSERT INTO tasks (title, description, due_date, priority, status)
VALUES 
('Hoàn thành báo cáo dự án', 'Viết báo cáo tổng kết môn học Lập trình Web', '2023-12-15', 'high', 'inprogress'),
('Thiết kế giao diện người dùng', 'Thiết kế wireframe cho ứng dụng quản lý tác vụ', '2023-12-10', 'medium', 'todo'),
('Kiểm thử tính năng đăng nhập', 'Kiểm tra tính năng đăng nhập với các trường hợp khác nhau', '2023-12-05', 'low', 'done');

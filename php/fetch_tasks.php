<?php
require 'config.php'; // Kết nối cơ sở dữ liệu bằng PDO

$status = $_GET['status'] ?? 'all';
$keyword = $_GET['keyword'] ?? '';

$sql = "SELECT * FROM tasks WHERE 1=1";
$params = [];

if ($status !== 'all') {
    $sql .= " AND status = :status";
    $params[':status'] = $status;
}

if (!empty($keyword)) {
    // Sử dụng LIKE và placeholder để tránh SQL Injection
    $sql .= " AND title LIKE :keyword";
    $params[':keyword'] = '%' . $keyword . '%';
}

// Thêm sắp xếp nếu cần, ví dụ: ORDER BY created_at DESC
// $sql .= " ORDER BY created_at DESC";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $tasks = $stmt->fetchAll();
} catch (\PDOException $e) {
    // Xử lý lỗi truy vấn nếu cần
    error_log('Lỗi truy vấn tác vụ: ' . $e->getMessage());
    $tasks = []; // Trả về mảng rỗng nếu có lỗi
}

echo json_encode($tasks);
?>
<?php
require 'config.php'; // Kết nối cơ sở dữ liệu bằng PDO

$stats = [
  'total' => 0,
  'done' => 0,
  'inprogress' => 0 // Đã sửa 'doing' thành 'inprogress' theo tên ENUM trong CSDL
];

try {
    // Không cần bind parameter vì không có input từ người dùng
    $stmt = $pdo->query("SELECT status, COUNT(*) as count FROM tasks GROUP BY status");
    $results = $stmt->fetchAll();

    foreach ($results as $row) {
        $stats['total'] += $row['count'];
        if ($row['status'] == 'done') {
            $stats['done'] = $row['count'];
        }
        if ($row['status'] == 'inprogress') { // Đảm bảo khớp với ENUM trong CSDL
            $stats['inprogress'] = $row['count'];
        }
    }
} catch (\PDOException $e) {
    // Xử lý lỗi truy vấn nếu cần
    error_log('Lỗi truy vấn thống kê Dashboard: ' . $e->getMessage());
    // Có thể trả về một phản hồi lỗi thân thiện hơn cho frontend
}

echo json_encode($stats);
?>
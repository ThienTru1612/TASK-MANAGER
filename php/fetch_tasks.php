<?php
include 'db_connect.php';

$status = $_GET['status'] ?? 'all';
$keyword = $_GET['keyword'] ?? '';

$sql = "SELECT * FROM tasks WHERE 1=1";

if ($status !== 'all') {
  $sql .= " AND status = '$status'";
}

if (!empty($keyword)) {
  $sql .= " AND title LIKE '%$keyword%'";
}

$result = $conn->query($sql);

$tasks = [];
while ($row = $result->fetch_assoc()) {
  $tasks[] = $row;
}

echo json_encode($tasks);
$conn->close();
?>

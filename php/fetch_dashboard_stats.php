<?php
include 'db_connect.php';

$stats = [
  'total' => 0,
  'done' => 0,
  'doing' => 0
];

$sql = "SELECT status, COUNT(*) as count FROM tasks GROUP BY status";
$result = $conn->query($sql);

while ($row = $result->fetch_assoc()) {
  $stats['total'] += $row['count'];
  if ($row['status'] == 'done') $stats['done'] = $row['count'];
  if ($row['status'] == 'doing') $stats['doing'] = $row['count'];
}

echo json_encode($stats);
$conn->close();
?>

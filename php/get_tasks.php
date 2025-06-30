<?php
require 'config.php';

$stmt = $pdo->query("SELECT * FROM tasks ORDER BY due_date ASC");
$tasks = $stmt->fetchAll();

echo json_encode($tasks);
?>

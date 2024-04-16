<?php
// Customers.php
header('Content-Type: application/json');

// Sample customer data (replace this with your actual data retrieval logic)
$customers = [
    ["id" => 1, "name" => "John Doe", "email" => "john@example.com", "phone" => "123-456-7890", "city" => "New York"],
    ["id" => 2, "name" => "Jane Smith", "email" => "jane@example.com", "phone" => "987-654-3210", "city" => "Los Angeles"],
    ["id" => 3, "name" => "Mike Johnson", "email" => "mike@example.com", "phone" => "456-789-0123", "city" => "Chicago"]
];

echo json_encode($customers);
?>
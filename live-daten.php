<?php

require_once 'config.php';

try {
    $pdo = new PDO($dsn, $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $query = "SELECT wasserfluss, temperatur, lufttemperatur FROM Surfo ORDER BY id DESC LIMIT 1";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $wasserfluss = floatval($result['wasserfluss']);
    $temperatur = floatval($result['temperatur']);
    $lufttemperatur = floatval($result['lufttemperatur']);
    
    $data = [
        'wasserfluss' => $wasserfluss,
        'temperatur' => $temperatur,
        'lufttemperatur' => $lufttemperatur
    ];

    $allData = json_encode(['data' => $data]);

    echo $allData;
    
} catch (PDOException $e) {
    die("ERROR: Could not able to execute $query. " . $e->getMessage());
}

    


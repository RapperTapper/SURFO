<?php

require_once 'config.php';

try {
    $pdo = new PDO($dsn, $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $query = "SELECT wasserfluss, temperatur, lufttemperatur, unixtime FROM Surfo ORDER BY id DESC LIMIT 1";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // print_r($result);

    $liveWasserfluss = floatval($result['wasserfluss']);
    $liveTemperatur = floatval($result['temperatur']);
    $liveLufttemperatur = floatval($result['lufttemperatur']);
    $liveUnixtime = intval($result['unixtime']);
    
    $data = [
        'liveWasserfluss' => $liveWasserfluss,
        'liveTemperatur' => $liveTemperatur,
        'liveLufttemperatur' => $liveLufttemperatur,
        'liveUnixtime' => $liveUnixtime
    ];

    $allData = json_encode(['data' => $data]);

    echo $allData;
    
} catch (PDOException $e) {
    die("ERROR: Could not able to execute $query. " . $e->getMessage());
}

    


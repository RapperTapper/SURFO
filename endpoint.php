<?php



require_once 'config.php';

try {
    $wasserfluss = [];
    $temperatur = [];
    $lufttemperatur = [];
    $unixtime = [];

    $pdo = new PDO($dsn, $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $query = "SELECT wasserfluss, temperatur, lufttemperatur, unixtime FROM Surfo";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // print_r($result);
    foreach ($result as $row) {
        $wasserfluss[] = $row['wasserfluss'];
        $temperatur[] = $row['temperatur'];
        $lufttemperatur[] = $row['lufttemperatur'];
        $unixtime[] = $row['unixtime'];
        
    }

    // print_r($wasserfluss);
    // print_r($temperatur);
    // print_r($lufttemperatur);
    // print_r($unixtime);

    $wasserflussJson = json_encode(array_map('floatval', $wasserfluss));
    $temperaturJson = json_encode(array_map('floatval', $temperatur));
    $lufttemperaturJson = json_encode(array_map('floatval', $lufttemperatur));
    $unixtimeJson = json_encode(array_map('floatval', $unixtime));

    echo $wasserflussJson;
    echo $temperaturJson;
    echo $lufttemperaturJson;
    echo $unixtimeJson;

} catch (PDOException $e) {
    die("ERROR: Could not able to execute $query. " . $e->getMessage());
}



    


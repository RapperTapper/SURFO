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
    // Code V02
    $data = [
        'wasserfluss' => array_map('floatval', $wasserfluss),
        'temperatur' => array_map('floatval', $temperatur),
        'lufttemperatur' => array_map('floatval', $lufttemperatur),
        'unixtime' => array_map('floatval', $unixtime),
    ];
    // Code V02
    $allData = json_encode($data);

    // print_r($wasserfluss);
    // print_r($temperatur);
    // print_r($lufttemperatur);
    // print_r($unixtime);

    // Code V01
    // $wasserflussJson = json_encode(array_map('floatval', $wasserfluss));
    // $temperaturJson = json_encode(array_map('floatval', $temperatur));
    // $lufttemperaturJson = json_encode(array_map('floatval', $lufttemperatur));
    // $unixtimeJson = json_encode(array_map('floatval', $unixtime));
    
    // Code V01
    // echo $wasserflussJson;
    // echo $temperaturJson;
    // echo $lufttemperaturJson;
    // echo $unixtimeJson;

    // Code V02
    echo $allData;

    // Code to print the latest data - just for testing
    // echo "<br>";
    // echo "<br>";
    // echo "Data successfully retrieved";
    // echo "<br>";
    // echo "Latest wasserfluss: " . end($data['wasserfluss']);
    // echo "<br>";
    // echo "Latest temperatur: " . end($data['temperatur']);
    // echo "<br>";
    // echo "Latest lufttemperatur: " . end($data['lufttemperatur']);
    // echo "<br>";
    // echo "Latest unixtime: " . end($data['unixtime']);
    // echo "<br>";

    // Code to print the latest data from my json object - just for testing
    $decodedData = json_decode($allData, true);
    
    echo "<br>";
    echo "<br>";
    echo "Latest wasserfluss: " . end($decodedData['wasserfluss']);
    echo "<br>";
    echo "Latest temperatur: " . end($decodedData['temperatur']);
    echo "<br>";
    echo "Latest lufttemperatur: " . end($decodedData['lufttemperatur']);
    echo "<br>";
    echo "Latest unixtime: " . end($decodedData['unixtime']);
    echo "<br>";

} catch (PDOException $e) {
    die("ERROR: Could not able to execute $query. " . $e->getMessage());
}



    


<?php

// include transform.php
include 'transform.php';

// requiere once config.php
require_once 'config.php';

// echo $weather_data;


try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);

    // SQL-Query mit Platzhaltern für das Einfügen von Daten
    $sql = "INSERT INTO Surfo (temperatur, wasserfluss, vorhersage2h, lufttemperatur, aareguruTime) VALUES (?, ?, ?, ?, ?)";

    // Bereitet die SQL-Anweisung vor
    $stmt = $pdo->prepare($sql);

    // Fügt jedes Element im Array in die Datenbank ein
    foreach ($aareguru_data as $item) {
        $stmt->execute([
            $item['temperatur'],
            $item['wasserfluss'],
            $item['vorhersage2h'],
            $item['lufttemperatur'],
            $item['aareguruTime']
        ]);
    }

    echo "Daten erfolgreich eingefügt.";

} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}
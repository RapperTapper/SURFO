<?php

// include transform.php
include 'transform.php';

// requiere once config.php
require_once 'config.php';

// echo $aareguru_data;

try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $db_user, $db_pass, $options);

    //insert data into table
    // get data from table, check if aareguruTime is already in the table, if not insert data

    $sql = "SELECT * FROM Surfo ORDER BY aareguruTime DESC LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $last_aareguru_data = $stmt->fetch();

    // echo $last_aareguru_data['aareguruTime'];
    // echo "<br>";

    if (!isset($last_aareguru_data['aareguruTime']) || $last_aareguru_data['aareguruTime'] != $aareguru_data[0]['aareguruTime']) {
        echo "Daten sind noch nicht in der Tabelle.";
        echo "<br>";
    

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
    } else {
        echo "Daten sind bereits in der Tabelle.";
    }
    } catch (PDOException $e) {
        die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}
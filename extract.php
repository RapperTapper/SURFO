<?php
// 2 Fragen in den Kommentaren für Coaching
$url = "https://aareguru.existenz.ch/v2018/widget?app=surfo.app.ch&version=1.0.42";

// curl
$ch = curl_init($url);

// curl options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$output = curl_exec($ch);

// echo $output;

// Speichere alle Daten in Variablen
$data = json_decode($output, true); // decode the JSON feed

// make new arry with needed information
$aareguru_data = [];

// was passiert, wenn wir keinen Wert zurück erhalten für thun?
$thun_data = $data['values']['thun']; // get the data for Thun

// wir sammeln keine Ortsdaten, sondern nur die Werte. Falls zu einem späteren Zeitpunk ein weiterer Ort hinzugefügt wird, muss dieser Code hier ergänzt werden.
// Wie würden wir hier die Daten kontrollieren, ob sie vorhanden sind bzw. in der richtigen Form vorliegen?
$temperature = $thun_data['temperature']; // get the temperature
$flow = $thun_data['flow']; // get the flow
$forecast2h = $thun_data['forecast2h']; // get the forecast2h
$tt = $thun_data['tt']; // get the tt

$aareguru_data[] = [
    'temperatur' => $temperature,
    'wasserfluss' => $flow,
    'vorhersage2h' => $forecast2h,
    'lufttemperatur' => $tt
];

// print_r($aareguru_data);

// echo $aareguru_data[0]['wasserfluss'];
<?php

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
if (isset($data['values']['thun'])) {
    $thun_data = $data['values']['thun']; // get the data for Thun
} else {
    $thun_data = [];
    $thun_data['timestamp'] = NULL;
    $thun_data['temperature'] = NULL;
    $thun_data['flow'] = NULL;
    $thun_data['forecast2h'] = NULL;
    $thun_data['tt'] = NULL;
}

// wir sammeln keine Ortsdaten, sondern nur die Werte. Falls zu einem späteren Zeitpunk ein weiterer Ort hinzugefügt wird, muss dieser Code hier ergänzt werden.

// if $thun_data['timestamp'] is numeric, dann $aareguruTime = $thun_data['timestamp'], sonst $aareguruTime = NULL
if (is_numeric($thun_data['timestamp'])) {
    $aareguruTime = $thun_data['timestamp']; // get the time
} else {
    $aareguruTime = NULL;
}

// if $thun_data['temperature'] is numeric, dann $temperature = $thun_data['temperature'], sonst $temperature = NULL
if (is_numeric($thun_data['temperature'])) {
    $temperature = $thun_data['temperature']; // get the temperature
} else {
    $temperature = NULL;
}

// if $thun_data['flow'] is numeric, dann $flow = $thun_data['flow'], sonst $flow = NULL
if (is_numeric($thun_data['flow'])) {
    $flow = $thun_data['flow']; // get the flow
} else {
    $flow = NULL;
}

// if $thun_data['forecast2h'] is numeric, dann $forecast2h = $thun_data['forecast2h'], sonst $forecast2h = NULL
if (is_numeric($thun_data['forecast2h'])) {
    $forecast2h = $thun_data['forecast2h']; // get the forecast2h
} else {
    $forecast2h = NULL;
}

// if $thun_data['tt'] is numeric, dann $tt = $thun_data['tt'], sonst $tt = NULL
if (is_numeric($thun_data['tt'])) {
    $tt = $thun_data['tt']; // get the tt
} else {
    $tt = NULL;
}

$aareguru_data[] = [
    'temperatur' => $temperature,
    'wasserfluss' => $flow,
    'vorhersage2h' => $forecast2h,
    'lufttemperatur' => $tt,
    'aareguruTimestamp' => $aareguruTime
];

echo "Extraktion erfolgreich.";
echo "<br>";

// print_r($aareguru_data);

// echo $aareguru_data[0]['wasserfluss'];
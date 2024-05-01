<?php

$url = "https://api.open-meteo.com/v1/forecast?latitude=46.9481,46.8499&longitude=7.4474,9.5329&current=temperature_2m,precipitation,cloud_cover&timeformat=unixtime&timezone=Europe%2FBerlin";

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$output = curl_exec($ch);

echo "<br>";
echo "<br>";

// Speichere alle Daten in Variablen
$data = json_decode($output, true); // decode the JSON feed

// make new arry with needed information
$weather_data = [];
foreach ($data as $item) {
    $latitude = $item['latitude']; // get the latitude
    $longitude = $item['longitude']; // get the longitude
    $temperature_2m = $item['current']['temperature_2m']; // get the temperature_2m
    $precipitation = $item['current']['precipitation']; // get the precipitation
    $cloud_cover = $item['current']['cloud_cover']; // get the cloud_cover

    $weather_data[] = [
        'latitude' => $latitude,
        'longitude' => $longitude,
        'temperature_2m' => $temperature_2m,
        'precipitation' => $precipitation,
        'cloud_cover' => $cloud_cover
    ];
}

// print_r($weather_data);

// echo $weather_data[0]['latitude'];
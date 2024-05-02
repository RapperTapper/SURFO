<?php

$url = "https://aareguru.existenz.ch/v2018/widget?app=surfo.app.ch&version=1.0.42";

// curl
$ch = curl_init($url);

// curl options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$output = curl_exec($ch);

echo $output;

// Speichere alle Daten in Variablen
$data = json_decode($output, true); // decode the JSON feed

// make new arry with needed information
$aareguru_data = [];
foreach ($data as $item) {
    $latitude = $item['latitude']; // get the latitude
    $longitude = $item['longitude']; // get the longitude
    $temperature_2m = $item['current']['temperature_2m']; // get the temperature_2m
    $precipitation = $item['current']['precipitation']; // get the precipitation
    $cloud_cover = $item['current']['cloud_cover']; // get the cloud_cover

    $aareguru_data[] = [
        'latitude' => $latitude,
        'longitude' => $longitude,
        'temperature_2m' => $temperature_2m,
        'precipitation' => $precipitation,
        'cloud_cover' => $cloud_cover
    ];
}

// print_r($aareguru_data);

// echo $aareguru_data[0]['latitude'];
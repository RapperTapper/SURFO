<?php

include 'extract.php';

// echo "Hello Transoform Raphi!";

// print_r($weather_data);

// make map with lat / lon to location
$locations = [
    '46.94,7.44' => 'Bern',
    '46.84,9.52' => 'Chur'
];

// new function weather_condition
function weather_condition( $precipitation, $cloud_cover) {
    // cloud_cover: 0-20 = sunny, 21-80 = cloudy
    if ($cloud_cover <= 80 && $precipitation == 0) {
        return 'sunny';
    } elseif ($cloud_cover > 80 && $precipitation < 5) {
        return 'cloudy';
    } elseif ($precipitation >= 5) {
        return 'rainy';
    } else {
        return 'unknown';
    }
}

// transform data
foreach ($weather_data as $index => $item) {

    // round temperature to integer
    $weather_data[$index]['temperature_2m'] = round($item['temperature_2m']);

    // convert latitude and longitude to location
    $coordinates = $item['latitude'] . ',' . $item['longitude'];
    // echo "Coordinates: " . $coordinates . "<br>";
    
    // add location to weather data
    $weather_data[$index]['location'] = $locations[$coordinates];

    // remove latitude and longitude
    unset($weather_data[$index]['latitude']);
    unset($weather_data[$index]['longitude']);

    $weather_data[$index]['condition'] = weather_condition($item['precipitation'], $item['cloud_cover']);
}

print_r($weather_data);
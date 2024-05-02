<?php

include 'extract.php';

// print_r($aareguru_data);

$surfCondition = surf_condition($flow, $temperature);

echo $surfCondition;

// new function surf_condition
function surf_condition($flow, $temperature) {

    // temperature: iisig<10; 10<=erfrüschend<17; 17<=agnähm<21; 21<=warm<25; z'warm>=25
    // flow: keni<100; 100<=gueti<200; 200<=grossi<300; z'mächtigi>=300   
    // return "Ds Wasser isch <condition>, u Wäue hets <condition>!"  
    // if $flow or $temperature is not a number return "Hüt gits kei Spruch :(" 
    $temp_adj = '';
    $wasser_adj = '';
    if (!is_numeric($flow) || !is_numeric($temperature)) {
        return "Hüt gits kei Spruch :(";
    } 
    
    if ($temperature < 10) {
        $temp_adj = 'iisig';
    } elseif ($temperature >= 10 && $temperature < 17) {
        $temp_adj = 'erfrüschend';
    } elseif ($temperature >= 17 && $temperature < 21) {
        $temp_adj = 'agnähm';
    } elseif ($temperature >= 21 && $temperature < 25) {
        $temp_adj = 'warm';
    } elseif ($temperature >= 25) {
        $temp_adj = 'z\'warm';
    } 

    if ($flow < 100) {
        $wasser_adj = 'keni';
    } elseif ($flow >= 100 && $flow < 200) {
        $wasser_adj = 'gueti';
    } elseif ($flow >= 200 && $flow < 300) {
        $wasser_adj = 'grossi';
    } elseif ($flow >= 300) {
        $wasser_adj = 'z\'mächtigi';
    }       
    return "Ds Wasser isch " . $temp_adj . ", u Wäue hets " . $wasser_adj . "!";
}


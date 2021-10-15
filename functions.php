<?php

function get_googlesheet_data($query) {
    $results = false;
    $key = "AIzaSyDHT-EhjdC_0xY1aXaNFyXkyypg1NUuO2I";
    $sheet = "1RxSlSxOCy1eBt-fKJg2gsItZSKvad8YsktrRRA16IxI";
    $query = 'Sheet1!A:AE';
    $connection = wp_remote_get("https://sheets.googleapis.com/v4/spreadsheets/{$sheet}/values/{$query}?key={$key}");

    if (!is_wp_error($connection)){
        $connection = json_decode(wp_remore_retrieve_body($connection), true);

        if (isset ($connection['values'])) {
            $results = $connection['values'];
            // wp_chache_add($query, $results);
        }

    }
    echo "<p>$results</p>";
    return $results;
}

?> 

<!-- https://sheets.googleapis.com/v4/spreadsheets/1RxSlSxOCy1eBt-fKJg2gsItZSKvad8YsktrRRA16IxI/values/Sheet1!A:AE?key=AIzaSyDHT-EhjdC_0xY1aXaNFyXkyypg1NUuO2I -->

/**
 * Plugin Name: Vehicle Reservations
 * Description: Uses Google Sheets API to pull data of incoming vehicles available for reservation 
 */
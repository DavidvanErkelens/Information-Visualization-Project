<?php

require 'init.php';

$db = new Database();
$db = $db->connection();

$array = $fields = array(); 
$i = 0;

$stmt = $db->prepare("INSERT INTO gtdb (eventid, iyear, imonth, iday, country_txt, region_txt, provstate, city, latitude, longitude, attacktype1, attacktype2, attacktype3, targtype1, targtype2, targtype3, gname, gname2, gname3, weaptype1, weaptype2, weaptype3, weaptype4, multiple, success, suicide, claimed, individual, nkil, nwound, nkillter, nwoundte, propvalue) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");


$handle = @fopen("terror.csv", "r");
if ($handle) {
    while (($row = fgetcsv($handle, 4096)) !== false) {
        if (empty($fields)) {
            $fields = $row;
            continue;
        }
        foreach ($row as $k=>$value) {
            $array[$i][$fields[$k]] = $value;
        }


        echo "\rInserting $i... (" . round((($i/170000.0) * 100.0), 2)  . "%)";

        $param = 1;

        $lat = (strlen($array[$i]['latitude']) > 0 ? $array[$i]['latitude'] : '0.0');
        $long = (strlen($array[$i]['longitude']) > 0 ? $array[$i]['longitude'] : '0.0');


        $stmt->bindValue($param++, $array[$i]['eventid']);
        $stmt->bindValue($param++, $array[$i]['iyear']);
        $stmt->bindValue($param++, $array[$i]['imonth']);
        $stmt->bindValue($param++, $array[$i]['iday']);
        $stmt->bindValue($param++, $array[$i]['country_txt']);
        $stmt->bindValue($param++, $array[$i]['region_txt']);
        $stmt->bindValue($param++, $array[$i]['provstate']);
        $stmt->bindValue($param++, $array[$i]['city']);
        $stmt->bindValue($param++, $lat);
        $stmt->bindValue($param++, $long);
        $stmt->bindValue($param++, intval($array[$i]['attacktype1']));
        $stmt->bindValue($param++, intval($array[$i]['attacktype2']));
        $stmt->bindValue($param++, intval($array[$i]['attacktype3']));
        $stmt->bindValue($param++, intval($array[$i]['targtype1']));
        $stmt->bindValue($param++, intval($array[$i]['targtype2']));
        $stmt->bindValue($param++, intval($array[$i]['targtype3']));
        $stmt->bindValue($param++, $array[$i]['gname']);
        $stmt->bindValue($param++, $array[$i]['gname2']);
        $stmt->bindValue($param++, $array[$i]['gname3']);
        $stmt->bindValue($param++, intval($array[$i]['weaptype1']));
        $stmt->bindValue($param++, intval($array[$i]['weaptype2']));
        $stmt->bindValue($param++, intval($array[$i]['weaptype3']));
        $stmt->bindValue($param++, intval($array[$i]['weaptype4']));
        $stmt->bindValue($param++, $array[$i]['multiple'] == '1' ? 'yes' : 'no');
        $stmt->bindValue($param++, $array[$i]['success'] == '1' ? 'yes' : 'no');
        $stmt->bindValue($param++, $array[$i]['suicide'] == '1' ? 'yes' : 'no');
        $stmt->bindValue($param++, $array[$i]['claimed'] == '1' ? 'yes' : 'no');
        $stmt->bindValue($param++, $array[$i]['individual'] == '1' ? 'yes' : 'no');
        $stmt->bindValue($param++, intval($array[$i]['nkill']));
        $stmt->bindValue($param++, intval($array[$i]['nwound']));
        $stmt->bindValue($param++, intval($array[$i]['nkillter']));
        $stmt->bindValue($param++, intval($array[$i]['nwoundte']));
        $stmt->bindValue($param++, intval($array[$i]['propvalue']));
        
 
        if (intval($array[$i]['eventid']) <= 198002290002) continue;

        // var_dump($array[$i]);
        $i++;
    
        try
        {
            $stmt->execute();
        }
        catch(Exception $e) { /*...*/}


        // if ($i > 10) break;
    }

    fclose($handle);
}

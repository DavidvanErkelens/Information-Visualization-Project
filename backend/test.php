<?php       
      
require 'init.php';       
   

$json = file_get_contents(__DIR__.'/example.json');

WebSocketResponse::getResponse($json);





// test file, will be removed later       
      
// $x = new QueryBuilder('attacks');      
// // $x->addCondition(new QueryCondition('country_txt', '=', 'United States'));
// $x->addCondition(new QueryCondition('year', '=', '2001'));
// $x->addCondition(new QueryCondition('month', '=', '9'));
// $x->addCondition(new QueryCondition('day', '=', '11'));
      
// // echo $x->format() . PHP_EOL;      
// // var_dump($x->variables());     
       
// $timeStart = time(); 
// $db = new Database();     
// var_dump($db->query($x));
// $timeEnd = time();

// echo 'Execution took ' . ($timeEnd - $timeStart) . ' seconds.' . PHP_EOL;

<?php       
      
require 'init.php';       
   

$json = file_get_contents(__DIR__.'/example.json');

WebSocketResponse::getResponse($json);



// $x = new QueryBuilder('table');
// $stat = new QueryStatement();
// $stat->addCondition(new QueryCondition('x', '=', 1));
// $stat->addCondition(new QueryCondition('y', '>', 2));


// $stat2 = new QueryStatement();
// $stat2->addCondition(new QueryCondition('z', '<', '00-00-00'));

// $stat3 = new QueryStatement();
// $stat3->addCondition(new QueryCondition('zomaar', '<', '123'));
// $stat3->addCondition(new QueryCondition('z', '<', '00-00-00'));
// $stat3->addCondition(new QueryCondition('x', '=', 1));

// $x->addStatement($stat);
// $x->addStatement($stat2);
// $x->addStatement($stat3);

// echo $x->format();
// var_dump($x->variables());     

// test file, will be removed later       
      
// $x = new QueryBuilder('attacks');      
// // $x->addCondition(new QueryCondition('country_txt', '=', 'United States'));
// $x->addCondition(new QueryCondition('year', '=', '2001'));
// $x->addCondition(new QueryCondition('month', '=', '9'));
// $x->addCondition(new QueryCondition('day', '=', '11'));
      
// // echo $x->format() . PHP_EOL;      
       
// $timeStart = time(); 
// $db = new Database();     
// var_dump($db->query($x));
// $timeEnd = time();

// echo 'Execution took ' . ($timeEnd - $timeStart) . ' seconds.' . PHP_EOL;

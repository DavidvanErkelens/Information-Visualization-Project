<?php

require 'init.php';

// test file, will be removed later

$x = new QueryBuilder('testtable');

// $x->addColumn('id');
// $x->addCondition(new QueryCondition('abc', '=', 20));
// $x->addCondition(new QueryCondition('xyz', '>', 15));
// $x->setLimit(15);
// $x->setOffset(10);

$x->addCondition(new QueryCondition('test2', 'LIKE', '%bcd%'));

echo $x->format() . PHP_EOL;
// var_dump($x->variables());


$db = new Database();
var_dump($db->query($x));

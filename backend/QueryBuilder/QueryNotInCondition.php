<?php
/**
 *  QueryNotInCondition.php
 *
 *  Class that describes a single condition for running a query
 */

/**
 *  Class definition
 */
class QueryNotInCondition extends QueryInCondition
{
    /**
     *  Constructor
     */
    public function __construct($column, array $value = array())
    {
        // Store values
        $this->column = $column;
        $this->operator = 'NOT IN';
        $this->value = $value;
    }
}

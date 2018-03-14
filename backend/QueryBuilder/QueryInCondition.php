<?php
/**
 *  QueryCondition.php
 *
 *  Class that describes a single condition for running a query
 */

/**
 *  Class definition
 */
class QueryInCondition extends QueryCondition
{
    /**
     *  Constructor
     */
    public function __construct($column, array $value = array())
    {
        // Store values
        $this->column = $column;
        $this->operator = 'IN';
        $this->value = $value;
    }

    /**
     *  Format condition PDO-style
     *  @return string
     */
    public function format()
    {
        // Create ?-list
        $q = implode(',', array_fill(0, count($this->value), '?'));

        // Format PDO string
        return "{$this->column} {$this->operator} ({$q})";
    }

    /**
     *  Get value
     *  @return array
     */
    public function value()
    {
        // expose member
        return $this->value;
    }
}

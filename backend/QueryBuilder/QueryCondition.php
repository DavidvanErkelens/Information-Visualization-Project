<?php
/**
 *  QueryCondition.php
 *
 *  Class that describes a single condition for running a query
 */

/**
 *  Class definition
 */
class QueryCondition
{
    /**
     *  The column for which this condition applies
     *  @var  string
     */
    private $column;

    /**
     *  The operator for this condition
     *  @var  string
     */
    private $operator;

    /**
     *  The value to compare to
     *  @var  mixed
     */
    private $value;

    /**
     *  Constructor
     */
    public function __construct($column, $operator, $value)
    {
        // Store values
        $this->column = $column;
        $this->operator = $operator;
        $this->value = $value;
    }

    /**
     *  Format condition PDO-style
     *  @return string
     */
    public function format()
    {
        // Format PDO string
        return "{$this->column} {$this->operator} ?";
    }

    /**
     *  Get value
     *  @return mixed
     */
    public function value()
    {
        // expose member
        return $this->value;
    }
}

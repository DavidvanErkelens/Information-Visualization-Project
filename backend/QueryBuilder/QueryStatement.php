<?php
/**
 *  QueryStatement.php
 *
 *  Class that consists of multiple QueryConditions, which will be joined with ORs
 */

/**
 *  Class definition
 */
class QueryStatement
{
    /**
     *  The conditions that are captured in this stament
     *  @var QueryCondition[]
     */
    private $conditions = array();


    /**
     *  Add condition to the list
     *  @param  QueryCondition
     *  @return QueryStatement
     */
    public function addCondition(QueryCondition $condition)
    {
        // Add to list
        $this->conditions[] = $condition;
    }

    /**
     *  Format list
     *  @return  string
     */
    public function format()
    {
        // Create formatted list
        $conditions = array_map(function($condition) {
            return $condition->format();
        }, $this->conditions);

        // Merge element and return
        return '(' . implode(' OR ', $conditions) . ')';
    }

    /**
     *  Get variables for this statement
     *  @return array
     */
    public function variables()
    {
        // Store variables
        $vars = array();

        // Merge variables from conditions
        foreach ($this->conditions as $condition) $vars = array_merge($vars, $condition->value());

        // Return variables
        return $vars;
    }
}

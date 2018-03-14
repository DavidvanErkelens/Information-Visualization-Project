<?php
/**
 *  QueryBuilder.php
 *
 *  Class to automatically format queries to send to the database
 */

/**
 *  Class definition
 */
class QueryBuilder
{
    /**
     *  The table we're querying
     *  @var string
     */
    private $table;

    /**
     *  The columns we want to fetch
     *  @var string[]
     */
    private $columns = array();

    /**
     *  The conditions for the query
     *  @var QueryCondition[]
     */
    private $conditions = array();

    /**
     *  The limit and offset for this query
     *  @var int
     */
    private $limit = -1, $offset = -1;
    
    /**
     *  Constructor
     *  @param  string      the table to query
     */
    public function __construct($table)
    {
        // store table name
        $this->table = $table;
    }

    /**
     *  Add a column to fetch
     *  @param  string
     */
    public function addColumn($name)
    {
        // add to list
        $this->columns[] = $name;
    }

    /**
     *  Add a condition to the query
     *  @param  QueryCondition
     */
    public function addCondition(QueryCondition $condition)
    {
        // add to list
        $this->conditions[] = $condition;
    }

    /**
     *  Set the limit
     *  @param  int
     */
    public function setLimit($limit)
    {
        // store
        $this->limit = $limit;
    }

    /**
     *  Set the offset
     *  @param  int
     */
    public function setOffset($offset)
    {
        // store
        $this->offset = $offset;
    }

    /**
     *  Format the query
     *  @return string
     */
    public function format()
    {
        // @todo fix
        // return 'SELECT * FROM attacks ORDER BY RAND() LIMIT 10;';

        // Format columns
        if (count($this->columns) > 0) $columns = implode(', ', $this->columns);
        else $columns = '*';

        // Format query
        $query = "SELECT {$columns} FROM {$this->table}";

        // Store formatted conditions
        $conditions = array();

        // Do we have conditions?
        foreach ($this->conditions as $condition) $conditions[] = $condition->format();

        // Add conditions to query
        if (count($conditions) > 0) $query .= " WHERE ";
        $query .= implode(' AND ', $conditions);

        // Should we limit and offset?
        if ($this->limit >= 0) $query .= " LIMIT {$this->limit}";
        if ($this->limit >= 0 && $this->offset >= 0) $query .= " OFFSET {$this->offset}";

        // Return result
        return "{$query};";
    }

    /**
     *  The PDO variables required for formatting
     *  @return array
     */
    public function variables()
    {
        // Store variables
        $vars = array();

        // Loop over conditions
        foreach ($this->conditions as $condition) $vars[] = $condition->value();

        // Return result
        return $vars;
    }
}

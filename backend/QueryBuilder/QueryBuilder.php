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
     *  The statements for the query
     *  @var QueryStatement[]
     */
    private $statements = array();

    /**
     *  The limit and offset for this query
     *  @var int
     */
    private $limit = -1, $offset = -1;

    /**
     *  Should we group by a column?
     *  @var  string[]
     */
    private $groupby = array();
    
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
     *  Add a statement to the query
     *  @param  QueryStatement
     */
    public function addStatement(QueryStatement $statement)
    {
        // add to list
        $this->statements[] = $statement;
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
     *  Set group by
     *  @param  string
     */
    public function addGroupBy($group)
    {
        // store
        $this->groupby[] = $group;
    }

    /**
     *  Format the query
     *  @return string
     */
    public function format()
    {
        // Format columns
        if (count($this->columns) > 0) $columns = implode(', ', $this->columns);
        else $columns = '*';

        // Format query
        $query = "SELECT {$columns} FROM {$this->table}";

        // Store formatted statements
        $statements = array();

        // Do we have statements?
        foreach ($this->statements as $statement) $statements[] = $statement->format();

        // Add statements to query
        if (count($statements) > 0) $query .= " WHERE ";
        $query .= implode(' AND ', $statements);

        // Should we group by?
        if (count($this->groupby) > 0) $query .= " GROUP BY " . implode(', ', $this->groupby);

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

        // Loop over statements
        foreach ($this->statements as $statement) $vars = array_merge($vars, $statement->variables());

        // Return result
        return $vars;
    }
}

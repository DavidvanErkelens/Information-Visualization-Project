<?php
/**
 *  Database.php
 *
 *  Class that mananges the connection to the database
 */

/**
 *  Class definition
 */
class Database 
{
    /**
     *  Store connection
     *  @var    PDO
     */
    private $connection;

    /**
     *  Constructor
     */
    public function __construct()
    {
        // Require keys from private repository
        $keys = require(__DIR__.'/../Keys/infovis.php');

        // Parse settings
        $host     = $keys['database']['host'];
        $db       = $keys['database']['database'];
        $user     = $keys['database']['user'];
        $password = $keys['database']['password'];
        
        // Construct PDO DSN
        $dsn = "mysql:host=$host;dbname=$db;charset=utf8";
        
        // PDO options
        $opt = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        
        // Construct PDO object
        $this->connection = new PDO($dsn, $user, $password, $opt);
    }

    /**
     *  Execute a query over the connection
     *  @param  QueryBuilder
     */
    public function query(QueryBuilder $query)
    {
        // Prepare query
        $q = $this->connection->prepare($query->format());

        // execute query
        $q->execute($query->variables());

        // Fetch rows and return
        return $q->fetchAll();
    }
}

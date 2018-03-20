<?php
/**
 *  Debug.php
 *
 *  Class that contains information and functions regarding debugging
 */

/**
 *  Class definition
 */
class Debug
{
    /**
     *  Are we in debug mode?
     *  @var bool
     */
    private $debug = false;

    /**
     *  Do we want to print queries for debugging purposes?
     *  @return boolean
     */
    public static function printQueries()
    {
        // expose member
        return $debug;
    }
}

<?php
/**
 *  Mapper.php
 *
 *  Class that maps integer values to correct keys for filters provided from the frontend
 */

/**
 *  Class defintion
 */
class Mapper
{
    /**
     *  Map a filter type to string value
     *  @param  int
     *  @return string
     */
    public static function filterType($index)
    {
        switch($index) {
            case 0: return 'attacktype';
            case 1: return 'targettype';
            case 2: return 'weapontype';
            case 3: return 'perpetrator';
            default: return '-INV-';
        }
    }

    /**
     *  Map a filter type to the array of columns it could be in
     *  @param   string
     *  @return  array
     */
    public static function filterToColumns($name)
    {
        switch($name) {
            case 'attacktype':  return array('attack1', 'attack2', 'attack3');
            default:            return array($name);
        }
    }

    /**
     *  Map column name in the database to the result set the frontend expects
     *  @param  string
     *  @return string
     */
    public static function columnToResult($column)
    {
        // for now, they are the same
        return $column;
    }
}


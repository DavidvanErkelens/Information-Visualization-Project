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
}


// filters = ['Attack type','Target type', 'Weapon type', 'Pepretrator', 'Stats'];

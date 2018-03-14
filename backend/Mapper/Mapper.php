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
            case 0:         return 'attacktype';
            case 1:         return 'targettype';
            case 2:         return 'weapontype';
            case 3:         return 'perpetrator';
            case 'time'     return 'time';
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
            case 'attacktype':  return array('attacktype1', 'attacktype2', 'attacktype3');
            case 'targettype':  return array('targtype1', 'targtype2', 'targtype3');
            case 'weapontype':  return array('weaptype1', 'weaptype2', 'weaptype3', 'weaptype4');
            case 'perpetrator': return array('gname', 'gname2', 'gname3');
            default:            return array($name);
        }
    }

    /**
     *  Map a perpretrator id to the group name
     *  @param  int
     *  @return string
     */
    public static function groupToName($id)
    {
        switch($id) {
            case 1:     return 'Unknown';
            case 2:     return 'Taliban';
            case 3:     return 'Shining Path';
            case 4:     return 'ISIL';
            case 5:     return 'FMLN';
            case 6:     return 'Al-Shabaab';
            case 7:     return 'IRA';
            case 8:     return 'FARC';
            case 9:     return 'NPA';
            case 10:    return 'PKK';
            case 11:    return 'Boko Haram';
            case 12:    return 'ETA';
            case 13:    return 'CPI-Maoist';
            case 14:    return 'LTTE';
            default:    return 'Unknown';
        }
    }

    /**
     *  Map column name in the database to the result set the frontend expects
     *  @param  string
     *  @return string
     */
    public static function columnToResult($column)
    {
        // This is not yet necessary, return the same value.
        return $column;
    }
}


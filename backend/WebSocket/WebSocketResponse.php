<?php
/**
 *  WebSocketResponse.php
 *
 *  Class that takes a JSON string that is send to the backend and formats
 *  a response depending on this request
 */

/**
 *  Class defintion
 */
class WebSocketResponse
{
    /**
     *  Static function to format a JSON response string
     *  @param  string
     */
    public static function getResponse($request)
    {
        // Parse JSON from request
        $data = json_decode($request, true);

        // do we have valid data?
        if (is_null($data)) return json_encode(array());

        // Do we have a type?
        if (!array_key_exists('type', $data)) return json_encode(array());

        // Depending on the type of request, format the query
        // Return empty data on invalid request
        switch($data['type']) {
            case 'main':        $query = self::mainQuery($data); break;
            case 'time':        $query = self::timeQuery($data); break;
            case 'group':       $query = self::groupQuery($data); break;
            case 'kills':       $query = self::killQuery($data); break;
            default:            return json_encode(array());
        }

        // Create statement for kills
        $killStatement = new QueryStatement();

        // Add condition
        $killStatement->addCondition(new QueryCondition('nkil', '>', 0));

        // Add to query
        $query->addStatement($killStatement);

        // Create database connection
        $db = new Database();

        // Create results array
        $results = array();

        // Echo query for debugging purposes, if necessary
        if (Debug::printQueries()) echo "Query: {$query->format()} \n";

        // Loop over results
        foreach ($db->query($query) as $result) 
        {
            // Replace keys if necessary
            $keys = array_map(function($key) {
                return Mapper::columnToResult($key);
            }, array_keys($result));
            
            // Add to results array
            $results[] = array_combine($keys, array_values($result));
        }

        // Return encoded result
        return json_encode(array(
            'type'      =>  $data['type'],
            'data'      =>  $results
        ));
    }

    /**
     *  Helper function to create query for the main overview
     *  @param  array
     *  @return QueryBuilder
     */
    private static function mainQuery($data)
    {
        // Map keys from IDs to column names
        $parsedKeys = array_map(function($key) {
            return Mapper::filterType($key);
        }, array_keys($data));

        // Set keys
        $parsedData = array_combine($parsedKeys, array_values($data));

        // Create new Query
        $query = new QueryBuilder('gtdb');

        // Store limit if we encounter it
        $limit = 100;

        // Loop over filters to add to the query
        foreach ($parsedData as $filter => $contents)
        {
            // Skip invalid columns
            if ($filter == '-INV-') continue;

            // We don't need a statement if the filter is empty
            if (is_array($contents) && count($contents) == 0) continue;

            // Create new querystatement
            $statement = new QueryStatement();

            // Different query formatting depending on column type
            if (in_array($filter, array('attacktype', 'targettype', 'weapontype')))
            {
                // Save values that the column may have
                $contains = array_keys(array_filter($contents, function($value, $key) {
                    return $value;
                }, ARRAY_FILTER_USE_BOTH));

                // Get the columns that it could be in and add it to the statement
                foreach (Mapper::filterToColumns($filter) as $column) $statement->addCondition(new QueryInCondition($column, $contains));   


                // Add statement to query
                $query->addStatement($statement);
            }

            // Group?
            if ($filter == 'perpetrator')
            {
                // Create list of group names
                $contains = array_map(function($value) {
                    return strtolower(Mapper::groupToName($value));
                }, array_keys(array_filter($contents, function($value, $key) {
                    return $value;
                }, ARRAY_FILTER_USE_BOTH)));

                // Add to statement
                foreach (Mapper::filterToColumns($filter) as $column) $statement->addCondition(new QueryInCondition("lower($column)", $contains));

                // Add statement to query
                $query->addStatement($statement);
            }

            // Time filter
            if ($filter == 'time')
            {
                // Start date
                $startStatement = new QueryStatement();
                $startStatement->addCondition(new QueryCondition('iyear', '>=', $contents['start']));
                $query->addStatement($startStatement);

                // End date
                $endStatement = new QueryStatement();
                $endStatement->addCondition(new QueryCondition('iyear', '<', $contents['end']));
                $query->addStatement($endStatement);
            }

            // Is it a limit filter
            if ($filter == 'number')
            {
                // Is it numeric?
                if (!is_numeric($contents)) continue;

                // Store limit
                $limit = intval($contents);
            }
        }

        // Set the limit 
        $query->setLimit($limit);

        // Return the query
        return $query;
    }

    /**
     *  Helper function to create query for the time overview graph
     *  @param  array
     *  @return QueryBuilder
     */
    private static function timeQuery($data)
    {
        // Map keys from IDs to column names
        $parsedKeys = array_map(function($key) {
            return Mapper::filterType($key);
        }, array_keys($data));

        // Set keys
        $parsedData = array_combine($parsedKeys, array_values($data));

        // Create new Query
        $query = new QueryBuilder('gtdb');

        // Set columns
        $query->addColumn('iyear');
        $query->addColumn('SUM(nkil) AS kills');

        // Group by year
        $query->addGroupBy('iyear');

        // Loop over filters to add to the query
        foreach ($parsedData as $filter => $contents)
        {
            // Skip invalid columns
            if ($filter == '-INV-') continue;

            // We don't need a statement if the filter is empty
            if (is_array($contents) && count($contents) == 0) continue;

            // Create new querystatement
            $statement = new QueryStatement();

            // Different query formatting depending on column type
            if (in_array($filter, array('attacktype', 'targettype', 'weapontype')))
            {
                // Save values that the column may have
                $contains = array_keys(array_filter($contents, function($value, $key) {
                    return $value;
                }, ARRAY_FILTER_USE_BOTH));

                // Get the columns that it could be in and add it to the statement
                foreach (Mapper::filterToColumns($filter) as $column) $statement->addCondition(new QueryInCondition($column, $contains));   


                // Add statement to query
                $query->addStatement($statement);
            }

            // Group?
            if ($filter == 'perpetrator')
            {
                // Create list of group names
                $contains = array_map(function($value) {
                    return strtolower(Mapper::groupToName($value));
                }, array_keys(array_filter($contents, function($value, $key) {
                    return $value;
                }, ARRAY_FILTER_USE_BOTH)));

                // Add to statement
                foreach (Mapper::filterToColumns($filter) as $column) $statement->addCondition(new QueryInCondition("lower($column)", $contains));

                // Add statement to query
                $query->addStatement($statement);
            }
        }

        // Return the query
        return $query;
    }

    /**
     *  Helper function to create a query for the group attacks for a
     *  set of countries and a time span
     *  @param  array
     *  @return QueryBuilder
     */
    private static function groupQuery($data)
    {
        // Create new Query
        $query = new QueryBuilder('gtdb');

        // Add columns
        $query->addColumn('gname');
        $query->addColumn('COUNT(*) AS nattack');

        // Create statement for countries and groups
        $countryStatement = new QueryStatement();
        $groupStatement = new QueryStatement();

        // Loop over countries
        if (array_key_exists('countries', $data)) foreach ($data['countries'] as $country)
        {
            $countryStatement->addCondition(new QueryCondition('country_txt', '=', $country));
        }

        // Loop over groups
        if (array_key_exists('groups', $data)) foreach ($data['groups'] as $group)
        {
            $groupStatement->addCondition(new QueryCondition('gname', '=', $group));
        }

        // Add to query
        if (array_key_exists('countries', $data) && count($data['countries'] > 0)) $query->addStatement($countryStatement);
        if (array_key_exists('groups', $data) && count($data['groups'] > 0)) $query->addStatement($groupStatement);

        // Do we have a start date?
        if (array_key_exists('start', $data) && is_numeric($data['start']))
        {
            // Create statement
            $startStatement = new QueryStatement();
            
            // Set condition
            $startStatement->addCondition(new QueryCondition('iyear', '>=', $data['start']));

            // Add to query
            $query->addStatement($startStatement);
        }

        // Do we have an end date?
        if (array_key_exists('end', $data) && is_numeric($data['end']))
        {
            // Create statement
            $endStatement = new QueryStatement();
            
            // Set condition
            $endStatement->addCondition(new QueryCondition('iyear', '<', $data['end']));

            // Add to query
            $query->addStatement($endStatement);
        }

        // Set group by
        $query->addGroupBy('gname');

        // Order by
        $query->setOrderBy('nattack DESC');

        // Limit
        $query->setLimit(15);

        // Return query
        return $query;
    }

    /**
     *  Helper function to return the number of kills per year per country
     *  for a list of countries and a time span
     *  @param  array
     *  @return QueryBuilder
     */
    private static function killQuery($data)
    {
        // Create new Query
        $query = new QueryBuilder('gtdb');

        // Add columns
        $query->addColumn('iyear');
        $query->addColumn('country_txt');
        $query->addColumn('SUM(nkil) AS kills');

        // Create statement for countries
        $countryStatement = new QueryStatement();

        // Loop over countries
        if (array_key_exists('countries', $data)) foreach ($data['countries'] as $country)
        {
            $countryStatement->addCondition(new QueryCondition('country_txt', '=', $country));
        }

        // Add to query
        $query->addStatement($countryStatement);

        // Do we have a start date?
        if (array_key_exists('start', $data) && is_numeric($data['start']))
        {
            // Create statement
            $startStatement = new QueryStatement();
            
            // Set condition
            $startStatement->addCondition(new QueryCondition('iyear', '>=', $data['start']));

            // Add to query
            $query->addStatement($startStatement);
        }

        // Do we have an end date?
        if (array_key_exists('end', $data) && is_numeric($data['end']))
        {
            // Create statement
            $endStatement = new QueryStatement();
            
            // Set condition
            $endStatement->addCondition(new QueryCondition('iyear', '<', $data['end']));

            // Add to query
            $query->addStatement($endStatement);
        }

        // Set grouping        
        $query->addGroupBy('iyear');
        $query->addGroupBy('country_txt');

        // Return the query
        return $query;
    }
}

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

        // Map keys from IDs to column names
        $parsedKeys = array_map(function($key) {
            return Mapper::filterType($key);
        }, array_keys($data));

        // Set keys
        $parsedData = array_combine($parsedKeys, array_values($data));

        // Create new Query
        $query = new QueryBuilder('gtdb');

        // Loop over filters to add to the query
        foreach ($parsedData as $filter => $contents)
        {
            // Skip invalid columns
            if ($filter == "-INV-") continue;

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
            }


            // Add statement to query
            $query->addStatement($statement);
        }

        // Set the limit to 10 items for now
        $query->setLimit(10);

        // Create database connection
        $db = new Database();

        // Create results array
        $results = array();

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
        return json_encode($results);
    }
}

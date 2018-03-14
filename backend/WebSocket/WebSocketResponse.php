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
        if (is_null($data)) throw Exception("Invalid JSON");

        // Map keys from IDs to column names
        $parsedKeys = array_map(function($key) {
            return Mapper::filterType($key);
        }, array_keys($data));

        // Set keys
        $parsedData = array_combine($parsedKeys, array_values($data));

        // Create new Query
        $query = new QueryBuilder('attacks');
        $query->addColumn('id');

        // Loop over filters to add to the query
        foreach ($parsedData as $column => $contents)
        {
            // Skip invalid columns
            if ($column == "-INV-") continue;

            // Save values that the column may have
            $contains = '(' . implode(',' ,array_keys(array_filter($contents, function($value, $key) {
                return $value;
            }, ARRAY_FILTER_USE_BOTH))) . ')';

            // Add condition to query
            $query->addCondition(new QueryCondition($column, 'IN', $contains));
        }

        
        echo $query->format();
        var_dump($query->variables());

        // $query = new QueryBuilder('testtable');

        // $db = new Database();
        // return json_encode($db->query($query));

    }
}

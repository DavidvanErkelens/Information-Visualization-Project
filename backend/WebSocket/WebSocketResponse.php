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
        $query = new QueryBuilder('testtable');

        $db = new Database();
        return json_encode($db->query($query));

    }
}

<?php

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class WebSocketHandler implements MessageComponentInterface 
{
    // Function must be defined
    public function onOpen(ConnectionInterface $conn) {}

    public function onMessage(ConnectionInterface $from, $msg) 
    {
        // Try to get response (can throw)
        try
        {
            // Send response
            $from->send(WebSocketResponse::getResponse($msg));
        }
        catch (Exception $e)
        {
            echo "An exception occured: " . $e->getMessage() . PHP_EOL;
        }
    }

    // Function must be defined
    public function onClose(ConnectionInterface $conn) {}

    
    // Function must be defined
    public function onError(ConnectionInterface $conn, \Exception $e) {}
}

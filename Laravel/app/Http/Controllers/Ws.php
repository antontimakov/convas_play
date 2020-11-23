<?php
namespace App\Http\Controllers;

use Workerman\Worker;
use App\Models\Main\Tbag;

class Ws extends Controller
{
    public function index()
    {
        $rrr = Tbag::select('titem_id')->first()->toArray()['titem_id'];
        print_r($rrr);
        // Create a Websocket server
        $ws_worker = new Worker("websocket://0.0.0.0:8000");

        // 4 processes
        $ws_worker->count = 4;

        // Emitted when new connection come
        $ws_worker->onConnect = function($connection)
        {
            echo "New connection\n";
        };

        // Emitted when data received
        $ws_worker->onMessage = function($connection, $data) use($rrr)
        {
            // Send hello $data
            $connection->send('hello ' . $data . $rrr);
        };

        // Emitted when connection closed
        $ws_worker->onClose = function($connection)
        {
            echo "Connection closed\n";
        };

        // Run worker
        Worker::runAll();
    }
}

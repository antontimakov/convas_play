<?php
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method == 'GET' && $_GET['method'] == 'getBagItems'){
        $loResp = json_decode(file_get_contents('php://input'));
        $loConn = pg_connect("host=localhost port=5500 dbname=convas_play user=postgres password=12345678") or die("Can't connect to database".pg_last_error());
        $response = pg_query( $loConn, "
            SELECT b.id
            FROM public.tuser AS u
            INNER JOIN public.tbag AS b ON (u.id = b.user_id)
            INNER JOIN public.titem AS i ON (b.item_id = i.id)
        ;" );
        $laRes = array();
        while ($row = pg_fetch_array($response))
        {
            array_push($laRes, $row);
        }
        echo json_encode($laRes);
    }
    if ($method == 'POST'){
        $loResp = json_decode(file_get_contents('php://input'));
        $loConn = pg_connect("host=localhost port=5500 dbname=convas_play user=postgres password=12345678") or die("Can't connect to database".pg_last_error());
        $response = pg_query( $loConn, "UPDATE public.tuser SET name = '{$loResp->body}' WHERE id=1" );
    }

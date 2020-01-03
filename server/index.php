<?php
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method == 'GET'){
        $loResp = json_decode(file_get_contents('php://input'));
        $loConn = pg_connect("host=localhost port=5500 dbname=mytest user=postgres password=12345678") or die("Can't connect to database".pg_last_error());
        $response = pg_query( $loConn, "
            SELECT *
            FROM public.tuser AS u
            INNER JOIN public.tbag AS b ON (u.id = b.user_id)
            INNER JOIN public.titem AS i ON (b.item_id = i.id)
            INNER JOIN public.titem_type AS it ON (it.id = i.item_type_id);
" );
        print_r(pg_fetch_array($response));
    }
    if ($method == 'POST'){
        $loResp = json_decode(file_get_contents('php://input'));
        $loConn = pg_connect("host=localhost port=5500 dbname=mytest user=postgres password=12345678") or die("Can't connect to database".pg_last_error());
        $response = pg_query( $loConn, "UPDATE ttest SET name = '{$loResp->body}' WHERE id=1" );
    }
?>
<?php
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method == 'GET') {
        switch ($_GET['method']){
            case 'getBagItems':
                $query = "
                    SELECT
                        i.id,
                        i.name,
                        i.src,
                        COUNT (*) AS icount
                    FROM public.tuser AS u
                    INNER JOIN public.tbag AS b ON (u.id = b.user_id)
                    INNER JOIN public.titem AS i ON (b.item_id = i.id)
                    GROUP BY
                        i.id,
                        i.name,
                        i.src
                ;";
                break;
            case 'getFish':
                $query = "
                    WITH a AS (
                        INSERT INTO public.tbag (
                            user_id,
                            item_id
                        ) VALUES (
                            1,
                            1
                        )
                    )
                    SELECT
                        id,
                        name,
                        src
                    FROM public.titem
                    WHERE id = 1
                ;";
                break;
        }
        requestByQuery($query);
    }
    if ($method == 'POST'){
        $loResp = json_decode(file_get_contents('php://input'));
        $loConn = tconnect();
        $response = pg_query( $loConn, "UPDATE public.tuser SET name = '{$loResp->body}' WHERE id=1" );
    }
    function tconnect(){
        $loConn = pg_connect("host=localhost port=5500 dbname=convas_play user=postgres password=12345678") or die("Can't connect to database".pg_last_error());
        return $loConn;
    }
    function requestByQuery($query){
        $loConn = tconnect();
        $response = pg_query( $loConn, $query );
        $laRes = array();
        while ($row = pg_fetch_array($response))
        {
            array_push($laRes, $row);
        }
        echo json_encode($laRes);
    }
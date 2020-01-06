<?php
    $method = $_SERVER['REQUEST_METHOD'];
    $goConn = tconnect();
    if ($method == 'GET') {
        switch ($_GET['method']){
            case 'getBagItems':
                $query = "
                    SELECT
                        i.id,
                        i.name,
                        i.src,
                        b.bcount
                    FROM public.tuser AS u
                    INNER JOIN public.tbag AS b ON (u.id = b.user_id)
                    INNER JOIN public.titem AS i ON (b.item_id = i.id)
                    WHERE u.id = 1
                ;";
                break;
            case 'getFish':
                $item = rand (0,1000);
                if ($item > 900){
                    $item = 3;
                }
                else {
                    $item = 1;
                }
                $query = "
                    INSERT INTO public.tbag (
                        user_id,
                        item_id
                    ) SELECT 
                        1,
                        {$item}
                    WHERE NOT EXISTS (
                        SELECT 1
                        FROM public.tbag
                        WHERE
                            user_id = 1 AND
                            item_id = {$item}
                    )
                ;";
                requestByQuery($goConn, $query);
                $query = "
                    UPDATE public.tbag
                    SET bcount = bcount + 1
                    WHERE 
                        user_id = 1 AND
                        item_id = {$item}
                ;";
                requestByQuery($goConn, $query);
                $query = "
                    UPDATE public.tuser AS u
                    SET experience = u.experience + i.experience
                    FROM public.titem AS i
                    WHERE i.id = {$item}
                ;";
                requestByQuery($goConn, $query);
                $query = "
                    SELECT
                        id,
                        name,
                        src_full
                    FROM public.titem
                    WHERE id = {$item}
                ;";
                break;
            case 'getExp':
                $query = "
                    SELECT
                        experience
                    FROM public.tuser
                    WHERE id = 1
                ;";
                $laRes = requestByQuery($goConn, $query);
                $lvl = lvlByExperience($laRes[0]['experience']);
                echo json_encode($lvl);
                die();
        }
        $laRes = requestByQuery($goConn, $query);
        echo json_encode($laRes);
    }
    /*if ($method == 'POST'){
        $loResp = json_decode(file_get_contents('php://input'));
        $loConn = tconnect();
        $response = pg_query( $loConn, "UPDATE public.tuser SET name = '{$loResp->body}' WHERE id=1" );
    }*/
    function tconnect(){
        $loConn = pg_connect("host=localhost port=5500 dbname=convas_play user=postgres password=12345678") or die("Can't connect to database".pg_last_error());
        return $loConn;
    }
    function requestByQuery($goConn, $query){
        $response = pg_query( $goConn, $query );
        $laRes = array();
        while ($row = pg_fetch_array($response))
        {
            array_push($laRes, $row);
        }
        return $laRes;
    }
    function lvlByExperience($pnExperience){
        $loRes = new StdClass();
        $loRes->lvlStart = 0;
        $loRes->lvlEnd = 100;
        $loRes->lvl = 1;
        $loRes->experience = $pnExperience;
        while (true){
            if ($pnExperience < $loRes->lvlEnd){
                return $loRes;
            }
            else {
                $lnNewLvlEnd = $loRes->lvlEnd + ($loRes->lvlEnd - $loRes->lvlStart) * 1.3;
                $loRes->lvlStart = $loRes->lvlEnd;
                $loRes->lvlEnd = $lnNewLvlEnd;
                ++$loRes->lvl;
            }
        }
    }
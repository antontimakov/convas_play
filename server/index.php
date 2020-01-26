<?php
    require_once ("classes/DbProxy.php");
    require_once ("classes/Achievements.php");
    require_once ("classes/Statistics.php");

    require_once ("BagItems.php");
    require_once ("Fish.php");
    require_once ("Experience.php");
    require_once ("Market.php");
    require_once ("Events.php");
    require_once ("Gold.php");

    $method = $_SERVER['REQUEST_METHOD'];
    DbProxy::tconnect();
    if ($method == 'GET') {
        if (function_exists($_GET['method'])){
            $laResFromMethod = $_GET['method']();
        }
        $laRes = array();
        $laRes['data'] = $laResFromMethod;
        $laRes['achievements'] = Achievements::$gaNewAchievements;
        echo json_encode($laRes);
    }
    /*if ($method == 'POST'){
        $loResp = json_decode(file_get_contents('php://input'));
        $loConn = tconnect();
        $response = pg_query( $loConn, "UPDATE public.tuser SET name = '{$loResp->body}' WHERE id=1" );
    }*/
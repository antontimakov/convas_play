<?php

    require_once ("BagItems.php");
    require_once ("Fish.php");
    require_once ("Experience.php");

    $method = $_SERVER['REQUEST_METHOD'];
    $goConn = tconnect();
    if ($method == 'GET') {
        if (function_exists($_GET['method'])){
            $laRes = $_GET['method']($goConn);
        }
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
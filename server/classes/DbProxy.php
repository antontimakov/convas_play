<?php
class DbProxy{
    static $goConn;
    static function tconnect(){
        self::$goConn = pg_connect("host=localhost port=5500 dbname=convas_play user=postgres password=12345678") or
        die("Can't connect to database".pg_last_error());
    }
    static function requestByQuery($query){
        $response = pg_query( self::$goConn, $query );
        $laRes = array();
        while ($row = pg_fetch_array($response))
        {
            array_push($laRes, $row);
        }
        return $laRes;
    }
}
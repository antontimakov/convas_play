<html lang="ru">
    <head>
        <meta charset = "utf-8">
        <title>fishingPlayPlus</title>
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <script src="fishingPlay.js"></script>
    </head>
    <body>
        <canvas id="fishingPlay">wtf?!</canvas>
        <script>init()</script>
        <?php
            $method = $_SERVER['REQUEST_METHOD'];
            if ($method == 'GET'){
                $loResp = json_decode(file_get_contents('php://input'));
                $loConn = pg_connect("host=localhost port=5500 dbname=mytest user=postgres password=12345678") or die("Can't connect to database".pg_last_error());
                $response = pg_query( $loConn, "SELECT * FROM ttest" );
                print_r(pg_fetch_array($response));
            }
            if ($method == 'POST'){
                $loResp = json_decode(file_get_contents('php://input'));
                $loConn = pg_connect("host=localhost port=5500 dbname=mytest user=postgres password=12345678") or die("Can't connect to database".pg_last_error());
                $response = pg_query( $loConn, "UPDATE ttest SET name = '{$loResp->body}' WHERE id=1" );
            }
        ?>
    </body>
</html>
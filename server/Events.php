<?php
function getEvents(){
    $loDateTime = new DateTime('NOW');
    $lsTimeSale =  $loDateTime->format('c');
    $query = "
        SELECT
            SUM(m.bcount * i.price) AS cost
        FROM public.tmarket AS m
        INNER JOIN public.titem AS i ON (m.item_id = i.id)
        WHERE
            m.user_id = 1 AND
            m.time_sale < '{$lsTimeSale}'
    ;";
    $lnGold = DbProxy::requestByQuery($query);
    $lnGold = $lnGold[0]['cost'];
    if ($lnGold){
        $query = "
            DELETE FROM public.tmarket AS m
            WHERE
                m.user_id = 1 AND
                m.time_sale < '{$lsTimeSale}'
        ;";
        DbProxy::requestByQuery($query);

        $query = "
            UPDATE public.tuser
            SET gold = gold + {$lnGold}
            WHERE id = 1
        ;";
        DbProxy::requestByQuery($query);
    }
}
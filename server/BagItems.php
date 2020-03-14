<?php
/*function getBagItems(){
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
    return DbProxy::requestByQuery($query);
}*/
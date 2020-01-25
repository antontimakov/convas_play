<?php
function sellFish(){
    $query = "
        INSERT INTO public.tmarket(
            item_id,
            user_id,
            bcount,
            time_sale
        )
        SELECT
            b.item_id,
            1,
            b.bcount,
            NOW() + INTERVAL '1 SECOND' * b.bcount * i.price
        FROM public.tbag AS b
        INNER JOIN public.titem AS i ON (b.item_id = i.id)
        WHERE b.user_id = 1;

        DELETE FROM public.tbag
        WHERE user_id = 1;
    ;";
    return DbProxy::requestByQuery($query);
}
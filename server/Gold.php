<?php
function getGold(){
    $query = "
        SELECT
            gold
        FROM public.tuser
        WHERE id = 1
    ;";
    return DbProxy::requestByQuery($query);
}
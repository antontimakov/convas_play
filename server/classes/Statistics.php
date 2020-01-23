<?php
class Statistics{
    static function setCast(){
        $query = "
            INSERT INTO public.tstatistics(
                statistics_type_id,
                user_id,
                progress
            )
            SELECT
                1,
                1,
                0
            WHERE NOT EXISTS(
                SELECT 1
                FROM public.tstatistics
                WHERE
                    statistics_type_id = 1 AND
                    user_id = 1
            );

            UPDATE public.tstatistics
            SET progress = progress + 1
            WHERE
                statistics_type_id = 1 AND
                user_id = 1;
        ";
        DbProxy::requestByQuery($query);
    }
}
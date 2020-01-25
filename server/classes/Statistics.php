<?php
class Statistics{
    static function setCast($poItem){
        $loIncrAll = self::incr(1);
        $loInrGarbage = self::setFish($poItem);
        Achievements::countItems($loIncrAll, $loInrGarbage);
    }
    static function setFish($poItem){
        if($poItem->type_id == 4){ // "мусор"
            return self::incr(2);
        }
        else{
            if($poItem->type_id == 3){ // редчайшая рыба
                self::incr(4);
                if($poItem->id == 7){ // сом
                    $loIncrSom = self::incr(3);
                    Achievements::som($loIncrSom);
                }
            }
            return self::incr(2, true);
        }
    }
    // Функция инкрементирует переданный параметр и возвращает значение до и после
    static function incr($pnStatisticsTypeId, $pbDontChange = false){
        $query = "
            (
                SELECT progress
                FROM public.tstatistics
                WHERE
                    statistics_type_id = {$pnStatisticsTypeId} AND
                    user_id = 1

                UNION

                SELECT 0
            )
            ORDER BY progress DESC
        ";
        $laRes = DbProxy::requestByQuery($query);
        $lnProgressBefore = $laRes[0]['progress'];
        if ($pbDontChange){
            $loRet = new stdClass();
            $loRet->before = $lnProgressBefore;
            $loRet->after = $lnProgressBefore;
            return $loRet;
        }
        if ($lnProgressBefore == 0){
            $query = "
                INSERT INTO public.tstatistics(
                    statistics_type_id,
                    user_id,
                    progress
                )
                SELECT
                    {$pnStatisticsTypeId},
                    1,
                    0;
            ";
            DbProxy::requestByQuery($query);

        }
        $query = "
            UPDATE public.tstatistics
            SET progress = progress + 1
            WHERE
                statistics_type_id = {$pnStatisticsTypeId} AND
                user_id = 1
            RETURNING progress;
        ";
        $laRes = DbProxy::requestByQuery($query);
        $loRet = new stdClass();
        $loRet->before = $lnProgressBefore;
        $loRet->after = $laRes[0]['progress'];
        return $loRet;
    }
}
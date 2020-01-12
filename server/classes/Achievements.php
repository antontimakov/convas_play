<?php
class Achievements{
    static $gaNewAchievements = array();
    static $gnCountItemsBafore;

    static function setCountItems(){
        // Считаем кол-во не мусорных предметов в интентаре до вылова
        $query = "
            SELECT SUM(b.bcount) AS co
            FROM public.tbag AS b
            INNER JOIN public.titem AS i ON (b.item_id = i.id)
            INNER JOIN public.titem_type AS it ON (i.item_type_id = it.id)
            WHERE
                it.prior != 1 AND
                b.user_id = 1
        ";
        $laRes = DbProxy::requestByQuery($query);
        if (!$laRes[0]['co']){
            $laRes[0]['co'] = 0;
        }
        self::$gnCountItemsBafore = $laRes[0]['co'];
    }
    static function countItems(){
        // Считаем кол-во не мусорных предметов в интентаре после вылова
        $query = "
            SELECT SUM(b.bcount) AS co
            FROM public.tbag AS b
            INNER JOIN public.titem AS i ON (b.item_id = i.id)
            INNER JOIN public.titem_type AS it ON (i.item_type_id = it.id)
            WHERE
                it.prior != 1 AND
                b.user_id = 1
        ";
        $laRes = DbProxy::requestByQuery($query);
        $lnCountItemsAfter = $laRes[0]['co'];
        if (self::$gnCountItemsBafore == 0 && $lnCountItemsAfter > 0){
            self::addAchievement(1);
        }
        if (self::$gnCountItemsBafore == 99 && $lnCountItemsAfter > 99){
            self::addAchievement(2);
        }
        if (self::$gnCountItemsBafore == 499 && $lnCountItemsAfter > 499){
            self::addAchievement(3);
        }
        if (self::$gnCountItemsBafore == 999 && $lnCountItemsAfter > 999){
            self::addAchievement(4);
        }
    }
    static function addAchievement($lnId){
        $query = "
            SELECT 1 AS achievement_exists
            FROM public.tuser_achievements
            WHERE achievements_id = {$lnId};
        ";
        $laRes = DbProxy::requestByQuery($query);
        if (!$laRes){
            $laRes = array();
            $laRes[0] = array();
            $laRes[0]['achievement_exists'] = 0;
        }
        if ($laRes[0]['achievement_exists'] != 1){
            $query = "
                INSERT INTO public.tuser_achievements(
                    achievements_id, user_id)
                VALUES ({$lnId}, 1);
            ";
            DbProxy::requestByQuery($query);
            $query = "
                SELECT name
                FROM public.tachievements
                WHERE id = {$lnId};
            ";
            $laRes = DbProxy::requestByQuery($query);
            array_push(self::$gaNewAchievements, $laRes[0]['name']);
        }
    }
}
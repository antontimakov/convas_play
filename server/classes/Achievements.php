<?php
class Achievements{
    static $gaNewAchievements = array();
    static $gnCountItemsBafore;
    static $gnCountSomsBafore;
    static $gnExperienceBafore;

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
    static function setCountItems(){
        // Считаем кол-во не мусорных предметов в интентаре до вылова
        $query = "
            SELECT
                   SUM(b.bcount) AS co,
                   SUM(CASE WHEN i.id = 7 THEN b.bcount ELSE 0 END) AS soms
            FROM public.tbag AS b
            INNER JOIN public.titem AS i ON (b.item_id = i.id)
            INNER JOIN public.titem_type AS it ON (i.item_type_id = it.id)
            WHERE
                it.prior != 1 AND
                b.user_id = 1
        ";
        $laRes = DbProxy::requestByQuery($query);
        if (!$laRes){
            $laRes[0]['co'] = 0;
            $laRes[0]['soms'] = 0;
        }
        self::$gnCountItemsBafore = $laRes[0]['co'];
        self::$gnCountSomsBafore = $laRes[0]['soms'];
    }
    static function countItems(){
        // Считаем кол-во не мусорных предметов в интентаре после вылова
        $query = "
            SELECT
                   SUM(b.bcount) AS co,
                   SUM(CASE WHEN i.id = 7 THEN b.bcount ELSE 0 END) AS soms
            FROM public.tbag AS b
            INNER JOIN public.titem AS i ON (b.item_id = i.id)
            INNER JOIN public.titem_type AS it ON (i.item_type_id = it.id)
            WHERE
                it.prior != 1 AND
                b.user_id = 1
        ";
        $laRes = DbProxy::requestByQuery($query);
        if (!$laRes){
            $laRes[0]['co'] = 0;
            $laRes[0]['soms'] = 0;
        }
        $lnCountItemsAfter = $laRes[0]['co'];
        $lnCountSomsAfter = $laRes[0]['soms'];
        if (self::$gnCountItemsBafore == 0 && $lnCountItemsAfter > 0){
            self::addAchievement(1);
        }
        if (self::$gnCountItemsBafore < 100 && $lnCountItemsAfter >= 100){
            self::addAchievement(2);
        }
        if (self::$gnCountItemsBafore < 500 && $lnCountItemsAfter >= 500){
            self::addAchievement(3);
        }
        if (self::$gnCountItemsBafore < 1000 && $lnCountItemsAfter >= 1000){
            self::addAchievement(4);
        }
        if (self::$gnCountSomsBafore == 0 && $lnCountSomsAfter > 0){
            self::addAchievement(8);
        }
        if (self::$gnCountSomsBafore < 5 && $lnCountSomsAfter >= 5){
            self::addAchievement(9);
        }
    }
    static function setExperience(){
        $query = "
            SELECT experience
            FROM public.tuser
            WHERE id = 1
        ";
        $laRes = DbProxy::requestByQuery($query);
        self::$gnExperienceBafore = $laRes[0]['experience'];
    }
    static function experience(){
        $query = "
            SELECT experience
            FROM public.tuser
            WHERE id = 1
        ";
        $laRes = DbProxy::requestByQuery($query);
        $lnExperienceAfter = $laRes[0]['experience'];
        $lnLvlBefore = lvlByExperience(self::$gnExperienceBafore)->lvl;
        $lnLvlAfter = lvlByExperience($lnExperienceAfter)->lvl;
        if ($lnLvlBefore < 2 && $lnLvlAfter >= 2){
            self::addAchievement(5);
        }
        if ($lnLvlBefore < 5 && $lnLvlAfter >= 5){
            self::addAchievement(6);
        }
        if ($lnLvlBefore < 10 && $lnLvlAfter >= 10){
            self::addAchievement(7);
        }
    }
    static function som($pnItemId){
        if ($pnItemId == 7){
            self::addAchievement(8);
        }
    }
}
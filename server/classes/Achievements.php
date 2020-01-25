<?php
class Achievements{
    static $gaNewAchievements = array();
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
                SELECT
                    name,
                    description
                FROM public.tachievements
                WHERE id = {$lnId};
            ";
            $laRes = DbProxy::requestByQuery($query);
            $loAchievement = new StdClass();
            $loAchievement->name = $laRes[0]['name'];
            $loAchievement->description = $laRes[0]['description'];
            array_push(self::$gaNewAchievements, $loAchievement);
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
    // Считаем кол-во не мусорных предметов в интентаре после вылова
    static function countItems($poIncrAll, $poInrGarbage){
        // выловлено не мусорных до заброса
        $lnNotGarbageBef = $poIncrAll->before - $poInrGarbage->before;
        // выловлено не мусорных после заброса
        $lnNotGarbageAfter = $poIncrAll->after - $poInrGarbage->after;

        if (($lnNotGarbageBef) == 0 &&
            ($lnNotGarbageAfter) > 0){
            self::addAchievement(1);
        }
        if (($lnNotGarbageBef) < 100 &&
            ($lnNotGarbageAfter) >= 100){
            self::addAchievement(2);
        }
        if (($lnNotGarbageBef) < 500 &&
            ($lnNotGarbageAfter) >= 500){
            self::addAchievement(3);
        }
        if (($lnNotGarbageBef) < 1000 &&
            ($lnNotGarbageAfter) >= 1000){
            self::addAchievement(4);
        }
    }
    static function som($poIncrSom){
        if ($poIncrSom->after == 1) {
            self::addAchievement(8);
        }
        if ($poIncrSom->after == 5) {
            self::addAchievement(9);
        }
    }
}
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
}
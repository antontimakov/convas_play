<?php
function getExperience(){
    $query = "
                    SELECT
                        experience
                    FROM public.tuser
                    WHERE id = 1
                ;";
    $laRes = DbProxy::requestByQuery($query);
    return lvlByExperience($laRes[0]['experience']);
}
function lvlByExperience($pnExperience){
    $loRes = new StdClass();
    $loRes->lvlStart = 0;
    $loRes->lvlEnd = 100;
    $loRes->lvl = 1;
    $loRes->experience = $pnExperience;
    while (true){
        if ($pnExperience < $loRes->lvlEnd){
            return $loRes;
        }
        else {
            $lnNewLvlEnd = floor($loRes->lvlEnd + ($loRes->lvlEnd - $loRes->lvlStart) * 1.3);
            $loRes->lvlStart = $loRes->lvlEnd;
            $loRes->lvlEnd = $lnNewLvlEnd;
            ++$loRes->lvl;
        }
    }
    return false;
}
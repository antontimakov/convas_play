<?php
//http://localhost/Laravel/public/index.php/method/getbagitems
namespace App\Http\Controllers;

use App\Tuser;
use App\Http\Controllers\Controller;

class Experience extends Controller
{
    /**
     * Показать профиль данного пользователя.
     *
     * @param  int  $id
     * @return Response
     */
    public function show()
    {
        return ['data' => $this->lvlByExperience(Tuser::where('id', 1)->value('experience'))];
    }
    protected function lvlByExperience($pnExperience){
        $loRes = (object)[];
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
}

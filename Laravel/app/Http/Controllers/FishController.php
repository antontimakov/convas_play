<?php
//http://localhost/Laravel/public/getbagitems
namespace App\Http\Controllers;

use App\Titem;

class FishController extends Controller
{
    public function getFish()
    {
        // Выбираем предметы которые можем выловить и "вероятности" их улова
        $res = Titem::get();
        $ret = [];
        $sumProbability = 0;
        foreach($res as $r){
            $probability = $r
                ->titemTypes
                ->tprior
                ->probability;
            $sumProbability += $probability;
            $ret[] = [
                'id' => $r->id,
                'probability' => $probability
            ];
        }
        $this->idByRand($ret, $sumProbability);
        print_r($ret);
        die();
        $aRes = $oRes -> toArray();
        foreach ($aRes as $value){
            print_r($value);
        }
    }
    // Выбирает категорию в соответстви с распределением вероятностей
    function idByRand(array $paRes, int $sumProbability){
        $lnRand = mt_rand (0, $sumProbability);
        $lnSumProb = 0; // сумма вероятностей
        foreach ($paRes as $paRe) {
            $lnSumProb += $paRe['probability'];
            if ($lnSumProb > $lnRand){
                return $paRe['id'];
            }
        }
        return false;
    }
}

<?php
//http://localhost/Laravel/public/getbagitems
namespace App\Http\Controllers;

use App\TitemType;

class FishController extends Controller
{
    public function getFish()
    {
        $oRes = TitemType::orderBy('prior')
            ->get();
        $aRes = $oRes -> toArray();
        foreach ($aRes as $value){
            print_r($value);
        }
        die();
//         SELECT DISTINCT ON (it.prior)
//            i.id,
//            it.probability,
//            it.prior,
//            it.id AS type_id
//        FROM public.titem AS i
//        INNER JOIN public.titem_type AS it ON (i.item_type_id = it.id)
//        ORDER BY
//            it.prior,
//            RANDOM()
    }
    // Выбирает категорию в соответстви с распределением вероятностей
    function idByRand($paRes){
        $lnRand = rand (0,99);
        $lnSumProb = 0; // сумма вероятностей
        foreach ($paRes as $paRe) {
            $lnSumProb += $paRe['probability'];
            if ($lnSumProb > $lnRand){
                $loRet = new stdClass();
                $loRet->id = $paRe['id'];
                $loRet->type_id = $paRe['type_id'];
                return $loRet;
            }
        }
        return false;
    }
}

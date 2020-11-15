<?php
//http://localhost/Laravel/public/getbagitems
namespace App\Http\Controllers;

use App\Titem;

class FishController extends Controller
{
    public function getFish()
    {
        $laItems = $this->selAllItems();
        $randItem = $this->idByRand($laItems['items'], $laItems['sumProbability']);
        print_r($randItem);
    }

    /**
     * Выбирает категорию в соответстви с распределением вероятностей
     * @param array $paRes массив из базы
     * @param int $sumProbability
     * @return int|null
     */
    protected function idByRand(array $paItems, int $sumProbability){
        $lnRand = mt_rand (0, $sumProbability - 1);
        $lnSumProb = 0; // сумма вероятностей
        foreach ($paItems as $paItem) {
            $lnSumProb += $paItem['probability'];
            if ($lnSumProb > $lnRand){
                return (int)$paItem['id'];
            }
        }
        return null;
    }

    /**
     * Выбирает предметы которые можем выловить и "вероятности" их улова
     * @return array Массив предметов и сумма "Вероятностей"
     */
    protected function selAllItems(){
        $res = Titem::get();
        $items = [];
        $sumProbability = 0;
        foreach($res as $r){
            $probability = $r
                ->titemTypes
                ->tprior
                ->probability;
            $sumProbability += $probability;
            $items[] = [
                'id' => $r->id,
                'probability' => $probability
            ];
        }
        return [
            'items' => $items,
            'sumProbability' => $sumProbability
        ];
    }
}

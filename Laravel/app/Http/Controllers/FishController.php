<?php
namespace App\Http\Controllers;

use App\Titem;
use App\Tbag;
use App\Tuser;

class FishController extends Controller
{
    public function getFish()
    {
        $laItems = $this->getAllItems();
        $item = $this->randItem($laItems['items'], $laItems['sumProbability']);
        $itemId = $item['itemId'];
        $countItems = $this->getCountItemsById($itemId);
        if ($countItems === 0) {
            $this->createNewRecTbag($itemId);
        }
        $this->incrementItemById($itemId);
        $this->addExperience($item['experience']);
        return $item;
    }

    /**
     * Выбирает категорию в соответстви с распределением вероятностей
     * @param array $paRes массив из базы
     * @param int $sumProbability
     * @return array|null
     */
    protected function randItem(array $paItems, int $sumProbability): array
    {
        $lnRand = mt_rand(0, $sumProbability - 1);
        $lnSumProb = 0; // сумма вероятностей
        foreach ($paItems as $paItem) {
            $lnSumProb += $paItem['probability'];
            if ($lnSumProb > $lnRand) {
                return [
                    'itemId' => $paItem['id'],
                    'experience' => $paItem['experience']
                ];
            }
        }
        return null;
    }

    /**
     * Выбирает предметы которые можем выловить и "вероятности" их улова
     * @return array Массив предметов и сумма "Вероятностей"
     */
    protected function getAllItems(): array
    {
        $res = Titem::get();
        $items = [];
        $sumProbability = 0;
        foreach ($res as $r) {
            $probability = $r
                ->titemTypes
                ->tprior
                ->probability;
            $sumProbability += $probability;
            $items[] = [
                'id' => $r->id,
                'probability' => (int)$probability,
                'experience' => (int)$r->experience
            ];
        }
        return [
            'items' => $items,
            'sumProbability' => $sumProbability
        ];
    }

    /**
     * Возвращает кол-во предметов по идентификатору
     * @param int $itemId Идентификатор предмета
     * @return int Кол-во предматов
     */
    protected function getCountItemsById(int $itemId): int
    {
        return (int)Tbag::where([
                ['tuser_id', '=', 1],
                ['titem_id', '=', $itemId]
            ])
            ->count();
    }

    /**
     * Создаёт запись в таблице рюкзака
     * @param int $titemId Идентификатор новой записи
     */
    protected function createNewRecTbag(int $titemId): void
    {
        $tbag = new Tbag;
        $tbag->tuser_id = 1;
        $tbag->titem_id = $titemId;
        $tbag->save();
    }

    /**
     * Увеличиывет кол-во выловленных предметов
     * @param int $itemId Идентификатор предмета
     */
    protected function incrementItemById(int $itemId): void
    {
        $tbag = Tbag::where([
            ['titem_id', '=', $itemId],
            ['tuser_id', '=', 1]
        ])->first();
        $tbag->bcount = $tbag->bcount + 1;
        $tbag->save();
    }

    /**
     * Добавляет опыт пользователю
     * @param int $experience Кол-во опыта
     */
    protected function addExperience(int $experience): void
    {
        $tuser = Tuser::find(1);
        $tuser->experience += $experience;
        $tuser->save();
    }
}

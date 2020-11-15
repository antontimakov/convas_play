<?php

declare(strict_types=1);

namespace App\Repositories\Main;

use App\Models\Main\Titem;
use App\Models\Main\Tbag;
use App\Models\Main\Tuser;

/**
 * Class FishRepository
 * @package App\Repositories\Main
 */
class FishRepository
{
    /**
     * Выбирает предметы которые можем выловить и "вероятности" их улова
     * @return array Массив предметов и сумма "Вероятностей"
     */
    public function getAllItems(): array
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
                'experience' => (int)$r->experience,
                'name' => (string)$r->name,
                'src_full' => (string)$r->src_full
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
    public function getCountItemsById(int $itemId): int
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
    public function createNewRecTbag(int $titemId): void
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
    public function incrementItemById(int $itemId): void
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
    public function addExperience(int $experience): void
    {
        $tuser = Tuser::find(1);
        $tuser->experience += $experience;
        $tuser->save();
    }
}

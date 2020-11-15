<?php

declare(strict_types=1);

namespace App\Services\Main;

use App\Repositories\Main\FishRepository;

/**
 * Class FishService
 * @package App\Services\Main
 */
class FishService
{
    protected FishRepository $fishRepository;

    public function __construct(FishRepository $fishRepository)
    {
        $this->fishRepository = $fishRepository;
    }
    /**
     * Реализуем алгоритм ловли рыбы
     * @return array Информация о выловленной рыбе
     */
    public function index(): array
    {
        $laItems = $this->fishRepository->getAllItems();
        $item = $this->randItem($laItems['items'], $laItems['sumProbability']);
        $itemId = $item['id'];
        $countItems = $this->fishRepository->getCountItemsById($itemId);
        if ($countItems === 0) {
            $this->fishRepository->createNewRecTbag($itemId);
        }
        $this->fishRepository->incrementItemById($itemId);
        $this->fishRepository->addExperience($item['experience']);
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
                return $paItem;
            }
        }
        return null;
    }
}

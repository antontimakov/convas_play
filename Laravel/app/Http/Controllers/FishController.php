<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\Main\FishService;

/**
 * Class FishController
 * @package App\Http\Controllers
 */
class FishController extends Controller
{
    protected FishService $fishService;

    /**
     * FishController constructor.
     * @param FishService $fishService
     */
    public function __construct(
        FishService $fishService
    ) {
        $this -> fishService = $fishService;
    }

    /**
     * @return array
     */
    public function getFish(): array
    {
        return $this->fishService->index();
    }
}

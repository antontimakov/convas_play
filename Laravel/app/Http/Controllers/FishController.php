<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\Main\FishService;

class FishController extends Controller
{
    protected FishService $fishService;

    public function __construct(
        FishService $fishService
    ) {
        $this -> fishService = $fishService;
    }

    public function getFish(): array
    {
        return $this->fishService->index();
    }
}

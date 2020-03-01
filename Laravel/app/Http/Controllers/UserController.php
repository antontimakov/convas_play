<?php

namespace App\Http\Controllers;

use App\Task;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Показать профиль данного пользователя.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        return Task::findOrFail($id);
    }
}

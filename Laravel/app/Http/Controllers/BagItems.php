<?php
//http://localhost/Laravel/public/index.php/method/getbagitems
namespace App\Http\Controllers;

use App\Tbag;
use App\Titem;
use App\Http\Controllers\Controller;

class BagItems extends Controller
{
    /**
     * Показать профиль данного пользователя.
     *
     * @param  int  $id
     * @return Response
     */
    public function show()
    {
        return Tbag::find(3)->titem->name;
    }
}

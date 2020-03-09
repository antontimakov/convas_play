<?php
//http://localhost/Laravel/public/index.php/method/getbagitems
namespace App\Http\Controllers;

use App\Tbag;
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
        //return Tbag::find(3)->titem->name;
        return Tbag::with(['titem' => function($query){
                $query->select('id', 'name', 'src');
            }])
            ->select('bcount', 'titem_id')
            ->where('tuser_id', 1)
            ->get()->toJson();
    }
}

<?php
//http://localhost/Laravel/public/getbagitems
namespace App\Http\Controllers;

use App\Tbag;

class BagItems extends Controller
{
    public function show()
    {
        $res = Tbag::with(['titem' => function($query){
                $query->select('id', 'name', 'src');
            }])
            ->select('bcount', 'titem_id')
            ->where('tuser_id', 1);
        return ['data' =>
            $res->get()
            ->toArray()];
    }
}

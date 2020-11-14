<?php
//http://localhost/Laravel/public/getbagitems
namespace App\Http\Controllers;

use App\Tbag;

class BagItems extends Controller
{
    public function show()
    {
        $res = Tbag::select('bcount', 'titem_id')
            ->where('tuser_id', 1)
            ->get();
        $ret = [];
        foreach($res as $r){
            $ret[] = [
                'bcount' => $r->bcount,
                'titem_id' => $r->titem_id,
                'id' => $r->titem->id,
                'name' => $r->titem->name,
                'src' => $r->titem->src
            ];
        }
        return ['data' => $ret];
    }
}

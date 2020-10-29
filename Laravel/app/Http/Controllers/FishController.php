<?php
//http://localhost/Laravel/public/getbagitems
namespace App\Http\Controllers;

use App\TitemType;

class FishController extends Controller
{
    public function getFish()
    {
        $res = TitemType::get();
        echo $res;
        die();
//         SELECT DISTINCT ON (it.prior)
//            i.id,
//            it.probability,
//            it.prior,
//            it.id AS type_id
//        FROM public.titem AS i
//        INNER JOIN public.titem_type AS it ON (i.item_type_id = it.id)
//        ORDER BY
//            it.prior,
//            RANDOM()


    }
}

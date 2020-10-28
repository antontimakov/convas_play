<?php
//http://localhost/Laravel/public/index.php/method/sellFish
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

/*
 * $select = User::where(...)
                  ->where(...)
                  ->whereIn(...)
                  ->select(array('email','moneyOwing'));
$bindings = $select->getBindings();


DB::table('user_debt_collection')
->insertUsing(['email','dinero'], $select);
 * */

class TmarketController extends Controller
{
    public function sellFish()
    {
        DB::transaction(function () {
            DB::select(DB::raw("
            INSERT INTO public.tmarkets(
                item_id,
                user_id,
                bcount,
                time_sale
            )
            SELECT
                b.item_id,
                1,
                b.bcount,
                NOW() + INTERVAL '1 SECOND' * SUM(b.bcount * i.price) OVER()
            FROM public.tbags AS b
            INNER JOIN public.titems AS i ON (b.item_id = i.id)
            WHERE
                b.user_id = 1 AND
                i.item_type_id != 4;"));

            DB::table('tbag')->delete()->where('user_id', 1);
        });
        return DB::statement("
            INSERT INTO public.tmarket(
                item_id,
                user_id,
                bcount,
                time_sale
            )
            SELECT
                b.item_id,
                1,
                b.bcount,
                NOW() + INTERVAL '1 SECOND' * SUM(b.bcount * i.price) OVER()
            FROM public.tbag AS b
            INNER JOIN public.titem AS i ON (b.item_id = i.id)
            WHERE
                b.user_id = 1 AND
                i.item_type_id != 4;
    
            DELETE FROM public.tbag
            WHERE user_id = 1;
        ");
    }
}

<?php

namespace App\Models\Main;

use Illuminate\Database\Eloquent\Model;

class Titem extends Model
{
    protected $table = 'main.titems';

    public function titemTypes()
    {
        return $this->belongsTo('App\Models\Main\TitemTypes', 'item_types_id', 'id');
    }
}

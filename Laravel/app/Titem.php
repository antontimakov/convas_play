<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Titem extends Model
{
    protected $table = 'main.titems';

    public function titemTypes()
    {
        return $this->belongsTo('App\TitemTypes', 'item_types_id', 'id');
    }
}

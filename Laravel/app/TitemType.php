<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TitemType extends Model
{

    public function titem()
    {
        return $this->belongsTo('App\Titem');
    }
}

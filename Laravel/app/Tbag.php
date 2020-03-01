<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tbag extends Model
{
    public function titem()
    {
        return $this->belongsTo('App\Titem');
    }
}

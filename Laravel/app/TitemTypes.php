<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TitemTypes extends Model
{
    protected $table = 'main.titem_types';

    public function titem()
    {
        return $this->belongsTo('App\Titem');
    }

    public function tprior()
    {
        return $this->belongsTo('App\Tprior');
    }
}

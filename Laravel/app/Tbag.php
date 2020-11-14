<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tbag extends Model
{
    protected $table = 'main.tbags';

    public function titem()
    {
        return $this->belongsTo('App\Titem');
    }
    public function tuser()
    {
        return $this->belongsTo('App\Tuser');
    }
}

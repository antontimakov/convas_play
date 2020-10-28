<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tmarket extends Model
{
    public function titem()
    {
        return $this->belongsTo('App\Titem');
    }
    public function tuser()
    {
        return $this->belongsTo('App\Tuser');
    }
}

<?php

namespace App\Models\Main;

use Illuminate\Database\Eloquent\Model;

class Tmarket extends Model
{
    public function titem()
    {
        return $this->belongsTo('App\Models\Main\Titem');
    }
    public function tuser()
    {
        return $this->belongsTo('App\Models\Main\Tuser');
    }
}

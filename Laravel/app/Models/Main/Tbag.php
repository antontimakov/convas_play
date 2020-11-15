<?php

namespace App\Models\Main;

use Illuminate\Database\Eloquent\Model;

class Tbag extends Model
{
    protected $table = 'main.tbags';

    public function titem()
    {
        return $this->belongsTo('App\Models\Main\Titem');
    }
    public function tuser()
    {
        return $this->belongsTo('App\Models\Main\Tuser');
    }
}

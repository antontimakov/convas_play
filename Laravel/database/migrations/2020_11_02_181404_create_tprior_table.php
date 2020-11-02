<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTpriorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('main.tprior', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('prior')->default(0)->comment('Приоритет');
            $table->integer('probability')->default(0)->comment('Вероятность');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('main.tprior');
    }
}

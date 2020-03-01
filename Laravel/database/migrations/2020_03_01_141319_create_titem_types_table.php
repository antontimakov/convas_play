<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTitemTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('titem_types', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('name')->comment('Наименование типа');
            $table->integer('probability')->default(0)->comment('Вероятность');
            $table->integer('prior')->default(0)->comment('Приоритет');
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
        Schema::dropIfExists('titem_types');
    }
}

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTitemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('titems', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('name')->comment('Наименование предмета');
            $table->unsignedBigInteger('item_types_id')->comment('Тип');
            $table->text('src')->default('')->comment('Путь к изображению');
            $table->text('src_full')->default('')
                ->comment('Путь к крупному изображению');
            $table->integer('experience')->default(0)->comment('Опыт');
            $table->integer('price')->default(0)->comment('Цена');
            $table->text('description')->default('')->comment('Описание');
            $table->timestamps();

            $table->foreign('item_types_id')->references('id')
                ->on('titem_types')
                ->onUpdate('cascade')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('titems');
    }
}

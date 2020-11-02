<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTmarketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('main.tmarkets', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('tuser_id')->comment('Пользователь');
            $table->unsignedBigInteger('titem_id')->comment('Предмет');
            $table->integer('bcount')->default(0)->comment('Кол-во');
            $table->timestamp('time_sale')->comment('Время продажи');
            $table->timestamps();

            $table->foreign('tuser_id')->references('id')
                ->on('main.tusers')
                ->onUpdate('cascade')
                ->onDelete('restrict');

            $table->foreign('titem_id')->references('id')
                ->on('main.titems')
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
        Schema::dropIfExists('main.tmarkets');
    }
}

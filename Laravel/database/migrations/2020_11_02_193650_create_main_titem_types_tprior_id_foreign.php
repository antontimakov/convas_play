<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMainTitemTypesTpriorIdForeign extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('main.titem_types', function (Blueprint $table) {
            $table->foreign('tprior_id')->references('id')
                ->on('main.tprior')
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
        Schema::table('main.titem_types', function(Blueprint $table) {
            $table->dropForeign('main_titem_types_tprior_id_foreign');
        });
    }
}

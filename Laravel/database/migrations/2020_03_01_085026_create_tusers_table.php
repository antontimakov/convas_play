<?php
// php artisan make:migration create_tusers_table --create=tusers
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTusersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('main.tusers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('name')->comment('Имя в игре');
            $table->integer('experience')->default(0)->comment('Опыт');
            $table->integer('gold')->default(0)->comment('Золото');
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
        Schema::dropIfExists('main.tusers');
    }
}

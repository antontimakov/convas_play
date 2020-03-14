<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', function () {

    return view('welcome', [
        'tasks' => 2
    ]);
});

Route::get('app/tasks/{task}', function (App\Task $task) {
    // http://localhost/index.php/app/users/1
    return $task->name;
});


Route::get('user/{id}', 'UserController@show');*/

Route::get('method/getbagitems', 'BagItems@show');
Route::get('method/getExperience', 'TuserController@experience');
Route::get('method/getGold', 'TuserController@gold');

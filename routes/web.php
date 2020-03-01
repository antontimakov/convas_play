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

Route::get('/', function () {
    return view('welcome');
});
//Route::view('/', 'welcome');


Route::get('app/users/{task}', function (App\User $task) {
    // http://localhost/index.php/app/users/1
    return $task->name;
});
/*
Route::get('/user/{user}', 'Controller@dispatch');*/
"use strict";

// конфигурация игры
let goGame = null;
// конфигурация области забрасывания
let goLake = null;
// конфигурация кнопки заброса
let goCast = null;
// конфигурация сумки
let goBag = null;
// конфигурация поплавка
let goFloat = null;

function init() {
    goGame = new Game();
    goLake = new Lake();
    goCast = new Cast();
    goBag = new Bag();
    goFloat = new Float();

    setInterval(play, goGame.timeout);
}

function play(){
    goLake.draw();
    goCast.draw();
    goBag.draw();
    goFloat.draw();
}

// Нормальное распеределение от 0 до 1 с МО 0.5
function randn_bm() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0 + 0.5;
    if (num > 1 || num < 0) return randn_bm();
    return num;
}
// вызывает все клики
function allClicks(poE){
    //clickFloat(poE);
    goCast.click(poE);
}
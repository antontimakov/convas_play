"use strict";

let goGame, goLake, goCast, goBag, goFloat, goCatch;

function init() {
    // конфигурация игры
    goGame = new Game();
    // конфигурация области забрасывания
    goLake = new Lake();
    // конфигурация кнопки заброса
    goCast = new Cast();
    // конфигурация сумки
    goBag = new Bag();
    // конфигурация поплавка
    goFloat = new Float();
    // конфигурация улова
    goCatch = new Catch();

    setInterval(play, goGame.timeout);
}

function play(){
    goLake.draw();
    goCast.draw();
    goFloat.draw();
    goBag.draw();
    goCatch.draw();
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
    goFloat.click(poE);
    goCast.click(poE);
}
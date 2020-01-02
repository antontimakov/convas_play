"use strict";
let goContext = null;

// конфигурация игрового поля
let goGame = {
    width: 480,
    height: 320,
    color: 'blue',
    field: null
};

// конфигурация поплавка
let goFloat = {
    width: 40,
    height: 40,
    color: 'black',
    bitingColor: 'red',
    field: null
};

// конфигурация кнопки заброса
let goCast = {
    width: 40,
    height: 40,
    color: 'black',
    field: null
};

let gbShowFloat = false;

function init() {
    let canvas = document.getElementById("fishingPlay");
    canvas.width = goGame.width;
    canvas.height = goGame.height;
    goContext = canvas.getContext("2d");

    // объект который задаёт игровое поле
    goGame.field = new Rect(goGame.color, 0, 0, goGame.width, goGame.height);
    // объект который задаёт поплавок
    goFloat.field = new Rect(goFloat.color, 0, 0, goFloat.width, goFloat.height);
    // объект который задаёт кнопку броска
    goCast.field = new Rect(
        goCast.color,
        goGame.width - goCast.width,
        goGame.height - goCast.height,
        goCast.width,
        goCast.height);

    canvas.onclick = allClicks;
    setInterval(play, 1000 / 50);
}
// класс определяющий параметры игрового прямоугольника и метод для его отрисовки
function Rect(color, x, y, width, height) {
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.draw = function() {
        goContext.fillStyle = this.color;
        goContext.fillRect(this.x, this.y, this.width, this.height);
    };
}
function play(){
    goGame.field.draw();
    if (gbShowFloat){
        goFloat.field.draw();
    }
    goCast.field.draw();
}
function clickFloat(poE){
    if (
        poE.x > goFloat.field.x &&
        poE.x <= (goFloat.field.x + goFloat.field.width) &&
        poE.y > goFloat.field.y &&
        poE.y <= (goFloat.field.y + goFloat.field.height)
    ){
        gbShowFloat = false;
        goFloat.field.color = goFloat.color;
    }
}
function clickCast(poE){
    if (
        poE.x > goCast.field.x &&
        poE.x <= (goCast.field.x + goCast.field.width) &&
        poE.y > goCast.field.y &&
        poE.y <= (goCast.field.y + goCast.field.height)
    ){
        gbShowFloat = true;
        setTimeout(biting, randn_bm() * 3000);
    }
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
// событие клевание рыбы
function biting(){
    if (gbShowFloat){ // без этого условия будет перекрашиваться даже не скрытый поплавок
        goFloat.field.color = goFloat.bitingColor;
    }
}
// вызывает все клики
function allClicks(poE){
    clickFloat(poE);
    clickCast(poE);
}
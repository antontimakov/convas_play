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
    field: null
};

function init() {
    let canvas = document.getElementById("pong");
    canvas.width = goGame.width;
    canvas.height = goGame.height;
    goContext = canvas.getContext("2d");

    // объект который задаёт игровое поле
    goGame.field = new Rect(goGame.color, 0, 0, goGame.width, goGame.height);
    // объект который задаёт поплавок
    goFloat.field = new Rect(goFloat.color, 0, 0, goFloat.width, goFloat.height);

    canvas.onclick = clickFloat;
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
    goFloat.field.draw();

}
function clickFloat(poE){
    if (
        poE.x > goFloat.field.x &&
        poE.x <= (goFloat.field.x + goFloat.field.width) &&
        poE.y > goFloat.field.y &&
        poE.y <= (goFloat.field.y + goFloat.field.height)){
        goFloat.field.x += 20;
    }
}
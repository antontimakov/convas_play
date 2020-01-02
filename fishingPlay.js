"use strict";
let goContext = null;

// конфигурация игрового поля
let goGame = {
    width: 480,
    height: 320,
    color: '#9999ff',
    field: null
};

// конфигурация поплавка
let goFloat = {
    width: 40,
    height: 40,
    color: 'black',
    x: 0,
    y: 0,
    img: null,
    gbBiting: false,
    radius: 20,
    bitingRadius: null,
};

// конфигурация кнопки заброса
let goCast = {
    width: 40,
    height: 320,
    color: 'black',
    img: null
};

let gbShowFloat = false; // показывать поплавок
let goTimeBitingStart = null; // время начала поклёвки
let goTimeBitingEnd = null; // время начала поклёвки

function init() {
    let canvas = document.getElementById("fishingPlay");
    canvas.width = goGame.width;
    canvas.height = goGame.height;
    goContext = canvas.getContext("2d");
    goFloat.img = new Image();
    goFloat.img.src = 'img/float.png';
    goCast.img = new Image();
    goCast.img.src = 'img/rod.png';

    // объект который задаёт игровое поле
    goGame.field = new Rect(goGame.color, 0, 0, goGame.width, goGame.height);

    canvas.onclick = allClicks;
    goFloat.img.onload = () => {
        goCast.img.onload = () => {
            setInterval(play, 1000 / 50);
        };
    };
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
    biting();
    autoStopBiting();
    showFloat();
    goContext.drawImage(goCast.img, goGame.width - goCast.width, 0);
}
function clickFloat(poE){
    if (
        poE.x > goFloat.x &&
        poE.x <= (goFloat.x + goFloat.width) &&
        poE.y > goFloat.y &&
        poE.y <= (goFloat.y + goFloat.height)
    ){
        gbShowFloat = false;
    }
}
function clickCast(poE){
    if (
        (poE.x > (goGame.width - goCast.width)) &&
        poE.x <= goGame.width &&
        poE.y > 0 &&
        poE.y <= goGame.height
    ){
        gbShowFloat = true;
        goFloat.x =  getXFloat();
        goFloat.y =  getYFloat();
        goFloat.bitingRadius = goFloat.radius;
        goTimeBitingStart = new Date().getTime() + randn_bm() * 10000;
        goTimeBitingEnd = null;
        goFloat.gbBiting = false;
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
    if (
        goTimeBitingStart &&
        (goTimeBitingStart < new Date().getTime()) &&
        gbShowFloat &&
        !goTimeBitingEnd // чтобы функция выполнялась 1 раз за поклёвку
    ){
        goTimeBitingEnd = new Date().getTime() + randn_bm() * 10000;
        goFloat.gbBiting = true;
    }
}
// вызывает все клики
function allClicks(poE){
    clickFloat(poE);
    clickCast(poE);
}
// вычисляет х координату броска
function getXFloat() {
    return Math.random() * (goGame.width - goFloat.width - goCast.width);
}
// вычисляет у координату броска
function getYFloat() {
    return Math.random() * (goGame.height - goFloat.height);
}
// показывает поплавок
function showFloat(){
    if (gbShowFloat){
        goContext.drawImage(goFloat.img, goFloat.x, goFloat.y);
        bitingAnimate();
    }
}
// рыба перестала клевать
function autoStopBiting() {
    if (goTimeBitingEnd && (goTimeBitingEnd < new Date().getTime()) && gbShowFloat){
        gbShowFloat = false;
    }
}
// анимация поклёвки
function bitingAnimate() {
    if (goFloat.gbBiting) {
        goContext.beginPath();
        goContext.arc(
            goFloat.x + goFloat.width / 2,
            goFloat.y + goFloat.height / 2,
            goFloat.bitingRadius++,
            0,
            Math.PI * 2,
            true
        );
        goContext.stroke();
    }
}
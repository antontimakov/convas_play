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
let goFloat = {
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    show: false,
    color: 'black',
    img: null,
    gbBiting: false,
    radius: 20,
    bitingRadius: null,
};

let gbShowFloat = false; // показывать поплавок
let goTimeBitingStart = null; // время начала поклёвки
let goTimeBitingEnd = null; // время начала поклёвки

let gaBagImgs = [];

function init() {
    goGame = new Game();
    goLake = new Lake();
    goCast = new Cast();
    goBag = new Bag();

    goFloat.img = new Image();
    goFloat.img.src = 'img/float.png';

    setInterval(play, goGame.timeout);
    /*window.axios.get('/server/index.php?method=getBagItems')
        .then(response => {
            response.data.forEach(function (element, index) {
                gaBagImgs[index] = {};
                gaBagImgs[index].goImg = new Image();
                gaBagImgs[index].goImg.src = element.src;
            });
            console.log(gaBagImgs);
        });*/
}

function play(){
    goLake.draw();
    goCast.draw();
    goBag.draw();
    /*
    if (gaBagImgs[0]){
        goGame.context.drawImage(gaBagImgs[0].goImg, goGame.width - 40, goGame.height);
        // настройки текста
        goGame.context.font = 'bold 20px courier';
        goGame.context.textAlign = 'center';
        goGame.context.textBaseline = 'top';
        goGame.context.fillStyle = 'white';
        goGame.context.fillText(1,  goGame.width - 10, 340);
    }
    if (gaBagImgs[1]) {
        goGame.context.drawImage(gaBagImgs[1].goImg, goGame.width - 80, goGame.height);
    }
    biting();
    autoStopBiting();
    showFloat();
    goGame.context.drawImage(goCast.img, goGame.width - goCast.width, 0);*/
}
function clickFloat(poE){
    if (
        poE.x > goCast.x &&
        poE.x <= (goCast.x + goCast.width) &&
        poE.y > goCast.y &&
        poE.y <= (goCast.y + goCast.height)
    ){
        goFloat.show = false;
        window.axios.get('/server/index.php?method=getBagItems')
            .then(response => console.log(response.data));
        gaBagImgs[0].gnCount = 1;
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
    //clickFloat(poE);
    goCast.click(poE);
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
        goGame.context.drawImage(goFloat.img, goFloat.x, goFloat.y);
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
        goGame.context.beginPath();
        goGame.context.arc(
            goFloat.x + goFloat.width / 2,
            goFloat.y + goFloat.height / 2,
            goFloat.bitingRadius++,
            0,
            Math.PI * 2,
            true
        );
        goGame.context.stroke();
    }
}
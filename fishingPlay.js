"use strict";

let goGame, goLake, goCast, goBag, goFloat, goCatch, goMsg, goAchievements,
    goFishMarket, goShop, goShopWindow;

function init() {
    // конфигурация игры
    goGame = new Game();
    // конфигурация достижений
    goAchievements = new Achievements();
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
    // конфигурация сообщений
    goMsg = new Msg();
    // конфигурация рыбного рынка
    goFishMarket = new FishMarket();
    // конфигурация магазина
    goShop = new Shop();
    // конфигурация магазина
    goShopWindow = new ShopWindow();

    setInterval(play, goGame.timeout);
    setInterval(bombing, goGame.timeoutBombing);
}

function play(){
    if (goGame.showMainWindow){
        goLake.draw();
        goCast.draw();
        goFloat.draw();
        goBag.draw();
        goCatch.draw();
        goMsg.draw();
        goAchievements.draw();
        goFishMarket.draw();
        goShop.draw();
    }
    if (goShopWindow.show){
        goShopWindow.draw();
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

function bombing() {
    TProxy.getFromServer('/server/index.php?method=getEvents',
    response => {
        goFishMarket.initGold();
    });
}
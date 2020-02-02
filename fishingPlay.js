"use strict";

let goGame, goMainScene, goMsg, goAchievements, goShopWindow;

function init() {
    // конфигурация игры
    goGame = new Game();
    goMainScene = new MainScene();
    goMainScene.show();
    // конфигурация достижений
    goAchievements = new Achievements();
    // конфигурация сообщений
    goMsg = new Msg();
    // конфигурация магазина
    goShopWindow = new ShopWindow();

    setInterval(play, goGame.timeout);
    setInterval(bombing, goGame.timeoutBombing);
}

function play(){
    if (goMainScene.showed){
        goMainScene.draw();
        goMsg.draw();
        goAchievements.draw();
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
        goMainScene.gaObjs.fishMarket.initGold();
    });
}
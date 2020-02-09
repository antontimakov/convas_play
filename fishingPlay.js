"use strict";

let goGame, goMsg, goAchievements, goMainScene, goShopScene;

function init() {
    // конфигурация игры
    goGame = new Game();
    // конфигурация достижений
    goAchievements = new Achievements();
    // конфигурация сообщений
    goMsg = new Msg();
    goMainScene = new MainScene();
    goShopScene = new ShopScene();
    goMainScene.show();

    setInterval(play, goGame.timeout);
    setInterval(bombing, goGame.timeoutBombing);
}

function play(){
    goMainScene.draw();
    goShopScene.draw();
    goMsg.draw();
    goAchievements.draw();
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
    () => {
        goMainScene.gaObjs.btnFishMarket.initGold();
    });
}
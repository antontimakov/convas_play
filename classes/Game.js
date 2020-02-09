"use strict";

let goGame;

function init() {
    // конфигурация игры
    goGame = new Game();
    goGame.scenes.main.show();
}

// класс определяющий параметры игрового поля
class Game {
    constructor() {
        this.width = 745;
        this.height = 500;
        this.timeout = 1000 / 50;
        this.timeoutBombing = 5000;
        this.scenes = {
            main: new MainScene(),
            shop: new ShopScene()
        };
        this.canvas = document.getElementById("fishingPlay");
        this.context = this.create();
        // конфигурация достижений
        this.achievements = new Achievements();
        // конфигурация сообщений
        this.msg = new Msg();

        setInterval(this.play, this.timeout);
        setInterval(this.bombing, this.timeoutBombing);
    }
    create(){
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        return this.canvas.getContext("2d");
    }
    play(){
        goGame.scenes.main.draw();
        goGame.scenes.shop.draw();
        goGame.msg.draw();
        goGame.achievements.draw();
    }
    bombing() {
        TProxy.getFromServer('/server/index.php?method=getEvents',
            () => {
                goGame.scenes.main.gaObjs.btnFishMarket.initGold();
            });
    }
    // Нормальное распеределение от 0 до 1 с МО 0.5
    randn_bm() {
        let u = 0, v = 0;
        while(u === 0) u = Math.random();
        while(v === 0) v = Math.random();
        let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        num = num / 10.0 + 0.5;
        if (num > 1 || num < 0) return goGame.randn_bm();
        return num;
    }
}
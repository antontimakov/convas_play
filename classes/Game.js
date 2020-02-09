// класс определяющий параметры игрового поля
class Game {
    static init() {
        Game.width = 745;
        Game.height = 500;
        Game.timeout = 1000 / 50;
        Game.timeoutBombing = 5000;
        Game.scenes = {
            main: new MainScene(),
            shop: new ShopScene()
        };
        Game.canvas = document.getElementById("fishingPlay");
        Game.context = Game.create();
        // конфигурация достижений
        Game.achievements = new Achievements();
        // конфигурация сообщений
        Game.msg = new Msg();

        setInterval(Game.play, Game.timeout);
        setInterval(Game.bombing, Game.timeoutBombing);
        Game.scenes.main.show();
    }
    static create(){
        Game.canvas.width = Game.width;
        Game.canvas.height = Game.height;
        return Game.canvas.getContext("2d");
    }
    static play(){
        Game.scenes.main.draw();
        Game.scenes.shop.draw();
        Game.msg.draw();
        Game.achievements.draw();
    }
    static bombing() {
        TProxy.getFromServer('/server/index.php?method=getEvents',
            () => {
                Game.scenes.main.gaObjs.btnFishMarket.initGold();
            });
    }
    // Нормальное распеределение от 0 до 1 с МО 0.5
    static randn_bm() {
        let u = 0, v = 0;
        while(u === 0) u = Math.random();
        while(v === 0) v = Math.random();
        let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        num = num / 10.0 + 0.5;
        if (num > 1 || num < 0) return Game.randn_bm();
        return num;
    }
}
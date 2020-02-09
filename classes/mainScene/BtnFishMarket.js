// класс определяющий параметры кнопки заброса
class BtnFishMarket extends ImgContainer {
    constructor() {
        super();
        this.x = 300;
        this.y = 458;
        this.width = 40;
        this.height = 40;
        this.img.src = 'img/fishMarket.png';
        this.gold = 0;
        this.initGold();
    }
    clickBody(poE){
        TProxy.getFromServer('/server/index.php?method=sellFish',
            response => {
                Game.scenes.main.gaObjs.bag.getBagItems();
            }
        );
    }
    initGold(){
        TProxy.getFromServer('/server/index.php?method=getGold',
            response => {
                this.gold = response[0].gold;
            }
        );
    }
    drawGold(){
        // настройки текста
        Game.context.font = 'bold 25px courier';
        Game.context.textAlign = 'center';
        Game.context.textBaseline = 'top';
        Game.context.fillStyle = 'white';
        Game.context.fillText(this.gold,  this.x, this.y);
    }
    draw(){
        super.draw();
        this.drawGold();
    }
}
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
                goGame.scenes.main.gaObjs.bag.getBagItems();
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
        goGame.context.font = 'bold 25px courier';
        goGame.context.textAlign = 'center';
        goGame.context.textBaseline = 'top';
        goGame.context.fillStyle = 'white';
        goGame.context.fillText(this.gold,  this.x, this.y);
    }
    draw(){
        super.draw();
        this.drawGold();
    }
}
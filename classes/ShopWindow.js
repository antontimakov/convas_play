// класс определяющий параметры кнопки заброса
class ShopWindow extends Container {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.width = goGame.width;
        this.height = goGame.height;
        this.color = '#ffffaa';
        this.show = false;
        this.back = {
            x: 0,
            y: 0,
            width: 40,
            height: 40
        };
        this.item = {
            x: 50,
            y: 20,
            width: 100,
            height: 150,
            text: 'Черви'
        };
    }
    draw(){
        this.drawMain();
        this.drawBack();
        this.drawItem();
    }
    drawMain(){
        goGame.context.fillStyle = this.color;
        goGame.context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
    drawBack(){
        goGame.context.fillStyle = 'black';
        goGame.context.fillRect(
            this.back.x,
            this.back.y,
            this.back.width,
            this.back.height
        );
    }
    drawItem(){
        goGame.context.fillStyle = 'gray';
        goGame.context.fillRect(
            this.item.x,
            this.item.y,
            this.item.width,
            this.item.height
        );
        // настройки текста
        goGame.context.font = 'bold 20px courier';
        goGame.context.textAlign = 'left';
        goGame.context.textBaseline = 'top';
        goGame.context.fillStyle = 'black';
        goGame.context.fillText(
            this.item.text,
            this.item.x,
            this.item.y + this.item.height
        );

    }
    clickBody(poE){
        goMainScene.show = true;
        goShopWindow.show = false;

        let canvas = document.getElementById("fishingPlay");
        canvas.onclick = Game.allClicks;
        canvas.onmousemove = Game.chCursor(canvas);
    }
}
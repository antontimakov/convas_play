// класс определяющий параметры кнопки заброса
class ShopWindow{
    constructor() {
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
            height: 150
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
            `Черви`,
            this.item.x,
            this.item.y + this.item.height
        );

    }
    click(poE){
        if (
            poE.pageX > this.back.x &&
            poE.pageX <= (this.back.x + this.back.width) &&
            poE.pageY > this.back.y &&
            poE.pageY <= (this.back.y + this.back.height)
        ){
            goGame.showMainWindow = true;
            goShopWindow.show = false;

            let canvas = document.getElementById("fishingPlay");
            canvas.onclick = Game.allClicks;
            canvas.onmousemove = Game.chCursor(canvas);
        }
    }
}
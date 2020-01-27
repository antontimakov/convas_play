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
        }
    }
    draw(){
        this.drawMain();
        this.drawBack();
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
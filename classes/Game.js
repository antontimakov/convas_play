// класс определяющий параметры игрового поля
class Game {
    constructor() {
        this.width = 745;
        this.height = 500;
        this.timeout = 1000 / 50;
        this.timeoutBombing = 5000;
        this.context = this.create();
        this.showMainWindow = true;
    }
    create(){
        let canvas = document.getElementById("fishingPlay");
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.onclick = Game.allClicks;
        canvas.onmousemove = Game.chCursor(canvas);
        return canvas.getContext("2d");
    }
    // вызывает все клики
    static allClicks(poE){
        goMainScene.gaObjs.float.click(poE);
        goMainScene.gaObjs.cast.click(poE);
        goMainScene.gaObjs.fishMarket.click(poE);
        goMainScene.gaObjs.shop.click(poE);
    }
    static allOver(poConvas){
        return(poE)=>{
            goMainScene.gaObjs.float.over(poE, poConvas);
            goMainScene.gaObjs.cast.over(poE, poConvas);
            goMainScene.gaObjs.fishMarket.over(poE, poConvas);
            goMainScene.gaObjs.shop.over(poE, poConvas);
        }
    }
    static chCursor(loConvas){
        return (poE)=>{
            if (
                (
                    poE.pageX > goMainScene.gaObjs.cast.x &&
                    poE.pageY < goMainScene.gaObjs.cast.height
                ) ||
                (
                    goMainScene.gaObjs.float.show &&
                    poE.pageX > goMainScene.gaObjs.float.x &&
                    poE.pageX < (goMainScene.gaObjs.float.x + goMainScene.gaObjs.float.width) &&
                    poE.pageY > goMainScene.gaObjs.float.y &&
                    poE.pageY < (goMainScene.gaObjs.float.y + goMainScene.gaObjs.float.height)
                )
            ) {
                loConvas.style.cursor = 'pointer';
            }
            else{
                loConvas.style.cursor = '';
            }
        }
    }
}
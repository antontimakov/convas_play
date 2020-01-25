// класс определяющий параметры игрового поля
class Game {
    constructor() {
        this.width = 745;
        this.height = 500;
        this.timeout = 1000 / 50;
        this.context = this.create();
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
        goFloat.click(poE);
        goCast.click(poE);
        goFishMarket.click(poE);
    }
    static chCursor(loConvas){
        return (poE)=>{
            if (
                (
                    poE.pageX > goCast.x &&
                    poE.pageY < goCast.height
                ) ||
                (
                    goFloat.show &&
                    poE.pageX > goFloat.x &&
                    poE.pageX < (goFloat.x + goFloat.width) &&
                    poE.pageY > goFloat.y &&
                    poE.pageY < (goFloat.y + goFloat.height)
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
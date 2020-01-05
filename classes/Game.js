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
    }
    static chCursor(loConvas){
        return (poE)=>{
            if (
                (poE.x > goCast.x &&
                poE.y < goCast.height) ||
                (goFloat.show &&
                poE.x > goFloat.x &&
                poE.x < (goFloat.x + goFloat.width) &&
                poE.y > goFloat.y &&
                poE.y < (goFloat.y + goFloat.height))
            ) {
                loConvas.style.cursor = 'pointer';
            }
            else{
                loConvas.style.cursor = '';
            }
        }
    }
}
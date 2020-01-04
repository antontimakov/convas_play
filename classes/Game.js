// класс определяющий параметры игрового поля
class Game {
    constructor() {
        this.width = 520;
        this.height = 360;
        this.timeout = 1000 / 50;
        this.context = this.create();
    }
    create(){
        let canvas = document.getElementById("fishingPlay");
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.onclick = allClicks;
        return canvas.getContext("2d");
    }
}
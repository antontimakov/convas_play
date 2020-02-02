// класс определяющий параметры игрового поля
class Game {
    constructor() {
        this.width = 745;
        this.height = 500;
        this.timeout = 1000 / 50;
        this.timeoutBombing = 5000;
        this.canvas = document.getElementById("fishingPlay");
        this.context = this.create();
    }
    create(){
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        return this.canvas.getContext("2d");
    }
}
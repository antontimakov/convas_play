// класс определяющий параметры кнопки заброса
class Shop extends Container {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.width = 745;
        this.height = 500;
        this.color = '#ffffaa';
        this.show = false;
    }
    draw(){
        Game.context.fillStyle = this.color;
        Game.context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
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
        goGame.context.fillStyle = this.color;
        goGame.context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
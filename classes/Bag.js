// класс определяющий параметры сумки
class Bag {
    constructor() {
        this.x = 0;
        this.y = 320;
        this.width = 520;
        this.height = 40;
        this.color = 'gray';
        this.field = new Rect(this.color, this.x, this.y, this.width, this.height, goGame.context);
    }
    draw(){
        this.field.draw();
    }
}
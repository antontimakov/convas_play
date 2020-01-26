// класс определяющий параметры кнопки заброса
class ShopWindow{
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = goGame.width;
        this.height = goGame.height;
        this.color = 'yellow';
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
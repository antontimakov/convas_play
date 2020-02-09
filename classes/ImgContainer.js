// абстрактный базовый класс для классов - контейнеров картинок
class ImgContainer extends Container {
    constructor() {
        super();
        this.img = new Image();
    }
    draw(){
        Game.context.drawImage(this.img, this.x, this.y);
    }
}
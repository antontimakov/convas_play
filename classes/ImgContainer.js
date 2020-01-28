// абстрактный базовый класс для классов - контейнеров картинок
class ImgContainer extends Container {
    constructor() {
        super();
        this.img = new Image();
    }
    draw(){
        goGame.context.drawImage(this.img, this.x, this.y);
    }
}
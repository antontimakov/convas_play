// абстрактный базовый класс для классов - контейнеров картинок
class ImgContainer {
    constructor() {
        this.img = new Image();
    }
    draw(){
        goGame.context.drawImage(this.img, this.x, this.y);
    }
}
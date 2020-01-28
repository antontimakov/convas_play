// абстрактный базовый класс для классов - контейнеров картинок
class ImgContainer {
    constructor() {
        this.img = new Image();
    }
    draw(){
        goGame.context.drawImage(this.img, this.x, this.y);
    }
    click(poE){
        if (
            this.clickBody &&
            this.overMy(poE)
        ){
            this.clickBody(poE);
        }
    }
    overMy(poE){
        return poE.pageX > this.x &&
            poE.pageX <= (this.x + this.width) &&
            poE.pageY > this.y &&
            poE.pageY <= (this.y + this.height);
    }
}
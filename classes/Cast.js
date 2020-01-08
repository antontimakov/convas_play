// класс определяющий параметры кнопки заброса
class Cast extends ImgContainer {
    constructor() {
        super();
        this.x = 631;
        this.y = 0;
        this.width = 114;
        this.height = 458;
        this.img.src = 'img/cast.png';
    }
    click(poE){
        if (
            poE.pageX > this.x &&
            poE.pageX <= (this.x + this.width) &&
            poE.pageY > this.y &&
            poE.pageY <= (this.y + this.height)
        ){
            goFloat.doShow();
        }
    }
}
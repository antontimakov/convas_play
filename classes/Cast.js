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
            poE.x > this.x &&
            poE.x <= (this.x + this.width) &&
            poE.y > this.y &&
            poE.y <= (this.y + this.height)
        ){
            goFloat.doShow();
        }
    }
}
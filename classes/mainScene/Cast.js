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
    clickBody(poE){
        goGame.scenes.main.gaObjs.float.doShow();
    }
}
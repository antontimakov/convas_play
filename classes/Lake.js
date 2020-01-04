// класс определяющий параметры области забрасывания
class Lake extends ImgContainer {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.width = 480;
        this.height = 320;
        this.img.src = 'img/lake.png';
    }
}
// класс определяющий параметры области забрасывания
class Lake extends ImgContainer {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.width = 631;
        this.height = 458;
        this.img.src = 'img/lake.png';
    }
}
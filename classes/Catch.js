// класс определяющий параметры улова
class Catch extends ImgContainer {
    constructor() {
        super();
        this.x = 170;
        this.y = 270;
        this.width = 180;
        this.height = 92;
        this.show = false;
    }
    draw(){
        if (this.show) {
            super.draw();
            // настройки текста
            goGame.context.font = 'bold 20px courier';
            goGame.context.textAlign = 'center';
            goGame.context.textBaseline = 'top';
            goGame.context.fillStyle = 'white';
            goGame.context.fillText('Платва',  260, 342);
        }
    }
}
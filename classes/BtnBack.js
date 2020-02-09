// класс определяющий параметры кнопки заброса
class BtnBack extends Container {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.width = 40;
        this.height = 40;
    }
    draw(){
        goGame.context.fillStyle = 'black';
        goGame.context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
    clickBody(poE){
        goGame.scenes.main.show();
    }
}
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
        Game.context.fillStyle = 'black';
        Game.context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
    clickBody(poE){
        Game.scenes.main.show();
    }
}
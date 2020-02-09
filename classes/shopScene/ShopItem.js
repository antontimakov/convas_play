// класс определяющий параметры кнопки заброса
class ShopItem extends Container {
    constructor() {
        super();
        this.x = 50;
        this.y = 20;
        this.width = 100;
        this.height = 150;
        this.text = 'Черви';
    }
    draw(){
        goGame.context.fillStyle = 'gray';
        goGame.context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
        // настройки текста
        goGame.context.font = 'bold 20px courier';
        goGame.context.textAlign = 'left';
        goGame.context.textBaseline = 'top';
        goGame.context.fillStyle = 'black';
        goGame.context.fillText(
            this.text,
            this.x,
            this.y + this.height
        );

    }
}
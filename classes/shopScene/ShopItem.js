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
        Game.context.fillStyle = 'gray';
        Game.context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
        // настройки текста
        Game.context.font = 'bold 20px courier';
        Game.context.textAlign = 'left';
        Game.context.textBaseline = 'top';
        Game.context.fillStyle = 'black';
        Game.context.fillText(
            this.text,
            this.x,
            this.y + this.height
        );

    }
}
// класс определяющий параметры кнопки заброса
class FishMarket extends ImgContainer {
    constructor() {
        super();
        this.x = 300;
        this.y = 458;
        this.width = 40;
        this.height = 40;
        this.img.src = 'img/fishMarket.png';
    }
    click(poE){
        if (
            poE.pageX > this.x &&
            poE.pageX <= (this.x + this.width) &&
            poE.pageY > this.y &&
            poE.pageY <= (this.y + this.height)
        ){
            console.log('fff');
        }
    }
}
// класс определяющий параметры кнопки заброса
class Shop extends ImgContainer {
    constructor() {
        super();
        this.x = 340;
        this.y = 458;
        this.width = 40;
        this.height = 40;
        this.img.src = 'img/shop.png';
    }
    clickBody(poE){
        goMainScene.showed = false;
        goShopWindow.show = true;

        goGame.canvas.onclick = (poE)=>{goShopWindow.click(poE)};
        goGame.canvas.onmousemove = null;
        // TODO курсор при наведении на кнопки
    }
}
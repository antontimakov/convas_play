// класс определяющий параметры кнопки заброса
class BtnShop extends ImgContainer {
    constructor() {
        super();
        this.x = 340;
        this.y = 458;
        this.width = 40;
        this.height = 40;
        this.img.src = 'img/shop.png';
    }
    clickBody(poE){
        goShopScene.show();
    }
}
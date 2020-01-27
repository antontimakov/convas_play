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
    click(poE){
        if (
            poE.pageX > this.x &&
            poE.pageX <= (this.x + this.width) &&
            poE.pageY > this.y &&
            poE.pageY <= (this.y + this.height)
        ){
            goGame.showMainWindow = false;
            goShopWindow.show = true;

            let canvas = document.getElementById("fishingPlay");
            canvas.onclick = (poE)=>{goShopWindow.click(poE)};
            canvas.onmousemove = null;
            // TODO курсор при наведении на кнопки
        }
    }
}
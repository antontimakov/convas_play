// класс определяющий параметры сумки
class Bag extends Container {
    constructor() {
        super();
        this.x = 0;
        this.y = 458;
        this.width = 745;
        this.height = 40;
        this.color = 'gray';
        this.imgs = [];
        this.cell = {
            width: 40,
            fakePaddingRightText: 20,
            fakePaddingTopText: 20
        };
        this.getBagItems();
    }
    draw(){
        Game.context.fillStyle = this.color;
        Game.context.fillRect(this.x, this.y, this.width, this.height);
        let lnNum = 0;
        this.imgs.forEach((element) => {
            Game.context.drawImage(element.img, this.x + this.width - this.cell.width * ++lnNum, this.y);
            // настройки текста
            Game.context.font = 'bold 16px courier';
            Game.context.textAlign = 'center';
            Game.context.textBaseline = 'top';
            Game.context.fillStyle = 'white';
            Game.context.fillText(
                element.count,
                this.x + this.width - this.cell.fakePaddingRightText - this.cell.width * (lnNum - 1),
                this.y + this.cell.fakePaddingTopText);
        });
    }
    getBagItems(){
        let loMe = this;
        loMe.imgs = [];
        TProxy.getFromServer('/Laravel/public/index.php/method/getbagitems',
            response => {
                response.forEach((element) => {
                    loMe.imgs[element.titem.id] = {};
                    loMe.imgs[element.titem.id].img = new Image();
                    loMe.imgs[element.titem.id].img.src = element.titem.src;
                    loMe.imgs[element.titem.id].count = element.bcount;
                });
            });
    }
}

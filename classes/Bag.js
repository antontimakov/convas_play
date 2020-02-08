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
        goGame.context.fillStyle = this.color;
        goGame.context.fillRect(this.x, this.y, this.width, this.height);
        let lnNum = 0;
        this.imgs.forEach((element) => {
            goGame.context.drawImage(element.img, this.x + this.width - this.cell.width * ++lnNum, this.y);
            // настройки текста
            goGame.context.font = 'bold 16px courier';
            goGame.context.textAlign = 'center';
            goGame.context.textBaseline = 'top';
            goGame.context.fillStyle = 'white';
            goGame.context.fillText(
                element.count,
                this.x + this.width - this.cell.fakePaddingRightText - this.cell.width * (lnNum - 1),
                this.y + this.cell.fakePaddingTopText);
        });
    }
    getBagItems(){
        let loMe = this;
        loMe.imgs = [];
        TProxy.getFromServer('/server/index.php?method=getBagItems',
            response => {
                response.forEach((element) => {
                    loMe.imgs[element.id] = {};
                    loMe.imgs[element.id].img = new Image();
                    loMe.imgs[element.id].img.src = element.src;
                    loMe.imgs[element.id].count = element.bcount;
                });
            });
    }
}
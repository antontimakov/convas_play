// класс определяющий параметры сумки
class Bag {
    constructor() {
        this.x = 0;
        this.y = 458;
        this.width = 745;
        this.height = 40;
        this.color = 'gray';
        this.field = new Rect(this.color, this.x, this.y, this.width, this.height, goGame.context);
        this.imgs = [];
        this.cell = {
            width: 40,
            fakePaddingRightText: 20,
            fakePaddingTopText: 20
        };
        this.experience = {
            value: null,
            lvlEnd: null,
            lvl: null,
            color: 'red',
            colorStart: 'white',
            x: 0,
            y: 498,
            width: 0,
            height: 2,
            field: null
        };
        this.experience.field = new Rect(
            this.experience.color,
            this.experience.x,
            this.experience.y,
            this.experience.width,
            this.experience.height,
            goGame.context);
        this.init();
    }
    draw(){
        this.field.draw();
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
        if (this.experience.value){
            // настройки текста
            goGame.context.font = 'bold 20px courier';
            goGame.context.textAlign = 'center';
            goGame.context.textBaseline = 'top';
            goGame.context.fillStyle = 'white';
            goGame.context.fillText(
                `Ур ${this.experience.lvl} (${this.experience.value}/${this.experience.lvlEnd})`,
                100,
                this.y + 20
            );
            let lnTempWidth = this.experience.field.width;
            this.experience.field.width = this.width;
            this.experience.field.color = this.experience.colorStart;
            this.experience.field.draw(); // Закрашиваем всю полосу опыта цветом по умолчанию
            this.experience.field.width = lnTempWidth;
            this.experience.field.color = this.experience.color;
            this.experience.field.draw();
        }
    }
    init(){
        let loMe = this;
        window.axios.get('/server/index.php?method=getBagItems')
            .then(response => {
                response.data.forEach((element) => {
                    loMe.imgs[element.id] = {};
                    loMe.imgs[element.id].img = new Image();
                    loMe.imgs[element.id].img.src = element.src;
                    loMe.imgs[element.id].count = element.bcount;
                });
            });
        window.axios.get('/server/index.php?method=getExp')
            .then(response => {
                this.experience.value = response.data.experience;
                this.experience.lvlEnd = response.data.lvlEnd;
                this.experience.lvl = response.data.lvl;
                this.experience.field.width =
                    this.width /
                    (response.data.lvlEnd - response.data.lvlStart) *
                    (response.data.experience - response.data.lvlStart);
            });
    }
}
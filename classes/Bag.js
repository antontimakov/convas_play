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
        this.experience = {
            value: null,
            lvlEnd: null,
            lvl: null,
            color: 'red',
            colorStart: 'white',
            x: 0,
            y: 498,
            width: 0,
            height: 2
        };
        this.init();
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
        if (this.experience.value){
            this.drawExperienceText();
            this.drawExperienceLine();
        }
    }
    init(){
        this.getBagItems();
        this.getExperience();
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
    getExperience(){
        TProxy.getFromServer('/server/index.php?method=getExperience',
            response => {
                this.experience.value = response.experience;
                this.experience.lvlEnd = response.lvlEnd;
                this.experience.lvl = response.lvl;
                this.experience.width =
                    this.width /
                    (response.lvlEnd - response.lvlStart) *
                    (response.experience - response.lvlStart);
            });
    }
    drawExperienceText(){
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
    }
    drawExperienceLine(){
        goGame.context.fillStyle = this.experience.colorStart;
        goGame.context.fillRect(
            this.experience.x,
            this.experience.y,
            this.width,
            this.experience.height
        ); // Закрашиваем всю полосу опыта цветом по умолчанию
        goGame.context.fillStyle = this.experience.color;
        goGame.context.fillRect(
            this.experience.x,
            this.experience.y,
            this.experience.width,
            this.experience.height
        );
    }
}
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
        this.experience = {
            value: null,
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
        if (this.imgs[1]){
            goGame.context.drawImage(this.imgs[1].img, this.x + this.width - 40, this.y);
            // настройки текста
            goGame.context.font = 'bold 16px courier';
            goGame.context.textAlign = 'center';
            goGame.context.textBaseline = 'top';
            goGame.context.fillStyle = 'white';
            goGame.context.fillText(this.imgs[1].count,  this.x + this.width - 20, this.y + 20);
        }
        if (this.imgs[3]){
            goGame.context.drawImage(this.imgs[3].img, this.x + this.width - 80, this.y);
            // настройки текста
            goGame.context.font = 'bold 16px courier';
            goGame.context.textAlign = 'center';
            goGame.context.textBaseline = 'top';
            goGame.context.fillStyle = 'white';
            goGame.context.fillText(this.imgs[3].count,  this.x + this.width - 60, this.y + 20);
        }
        if (this.experience.value){
            // настройки текста
            goGame.context.font = 'bold 20px courier';
            goGame.context.textAlign = 'center';
            goGame.context.textBaseline = 'top';
            goGame.context.fillStyle = 'white';
            goGame.context.fillText(
                `Уровень ${this.experience.lvl} (${this.experience.value})`,
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
                response.data.forEach(function (element) {
                    loMe.imgs[element.id] = {};
                    loMe.imgs[element.id].img = new Image();
                    loMe.imgs[element.id].img.src = element.src;
                    loMe.imgs[element.id].count = element.icount;
                });
            });
        window.axios.get('/server/index.php?method=getExp')
            .then(response => {
                this.experience.value = response.data.experience;
                this.experience.lvl = response.data.lvl;
                this.experience.field.width =
                    this.width /
                    (response.data.lvlEnd - response.data.lvlStart) *
                    (response.data.experience - response.data.lvlStart);
            });
    }
}
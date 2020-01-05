// класс определяющий параметры сумки
class Bag {
    constructor() {
        this.x = 0;
        this.y = 320;
        this.width = 520;
        this.height = 40;
        this.color = 'gray';
        this.field = new Rect(this.color, this.x, this.y, this.width, this.height, goGame.context);
        this.imgs = [];
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
    }
}
// класс определяющий параметры улова
class Catch extends ImgContainer {
    constructor() {
        super();
        this.x = 170;
        this.y = 270;
        this.width = 180;
        this.height = 92;
        this.show = false;
        this.animate = {
            timeHide: null,
            moHide: 5000
        };
        this.text = {
            x: 260,
            y: 342,
            text: ''
        }
    }
    draw(){
        if (this.show) {
            super.draw();
            // настройки текста
            Game.context.font = 'bold 20px courier';
            Game.context.textAlign = 'center';
            Game.context.textBaseline = 'top';
            Game.context.fillStyle = 'white';
            Game.context.fillText(this.text.text,  this.text.x, this.text.y);
            this.hideAnimate();
        }
    }
    hideAnimate(){
        if (!this.animate.timeHide){
            this.animate.timeHide = new Date().getTime() + Game.randn_bm() * this.animate.moHide;
        }
        else{
            if (this.animate.timeHide <= new Date().getTime()){
                this.show = false;
                this.animate.timeHide = null;
            }
        }

    }
}
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
            goGame.context.font = 'bold 20px courier';
            goGame.context.textAlign = 'center';
            goGame.context.textBaseline = 'top';
            goGame.context.fillStyle = 'white';
            goGame.context.fillText(this.text.text,  this.text.x, this.text.y);
            this.hideAnimate();
        }
    }
    hideAnimate(){
        if (!this.animate.timeHide){
            this.animate.timeHide = new Date().getTime() + randn_bm() * this.animate.moHide;
        }
        else{
            if (this.animate.timeHide <= new Date().getTime()){
                this.show = false;
                this.animate.timeHide = null;
            }
        }

    }
}
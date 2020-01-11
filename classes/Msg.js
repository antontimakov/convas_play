// класс определяющий параметры области забрасывания
class Msg {
    constructor() {
        this.text = '';
        this.time = null;
        this.deley = 1500;
        this.x = 372;
        this.y = 100;
    }
    draw(){
        if (this.time && this.time > new Date().getTime()){
            // настройки текста
            goGame.context.font = 'bold 25px courier';
            goGame.context.textAlign = 'center';
            goGame.context.textBaseline = 'top';
            goGame.context.fillStyle = 'white';
            goGame.context.fillText(this.text,  this.x, this.y);
        }
    }
    add(poText){
        this.text = poText;
        this.time = new Date().getTime() + this.deley;
    }
}
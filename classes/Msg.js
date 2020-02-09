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
            Game.context.font = 'bold 25px courier';
            Game.context.textAlign = 'center';
            Game.context.textBaseline = 'top';
            Game.context.fillStyle = 'white';
            Game.context.fillText(this.text,  this.x, this.y);
        }
    }
    add(poText){
        this.text = poText;
        this.time = new Date().getTime() + this.deley;
    }
}
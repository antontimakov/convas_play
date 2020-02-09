// класс определяющий параметры достижений
class Achievements {
    constructor() {
        this.info = [];
        this.time = null;
        this.deley = 3000;
        this.x = 372;
        this.y = 100;
        this.deltaToNext = 80;
    }
    draw(){
        if (this.time && this.time > new Date().getTime()){
            let lnDeltaToNext = 0;
            this.info.forEach((elem)=>{
                Game.context.fillStyle = 'brown';
                Game.context.fillRect(this.x - 200, this.y - 5 + lnDeltaToNext, 400, 70);
                Game.context.font = 'bold 30px courier';
                Game.context.textAlign = 'center';
                Game.context.textBaseline = 'top';
                Game.context.fillStyle = 'white';
                Game.context.fillText(elem.name,  this.x, this.y + lnDeltaToNext);
                Game.context.font = '25px courier';
                Game.context.fillText(elem.description,  this.x, this.y + 30 + lnDeltaToNext);
                lnDeltaToNext += this.deltaToNext;
            });
        }
        else {
            if (this.time){
                this.time = null;
                this.clear();
            }
        }
    }
    add(poInfo){
        this.info.push(poInfo);
        this.time = new Date().getTime() + this.deley;
    }
    clear(){
        this.info = [];
    }
}
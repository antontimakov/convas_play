// класс определяющий параметры основнойсцены
class Scene{
    constructor() {
        this.showed = false;
        this.curScene = null;
    }
    draw(){
        if(this.showed){
            for (let item in this.gaObjs){
                if (this.gaObjs[item].draw){
                    this.gaObjs[item].draw();
                }
            }
        }
    }
    click(poE){
        for (let item in this.gaObjs){
            if (this.gaObjs[item].click){
                this.gaObjs[item].click(poE);
            }
        }
    }
    over(poE){
        for (let item in this.gaObjs){
            if (this.gaObjs[item].over){
                this.gaObjs[item].over(poE);
            }
        }
    }
    show(){
        let me = this;
        if (this.curScene){
            this.curScene.showed = false;
        }
        this.showed = true;
        goGame.canvas.onclick = (poE)=>{me.click(poE)};
        goGame.canvas.onmousemove = (poE)=>{me.over(poE)};
        this.curScene = this;
    }
}
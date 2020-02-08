// класс определяющий параметры основнойсцены
class MainScene {
    constructor() {
        this.showed = true;
        this.gaObjs = {
            lake: new Lake(),
            cast: new Cast(),
            bag: new Bag(),
            experience: new Experience(),
            float: new Float(),
            catch: new Catch(),
            shop: new Shop(),
            fishMarket: new FishMarket()
        };
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
        this.showed = true;
        goGame.canvas.onclick = (poE)=>{me.click(poE)};
        goGame.canvas.onmousemove = (poE)=>{me.over(poE)};
    }
}
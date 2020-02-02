// класс определяющий параметры основнойсцены
class MainScene {
    constructor() {
        this.show = true;
        this.gaObjs = {
            lake: new Lake(),
            cast: new Cast(),
            bag: new Bag(),
            float: new Float(),
            catch: new Catch(),
            shop: new Shop(),
            fishMarket: new FishMarket()
        };
    }
    draw(){
        for (let item in this.gaObjs){
            if (this.gaObjs[item].draw){
                this.gaObjs[item].draw();
            }
        }
    }
}
// класс определяющий параметры основнойсцены
class MainScene extends Scene{
    constructor() {
        super();
        this.showed = true;
        this.gaObjs = {
            lake: new Lake(),
            cast: new Cast(),
            bag: new Bag(),
            experience: new Experience(),
            float: new Float(),
            catch: new Catch(),
            btnShop: new BtnShop(),
            btnFishMarket: new BtnFishMarket()
        };
    }
}
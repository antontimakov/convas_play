// класс определяющий параметры основнойсцены
class ShopScene extends Scene{
    constructor() {
        super();
        this.gaObjs = {
            shop: new Shop(),
            btnBack: new BtnBack()
        };
    }
}
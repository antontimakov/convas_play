// класс определяющий параметры основнойсцены
class MainScene {
    constructor() {
        this.gaObjs = {};
        // конфигурация области забрасывания
        this.gaObjs.lake = new Lake();
        // конфигурация кнопки заброса
        this.gaObjs.cast = new Cast();
        // конфигурация сумки
        this.gaObjs.bag = new Bag();
        // конфигурация поплавка
        this.gaObjs.float = new Float();
        // конфигурация улова
        this.gaObjs.catch = new Catch();
        // конфигурация магазина
        this.gaObjs.shop = new Shop();
    }
}
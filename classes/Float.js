// класс определяющий параметры поплавка
class Float extends ImgContainer {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.width = 40;
        this.height = 40;
        this.img.src = 'img/float.png';
        this.show = false;
        this.biting = false;
        this.animate = {
            startRadius: 20,
            curRadius: 0,
            timeBitingStart: null,
            timeBitingEnd: null
        }
    }
    click(){
        if (
            poE.x > goCast.x &&
            poE.x <= (goCast.x + goCast.width) &&
            poE.y > goCast.y &&
            poE.y <= (goCast.y + goCast.height)
        ){
            goFloat.show = false;
            window.axios.get('/server/index.php?method=getFish')
                .then(response => console.log(response.data));
        }
    }
    // событие клевание рыбы
    biting(){
        /*if (
            goTimeBitingStart &&
            (goTimeBitingStart < new Date().getTime()) &&
            gbShowFloat &&
            !goTimeBitingEnd // чтобы функция выполнялась 1 раз за поклёвку
        ){
            goTimeBitingEnd = new Date().getTime() + randn_bm() * 10000;
            goFloat.gbBiting = true;
        }*/
    }
    // вычисляет х координату броска
    getXFloat() {
        return Math.random() * (goGame.width - goFloat.width - goCast.width);
    }
    // вычисляет у координату броска
    getYFloat() {
        return Math.random() * (goGame.height - goFloat.height);
    }
    // показывает поплавок
    showFloat(){
        if (gbShowFloat){
            goGame.context.drawImage(goFloat.img, goFloat.x, goFloat.y);
            bitingAnimate();
        }
    }
    // рыба перестала клевать
    autoStopBiting() {
        if (goTimeBitingEnd && (goTimeBitingEnd < new Date().getTime()) && gbShowFloat){
            gbShowFloat = false;
        }
    }
    // анимация поклёвки
    bitingAnimate() {
        if (goFloat.gbBiting) {
            goGame.context.beginPath();
            goGame.context.arc(
                goFloat.x + goFloat.width / 2,
                goFloat.y + goFloat.height / 2,
                goFloat.bitingRadius++,
                0,
                Math.PI * 2,
                true
            );
            goGame.context.stroke();
        }
    }
}
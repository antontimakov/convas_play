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
            timeBitingEnd: null,
            moStartBiting: 5000,
            moBiting: 5000
        };
    }
    click(poE){
        if (
            this.show &&
            poE.pageX > this.x &&
            poE.pageX <= (this.x + this.width) &&
            poE.pageY > this.y &&
            poE.pageY <= (this.y + this.height)
        ){
            if (this.biting) {
                this.show = false;
                window.axios.get('/server/index.php?method=getFish')
                    .then(response => {
                        goBag.init();
                        goCatch.img.src = response.data[0].src_full;
                        goCatch.text.text = response.data[0].name;
                        goCatch.show = true;
                    });
            }
            else{
                goMsg.add('Ещё не клюнуло!');
            }
            this.show = false;
        }
    }
    draw(){
        if (this.show) {
            super.draw();
            this.doBiting();
            this.drawLine();
        }
    }
    // событие клевание рыбы
    doBiting(){
        if (
            this.animate.timeBitingStart &&
            (this.animate.timeBitingStart <= new Date().getTime())
        ){
            this.animate.timeBitingEnd = new Date().getTime() + randn_bm() * this.animate.moBiting;
            this.biting = true;
            this.animate.timeBitingStart = null; // чтобы не попадать сюда при каждой перерисовке
        }
        else {
            if (this.animate.timeBitingEnd &&
                (this.animate.timeBitingEnd <= new Date().getTime())
            ){
                this.show = false;
                goMsg.add('Рыбка сорвалась!');
            }
        }
        if (this.biting){
            this.bitingAnimate();
        }
    }
    doShow(){
        this.show = true;
        this.setCoordinates();
        this.startWaitingBiting();
    }
    setCoordinates() {
        this.x = Math.round(Math.random() * (goLake.width - this.width));
        this.y = Math.round(Math.random() * (goLake.height - this.height));
    }
    startWaitingBiting(){
        this.animate.curRadius = this.animate.startRadius;
        this.animate.timeBitingStart = new Date().getTime() + randn_bm() * this.animate.moStartBiting * 2;
        this.animate.timeBitingEnd = null;
        this.biting = false;
    }
    // анимация поклёвки
    bitingAnimate() {
        goGame.context.beginPath();
        goGame.context.arc(
            this.x + this.width / 2,
            this.y + this.height / 2,
            this.animate.curRadius++,
            0,
            Math.PI * 2,
            true
        );
        goGame.context.strokeStyle = 'blue';
        goGame.context.stroke();
    }
    drawLine(){
        goGame.context.beginPath();
        goGame.context.moveTo(530, 66);
        goGame.context.lineTo(this.x + this.width / 2, this.y);
        goGame.context.closePath();
        goGame.context.strokeStyle = '#dddddd';
        goGame.context.stroke();
    }
}
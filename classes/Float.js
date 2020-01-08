// класс определяющий параметры поплавка
class Float extends ImgContainer {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.width = 40;
        this.height = 40;
        this.img.src = 'img/float.png';
        this.show = false; // показывать ли попловок
        this.biting = false; // идёт ил поклёвка
        this.animate = {
            startRadius: 20, // начальный радиус анимации
            curRadius: 0, // текущий радиус во время анимации
            timeBitingStart: null, // время начала поклёвки
            timeBitingEnd: null, // время окончания поклёвки
            moStartBiting: 5000, // МО от заброса до поклёвки
            moBiting: 5000, // МО поклёвки
            delta: 30 // кол-во кадров до следующей волны
        };
        this.line = { // леска
            color: '#dddddd',
            startX: 530,
            startY: 66
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
        for (let lnDelta = 0; lnDelta <= 150; lnDelta += this.animate.delta){
            if (this.animate.curRadius > lnDelta){
                this.drawVawe(lnDelta);
            }
        }
        this.animate.curRadius++;
    }
    drawLine(){
        goGame.context.beginPath();
        goGame.context.moveTo(this.line.startX, this.line.startY);
        goGame.context.lineTo(this.x + this.width / 2, this.y);
        goGame.context.closePath();
        goGame.context.strokeStyle = this.line.color;
        goGame.context.stroke();
    }
    drawVawe(pnDelta){
        goGame.context.beginPath();
        goGame.context.arc(
            this.x + this.width / 2,
            this.y + this.height / 2,
            this.animate.curRadius - pnDelta,
            0,
            Math.PI * 2,
            true
        );
        goGame.context.strokeStyle = 'rgba(0, 0, 255, ' + (1 - (this.animate.curRadius - pnDelta)/100) + ')';
        goGame.context.stroke();
    }
}
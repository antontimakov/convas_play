// класс определяющий параметры полоски опыта
class Experience extends Container {
    constructor() {
        super();
        this.x = 0;
        this.y = 498;
        this.width = 745;
        this.calcWidth = 0;
        this.height = 2;
        this.color = 'red';
        this.colorStart = 'white';
        this.text = {
            x: 100,
            y: 478,
            value: null,
            lvlEnd: null,
            lvl: null
        };
        this.getExperience();
    }
    getExperience(){
        TProxy.getFromServer('/server/index.php?method=getExperience',
            response => {
                this.text.value = response.experience;
                this.text.lvlEnd = response.lvlEnd;
                this.text.lvl = response.lvl;
                this.calcWidth =
                    this.width /
                    (response.lvlEnd - response.lvlStart) *
                    (response.experience - response.lvlStart);
            });
    }
    draw(){
        goGame.context.fillStyle = this.colorStart;
        goGame.context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        ); // Закрашиваем всю полосу опыта цветом по умолчанию
        goGame.context.fillStyle = this.color;
        goGame.context.fillRect(
            this.x,
            this.y,
            this.calcWidth,
            this.height
        );
        if (this.text.value){
            this.drawExperienceText();
        }
    }
    drawExperienceText(){
        // настройки текста
        goGame.context.font = 'bold 20px courier';
        goGame.context.textAlign = 'center';
        goGame.context.textBaseline = 'top';
        goGame.context.fillStyle = 'white';
        goGame.context.fillText(
            `Ур ${this.text.lvl} (${this.text.value}/${this.text.lvlEnd})`,
            this.text.x,
            this.text.y
        );
    }
}
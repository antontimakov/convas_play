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
        TProxy.getFromServer('/Laravel/public/getExperience',
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
        Game.context.fillStyle = this.colorStart;
        Game.context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        ); // Закрашиваем всю полосу опыта цветом по умолчанию
        Game.context.fillStyle = this.color;
        Game.context.fillRect(
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
        Game.context.font = 'bold 20px courier';
        Game.context.textAlign = 'center';
        Game.context.textBaseline = 'top';
        Game.context.fillStyle = 'white';
        Game.context.fillText(
            `Ур ${this.text.lvl} (${this.text.value}/${this.text.lvlEnd})`,
            this.text.x,
            this.text.y
        );
    }
}

// абстрактный базовый класс для классов - контейнеров
class Container {
    click(poE){
        if (
            this.clickBody &&
            this.overMy(poE)
        ){
            this.clickBody(poE);
        }
    }
    overMy(poE){
        return (
            poE.pageX > this.x &&
            poE.pageX <= (this.x + this.width) &&
            poE.pageY > this.y &&
            poE.pageY <= (this.y + this.height)
        );
    }
    over(poE){
        if (this.overMy(poE)){
            Game.canvas.style.cursor = '';
            if (this.clickBody){
                Game.canvas.style.cursor = 'pointer';
            }
            if (this.overBody){
                this.overBody(poE);
            }
        }
    }
}
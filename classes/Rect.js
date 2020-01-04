// класс определяющий параметры прямоугольника и метод для его отрисовки
class Rect {
    constructor(color, x, y, width, height) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.draw = function() {
            goContext.fillStyle = this.color;
            goContext.fillRect(this.x, this.y, this.width, this.height);
        };
    }
}
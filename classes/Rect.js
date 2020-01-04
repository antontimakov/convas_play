// класс определяющий параметры прямоугольника и метод для его отрисовки
class Rect {
    constructor(color, x, y, width, height, poContext) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.draw = function() {
            poContext.fillStyle = this.color;
            poContext.fillRect(this.x, this.y, this.width, this.height);
        };
    }
}
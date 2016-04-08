define(["require", "exports"], function (require, exports) {
    var Color = (function () {
        function Color(red, green, blue) {
            this.red = red;
            this.green = green;
            this.blue = blue;
        }
        Color.prototype.toString = function () {
            return 'rgb(' + [this.red, this.green, this.blue].join(',') + ')';
        };
        Color.White = new Color(255, 255, 255);
        Color.Black = new Color(0, 0, 0);
        Color.Grass = new Color(150, 255, 150);
        return Color;
    })();
    return Color;
});
//# sourceMappingURL=Color.js.map
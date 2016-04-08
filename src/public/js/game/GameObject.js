define(["require", "exports"], function (require, exports) {
    var GameObject = (function () {
        function GameObject(coordinate, direction) {
            this.coordinate = coordinate;
            this.direction = direction;
            this.speed = 0;
            this.acceleration = -1;
        }
        GameObject.prototype.move = function () {
            this.coordinate.x += this.speed * Math.cos(this.direction);
            this.coordinate.y += this.speed * Math.sin(this.direction);
            this.speed += this.acceleration;
        };
        return GameObject;
    })();
    return GameObject;
});
//# sourceMappingURL=GameObject.js.map
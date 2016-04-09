define(["require", "exports"], function (require, exports) {
    var GameObject = (function () {
        function GameObject(coordinate, direction, field) {
            this.coordinate = coordinate;
            this.direction = direction;
            this.field = field;
            this.maxSpeed = 5;
            this.minSpeed = 0;
            this.speed = 0;
            this.acceleration = 0;
        }
        GameObject.prototype.move = function () {
            this.coordinate.x += this.speed * Math.cos(this.direction);
            this.coordinate.y += this.speed * Math.sin(this.direction);
            this.calculateActualSpeed();
        };
        GameObject.prototype.calculateActualSpeed = function () {
            this.speed += this.acceleration;
            if (this.speed > this.maxSpeed) {
                this.speed = this.maxSpeed;
            }
            else if (this.speed < this.minSpeed) {
                this.speed = this.minSpeed;
            }
        };
        return GameObject;
    })();
    return GameObject;
});
//# sourceMappingURL=GameObject.js.map
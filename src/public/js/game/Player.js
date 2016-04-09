var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './GameObject'], function (require, exports, GameObject) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(coordinate, direction, field, name, color) {
            _super.call(this, coordinate, direction, field);
            this.coordinate = coordinate;
            this.direction = direction;
            this.field = field;
            this.name = name;
            this.maxAcceleration = 1;
            this.minAcceleration = -1;
            this.rotationDegree = Math.PI / 6;
            this._r = 10;
            this._score = 0;
            this._color = color;
        }
        Object.defineProperty(Player.prototype, "color", {
            get: function () {
                return this._color;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "r", {
            get: function () {
                return this._r;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Player.prototype, "score", {
            get: function () {
                return this._score;
            },
            enumerable: true,
            configurable: true
        });
        Player.prototype.accelerate = function () {
            if (this.acceleration < this.maxAcceleration) {
                this.acceleration += 1;
            }
        };
        Player.prototype.decelerate = function () {
            if (this.acceleration > this.minAcceleration) {
                this.acceleration -= 1;
            }
        };
        Player.prototype.rotateLeft = function () {
            this.direction -= this.rotationDegree;
        };
        Player.prototype.rotateRight = function () {
            this.direction += this.rotationDegree;
        };
        Player.prototype.incScore = function () {
            this._score++;
        };
        Player.prototype.move = function () {
            var newX = this.coordinate.x + this.speed * Math.cos(this.direction);
            var newY = this.coordinate.y + this.speed * Math.sin(this.direction);
            var newXEdge = this.coordinate.x;
            if (newX < this.coordinate.x) {
                newXEdge = this.coordinate.x - this.r / 2 - 1;
            }
            else {
                newXEdge = this.coordinate.x + this.r / 2 + 1;
            }
            var newYEdge = this.coordinate.y;
            if (newY < this.coordinate.y) {
                newYEdge = this.coordinate.y - this.r / 2 - 1;
            }
            else {
                newYEdge = this.coordinate.y + this.r / 2 + 1;
            }
            if (this.field.isWithinXBoundary(newXEdge)) {
                this.coordinate.x = newX;
            }
            else {
                if (newX < this.r + 1) {
                    this.coordinate.x = this.r + 1;
                }
                else if (newX > this.field.width - this.r + 1) {
                    this.coordinate.x = this.field.width - this.r / 2 - 1;
                }
                this.speed = 1;
                this.acceleration = 0;
                this.direction += Math.PI;
            }
            if (this.field.isWithinYBoundary(newYEdge)) {
                this.coordinate.y = newY;
            }
            else {
                if (newY < this.r + 1) {
                    this.coordinate.y = this.r + 1;
                }
                else if (newY > this.field.height - this.r + 1) {
                    this.coordinate.y = this.field.height - this.r + 1;
                }
                this.speed = 1;
                this.acceleration = 0;
                this.direction += Math.PI;
            }
            this.calculateActualSpeed();
        };
        return Player;
    })(GameObject);
    return Player;
});
//# sourceMappingURL=Player.js.map
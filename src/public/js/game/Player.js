var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'game/GameObject'], function (require, exports, GameObject) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(coordinate, direction, name) {
            _super.call(this, coordinate, direction);
            this.coordinate = coordinate;
            this.direction = direction;
            this.name = name;
            this.maxAcceleration = 2;
            this.minAcceleration = 0;
        }
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
            this.direction -= 0.0872665;
        };
        Player.prototype.rotateRight = function () {
            this.direction += 0.0872665;
        };
        return Player;
    })(GameObject);
    return Player;
});
//# sourceMappingURL=Player.js.map
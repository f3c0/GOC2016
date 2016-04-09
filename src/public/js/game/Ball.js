var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './GameObject'], function (require, exports, GameObject) {
    var Ball = (function (_super) {
        __extends(Ball, _super);
        function Ball(coordinate, direction, field) {
            _super.call(this, coordinate, direction, field);
            this.field = field;
            this._r = 5;
            this.acceleration = -0.01;
        }
        Object.defineProperty(Ball.prototype, "r", {
            get: function () {
                return this._r;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ball.prototype, "top", {
            get: function () {
                return this.coordinate.y - this.r;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ball.prototype, "bottom", {
            get: function () {
                return this.coordinate.y + this.r;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ball.prototype, "left", {
            get: function () {
                return this.coordinate.x - this.r;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Ball.prototype, "right", {
            get: function () {
                return this.coordinate.x + this.r;
            },
            enumerable: true,
            configurable: true
        });
        return Ball;
    })(GameObject);
    return Ball;
});
//# sourceMappingURL=Ball.js.map
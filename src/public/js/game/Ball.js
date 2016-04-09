var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './GameObject'], function (require, exports, GameObject) {
    var Ball = (function (_super) {
        __extends(Ball, _super);
        function Ball(coordinate, direction) {
            _super.call(this, coordinate, direction);
            this.acceleration = -0.001;
        }
        return Ball;
    })(GameObject);
    return Ball;
});
//# sourceMappingURL=Ball.js.map
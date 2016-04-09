var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'game/View/Color', 'game/View/View'], function (require, exports, Color, View) {
    var BallView = (function (_super) {
        __extends(BallView, _super);
        function BallView() {
            _super.apply(this, arguments);
        }
        BallView.prototype.draw = function (ball) {
            this.drawCircle(ball.coordinate.x, ball.coordinate.y, 2, Color.Ball);
        };
        return BallView;
    })(View);
    return BallView;
});
//# sourceMappingURL=BallView.js.map
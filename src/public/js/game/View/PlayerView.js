var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'game/View/View'], function (require, exports, View) {
    var PlayerView = (function (_super) {
        __extends(PlayerView, _super);
        function PlayerView() {
            _super.apply(this, arguments);
        }
        PlayerView.prototype.draw = function (player) {
            this.drawCircle(player.coordinate.x, player.coordinate.y, player.r, player.color);
            this.fillArc(player.coordinate.x, player.coordinate.y, player.r, player.direction - 1, player.direction + 1, player.color);
        };
        return PlayerView;
    })(View);
    return PlayerView;
});
//# sourceMappingURL=PlayerView.js.map
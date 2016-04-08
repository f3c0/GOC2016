var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(coordinate, direction, name) {
            _super.call(this, coordinate, direction);
            this.coordinate = coordinate;
            this.direction = direction;
            this.name = name;
        }
        return Player;
    })(GameObject);
    return Player;
});
//# sourceMappingURL=Player.js.map
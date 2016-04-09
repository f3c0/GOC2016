var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./PlayerGovernor"], function (require, exports, PlayerGovernor) {
    var Actuator = (function (_super) {
        __extends(Actuator, _super);
        function Actuator(player) {
            _super.call(this, player);
            this.player = player;
        }
        Actuator.prototype.decide = function () {
            this.decision = this.possibleDecisions[Math.floor(Math.random() * this.possibleDecisions.length)];
            this.actuate();
        };
        return Actuator;
    })(PlayerGovernor);
    return Actuator;
});
//# sourceMappingURL=Actuator.js.map
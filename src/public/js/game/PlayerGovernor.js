define(["require", "exports"], function (require, exports) {
    var PlayerGovernor = (function () {
        function PlayerGovernor(player) {
            this.player = player;
            this.possibleDecisions = [
                PlayerGovernor.accelerate,
                PlayerGovernor.decelerate,
                PlayerGovernor.rotateLeft,
                PlayerGovernor.rotateRight,
            ];
        }
        PlayerGovernor.prototype.actuate = function () {
            switch (this.decision) {
                case PlayerGovernor.accelerate:
                    this.player.accelerate();
                    break;
                case PlayerGovernor.decelerate:
                    this.player.decelerate();
                    break;
                case PlayerGovernor.rotateLeft:
                    this.player.rotateLeft();
                    break;
                case PlayerGovernor.rotateRight:
                    this.player.rotateRight();
                    break;
            }
        };
        PlayerGovernor.accelerate = 'accelerate';
        PlayerGovernor.decelerate = 'decelerate';
        PlayerGovernor.rotateLeft = 'rotateLeft';
        PlayerGovernor.rotateRight = 'rotateRight';
        return PlayerGovernor;
    })();
    return PlayerGovernor;
});
//# sourceMappingURL=PlayerGovernor.js.map
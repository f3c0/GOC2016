define(["require", "exports"], function (require, exports) {
    var Actuator = (function () {
        function Actuator(player) {
            this.player = player;
            this.possibleDecisions = [
                'accelerate',
                'decelerate',
                'rotateLeft',
                'rotateRight'
            ];
        }
        Actuator.prototype.actuate = function () {
            switch (this.decision) {
                case 'accelerate':
                    this.player.accelerate();
                    break;
                case 'decelerate':
                    this.player.decelerate();
                    break;
                case 'rotateLeft':
                    this.player.rotateLeft();
                    break;
                case 'rotateRight':
                    this.player.rotateRight();
                    break;
            }
        };
        Actuator.prototype.decide = function () {
            this.decision = this.possibleDecisions[Math.floor(Math.random() * this.possibleDecisions.length)];
            this.actuate();
        };
        return Actuator;
    })();
    return Actuator;
});
//# sourceMappingURL=Actuator.js.map
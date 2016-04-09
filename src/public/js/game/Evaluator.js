define(["require", "exports"], function (require, exports) {
    var Evaluator = (function () {
        function Evaluator() {
        }
        Evaluator.prototype.evaluate = function (stateRepository) {
            this.stateRepository = stateRepository;
            if (this.stateRepository.gameStates.length < 2) {
                return;
            }
            this.stateRepository.getLastState().value = this.proximityRewarder(this.stateRepository.getLastStates(2));
            this.stateRepository.getLastState().value += this.angleRewarder(this.stateRepository.getLastStates(2));
            if (this.stateRepository.stateWithMaxValue) {
                this.stateRepository.stateWithMaxValue.value *= 0.95;
            }
            if (!this.stateRepository.stateWithMaxValue
                || this.stateRepository.stateWithMaxValue.value < this.stateRepository.getLastState().value) {
                this.stateRepository.stateWithMaxValue = this.stateRepository.getLastState();
            }
        };
        Evaluator.prototype.proximityRewarder = function (lastTwoStates) {
            var lastDistance = Evaluator.getDistance(lastTwoStates[0].ballPosition, lastTwoStates[0].playerPosition);
            var distanceBefore = Evaluator.getDistance(lastTwoStates[1].ballPosition, lastTwoStates[1].playerPosition);
            return distanceBefore - lastDistance;
        };
        Evaluator.getDistance = function (position1, position2) {
            return Math.sqrt(Math.pow(position1.x - position2.x, 2)
                + Math.pow(position1.y - position2.y, 2));
        };
        Evaluator.prototype.angleRewarder = function (lastTwoStates) {
            var lastAngle = Evaluator.getAngle(lastTwoStates[0].playerPosition, lastTwoStates[0].ballPosition);
            var angleBefore = Evaluator.getAngle(lastTwoStates[1].playerPosition, lastTwoStates[1].ballPosition);
            if (lastAngle * 180 / Math.PI < 60
                && angleBefore - lastAngle > 0) {
                this.stateRepository.getLastState().decision = 'accelerate';
            }
            return lastAngle * 180 / Math.PI < 60 ? angleBefore - lastAngle : 0;
        };
        Evaluator.getAngle = function (position1, position2) {
            var relativeX = position2.x - position1.x;
            var relativeY = position2.y - position1.y;
            var theta = Math.atan2(-relativeY, relativeX);
            if (theta < 0) {
                theta += 2 * Math.PI;
            }
            return theta;
        };
        return Evaluator;
    })();
    return Evaluator;
});
//# sourceMappingURL=Evaluator.js.map
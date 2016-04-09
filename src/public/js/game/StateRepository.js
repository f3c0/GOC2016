define(["require", "exports"], function (require, exports) {
    var StateRepository = (function () {
        function StateRepository() {
            this.maximumNumberOfStates = 1000;
            this._gameStates = [];
        }
        Object.defineProperty(StateRepository.prototype, "gameStates", {
            get: function () {
                return this._gameStates;
            },
            enumerable: true,
            configurable: true
        });
        StateRepository.prototype.getLastState = function () {
            return this._gameStates[this._gameStates.length - 1];
        };
        StateRepository.prototype.getLastStates = function (numberOfStatesToGet) {
            return this._gameStates.slice(this._gameStates.length - numberOfStatesToGet);
        };
        StateRepository.prototype.storeState = function (gameState) {
            this._gameStates.push(gameState);
            if (this._gameStates.length > this.maximumNumberOfStates) {
                this._gameStates.shift();
            }
        };
        StateRepository.prototype.clearStates = function () {
            this._gameStates = [];
        };
        Object.defineProperty(StateRepository.prototype, "stateWithMaxValue", {
            get: function () {
                return this._stateWithMaxValue;
            },
            set: function (value) {
                this._stateWithMaxValue = value;
            },
            enumerable: true,
            configurable: true
        });
        return StateRepository;
    })();
    return StateRepository;
});
//# sourceMappingURL=StateRepository.js.map
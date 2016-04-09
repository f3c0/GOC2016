define(["require", "exports"], function (require, exports) {
    var GameState = (function () {
        function GameState() {
        }
        Object.defineProperty(GameState.prototype, "gateWidth", {
            get: function () {
                return this._gateWidth;
            },
            set: function (value) {
                this._gateWidth = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameState.prototype, "ballPosition", {
            get: function () {
                return this._ballPosition;
            },
            set: function (value) {
                this._ballPosition = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameState.prototype, "playerPosition", {
            get: function () {
                return this._playerPosition;
            },
            set: function (value) {
                this._playerPosition = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameState.prototype, "decision", {
            get: function () {
                return this._decision;
            },
            set: function (value) {
                this._decision = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameState.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
            },
            enumerable: true,
            configurable: true
        });
        return GameState;
    })();
    return GameState;
});
//# sourceMappingURL=GameState.js.map
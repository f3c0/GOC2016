define(["require", "exports"], function (require, exports) {
    var Gate = (function () {
        function Gate(x, y, wide) {
            this._x = x;
            this._y = y;
            this._wide = wide;
        }
        Object.defineProperty(Gate.prototype, "x", {
            get: function () {
                return this._x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Gate.prototype, "y", {
            get: function () {
                return this._y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Gate.prototype, "wide", {
            get: function () {
                return this._wide;
            },
            enumerable: true,
            configurable: true
        });
        return Gate;
    })();
    return Gate;
});
//# sourceMappingURL=Gate.js.map
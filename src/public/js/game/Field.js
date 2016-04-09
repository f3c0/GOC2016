define(["require", "exports"], function (require, exports) {
    var Field = (function () {
        function Field(width, height) {
            this._width = width;
            this._height = height;
            this._gateWidth = this._height / 4;
        }
        Object.defineProperty(Field.prototype, "width", {
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "height", {
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "gateWidth", {
            get: function () {
                return this._gateWidth;
            },
            enumerable: true,
            configurable: true
        });
        Field.prototype.isWithinXBoundary = function (newX) {
            return !(newX < 11 || newX > this.width - 11);
        };
        Field.prototype.isWithinYBoundary = function (newY) {
            return !(newY < 11 || newY > this.height - 11);
        };
        return Field;
    })();
    return Field;
});
//# sourceMappingURL=Field.js.map
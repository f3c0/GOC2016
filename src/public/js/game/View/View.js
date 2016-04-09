define(["require", "exports"], function (require, exports) {
    var View = (function () {
        function View(ctx) {
            this._scale = 2;
            this._lineWidth = 2;
            this._ctx = ctx;
            this.ctx.lineWidth = this.lineWidth;
        }
        Object.defineProperty(View.prototype, "scale", {
            get: function () {
                return this._scale;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "lineWidth", {
            get: function () {
                return this._lineWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(View.prototype, "ctx", {
            get: function () {
                return this._ctx;
            },
            enumerable: true,
            configurable: true
        });
        View.prototype.drawLine = function (x1, y1, x2, y2, color) {
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.strokeStyle = color.toString();
            this.ctx.stroke();
            this.ctx.closePath();
        };
        View.prototype.fillRect = function (x1, y1, x2, y2, color) {
            this.ctx.fillStyle = color.toString();
            this.ctx.fillRect(x1, y1, x2, y2);
        };
        View.prototype.drawCircle = function (x, y, r, color) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
            this.ctx.strokeStyle = color.toString();
            this.ctx.stroke();
            this.ctx.closePath();
        };
        View.prototype.fillArc = function (x, y, r, startAngle, endAngle, color) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, r, startAngle, endAngle, false);
            this.ctx.fillStyle = color.toString();
            this.ctx.fill();
        };
        return View;
    })();
    return View;
});
//# sourceMappingURL=View.js.map
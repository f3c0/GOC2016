import Color = require('game/View/Color');

abstract class View {
    private _scale = 2;
    private _lineWidth = 2;
    private _ctx:CanvasRenderingContext2D;

    get scale():number {
        return this._scale;
    }

    get lineWidth():number {
        return this._lineWidth;
    }

    get ctx():CanvasRenderingContext2D {
        return this._ctx;
    }

    constructor(ctx:CanvasRenderingContext2D) {
        this._ctx = ctx;
        this.ctx.lineWidth = this.lineWidth;
    }

    protected drawLine(x1:number, y1:number, x2:number, y2:number, color:Color) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.strokeStyle = color.toString();
        this.ctx.stroke();
        this.ctx.closePath();
    }

    protected fillRect(x1:number, y1:number, x2:number, y2:number, color:Color) {
        this.ctx.fillStyle = color.toString();
        this.ctx.fillRect(x1, y1, x2, y2);
    }

    protected drawCircle(x:number, y:number, r:number, color:Color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        this.ctx.strokeStyle = color.toString();
        this.ctx.stroke();
        this.ctx.closePath();
    }

    protected fillArc(x:number, y:number, r:number, startAngle:number, endAngle:number, color:Color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, startAngle, endAngle, false);
        this.ctx.fillStyle = color.toString();
        this.ctx.fill();
    }
}

export = View;

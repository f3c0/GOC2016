import GameObject = require('./GameObject');
import Coordinate = require("./Coordinate");

class Ball extends GameObject {
    private _r:number = 2;

    get r():number {
        return this._r;
    }

    constructor(coordinate:Coordinate, direction:number) {
        super(coordinate, direction);
        this.acceleration = -0.001;
    }

    get top():number {
        return this.coordinate.x - this.r;
    }

    get bottom():number {
        return this.coordinate.x + this.r;
    }

    get left():number {
        return this.coordinate.y - this.r;
    }

    get right():number {
        return this.coordinate.y + this.r;
    }
}

export = Ball;

import GameObject = require('./GameObject');
import Coordinate = require("./Coordinate");
import Field      = require("./Field");

class Ball extends GameObject {
    private _r:number = 10;

    get r():number {
        return this._r;
    }

    constructor(coordinate:Coordinate, direction:number, public field:Field) {
        super(coordinate, direction, field);
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

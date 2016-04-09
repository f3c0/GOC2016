import GameObject = require('./GameObject');
import Coordinate = require('./Coordinate');
import Color = require("./View/Color");

class Player extends GameObject {
    private maxAcceleration = 2;
    private minAcceleration = -2;
    private rotationDegree = Math.PI / 36;
    private _color:Color;

    get color():Color {
        return this._color;
    }

    constructor(public coordinate:Coordinate, public direction:number, public name:string, color:Color) {
        super(coordinate, direction);
        this._color = color;
    }

    public accelerate() {
        if (this.acceleration < this.maxAcceleration) {
            this.acceleration += 1;
        }
    }

    public decelerate() {
        if (this.acceleration > this.minAcceleration) {
            this.acceleration -= 1;
        }
    }

    public rotateLeft() {
        this.direction -= this.rotationDegree;
    }

    public rotateRight() {
        this.direction += this.rotationDegree;
    }
}

export = Player;

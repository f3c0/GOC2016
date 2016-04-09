import GameObject = require('./GameObject');
import Coordinate = require('./Coordinate');
import Field      = require("./Field");
import Color      = require("./View/Color");

class Player extends GameObject {
    private maxAcceleration = 2;
    private minAcceleration = -2;
    private rotationDegree = Math.PI / 12;
    private _color:Color;
    private _r = 30;

    get color():Color {
        return this._color;
    }

    get r() {
        return this._r;
    }

    constructor(public coordinate:Coordinate, public direction:number, public field:Field, public name:string, color:Color) {
        super(coordinate, direction, field);
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

    public move() {
        var newX = this.coordinate.x + this.speed * Math.cos(this.direction);
        var newY = this.coordinate.y + this.speed * Math.sin(this.direction);

        if (this.field.isWithinXBoundary(newX)) {
            this.coordinate.x = newX;
        }
        else {
            if (newX < 11) {
                this.coordinate.x = 11;
            }
            else if (newX > this.field.width - 11) {
                this.coordinate.x = this.field.width - 1;
            }

            this.speed         = 1;
            this.acceleration  = 0;
        }

        if (this.field.isWithinYBoundary(newY))
        {
            this.coordinate.y = newY;
        }
        else {
            if (newY < 11) {
                this.coordinate.y = 11;
            }
            else if (newY > this.field.height - 11) {
                this.coordinate.y = this.field.height - 11;
            }

            this.speed         = 1;
            this.acceleration  = 0;
        }

        this.calculateActualSpeed();
    }
}

export = Player;

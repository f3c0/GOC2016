import GameObject = require('./GameObject');
import Coordinate = require('./Coordinate');
import Field      = require("./Field");
import Color      = require("./View/Color");

class Player extends GameObject {
    private maxAcceleration = 2;
    private minAcceleration = -2;
    private rotationDegree = Math.PI / 12;
    private _color:Color;
    private _r = 15;
    private _score:number = 0;

    get color():Color {
        return this._color;
    }

    get r() {
        return this._r;
    }

    get score():number {
        return this._score;
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

    incScore():void {
        this._score++;
    }

    public move() {
        var newX = this.coordinate.x + this.speed * Math.cos(this.direction);
        var newY = this.coordinate.y + this.speed * Math.sin(this.direction);

        var newXEdge = this.coordinate.x;
        if (newX < this.coordinate.x)
        {
            newXEdge = this.coordinate.x - this.r / 2 - 1;
        }
        else {
            newXEdge = this.coordinate.x + this.r / 2 + 1;
        }

        var newYEdge = this.coordinate.y;
        if (newY < this.coordinate.y)
        {
            newYEdge = this.coordinate.y - this.r / 2 - 1;
        }
        else {
            newYEdge = this.coordinate.y + this.r / 2 + 1;
        }

        if (this.field.isWithinXBoundary(newXEdge)) {
            this.coordinate.x = newX;
        }
        else {
            if (newX < this.r + 1) {
                this.coordinate.x = this.r + 1;
            }
            else if (newX > this.field.width - this.r + 1) {
                this.coordinate.x = this.field.width - 1;
            }

            this.speed         = 1;
            this.acceleration  = 0;
        }

        if (this.field.isWithinYBoundary(newYEdge))
        {
            this.coordinate.y = newY;
        }
        else {
            if (newY < this.r + 1) {
                this.coordinate.y = this.r + 1;
            }
            else if (newY > this.field.height - this.r + 1) {
                this.coordinate.y = this.field.height - this.r + 1;
            }

            this.speed         = 1;
            this.acceleration  = 0;
        }

        this.calculateActualSpeed();
    }
}

export = Player;

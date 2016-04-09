import Coordinate = require('./Coordinate');
import Field      = require('./Field');

class GameObject {
    private _maxSpeed = 5;
    private minSpeed = 0;

    public speed:number = 0;
    public acceleration:number = 0;

    constructor(public coordinate:Coordinate, public direction:number, public field:Field) {

    }

    public move() {
        this.coordinate.x += this.speed * Math.cos(this.direction);
        this.coordinate.y += this.speed * Math.sin(this.direction);

        this.calculateActualSpeed();
    }

    protected calculateActualSpeed() {
        this.speed += this.acceleration;
        if (this.speed > this._maxSpeed) {
            this.speed = this._maxSpeed;
        }
        else if (this.speed < this.minSpeed) {
            this.speed = this.minSpeed;
        }
    }

    get maxSpeed():number {
        return this._maxSpeed;
    }
}

export = GameObject;

import GameObject = require('game/GameObject');
import Coordinate = require('game/Coordinate');

class Player extends GameObject
{
    private maxAcceleration = 2;
    private minAcceleration = 0;
    private rotationDegree  = Math.PI / 36;

    constructor(public coordinate:Coordinate, public direction:number, public name:string)
    {
        super(coordinate, direction);
    }

    public accelerate() {
        if (this.acceleration < this.maxAcceleration)
        {
            this.acceleration += 1;
        }
    }

    public decelerate() {
        if (this.acceleration > this.minAcceleration)
        {
            this.acceleration -= 1;
        }
    }

    public rotateLeft()
    {
        this.direction -= this.rotationDegree;
    }

    public rotateRight()
    {
        this.direction += this.rotationDegree;
    }
}

export = Player;

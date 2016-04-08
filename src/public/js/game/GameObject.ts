import Coordinate = require('game/Coordinate');

class GameObject
{
    private maxSpeed = 5;
    private minSpeed = 0;

    speed:number = 0;
    public acceleration:number = 0;

    constructor(public coordinate:Coordinate, public direction:number)
    {

    }

    public move()
    {
        this.coordinate.x += this.speed * Math.cos(this.direction);
        this.coordinate.y += this.speed * Math.sin(this.direction);

        this.calculateActualSpeed();
    }

    private calculateActualSpeed()
    {
        this.speed        += this.acceleration;
        if (this.speed > this.maxSpeed)
        {
            this.speed = this.maxSpeed;
        }
        else if (this.speed < this.minSpeed)
        {
            this.speed = this.minSpeed;
        }
    }
}

export = GameObject;

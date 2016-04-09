import GameObject = require('./GameObject');
import Coordinate = require("./Coordinate");

class Ball extends GameObject {

    constructor(coordinate:Coordinate, direction:number) {
        super(coordinate, direction);
        this.acceleration = -0.001;
    }
}

export = Ball;

class GameObject {
    public speed:number = 0;
    acceleration:number = -1;

    constructor(public coordinate:Coordinate, public direction:number) {
    }

    public move() {
        this.coordinate.x += this.speed * Math.cos(this.direction);
        this.coordinate.y += this.speed * Math.sin(this.direction);
        this.speed += this.acceleration;
    }
}

export = GameObject;

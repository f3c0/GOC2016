class GameObject {
    public speed:number;

    constructor(public coordinate:Coordinate, public direction:number) {
        this.speed = 0;
    }
}
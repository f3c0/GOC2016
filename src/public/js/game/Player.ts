class Player extends GameObject {
    constructor(public coordinate:Coordinate, public direction:number, public name:string) {
        super(coordinate, direction);
    }
}

export = Player;

class Game {
    field:Field;
    players:Player[];
    ball:Ball;

    roundNumber: number = 1000;

    constructor() {
        this.field = new Field(200, 100);
        this.players = [
            new Player(new Coordinate(this.field.width / 4, this.field.height / 2), 0, 'Bob'),
            new Player(new Coordinate(3 * this.field.width / 4, this.field.height / 2), Math.PI, 'Bobek')
        ];
        this.ball = new Ball(new Coordinate(this.field.width / 2, this.field.height / 2), 0);
    }

    public start() {
        for(var round=0; round<this.roundNumber; round++) {
            this.playRound(round);
        }
    }

    private playRound(round:number):void {
        this.players[0].move();
        this.players[1].move();
        this.ball.move();
    }
}
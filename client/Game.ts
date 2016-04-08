class Game {
    roundLength:number = 100;
    field:Field;
    players:Player[];
    ball:Ball;

    roundNumber:number = 100;

    constructor() {
        this.field = new Field(200, 100);
        this.players = [
            new Player(new Coordinate(this.field.width / 4, this.field.height / 2), 0, 'Bob'),
            new Player(new Coordinate(3 * this.field.width / 4, this.field.height / 2), Math.PI, 'Bobek')
        ];
        this.ball = new Ball(new Coordinate(this.field.width / 2, this.field.height / 2), 0);
    }

    public start() {
        this.playRound(0);
    }

    private playRound(round:number):void {
        console.info('play round #' + round);
        this.players[0].move();
        this.players[1].move();
        this.ball.move();

        if (round < this.roundNumber) {
            setTimeout(() => this.playRound(round + 1), this.roundLength);
        }
    }
}
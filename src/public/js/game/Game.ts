class Game {
    private roundLength:number = 100;
    private field:Field;
    private players:Player[];
    private ball:Ball;

    private roundNumber:number = 100;
    private ctx;

    constructor(public canvas:HTMLCanvasElement) {
        this.field = new Field(200, 100);
        this.players = [
            new Player(new Coordinate(this.field.width / 4, this.field.height / 2), 0, 'Bob'),
            new Player(new Coordinate(3 * this.field.width / 4, this.field.height / 2), Math.PI, 'Bobek')
        ];
        this.ball = new Ball(new Coordinate(this.field.width / 2, this.field.height / 2), 0);

        this.canvas.width = this.field.width;
        this.canvas.height = this.field.height;
        this.ctx = this.canvas.getContext('2d');
    }

    public start() {
        this.playRound(0);
    }

    private playRound(round:number):void {
        console.info('play round #' + round);
        this.players[0].move();
        this.players[1].move();
        this.ball.move();

        this.draw();

        if (round < this.roundNumber) {
            setTimeout(() => this.playRound(round + 1), this.roundLength);
        }
    }

    private draw() {

    }
}

export = Game;
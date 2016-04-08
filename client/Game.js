var Game = (function () {
    function Game() {
        this.roundNumber = 1000;
        this.field = new Field(200, 100);
        this.players = [
            new Player(new Coordinate(this.field.width / 4, this.field.height / 2), 0, 'Bob'),
            new Player(new Coordinate(3 * this.field.width / 4, this.field.height / 2), Math.PI, 'Bobek')
        ];
        this.ball = new Ball(new Coordinate(this.field.width / 2, this.field.height / 2), 0);
    }
    Game.prototype.start = function () {
        for (var round = 0; round < this.roundNumber; round++) {
            this.playRound(round);
        }
    };
    Game.prototype.playRound = function (round) {
        this.players[0].move();
        this.players[1].move();
        this.ball.move();
    };
    return Game;
})();
//# sourceMappingURL=Game.js.map
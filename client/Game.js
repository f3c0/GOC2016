var Game = (function () {
    function Game() {
        this.roundLength = 100;
        this.roundNumber = 100;
        this.field = new Field(200, 100);
        this.players = [
            new Player(new Coordinate(this.field.width / 4, this.field.height / 2), 0, 'Bob'),
            new Player(new Coordinate(3 * this.field.width / 4, this.field.height / 2), Math.PI, 'Bobek')
        ];
        this.ball = new Ball(new Coordinate(this.field.width / 2, this.field.height / 2), 0);
    }
    Game.prototype.start = function () {
        this.playRound(0);
    };
    Game.prototype.playRound = function (round) {
        var _this = this;
        console.info('play round #' + round);
        this.players[0].move();
        this.players[1].move();
        this.ball.move();
        if (round < this.roundNumber) {
            setTimeout(function () { return _this.playRound(round + 1); }, this.roundLength);
        }
    };
    return Game;
})();
//# sourceMappingURL=Game.js.map
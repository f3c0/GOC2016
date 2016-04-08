define(["require", "exports", 'game/Field', 'game/Player', 'game/Actuator', 'game/Ball', 'game/Coordinate', 'game/View/FieldView'], function (require, exports, Field, Player, Actuator, Ball, Coordinate, FieldView) {
    //import PlayerView = require('game/View/PlayerView');
    //import BallView = require('game/View/BallView');
    var Game = (function () {
        function Game(canvas) {
            this.canvas = canvas;
            this.roundLength = 100;
            this.roundNumber = 100;
            this.field = new Field(200, 100);
            this.players = [
                new Player(new Coordinate(this.field.width / 4, this.field.height / 2), 0, 'Bob'),
                new Player(new Coordinate(3 * this.field.width / 4, this.field.height / 2), Math.PI, 'Bobek')
            ];
            // At first always the second player is controlled by AI.
            this.actuators = [
                new Actuator(this.players[1])
            ];
            this.ball = new Ball(new Coordinate(this.field.width / 2, this.field.height / 2), 0);
            this.canvas.width = this.field.width;
            this.canvas.height = this.field.height;
            this.ctx = this.canvas.getContext('2d');
            this.fieldView = new FieldView(this.ctx);
        }
        Game.prototype.start = function () {
            this.playRound(0);
        };
        Game.prototype.playRound = function (round) {
            var _this = this;
            console.info('play round #' + round);
            this.players[0].move();
            // At first always the second player is controlled by AI.
            this.actuators[0].decide();
            this.players[1].move();
            this.ball.move();
            this.draw();
            if (round < this.roundNumber) {
                setTimeout(function () { return _this.playRound(round + 1); }, this.roundLength);
            }
        };
        Game.prototype.draw = function () {
            this.fieldView.draw(this.field);
        };
        return Game;
    })();
    return Game;
});
//# sourceMappingURL=Game.js.map
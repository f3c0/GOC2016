define(["require", "exports", './Field', './Player', './Actuator', './InputProcessor', './Ball', './Coordinate', './View/FieldView', "game/View/Color", "./View/PlayerView", "./View/BallView"], function (require, exports, Field, Player, Actuator, InputProcessor, Ball, Coordinate, FieldView, Color, PlayerView, BallView) {
    var Game = (function () {
        function Game(canvas) {
            this.canvas = canvas;
            this.roundLength = 100;
            this.roundNumber = 100;
            this.field = new Field(200, 100);
            this.players = [
                new Player(new Coordinate(this.field.width / 4, this.field.height / 2), 0, 'Bob', Color.Player1),
                new Player(new Coordinate(3 * this.field.width / 4, this.field.height / 2), Math.PI, 'Bobek', Color.Player2)
            ];
            // At first always the second player is controlled by AI.
            this.inputProcessors = [
                new InputProcessor(this.players[0])
            ];
            this.actuators = [
                new Actuator(this.players[1])
            ];
            this.ball = new Ball(new Coordinate(this.field.width / 2, this.field.height / 2), 0);
            this.canvas.width = this.field.width;
            this.canvas.height = this.field.height;
            this.ctx = this.canvas.getContext('2d');
            this.fieldView = new FieldView(this.ctx);
            this.playerView = new PlayerView(this.ctx);
            this.ballView = new BallView(this.ctx);
        }
        Game.prototype.start = function () {
            this.inputProcessors[0].activatePlayerInterface();
            this.playRound(1);
        };
        Game.prototype.playRound = function (round) {
            //console.info('play round #' + round);
            var _this = this;
            this.players[0].move();
            // At first always the second player is controlled by AI.
            this.actuators[0].decide();
            this.players[1].move();
            this.ball.move();
            /*console.log('Chosen decision: ');
            console.log(this.actuators[0].decision);
            console.log('Player 1 position: ');
            console.log(this.players[0].coordinate);
            console.log('Player 1 speed: ');
            console.log(this.players[0].speed);
            console.log('Player 2 position: ');
            console.log(this.players[1].coordinate);
            console.log('Player 2 speed: ');
            console.log(this.players[1].speed);
            console.log('Ball position: ');
            console.log(this.ball.coordinate);
            console.log('Ball speed: ');
            console.log(this.ball.speed);*/
            this.draw();
            if (round < this.roundNumber) {
                setTimeout(function () { return _this.playRound(round + 1); }, this.roundLength);
            }
        };
        Game.prototype.draw = function () {
            this.fieldView.draw(this.field);
            this.players.forEach(function (player) {
                this.playerView.draw(player);
            }, this);
            this.ballView.draw(this.ball);
        };
        return Game;
    })();
    return Game;
});
//# sourceMappingURL=Game.js.map
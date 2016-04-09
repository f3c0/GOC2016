define(["require", "exports", './Config', './Field', './Player', './Actuator', './InputProcessor', './Ball', './Coordinate', './View/FieldView', "./View/Color", "./View/PlayerView", "./View/BallView", "./Gate", 'jquery'], function (require, exports, Config, Field, Player, Actuator, InputProcessor, Ball, Coordinate, FieldView, Color, PlayerView, BallView, Gate, $) {
    var Game = (function () {
        function Game(canvas, onAfterStep) {
            if (onAfterStep === void 0) { onAfterStep = null; }
            this.canvas = canvas;
            this.onAfterStep = onAfterStep;
            this.roundLength = 25;
            this.roundNumber = 10000;
            this.config = new Config();
            this.field = new Field(this.canvas.width, this.canvas.height);
            this.players = [];
            this.actuators = [];
            this.gates = [
                new Gate(0, (this.field.height - this.field.gateWidth) / 2, this.field.gateWidth),
                new Gate(this.field.width, (this.field.height - this.field.gateWidth) / 2, this.field.gateWidth)
            ];
            for (var team = 0; team < 2; team++) {
                for (var i = 0; i < Config.numberOfPlayersPerTeam; i++) {
                    var xMin = team * this.field.width / 2;
                    var xMax = this.field.width / 2 + xMin;
                    var xCoordinate = Math.random() * (xMax - 50 - xMin - 50) + xMin + 50;
                    var yCoordinate = Math.random() * (this.field.height - 50 - 50) + 50;
                    this.players.push(new Player(new Coordinate(xCoordinate, yCoordinate), Math.random() * Math.PI * 2, this.field, 'Bob' + (i + team * Config.numberOfPlayersPerTeam), Color.playerColors[team]));
                }
            }
            this.ball = new Ball(new Coordinate(this.field.width / 2, this.field.height / 2), 20, this.field);
            //this.ball.speed = 40;
            // At first always the second player is controlled by AI.
            this.inputProcessors = [
                new InputProcessor(this.players[0])
            ];
            this.ctx = this.canvas.getContext('2d');
            this.fieldView = new FieldView(this.ctx);
            this.playerView = new PlayerView(this.ctx);
            this.ballView = new BallView(this.ctx);
        }
        Game.prototype.addAccurator = function (playerIndex) {
            this.actuators.push(new Actuator(this.players[playerIndex]));
        };
        Game.prototype.getPlayer = function (index) {
            return this.players[index];
        };
        Game.prototype.reset = function () {
            this.ball.coordinate.x = this.field.width / 2;
            this.ball.coordinate.y = this.field.height / 2;
            this.ball.speed = 0;
            for (var team = 0; team < 2; team++) {
                for (var i = 0; i < Config.numberOfPlayersPerTeam; i++) {
                    var xMin = team * this.field.width / 2;
                    var xMax = this.field.width / 2 + xMin;
                    var xCoordinate = Math.random() * (xMax - 50 - xMin - 50) + xMin + 50;
                    var yCoordinate = Math.random() * (this.field.height - 50 - 50) + 50;
                    this.players[i + team * Config.numberOfPlayersPerTeam].coordinate.x = xCoordinate;
                    this.players[i + team * Config.numberOfPlayersPerTeam].coordinate.y = yCoordinate;
                    this.players[i + team * Config.numberOfPlayersPerTeam].speed = 0;
                    this.players[i + team * Config.numberOfPlayersPerTeam].acceleration = 0;
                    this.players[i + team * Config.numberOfPlayersPerTeam].direction = Math.random() * Math.PI * 2;
                }
            }
            $('#score1').text(this.players[0].score);
            $('#score2').text(this.players[1].score);
        };
        Game.prototype.start = function () {
            this.inputProcessors[0].activatePlayerInterface();
            this.playRound(1);
        };
        Game.prototype.playRound = function (round) {
            //console.info('play round #' + round);
            var _this = this;
            this.actuators.forEach(function (actor) {
                actor.decide();
            });
            this.players.forEach(function (player, index) {
                player.move();
                if (this.onAfterStep) {
                    this.onAfterStep(player, index);
                }
            }, this);
            this.ball.move();
            this.handleCollisions();
            this.draw();
            if (round < this.roundNumber) {
                setTimeout(function () { return _this.playRound(round + 1); }, this.roundLength);
            }
        };
        Game.prototype.draw = function () {
            this.fieldView.draw(this.field, this.gates);
            this.players.forEach(function (player) {
                this.playerView.draw(player);
            }, this);
            this.ballView.draw(this.ball);
        };
        Game.prototype.handleCollisions = function () {
            this.handleScoreCollision();
            this.handleCollisionBallWall();
            this.handleCollisionBallPlayer();
        };
        Game.prototype.handleScoreCollision = function () {
            if (this.ball.coordinate.x <= this.gates[0].x && this.ball.coordinate.y > this.gates[0].y && this.ball.coordinate.y < this.gates[0].y + this.gates[0].wide) {
                this.players[1].incScore();
                this.reset();
            }
            if (this.ball.coordinate.x >= this.gates[1].x && this.ball.coordinate.y > this.gates[1].y && this.ball.coordinate.y < this.gates[1].y + this.gates[1].wide) {
                this.players[0].incScore();
                this.reset();
            }
        };
        ;
        Game.prototype.handleCollisionBallPlayer = function () {
            var _this = this;
            this.players.forEach(function (player) {
                if (Math.pow(player.r + _this.ball.r, 2) >= Math.pow(player.coordinate.x - _this.ball.coordinate.x, 2) + Math.pow(player.coordinate.y - _this.ball.coordinate.y, 2)) {
                    var directionPlayerToBall = Math.atan((_this.ball.coordinate.y - player.coordinate.y) / (_this.ball.coordinate.x - player.coordinate.x));
                    if (_this.ball.coordinate.x < player.coordinate.x) {
                        directionPlayerToBall += Math.PI;
                    }
                    _this.ball.direction = directionPlayerToBall;
                    _this.ball.speed += player.speed * 2;
                    player.acceleration = 0;
                }
            }, this);
        };
        ;
        Game.prototype.handleCollisionBallWall = function () {
            if (this.ball.top <= 0 || this.ball.bottom >= this.field.height) {
                this.ball.direction = 2 * Math.PI - this.ball.direction;
                if (this.ball.top < 0) {
                    this.ball.coordinate.y = this.ball.r;
                }
                if (this.ball.bottom > this.field.height) {
                    this.ball.coordinate.y = this.field.height - this.ball.r;
                }
            }
            if (this.ball.left <= 0 && (this.ball.coordinate.y <= this.gates[0].y || this.ball.coordinate.y >= this.gates[0].y + this.gates[0].wide)
                || this.ball.right >= this.field.width && (this.ball.coordinate.y <= this.gates[1].y || this.ball.coordinate.y >= this.gates[1].y + this.gates[1].wide)) {
                this.ball.direction = Math.PI - this.ball.direction;
                if (this.ball.left < 0) {
                    this.ball.coordinate.x = this.ball.r;
                }
                if (this.ball.right > this.field.width) {
                    this.ball.coordinate.x = this.field.width - this.ball.r;
                }
            }
        };
        ;
        return Game;
    })();
    return Game;
});
//# sourceMappingURL=Game.js.map
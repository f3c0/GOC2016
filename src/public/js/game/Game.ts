import Field            = require('./Field');
import Player           = require('./Player');
import PlayerGovernor   = require('./PlayerGovernor');
import Actuator         = require('./Actuator');
import InputProcessor   = require('./InputProcessor');
import Ball             = require('./Ball');
import Coordinate       = require('./Coordinate');

import FieldView        = require('./View/FieldView');
import Color            = require("./View/Color");
import PlayerView       = require("./View/PlayerView");
import BallView         = require("./View/BallView");
import Gate = require("./Gate");

class Game {
    private roundLength:number = 25;
    private roundNumber:number = 10000;

    private field:Field;
    private gates:Gate[];
    private players:Player[];
    private inputProcessors:InputProcessor[];
    private actuators:Actuator[];
    private ball:Ball;

    private fieldView:FieldView;
    private playerView:PlayerView;
    private ballView:BallView;

    private ctx;

    constructor(public canvas:HTMLCanvasElement) {
        this.field = new Field(this.canvas.width, this.canvas.height);

        this.gates = [
            new Gate(0, (this.field.height - this.field.gateWidth) / 2, this.field.gateWidth),
            new Gate(this.field.width, (this.field.height - this.field.gateWidth) / 2, this.field.gateWidth)
        ];

        this.players = [
            new Player(new Coordinate(this.field.width / 4, this.field.height / 2), 0, this.field, 'Bob', Color.Player1),
            new Player(new Coordinate(3 * this.field.width / 4, this.field.height / 2), Math.PI, this.field, 'Bobek', Color.Player2)
        ];

        this.ball = new Ball(new Coordinate(this.field.width / 2, this.field.height / 2), 20, this.field);
        this.ball.speed = 40;

        // At first always the second player is controlled by AI.
        this.inputProcessors = [
            new InputProcessor(this.players[0])
        ];

        this.actuators = [
            //new Actuator(this.players[0]),
            new Actuator(this.players[1])
        ];

        this.ctx = this.canvas.getContext('2d');

        this.fieldView = new FieldView(this.ctx);
        this.playerView = new PlayerView(this.ctx);
        this.ballView = new BallView(this.ctx);
    }

    private reset() {
        this.ball.coordinate.x = this.field.width / 2;
        this.ball.coordinate.y = this.field.height / 2;
        this.ball.speed = 0;

        this.players[0].coordinate.x = this.field.width / 4;
        this.players[0].coordinate.y = this.field.height / 2;
        this.players[0].speed = 0;
        this.players[0].acceleration = 0;
        this.players[0].direction = 0;

        this.players[1].coordinate.x = 3 * this.field.width / 4;
        this.players[1].coordinate.y = this.field.height / 2;
        this.players[1].speed = 0;
        this.players[1].acceleration = 0;
        this.players[1].direction = Math.PI;
    }

    public start() {
        this.inputProcessors[0].activatePlayerInterface();
        this.playRound(1);
    }

    private playRound(round:number):void {
        //console.info('play round #' + round);

        this.actuators.forEach(function (actor) {
            actor.decide();
        });
        this.players.forEach(function (player) {
            player.move();
        });

        this.ball.move();

        this.handleCollisions();

        this.draw();

        if (round < this.roundNumber) {
            setTimeout(() => this.playRound(round + 1), this.roundLength);
        }
    }

    private draw() {
        this.fieldView.draw(this.field, this.gates);
        this.players.forEach(function (player) {
            this.playerView.draw(player);
        }, this);
        this.ballView.draw(this.ball);
    }

    private handleCollisions():void {
        this.handleScoreCollision();
        this.handleCollisionBallWall();
        this.handleCollisionBallPlayer();
    }

    private handleScoreCollision() {
        if (this.ball.coordinate.x <= this.gates[0].x && this.ball.coordinate.y > this.gates[0].y && this.ball.coordinate.y < this.gates[0].y + this.gates[0].wide) {
            this.players[1].incScore();
            this.reset();
        }
        if (this.ball.coordinate.x >= this.gates[1].x && this.ball.coordinate.y > this.gates[1].y && this.ball.coordinate.y < this.gates[1].y + this.gates[1].wide) {
            this.players[0].incScore();
            this.reset();
        }
    };

    private handleCollisionBallPlayer() {
        this.players.forEach((player) => {
            if (Math.pow(player.r + this.ball.r, 2) >= Math.pow(player.coordinate.x - this.ball.coordinate.x, 2) + Math.pow(player.coordinate.y - this.ball.coordinate.y, 2)) {
                var directionPlayerToBall = Math.atan((this.ball.coordinate.y - player.coordinate.y) / ( this.ball.coordinate.x - player.coordinate.x ));
                if (this.ball.coordinate.x < player.coordinate.x) {
                    directionPlayerToBall += Math.PI;
                }
                this.ball.direction = directionPlayerToBall;
                this.ball.speed += player.speed * 2;
                player.acceleration = 0;
            }
        }, this);
    };

    private handleCollisionBallWall() {
        if (this.ball.top <= 0 || this.ball.bottom >= this.field.height) {
            this.ball.direction = 2 * Math.PI - this.ball.direction;
        }
        if (this.ball.left <= 0 && (this.ball.coordinate.y <= this.gates[0].y || this.ball.coordinate.y >= this.gates[0].y + this.gates[0].wide)
            || this.ball.right >= this.field.width && (this.ball.coordinate.y <= this.gates[1].y || this.ball.coordinate.y >= this.gates[1].y + this.gates[1].wide)) {
            this.ball.direction = Math.PI - this.ball.direction;
        }
    };
}

export = Game;

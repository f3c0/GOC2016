import Field = require('./Field');
import Player = require('./Player');
import Actuator = require('./Actuator');
import Ball = require('./Ball');
import Coordinate = require('./Coordinate');

import FieldView = require('./View/FieldView');
import Color = require("game/View/Color");
import PlayerView = require("./View/PlayerView");
import BallView = require("./View/BallView");

class Game {
    private roundLength:number = 10;
    private roundNumber:number = 1000;

    private field:Field;
    private players:Player[];
    private actuators:Actuator[];
    private ball:Ball;

    private fieldView:FieldView;
    private playerView:PlayerView;
    private ballView:BallView;

    private ctx;

    constructor(public canvas:HTMLCanvasElement) {
        this.field = new Field(this.canvas.width, this.canvas.height);

        this.players = [
            new Player(new Coordinate(this.field.width / 4, this.field.height / 2), 0, 'Bob', Color.Player1),
            new Player(new Coordinate(3 * this.field.width / 4, this.field.height / 2), Math.PI, 'Bobek', Color.Player2)
        ];

        this.ball = new Ball(new Coordinate(this.field.width / 2, this.field.height / 2), 20);
        this.ball.speed = 40;

        // At first always the second player is controlled by AI.
        this.actuators = [
            new Actuator(this.players[0]),
            new Actuator(this.players[1])
        ];

        this.ctx = this.canvas.getContext('2d');

        this.fieldView = new FieldView(this.ctx);
        this.playerView = new PlayerView(this.ctx);
        this.ballView = new BallView(this.ctx);
    }

    public start() {
        this.playRound(1);
    }

    private playRound(round:number):void {
        console.info('play round #' + round);

        this.actuators.forEach(function (actor) {
            actor.decide();
        });
        this.players.forEach(function (player) {
            player.move();
        });

        this.ball.move();

        this.handleCollisions();

        console.log('Chosen decision: ');
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
        console.log(this.ball.speed);

        this.draw();

        if (round < this.roundNumber) {
            setTimeout(() => this.playRound(round + 1), this.roundLength);
        }
    }

    private draw() {
        this.fieldView.draw(this.field);
        this.players.forEach(function (player) {
            this.playerView.draw(player);
        }, this);
        this.ballView.draw(this.ball);
    }

    private handleCollisions():void {
        if (this.ball.coordinate.x <= 0 || this.ball.coordinate.x >= this.field.width) {
            this.ball.direction = Math.PI - this.ball.direction;
        }
        if (this.ball.coordinate.y <= 0 || this.ball.coordinate.y >= this.field.height) {
            this.ball.direction = 2 * Math.PI - this.ball.direction;
        }
    }
}

export = Game;

import Config           = require('./Config');
import Field            = require('./Field');
import Player           = require('./Player');
import PlayerGovernor   = require('./PlayerGovernor');
import Actuator         = require('./Actuator');
import InputProcessor   = require('./InputProcessor');
import Ball             = require('./Ball');
import Coordinate       = require('./Coordinate');
import Gate             = require("./Gate");

import FieldView        = require('./View/FieldView');
import Color            = require("./View/Color");
import PlayerView       = require("./View/PlayerView");
import BallView         = require("./View/BallView");

import $                = require('jquery');

// Data for AI
import GameState        = require("./GameState");
import StateRepository  = require("./StateRepository");
import Evaluator        = require("./Evaluator");

class Game {
    private roundLength:number = 25;
    private roundNumber:number = 75;

    private config:Config;
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

    // Data for AI
    private stateRepository:StateRepository;
    private evaluator:Evaluator;

    constructor(public canvas:HTMLCanvasElement) {
        this.config     = new Config();
        this.field      = new Field(this.canvas.width, this.canvas.height);
        this.players    = [];
        this.actuators  = [];

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

                this.players.push(
                    new Player(
                        new Coordinate(xCoordinate, yCoordinate),
                        Math.random() * Math.PI * 2,
                        this.field,
                        'Bob' + (i + team * Config.numberOfPlayersPerTeam),
                        Color.playerColors[team]
                    )
                );

                if (team != 0 || i != 0) {
                    this.actuators.push(
                        new Actuator(this.players[i + team * Config.numberOfPlayersPerTeam])
                    );
                }
            }
        }

        this.ball = new Ball(new Coordinate(this.field.width / 2, this.field.height / 2), 20, this.field);
        //this.ball.speed = 40;

        // At first always the first player is controlled by the user.
        this.inputProcessors = [
            new InputProcessor(this.players[0])
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
    }

    public start() {
        this.evaluator = new Evaluator();
        this.stateRepository = new StateRepository();
        this.inputProcessors[0].activatePlayerInterface();
        this.playRound(1);
    }

    private playRound(round:number):void {
        //console.info('play round #' + round);

        this.actuators.forEach(
            function (actor) {
                actor.decide(this.stateRepository);
            },
            this
        );

        this.players.forEach(function (player) {
            player.move();
        });

        this.ball.move();

        this.handleCollisions();

        // Store game state data for later use by AI
        this.stateRepository.storeState(this.getGameState());
        // Evaluate game states
        this.evaluator.evaluate(this.stateRepository);

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
                this.stateRepository.clearStates();
            }
        }, this);
    };

    private handleCollisionBallWall() {
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

    private getGameState()
    {
        var gameState = new GameState();

        gameState.gateWidth      = this.field.gateWidth;
        gameState.ballPosition   = this.ball.coordinate;
        gameState.playerPosition = this.players[1].coordinate;
        gameState.decision       = this.actuators[0].decision;

        return gameState;
    }
}

export = Game;

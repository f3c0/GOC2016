import Player = require('./Player');

class Actuator
{
    public decision;

    private possibleDecisions = [
        'accelerate',
        'decelerate',
        'rotateLeft',
        'rotateRight'
    ];

    constructor(public player:Player) {

    }

    private actuate() {
        switch(this.decision) {
            case 'accelerate':
                this.player.accelerate();
                break;

            case 'decelerate':
                this.player.decelerate();
                break;

            case 'rotateLeft':
                this.player.rotateLeft();
                break;

            case 'rotateRight':
                this.player.rotateRight();
                break;
        }
    }

    public decide() {
        this.decision = this.possibleDecisions[Math.floor(Math.random() * this.possibleDecisions.length)];
        this.actuate();
    }
}

export = Actuator;

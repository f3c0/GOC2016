import Player = require('./Player');

abstract class PlayerGovernor
{
    protected static accelerate:string  = 'accelerate';
    protected static decelerate:string  = 'decelerate';
    protected static rotateLeft:string  = 'rotateLeft';
    protected static rotateRight:string = 'rotateRight';

    protected decision;

    protected possibleDecisions = [
        PlayerGovernor.accelerate,
        PlayerGovernor.decelerate,
        PlayerGovernor.rotateLeft,
        PlayerGovernor.rotateRight,
    ];

    constructor(public player:Player) {

    }

    protected actuate() {
        switch(this.decision) {
            case PlayerGovernor.accelerate:
                this.player.accelerate();
                break;

            case PlayerGovernor.decelerate:
                this.player.decelerate();
                break;

            case PlayerGovernor.rotateLeft:
                this.player.rotateLeft();
                break;

            case PlayerGovernor.rotateRight:
                this.player.rotateRight();
                break;
        }
    }
}

export = PlayerGovernor;

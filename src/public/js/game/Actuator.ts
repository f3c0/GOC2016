import Player = require('./Player');
import PlayerGovernor = require("./PlayerGovernor");

class Actuator extends PlayerGovernor
{
    constructor(public player:Player) {
        super(player);
    }

    public decide() {
        this.decision = this.possibleDecisions[Math.floor(Math.random() * this.possibleDecisions.length)];
        this.actuate();
    }
}

export = Actuator;

import Player = require('./Player');
import PlayerGovernor = require("./PlayerGovernor");
import StateRepository = require("./StateRepository");

class Actuator extends PlayerGovernor
{
    constructor(public player:Player) {

        super(player);
    }

    public decide(stateRepository:StateRepository) {
        this.decision = typeof stateRepository.stateWithMaxValue == 'undefined'
            ? this.possibleDecisions[Math.floor(Math.random() * this.possibleDecisions.length)]
            : stateRepository.stateWithMaxValue.decision;

        this.actuate();
    }
}

export = Actuator;

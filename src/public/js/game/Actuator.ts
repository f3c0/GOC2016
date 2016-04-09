import Player           = require('./Player');
import PlayerGovernor   = require("./PlayerGovernor");
import StateRepository  = require("./StateRepository");

import $                = require('jquery');

class Actuator extends PlayerGovernor
{
    constructor(public player:Player) {
        super(player);
    }

    public decide(stateRepository:StateRepository) {
        var actualPossibleDecisions = $.extend(true, [], this.possibleDecisions);

        if (stateRepository.gameStates.length > 0) {
            if (this.player.speed < 1) {
                var decelerateIndex = actualPossibleDecisions.indexOf('decelerate');

                if (decelerateIndex !== -1) {
                    actualPossibleDecisions.splice(decelerateIndex, 1);
                }
            }

            if (this.player.speed == this.player.maxSpeed) {
                var accelerateIndex = actualPossibleDecisions.indexOf('accelerate');

                if (accelerateIndex !== -1) {
                    actualPossibleDecisions.splice(accelerateIndex, 1);
                }
            }

            if (stateRepository.getLastState().decision == 'rotateLeft') {
                var rotateRightIndex = actualPossibleDecisions.indexOf('rotateRight');

                if (rotateRightIndex !== -1) {
                    actualPossibleDecisions.splice(rotateRightIndex, 1);
                }
            }
            else if (stateRepository.getLastState().decision == 'rotateRight') {
                var rotateLeftIndex = actualPossibleDecisions.indexOf('rotateLeft');

                if (rotateLeftIndex !== -1) {
                    actualPossibleDecisions.splice(rotateLeftIndex, 1);
                }
            }
        }

        if (stateRepository.gameStates.length > 3) {
            var lastStates = stateRepository.getLastStates(4);
            var allTheSame = true;

            for (var i = 0; i < lastStates.length - 1; i++) {
                if (lastStates[i].decision != lastStates[i + 1].decision) {
                    allTheSame = false;
                }
            }

            if (allTheSame) {
                var sameIndex = actualPossibleDecisions.indexOf(lastStates[0].decision);
                if (sameIndex !== -1) {
                    actualPossibleDecisions.splice(actualPossibleDecisions.indexOf(lastStates[0].decision), 1);
                }

            }
        }

        if (actualPossibleDecisions.length == 0) {
            actualPossibleDecisions.push(PlayerGovernor.decelerate);
        }

        var randomDecisionPool = [
            'accelerate',
            actualPossibleDecisions[Math.floor(Math.random() * actualPossibleDecisions.length)]
        ];

        var randomDecision = randomDecisionPool[Math.floor(Math.random() * randomDecisionPool.length)];

        this.decision      =
            typeof stateRepository.stateWithMaxValue == 'undefined'
            || actualPossibleDecisions.indexOf(stateRepository.stateWithMaxValue.decision) === -1
                ? randomDecision
                : stateRepository.stateWithMaxValue.decision;

        this.actuate();
    }
}

export = Actuator;

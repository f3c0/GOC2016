import StateRepository = require("./StateRepository");
import GameState = require("./GameState");

class Evaluator {
    public evaluate(stateRepository:StateRepository) {
        if (stateRepository.gameStates.length < 2)
        {
            return;
        }

        stateRepository.getLastState().value = this.proximityRewarder(stateRepository.getLastStates(2));

        if (stateRepository.stateWithMaxValue)
        {
            stateRepository.stateWithMaxValue.value *= 0.95;
        }

        if (
            !stateRepository.stateWithMaxValue
            || stateRepository.stateWithMaxValue.value < stateRepository.getLastState().value
        ) {
            stateRepository.stateWithMaxValue = stateRepository.getLastState();
        }


    }

    private proximityRewarder(lastTwoStates:GameState[]) {
        var lastDistance = this.getDistance(
            lastTwoStates[0].ballPosition,
            lastTwoStates[0].playerPosition
        );

        var distanceBefore = this.getDistance(
            lastTwoStates[1].ballPosition,
            lastTwoStates[1].playerPosition
        );

        return distanceBefore - lastDistance;
    }

    private getDistance(position1, position2)
    {
        return Math.sqrt(
            Math.pow(position1.x - position2.x, 2)
           + Math.pow(position1.y - position2.y, 2)
        );
    }
}

export = Evaluator;

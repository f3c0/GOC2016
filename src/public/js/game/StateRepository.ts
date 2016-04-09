import GameState = require('./GameState');
import Game = require("./Game");

class StateRepository {
    private maximumNumberOfStates = 1000;
    private _stateWithMaxValue:GameState;

    private _gameStates:GameState[];

    constructor() {
        this._gameStates = [];
    }

    get gameStates():GameState[] {
        return this._gameStates;
    }

    public getLastState()
    {
        return this._gameStates[this._gameStates.length - 1];
    }

    public getLastStates(numberOfStatesToGet:number)
    {
        return this._gameStates.slice(this._gameStates.length - numberOfStatesToGet);
    }

    public storeState(gameState:GameState) {
        this._gameStates.push(gameState);

        if(this._gameStates.length > this.maximumNumberOfStates)
        {
            this._gameStates.shift();
        }
    }

    public clearStates()
    {
        this._gameStates = [];
    }

    get stateWithMaxValue():GameState {
        return this._stateWithMaxValue;
    }

    set stateWithMaxValue(value:GameState) {
        this._stateWithMaxValue = value;
    }
}

export = StateRepository;

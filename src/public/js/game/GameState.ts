import Coordinate = require("./Coordinate");

class GameState {
    private _gateWidth:number;
    private _ballPosition:Coordinate;
    private _playerPosition:Coordinate;
    private _decision:string;
    private _value:number;

    get gateWidth() {
        return this._gateWidth;
    }

    set gateWidth(value) {
        this._gateWidth = value;
    }

    get ballPosition():Coordinate {
        return this._ballPosition;
    }

    set ballPosition(value:Coordinate) {
        this._ballPosition = value;
    }

    get playerPosition():Coordinate {
        return this._playerPosition;
    }

    set playerPosition(value:Coordinate) {
        this._playerPosition = value;
    }

    get decision():string {
        return this._decision;
    }

    set decision(value:string) {
        this._decision = value;
    }

    get value():number {
        return this._value;
    }

    set value(value:number) {
        this._value = value;
    }
}

export = GameState;
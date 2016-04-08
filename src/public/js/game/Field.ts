class Field {
    private _width:number;
    private _height:number;

    private _gateWidth:number;

    get width():number {
        return this._width;
    }

    get height():number {
        return this._height;
    }

    get gateWidth():number {
        return this._gateWidth;
    }

    constructor(width:number, height:number) {
        this._width = width;
        this._height = height;
        this._gateWidth = this._height / 4;
    }
}

export = Field;
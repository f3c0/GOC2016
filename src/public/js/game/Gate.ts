class Gate {
    private _x:number;
    private _y:number;
    private _wide:number;

    constructor(x:number, y:number, wide:number) {
        this._x = x;
        this._y = y;
        this._wide = wide;
    }

    get x():number {
        return this._x;
    }

    get y():number {
        return this._y;
    }

    get wide():number {
        return this._wide;
    }
}

export = Gate;
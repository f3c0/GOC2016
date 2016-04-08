class Color {
    static White:Color = new Color(255, 255, 255);
    static Black:Color = new Color(0, 0, 0);
    static Grass:Color = new Color(150, 255, 150);
    static Player1:Color = new Color(255, 0, 0);
    static Player2:Color = new Color(0, 0, 255);

    constructor(public red:number, public green:number, public blue:number) {
    }

    public toString() {
        return 'rgb(' + [this.red, this.green, this.blue].join(',') + ')';
    }
}

export = Color;
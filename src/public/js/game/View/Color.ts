class Color {
    static White:Color = new Color(255, 255, 255);
    static Black:Color = new Color(0, 0, 0);
    static Grass:Color = new Color(150, 255, 150);

    constructor(public red:number, public green:number, public blue:number) {
    }

    public toString() {
        return 'rgb(' + [this.red, this.green, this.blue].join(',') + ')';
    }
}

export = Color;
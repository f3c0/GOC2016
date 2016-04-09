class Color {
    static White:Color = new Color(255, 255, 255);
    static Black:Color = new Color(0, 0, 0);
    static Grass:Color = new Color(60, 180, 60);
    static playerColors = [
        new Color(255, 0, 0),
        new Color(0, 0, 255),
        new Color(255, 235, 59)
    ];
    static Ball:Color = new Color(10, 10, 10);

    constructor(public red:number, public green:number, public blue:number) {
    }

    public toString() {
        return 'rgb(' + [this.red, this.green, this.blue].join(',') + ')';
    }
}

export = Color;

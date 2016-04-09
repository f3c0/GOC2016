import Color = require('game/View/Color');
import Field = require('./Field');
import View = require('game/View/View');
import Gate = require("../Gate");

class FieldView extends View {

    public draw(field:Field, gates:Gate[]) {

        this.fillRect(0, 0, field.width, field.height, Color.Grass);
        this.drawLine(field.width / 2, 0, field.width / 2, field.height, Color.White);

        gates.forEach((gate) => {
            this.drawLine(gate.x, gate.y, gate.x, gate.y + gate.wide, Color.Black);
        }, this);

        this.drawCircle(field.width / 2, field.height / 2, field.height / 8, Color.White);
    }
}

export = FieldView;

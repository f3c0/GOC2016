import Color = require('game/View/Color');
import Field = require('./Field');
import View = require('game/View/View');

class FieldView extends View {

    public draw(field:Field) {

        this.fillRect(0, 0, field.width, field.height, Color.Grass);
        this.drawLine(field.width / 2, 0, field.width / 2, field.height, Color.White);

        this.drawLine(0, (field.height - field.gateWidth) / 2, 0, (field.height + field.gateWidth) / 2, Color.Black);
        this.drawLine(field.width, (field.height - field.gateWidth) / 2, field.width, (field.height + field.gateWidth) / 2, Color.Black);

        this.drawCircle(field.width / 2, field.height / 2, field.height / 8, Color.White);
    }
}

export = FieldView;

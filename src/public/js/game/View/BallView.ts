import Color = require('game/View/Color');
import Ball = require('./Ball');
import View = require('game/View/View');

class BallView extends View {

    public draw(ball:Ball) {
        this.drawCircle(ball.coordinate.x, ball.coordinate.y, ball.r, Color.Ball);
    }
}

export = BallView;

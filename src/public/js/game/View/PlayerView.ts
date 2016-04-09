import Color = require('game/View/Color');
import Player = require('./Player');
import View = require('game/View/View');

class PlayerView extends View {

    public draw(player:Player) {
        this.drawCircle(player.coordinate.x, player.coordinate.y, 10, player.color);
    }
}

export = PlayerView;

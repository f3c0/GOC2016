import Color = require('game/View/Color');
import Player = require('./Player');
import View = require('game/View/View');

class PlayerView extends View {
    public draw(player:Player) {
        this.drawCircle(player.coordinate.x, player.coordinate.y, player.r, player.color);
        this.fillArc(player.coordinate.x, player.coordinate.y, player.r, player.direction - 1, player.direction + 1, player.color);
    }
}

export = PlayerView;

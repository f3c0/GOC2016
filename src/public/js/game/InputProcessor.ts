import Player         = require('./Player');
import PlayerGovernor = require('./PlayerGovernor');
import $              = require('jquery');

class InputProcessor extends PlayerGovernor
{
    constructor(public player:Player) {
        super(player);
    }

    public activatePlayerInterface()
    {
        $('body').on('keydown', (event) => this.processKeyStroke(event));
    }

    private processKeyStroke(event)
    {
        event = event || window.event;
        switch(event.keyCode) {
            case 37: // left
                this.decision = PlayerGovernor.rotateLeft;
                break;

            case 38: // up
                this.decision = PlayerGovernor.accelerate;
                break;

            case 39: // right
                this.decision = PlayerGovernor.rotateRight;
                break;

            case 40: // down
                this.decision = PlayerGovernor.decelerate;
                break;

            default: return;
        }

        this.actuate();
        event.preventDefault();
    }
}

export = InputProcessor;

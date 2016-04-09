var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './PlayerGovernor', 'jquery'], function (require, exports, PlayerGovernor, $) {
    var InputProcessor = (function (_super) {
        __extends(InputProcessor, _super);
        function InputProcessor(player) {
            _super.call(this, player);
            this.player = player;
        }
        InputProcessor.prototype.activatePlayerInterface = function () {
            var _this = this;
            $('body').on('keydown', function (event) { return _this.processKeyStroke(event); });
        };
        InputProcessor.prototype.processKeyStroke = function (event) {
            event = event || window.event;
            switch (event.keyCode) {
                case 37:
                    this.decision = PlayerGovernor.rotateLeft;
                    break;
                case 38:
                    this.decision = PlayerGovernor.accelerate;
                    break;
                case 39:
                    this.decision = PlayerGovernor.rotateRight;
                    break;
                case 40:
                    this.decision = PlayerGovernor.decelerate;
                    break;
                default: return;
            }
            this.actuate();
            event.preventDefault();
        };
        return InputProcessor;
    })(PlayerGovernor);
    return InputProcessor;
});
//# sourceMappingURL=InputProcessor.js.map
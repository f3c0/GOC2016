var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'game/View/Color', 'game/View/View'], function (require, exports, Color, View) {
    var FieldView = (function (_super) {
        __extends(FieldView, _super);
        function FieldView() {
            _super.apply(this, arguments);
        }
        FieldView.prototype.draw = function (field) {
            this.fillRect(0, 0, field.width, field.height, Color.Grass);
            this.drawLine(field.width / 2, 0, field.width / 2, field.height, Color.White);
            this.drawLine(0, (field.height - field.gateWidth) / 2, 0, (field.height + field.gateWidth) / 2, Color.Black);
            this.drawLine(field.width, (field.height - field.gateWidth) / 2, field.width, (field.height + field.gateWidth) / 2, Color.Black);
            this.drawCircle(field.width / 2, field.height / 2, field.height / 8, Color.White);
        };
        return FieldView;
    })(View);
    return FieldView;
});
//# sourceMappingURL=FieldView.js.map
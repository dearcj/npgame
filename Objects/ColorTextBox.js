var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "../main", "./TextBox", "./Tooltip", "./SkillsPanel", "./O"], function (require, exports, main_1, TextBox_1, Tooltip_1, SkillsPanel_1, O_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by KURWINDALLAS on 11.07.2014.
     */ ///
    var DEFAULT_FONT = 'smallfontp';
    var ColorTextBox = /** @class */ (function (_super) {
        __extends(ColorTextBox, _super);
        function ColorTextBox() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.maxWidth = 260;
            _this.center = false;
            return _this;
        }
        Object.defineProperty(ColorTextBox.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (value) {
                this._text = value;
                if (this.tf)
                    O_1.O.rp(this.tf);
                this.tf = this.getTextBox(value, this.tooltip, this.maxWidth);
                this.gfx.addChild(this.tf);
            },
            enumerable: true,
            configurable: true
        });
        ColorTextBox.TextColor = function (obj, word) {
            var color = 0xffffff;
            var wreturn = word;
            if (wreturn.indexOf("@red") >= 0) {
                color = 0xff0000;
                wreturn = wreturn.replace("@red", "");
            }
            return { color: color, word: wreturn };
        };
        ColorTextBox.prototype.getTextBox = function (text, tooltip, maxWidth) {
            return tooltip.makeTooltip(text, maxWidth, 260, {}, this.colorFunction, "smallfontx1", 1, this.center);
        };
        ColorTextBox.prototype.process = function () {
            _super.prototype.process.call(this);
        };
        ColorTextBox.prototype.init = function (props) {
            this.colorFunction = SkillsPanel_1.SkillsPanel.SkillWordToColor;
            this.tooltip = new Tooltip_1.Tooltip([0, 0]);
            this.maxWidth = props["maxwidth"] ? props["maxwidth"] : 200;
            this.gfx = new main_1.PIXI.Container();
            this.pos[0] -= this.width / 2;
            this.pos[1] -= this.height / 2;
            this.gfx.position.x = Math.round(this.gfx.position.x);
            this.gfx.position.y = Math.round(this.gfx.position.y);
            var gfx = this.layer ? this.layer : main_1._.sm.gui;
            gfx.addChild(this.gfx);
            this.text = props.text;
        };
        return ColorTextBox;
    }(TextBox_1.TextBox));
    exports.ColorTextBox = ColorTextBox;
});

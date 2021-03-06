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
define(["require", "exports", "../main", "./O"], function (require, exports, main_1, O_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IO = /** @class */ (function (_super) {
        __extends(IO, _super);
        function IO() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._fontScale = 1;
            _this.fontInitialSize = 20;
            _this.enabled = true;
            _this.textFieldOffsetX = 0;
            _this.textFieldOffsetY = 0;
            _this.hoverMode = false;
            _this.soundName = "click2";
            return _this;
        }
        Object.defineProperty(IO.prototype, "fontScale", {
            get: function () {
                return this._fontScale;
            },
            set: function (value) {
                if (this.doRemove)
                    return;
                this._fontScale = value;
                var f = this.textField.font;
                f.size = this.fontInitialSize * value;
                var tf = this.textField;
                tf.updateText();
            },
            enumerable: true,
            configurable: true
        });
        IO.prototype.toggleHoverAnimation = function (mode) {
            this.hoverMode = mode;
        };
        IO.prototype.enable = function (mode) {
            this.enabled = mode;
            if (mode) {
                this.toggleHoverAnimation(this.hoverMode);
                this.gfx.tint = 0xffffff;
            }
            else {
                this.toggleHoverAnimation(false);
                this.gfx.tint = 0xaaaaaa;
            }
        };
        IO.prototype.setFocus = function (v) {
            this.focused = v;
        };
        IO.prototype.getFocus = function () {
            return this.focused;
        };
        Object.defineProperty(IO.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (value) {
                this._text = value;
                if (this.textField) {
                    this.textField.text = this._text;
                    var tf = this.textField;
                    tf.updateText();
                    var b = this.textField.getLocalBounds();
                    if (this.valign == 'center') {
                        this.textField.y = 0 + this.textFieldOffsetY - this.textField.textHeight / 2;
                    }
                    else {
                        this.textField.y = -this.textField.maxLineHeight + this.textField.textHeight / 2 + this.textFieldOffsetY;
                    }
                    if (this.align == "right") {
                        this.textField.x = this.width - b.width / 2 + this.textFieldOffsetX;
                    }
                    else if (this.align == "left") {
                        this.textField.x = this.textField.textWidth / 2 + this.textFieldOffsetX;
                    }
                    else {
                        this.textField.x = this.width / 2 + this.textFieldOffsetX; //-b.width / 2;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IO.prototype, "click", {
            get: function () {
                return this._click;
            },
            set: function (v) {
                var _this = this;
                this._click = v;
                if (!v) {
                    this.gfx.tap = null;
                    this.gfx.click = null;
                }
                else if (this.gfx) {
                    var a = function (evt) {
                        if (_this.enabled) {
                            main_1._.sound.play(_this.soundName);
                            v(evt);
                        }
                    };
                    this.gfx.tap = a;
                    this.gfx.click = a;
                }
            },
            enumerable: true,
            configurable: true
        });
        IO.prototype.init = function (props) {
            this.noCameraOffset = true;
            this.valign = (props && props.valign) ? props.valign : 'center';
            _super.prototype.init.call(this, props);
            if (props && props.align)
                this.align = props.align;
            else {
                this.align = "center";
            }
            this.setFocus(false);
        };
        IO.prototype.onDestroy = function () {
            this.click = null;
            if (this.textField) {
                this.textField.parent.removeChild(this.textField);
                this.textField = null;
            }
            _super.prototype.onDestroy.call(this);
        };
        return IO;
    }(O_1.O));
    exports.IO = IO;
});

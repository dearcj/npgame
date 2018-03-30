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
define(["require", "exports", "./IO", "./TextBox", "../main"], function (require, exports, IO_1, TextBox_1, main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIEase = CubicBezier.config(0.46, 0.53, 0.93, 0.3);
    var CLICK_STEP = 3;
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.fadeOnMouseDown = true;
            _this.baseScale = [0, 0];
            _this.doScale = true;
            _this.clickAnimation = true;
            return _this;
        }
        Object.defineProperty(Button.prototype, "customOut", {
            get: function () {
                return this._customOut;
            },
            set: function (value) {
                this._customOut = value;
                this.toggleHoverAnimation(this.hoverMode);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Button.prototype, "customOver", {
            get: function () {
                return this._customOver;
            },
            set: function (value) {
                this.toggleHoverAnimation(this.hoverMode);
                this._customOver = value;
            },
            enumerable: true,
            configurable: true
        });
        Button.prototype.process = function () {
            _super.prototype.process.call(this);
        };
        Button.prototype.toggleHoverAnimation = function (m) {
            _super.prototype.toggleHoverAnimation.call(this, m);
            this.gfx.mouseover = this.overAnimation.bind(this);
            this.gfx.mouseout = this.outAnimation.bind(this);
        };
        Button.prototype.overAnimation = function (evt) {
            if (this.hoverMode) {
                if (this.doScale) {
                    main_1._.TweenMax.killTweensOf(this.gfx.scale);
                    new main_1._.TweenMax(this.gfx.scale, 0.08, { y: this.baseScale[1] + 0.03, ease: UIEase });
                    new main_1._.TweenMax(this.gfx.scale, 0.08, { x: this.baseScale[0] + 0.03, ease: UIEase });
                }
            }
            if (this._customOver)
                this._customOver();
        };
        Button.prototype.outAnimation = function (evt) {
            if (this.hoverMode) {
                if (this.doScale) {
                    new main_1._.TweenMax(this.gfx.scale, 0.15, {
                        x: this.baseScale[0],
                        y: this.baseScale[1],
                        ease: Linear.easeOut
                    });
                }
                this.resetFade();
            }
            if (this._customOut)
                this._customOut();
        };
        Button.prototype.init = function (props) {
            var _this = this;
            _super.prototype.init.call(this, props);
            if (!props)
                props = { text: "", align: "center" };
            this.gfx.interactive = true;
            props.align = 'center';
            if (this.gfx.anchor) {
                this.gfx.anchor.x = 0.5;
                this.gfx.anchor.y = 0.5;
            }
            this.textField = TextBox_1.TextBox.createTextField(this, props);
            this.text = this.text;
            var b = this.textField.getLocalBounds();
            this.textFieldOffsetX = -this.width / 2;
            this.textFieldOffsetY = 0 - this.textField.textHeight * .25;
            if (this.isClip)
                this.gfx.gotoAndStop(0);
            var tf = this.textField;
            var f = this.gfx;
            this.baseScale[0] = f.scale.x;
            this.baseScale[1] = f.scale.y;
            this.gfx.mousedown = function (evt) {
                if (_this.hoverMode) {
                    if (_this.customMouseDown)
                        _this.customMouseDown();
                    if (_this.fadeOnMouseDown) {
                        _this.gfx.tint = 0x888888;
                        _this.textField.tint = 0x888888;
                    }
                    if (_this.clickAnimation) {
                        _this._upTween = main_1._.killTween(_this._upTween);
                        _this._downTween = new main_1._.TweenMax(_this, 0.1, { y: _this.y + CLICK_STEP, ease: Linear.easeIn });
                    }
                }
            };
            this.gfx.mouseup = function (evt) {
                if (_this.hoverMode) {
                    if (_this.customMouseUp)
                        _this.customMouseUp();
                    _this.resetFade();
                }
            };
            this.toggleHoverAnimation(true);
            this.gfx.addChild(this.textField);
            this.gfx.cursor = "pointer";
            this.text = this.text;
            //  this.gfx.position.x = this.x;
            //  this.gfx.position.y = this.y;
        };
        Button.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            this._downTween = main_1._.killTween(this._downTween);
            this._upTween = main_1._.killTween(this._upTween);
            if (this.gfx) {
                this.gfx.mouseover = null;
                this.gfx.mouseout = null;
                this.gfx.mousedown = null;
            }
        };
        Button.prototype.updateHitArea = function (w, h) {
            if (w === void 0) { w = null; }
            if (h === void 0) { h = null; }
            var p = this.gfx.getGlobalPosition();
            this.gfx.hitArea = new PIXI.Rectangle(-w / 2, -h / 2, w ? w : this.gfx.width, h ? h : this.gfx.height);
        };
        Button.prototype.highlight = function () {
            var _this = this;
            var loop = 0;
            if (this.__highlight)
                this.__highlight = main_1._.killTween(this.__highlight);
            this.__highlight = this.setInterval(function () {
                loop += 0.38;
                var angle = 0.5 * (main_1._.fMath.cos(loop) + 1);
                _this.gfx.color.setDark(0.4 * angle, 0.3 * angle, 0.05 * angle);
                //   this.gfx.color.setLight(1,1, 0.4*angle);
            }, 0);
            this.wait(0.12).call(function () {
                _this.gfx.color.setDark(0, 0, 0);
                //  this.gfx.color.setLight(1,1,1);
                _this.__highlight = main_1._.killTween(_this.__highlight);
            }).apply();
        };
        Button.prototype.resetFade = function () {
            if (this.clickAnimation) {
                if (this._downTween) {
                    this._downTween = main_1._.killTween(this._downTween);
                    this._upTween = new main_1._.TweenMax(this, 0.1, { y: this.y - CLICK_STEP, ease: Linear.easeOut });
                }
            }
            if (this.fadeOnMouseDown) {
                this.gfx.tint = 0xffffff;
                this.textField.tint = 0xffffff;
            }
        };
        return Button;
    }(IO_1.IO));
    exports.Button = Button;
});

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
define(["require", "exports", "./O", "../main"], function (require, exports, O_1, main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by KURWINDALLAS on 17.11.2014.
     */
    var BlackScreen = /** @class */ (function (_super) {
        __extends(BlackScreen, _super);
        function BlackScreen() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BlackScreen.prototype.init = function (props) {
            if (props.gfx) {
                this.gfx = main_1._.cs(props.gfx);
                this.gfx.x = main_1.SCR_WIDTH / 2;
                this.gfx.y = main_1.SCR_HEIGHT / 2;
                this.gfx.width = main_1.SCR_WIDTH;
                this.gfx.height = main_1.SCR_HEIGHT;
                this.gfx.alpha = 0.;
                new main_1._.TweenMax(this.gfx, 0.35, { alpha: 0.9 });
            }
            else {
                this.gfx = new PIXI.Graphics();
                this.gfx.clear();
                this.gfx.alpha = 0;
                new main_1._.TweenMax(this.gfx, 0.35, { alpha: 0.7 });
                this.gfx.beginFill(0x222222, 1);
                this.gfx.drawRect(0, 0, main_1.SCR_WIDTH, main_1.SCR_HEIGHT);
                this.gfx.endFill();
                this.gfx.blendMode = PIXI.BLEND_MODES.MULTIPLY;
            }
            this.layer.addChildAt(this.gfx, 0);
        };
        BlackScreen.prototype.process = function () {
        };
        return BlackScreen;
    }(O_1.O));
    exports.BlackScreen = BlackScreen;
});

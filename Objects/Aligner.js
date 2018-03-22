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
define(["require", "exports", "./O", "../ClientSettings", "../main"], function (require, exports, O_1, ClientSettings_1, main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by KURWINDALLAS on 17.11.2014.
     */
    var Aligner = /** @class */ (function (_super) {
        __extends(Aligner, _super);
        function Aligner() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.crossed = [0, 0];
            return _this;
        }
        Aligner.prototype.init = function (props) {
            _super.prototype.init.call(this, props);
            if (this.x - this.width / 2 < main_1._.screenCenterOffset[0]) {
                this.crossed[0] = -1;
            }
            if (this.x + this.width / 2 > main_1._.screenCenterOffset[0] + ClientSettings_1.MIN_SCR_WIDTH) {
                this.crossed[0] = 1;
            }
            if (this.y - this.height / 2 < main_1._.screenCenterOffset[1]) {
                this.crossed[1] = -1;
            }
            if (this.y + this.height / 2 > main_1._.screenCenterOffset[1] + ClientSettings_1.MIN_SCR_HEIGHT) {
                this.crossed[1] = 1;
            }
            var objectsUnderAligner = this.collectObjectsUnder(this);
            console.log("Objects under: ", objectsUnderAligner.length);
            var deltaX = main_1._.screenCenterOffset[0] * this.crossed[0];
            var deltaY = main_1._.screenCenterOffset[1] * this.crossed[1];
            for (var _i = 0, objectsUnderAligner_1 = objectsUnderAligner; _i < objectsUnderAligner_1.length; _i++) {
                var x = objectsUnderAligner_1[_i];
                x.x += deltaX;
                x.y += deltaY;
            }
        };
        Aligner.prototype.process = function () {
            //this.gfx.x = 0;//c.offset[0] + this.initPos[0];
            //this.gfx.y = 0;//c.offset[1] + this.initPos[1];
        };
        Aligner.prototype.collectObjectsUnder = function (o) {
            var res = [];
            for (var _i = 0, _a = main_1._.lm.objectsList; _i < _a.length; _i++) {
                var x = _a[_i];
                if (x != o && (x.layer == main_1._.sm.gui || x.layer == main_1._.sm.gui2) && x.intersects(o)) {
                    res.push(x);
                }
            }
            return res;
        };
        return Aligner;
    }(O_1.O));
    exports.Aligner = Aligner;
});

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
define(["require", "exports", "./O", "../Math", "../main"], function (require, exports, O_1, Math_1, main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Camera = /** @class */ (function (_super) {
        __extends(Camera, _super);
        function Camera(pos) {
            var _this = _super.call(this, pos) || this;
            _this.deltaAngle = 0;
            _this.deltaLen = 0;
            _this.delta = [0, 0];
            _this.anchorDelta = [0, 0];
            _this.operator = false;
            _this.voX = 0;
            _this.voY = 0;
            _this.boardLU = [0, 0];
            _this.boardRD = [0, 0];
            _this._zoom = 1;
            _this.camScale = 1;
            _this._yflow = false;
            _this.zoom = 1;
            _this.removeable = false;
            _this.rect = new PIXI.Rectangle(0, 0, main_1.SCR_WIDTH, main_1.SCR_HEIGHT);
            return _this;
        }
        Object.defineProperty(Camera.prototype, "zoom", {
            get: function () {
                return this._zoom;
            },
            set: function (value) {
                this._zoom = value;
                var ofsx = main_1.SCR_WIDTH * (1 - this._zoom) / 2;
                var ofsy = main_1.SCR_HEIGHT * (1 - this._zoom) / 2;
                main_1._.sm.main.x = ofsx;
                main_1._.sm.main.y = ofsy;
                main_1._.sm.main.scale.x = value;
                main_1._.sm.main.scale.y = value;
                main_1._.sm.olgui.scale.x = value;
                main_1._.sm.olgui.scale.y = value;
                main_1._.sm.olgui.x = ofsx;
                main_1._.sm.olgui.y = ofsy;
                main_1._.sm.effects.scale.x = value;
                main_1._.sm.effects.scale.y = value;
                main_1._.sm.effects.x = ofsx;
                main_1._.sm.effects.y = ofsy;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "yflow", {
            get: function () {
                return this._yflow;
            },
            set: function (value) {
                this._yflow = value;
                if (!value) {
                    this.baseY = null;
                }
            },
            enumerable: true,
            configurable: true
        });
        Camera.prototype.follow = function (o) {
            this.followObj = o;
        };
        Camera.prototype.stop = function () {
            this.v[0] = 0;
            this.v[1] = 0;
        };
        Camera.prototype.t = function (oldP) {
            return [oldP[0] - this.pos[0], oldP[1] - this.pos[1]];
        };
        Camera.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            this.followObj = null;
        };
        Camera.prototype.boundaryCheck = function (p) {
            if (p[0] < this.boardLU[0]) {
                p[0] = this.boardLU[0];
            }
            if (p[1] < this.boardLU[1]) {
                p[1] = this.boardLU[1];
            }
            if (p[0] > this.boardRD[0]) {
                p[0] = this.boardRD[0];
            }
            if (p[1] > this.boardRD[1]) {
                p[1] = this.boardRD[1];
            }
        };
        Camera.prototype.reset = function (x, y, doBoundaryCheck) {
            this.v[0] = 0;
            this.v[1] = 0;
            this.followObj = null;
            this.pos[0] = x;
            this.pos[1] = y;
            /*if (doBoundaryCheck) {
                this.boundaryCheck(this.pos)
            }*/
            this.voX = 0;
            this.voY = 0;
        };
        Camera.prototype.worldToScreen = function (s) {
            var centrObjCoordX = this.pos[0] - main_1.SCR_WIDTH * 0.5;
            var centrObjCoordY = this.pos[1] - main_1.SCR_HEIGHT * 0.5;
            return [s[0] - centrObjCoordX, s[1] - centrObjCoordY];
        };
        Camera.prototype.screenToWorld = function (s) {
            var centrObjCoordX = this.pos[0] - main_1.SCR_WIDTH * 0.5;
            var centrObjCoordY = this.pos[1] - main_1.SCR_HEIGHT * 0.5;
            return [s[0] + centrObjCoordX, s[1] + centrObjCoordY];
        };
        Camera.prototype.focusPlace = function (worldPos) {
            var prevPos = [this.pos[0], this.pos[1]];
            TweenMax.killChildTweensOf(main_1._.camera, true);
            TweenMax.killChildTweensOf(this, true);
            console.log("FOCUS PLACE");
            new TweenMax(this, .6, { x: worldPos[0], y: worldPos[1] });
            new TweenMax(main_1._.camera, .6, { z: 20 });
            new TweenMax(this, 0.5, { delay: 0.6, x: prevPos[0], y: prevPos[1] });
            new TweenMax(main_1._.camera, 0.5, { delay: 0.6, z: 0 });
        };
        Camera.prototype.updateTransform = function (obj, clip, offsX, offsY) {
            if (offsX === void 0) { offsX = 0; }
            if (offsY === void 0) { offsY = 0; }
            if (obj.noCameraOffset) {
                clip.x = obj.pos[0] + offsX;
                clip.y = obj.pos[1] + offsY;
            }
            else {
                clip.x = obj.pos[0] + this.delta[0] + offsX - this.offset[0];
                clip.y = obj.pos[1] + this.delta[1] + offsY - this.offset[1];
            }
            if (!obj.alwaysVisible && !obj.noCameraOffset) {
                clip.visible = this.isVisible(clip);
            }
            if (clip.visible) {
                clip.rotation = obj.a + this.a;
            }
        };
        Camera.prototype.process = function () {
            if (this.operator) {
                this.delta[0] = main_1._.fMath.cos(this.deltaAngle) * this.deltaLen / 7;
                this.delta[1] = main_1._.fMath.sin(this.deltaAngle) * this.deltaLen;
                this.deltaLen = main_1._.fMath.cos(main_1._.time / 1000 + this.deltaLen / 20) * 2;
                this.deltaAngle = main_1._.fMath.sin(main_1._.time / 2000 + this.deltaLen / 100) * 2;
            }
            this.offset[0] = this.pos[0] - main_1.SCR_WIDTH_HALF;
            this.offset[1] = this.pos[1] - main_1.SCR_HEIGHT_HALF;
            /*   if (this.a != 0) {
                   this.sina = Math.sin(this.a);
                   this.cosa = Math.cos(this.a);
               }*/
        };
        Camera.prototype.isVisible = function (g) {
            g.getBounds(false, this.rect);
            var gg = g;
            if (gg.anchor && gg.anchor.x != 0.5 && gg.anchor.y != 0.5) {
                this.anchorDelta[0] = (gg.anchor.x - 0.5) * gg.width;
                this.anchorDelta[1] = (gg.anchor.y - 0.5) * gg.height;
                Math_1.m.rv2fast(this.anchorDelta, g.rotation);
            }
            else {
                this.anchorDelta[0] = 0;
                this.anchorDelta[1] = 0;
            }
            return ((Math.abs(g.position.x - main_1.SCR_WIDTH_HALF - this.anchorDelta[0]) <= this.rect.width + main_1.SCR_WIDTH_HALF) && (Math.abs(g.position.y - main_1.SCR_HEIGHT_HALF - this.anchorDelta[1]) <= this.rect.height + main_1.SCR_HEIGHT_HALF));
        };
        Camera.prototype.hitAnimation = function (charPos) {
            var pos = [(charPos[0] - this.pos[0]) / 15, (charPos[1] - this.pos[1]) / 15];
            new TweenMax(this, 0.25, { x: this.pos[0] + pos[0], zoom: 1.05, yoyo: true, repeat: 1 });
        };
        Camera.prototype.worldScreenToUI = function (p) {
            p[0] -= main_1.SCR_WIDTH_HALF * (1 - this.zoom);
            p[1] -= main_1.SCR_HEIGHT_HALF * (1 - this.zoom);
            return p;
        };
        Camera.prototype.transformPoint = function (point, dir, pos2) {
            pos2[0] = point[0] + (this.delta[0] - this.offset[0]) * dir;
            pos2[1] = point[1] + (this.delta[1] - this.offset[1]) * dir;
        };
        return Camera;
    }(O_1.O));
    exports.Camera = Camera;
});

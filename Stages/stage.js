define(["require", "exports", "../main"], function (require, exports, main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by MSI on 04.01.2017.
     */
    var Stage = /** @class */ (function () {
        function Stage() {
            this.currentFocus = null;
            this.focusable = [];
            this.container = new PIXI.Container();
            this.layers = {}; //MAP OF PIXI CONTAINERS
        }
        Stage.prototype.setFocusable = function (f) {
            this.focusable = f;
        };
        Stage.prototype.addControllerHandlers = function () {
        };
        Stage.prototype.process = function () {
        };
        ;
        Stage.prototype.onHide = function (newStage) {
            main_1._.sm.removeObjects();
            main_1._.sm.main.removeChild(this.container);
        };
        ;
        Stage.prototype.onShow = function () {
            main_1._.sm.main.addChild(this.container);
            //this.addControllerHalders();
        };
        ;
        Stage.prototype.addLayer = function (name, l) {
            if (l) {
                this.layers[name] = l;
            }
            else {
                this.layers[name] = new PIXI.Container();
            }
            this.container.addChild(this.layers[name]);
            return this.layers[name];
        };
        Stage.prototype.addToLayer = function (s, d) {
            var l = this.layers[s];
            if (!l) {
                l = this.addLayer(s, null);
            }
            l.addChild(d);
        };
        return Stage;
    }());
    exports.Stage = Stage;
});

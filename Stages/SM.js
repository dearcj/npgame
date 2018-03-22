define(["require", "exports", "../main", "../Objects/Camera", "../Math"], function (require, exports, main_1, Camera_1, Math_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //asdasdasd
    var SM = /** @class */ (function () {
        function SM() {
            this.stage = null;
            this.prevStage = null;
            this.inTransit = false;
            this.loading = false;
            this.objects = [];
            this.static = [];
            this.walls = [];
            this.dynamic = [];
            this.particlesPlaces = [];
            this.globalIds = {};
        }
        /*    public addTextParticle(text: string, actor: Actor, fontName: string = 'smallfontp', tint: number = 0xffffff, fontScale: number = 0.9): TextParticle{
                if (!this.particlesPlaces[actor.networkObject.Place]) {
                    this.particlesPlaces[actor.networkObject.Place] = [];
                }
        
                let pl = actor.networkObject.Place;
        
                let tp = new TextParticle([actor.pos[0]
                    ,actor.pos[1] - 100 + this.particlesPlaces[actor.networkObject.Place].length * 25]);
                this.particlesPlaces[actor.networkObject.Place].push(tp);
                if (tp.pos[0] < 80) tp.pos[0] = 80;
                tp.init({fontscale: fontScale, align: "center", text: text, fontTint: tint, fontName: fontName});
                tp.noCameraOffset = false;
                _.sm.olgui.addChild(tp.gfx);
                tp.v[1] = -6;
        
                actor.linkObj(tp);
                tp.updateLink = function (dx,y) {
                    this.x += dx;
                };
                tp.fontScale = fontScale*0.5;
                new TweenMax(tp, 0.5, {fontScale: fontScale});
                tp.wait(1.5).call(() => {
                    let arr = this.particlesPlaces[pl];
                    arr.splice(arr.indexOf(tp), 1);
                }).kill().apply();
        
                return tp
            }*/
        SM.prototype.ZOrderContainer = function (c) {
            c.children.sort(function (a, b) {
                return a.position.y - b.position.y;
            });
        };
        SM.prototype.ZUpdate = function (container, c) {
            //  this.ZOrderContainer(container)
            var l = Math_1.binarySearch(container.children, c, function (a, b) {
                return a.position.y - b.position.y;
            });
            if (l < 0) {
                l = ~l;
            }
            container.setChildIndex(c, Math.min(l + 1, container.children.length - 1));
        };
        SM.prototype.addStatic = function (gfx) {
            this.static.push(gfx);
        };
        SM.prototype.findByProp = function (prop, list) {
            if (list === void 0) { list = null; }
            if (!list)
                list = this.objects;
            var res = [];
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var o = list_1[_i];
                if (o.properties[prop])
                    res.push(o);
            }
            return res;
        };
        SM.prototype.findStringIdMultiple = function (stringId, list) {
            if (list === void 0) { list = null; }
            if (!list)
                list = this.objects;
            var res = [];
            for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                var o = list_2[_i];
                if (o.stringID == stringId)
                    res.push(o);
            }
            return res;
        };
        SM.prototype.findStringId = function (stringId, list) {
            if (list === void 0) { list = null; }
            if (!list)
                list = this.objects;
            for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
                var o = list_3[_i];
                if (o.stringID == stringId)
                    return o;
            }
        };
        SM.prototype.findByType = function (constructor, list) {
            if (list === void 0) { list = null; }
            if (!list)
                list = this.objects;
            var res = [];
            for (var _i = 0, list_4 = list; _i < list_4.length; _i++) {
                var o = list_4[_i];
                if (o instanceof constructor) {
                    res.push(o);
                }
            }
            return res;
        };
        SM.prototype.find = function (uid) {
            for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
                var o = _a[_i];
                if (o.uid == uid)
                    return o;
            }
        };
        SM.prototype.init = function () {
            this.superstage = new PIXI.Container();
            this.main = new PIXI.Container();
            this.gui = new PIXI.Container();
            this.gui2 = new PIXI.Container();
            this.olgui = new PIXI.Container();
            this.fonts = new PIXI.Container();
            this.effects = new PIXI.Container();
            this.cursorlayer = new PIXI.Container();
            this.main.interactive = false;
            this.gui.interactive = true;
            this.gui2.interactive = true;
            this.olgui.interactive = true;
            this.fonts.interactive = false;
            this.superstage.addChild(this.main);
            var w = window;
            var ui = w.PIXI.UI;
            this.pixiUiStage = new ui.Stage(main_1.SCR_WIDTH, main_1.SCR_HEIGHT);
            this.superstage.addChild(this.pixiUiStage);
            this.superstage.addChild(this.effects);
            this.superstage.addChild(this.olgui);
            this.superstage.addChild(this.gui);
            this.superstage.addChild(this.gui2);
            this.superstage.addChild(this.fonts);
            this.superstage.addChild(this.cursorlayer);
            main_1._.app.stage.addChild(this.superstage);
        };
        SM.prototype.createCamera = function () {
            this.camera = new Camera_1.Camera([main_1.SCR_WIDTH / 2, main_1.SCR_HEIGHT / 2]);
            return this.camera;
        };
        SM.prototype.removeObjects = function () {
            var len = this.objects.length;
            for (var i = 0; i < len; i++) {
                var obji = this.objects[i];
                if (obji.removeable) {
                    obji.killNow();
                    obji.onDestroy();
                    if (this.globalIds[obji.stringID]) {
                        this.globalIds[obji.stringID] = null;
                    }
                    this.objects.splice(i, 1);
                    i--;
                    len--;
                }
            }
            len = this.static.length;
            for (var i = 0; i < len; i++) {
                var gfx = this.static[i];
                gfx.parent.removeChild(gfx);
            }
            this.dynamic = [];
            this.walls = [];
            this.static = [];
        };
        SM.prototype.fadeBegin = function (newStage) {
            if (this.stage) {
                this.stage.onHide(newStage);
                this.stage.layers = {};
                this.stage.doProcess = false;
            }
            this.stage = newStage;
            this.stage.layers = {};
            newStage.doProcess = true;
            this.camera.reset(main_1.SCR_WIDTH / 2, main_1.SCR_HEIGHT / 2, false);
            newStage.onShow();
        };
        SM.prototype.openStage = function (newStage) {
            if (this.inTransit)
                return;
            newStage.prevStage = this.stage;
            if (this.stage) {
                if (!this.stage.doProcess)
                    return;
                this.stage.doProcess = false;
                this.fadeBegin(newStage);
            }
            else {
                this.stage = newStage;
                this.stage.doProcess = true;
                newStage.onShow();
            }
        };
        SM.prototype.process = function () {
            var len = this.objects.length;
            //phys.update(this.objects);
            for (var i = 0; i < len; i++) {
                var obji = this.objects[i];
                if (!obji.doRemove) {
                    obji.process();
                }
                if (obji.doRemove) {
                    obji.onDestroy();
                    this.objects.splice(i, 1);
                    i--;
                    len--;
                }
            }
            if (this.stage && this.stage.doProcess)
                this.stage.process();
        };
        SM.prototype.removeList = function (objects) {
            if (objects) {
                for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
                    var x = objects_1[_i];
                    if (x != this.camera)
                        x.killNow();
                }
            }
        };
        return SM;
    }());
    exports.SM = SM;
});

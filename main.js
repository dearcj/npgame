define(["require", "exports", "./Sound", "./PauseTimer", "./lm", "./lib/fmath", "./ResourceManager", "./ObjectsList", "./ClientSettings", "./Stages/SM", "./Stages/Menu", "./Stages/Game"], function (require, exports, Sound_1, PauseTimer_1, lm_1, FMath, ResourceManager_1, ObjectsList_1, ClientSettings_1, SM_1, Menu_1, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GLOBAL_MUSIC_ASSETS = [];
    var GLOBAL_SOUND_ASSETS = []; //
    var GLOBAL_ASSETS = [
        ///////////////////////////////////////////
        // Spine
        ///////////////////////////////////////////
        //asdasd
        ///////////////////////////////////////////
        // Atlases
        ///////////////////////////////////////////
        'atlas/allluts.png',
        'atlas/tiles1.json',
        'atlas/effects.json',
        ///////////////////////////////////////////
        // Fonts
        ///////////////////////////////////////////
        'fonts/smallfontp.xml',
        'fonts/smallfontx1.xml',
        'atlas/dedgamecaps.xml',
    ];
    exports.Bounce = window.Bounce;
    exports.Linear = window.Linear;
    exports.Quad = window.Quad;
    exports.Power3 = window.Power3;
    exports.Power2 = window.Power2;
    exports.Sine = window.Sine;
    exports.Elastic = window.Elastic;
    exports.TweenMax = window.TweenMax;
    var Main = /** @class */ (function () {
        function Main() {
            this.activeTab = true;
            this.timer = new PauseTimer_1.PauseTimer();
            this.lastLoop = 0;
            this.totalFrames = 0;
            this.totalDelta = 0;
            this.fMath = new FMath(null);
            this.menu = new Menu_1.Menu();
            this.game = new Game_1.Game();
            this.TweenMax = window.TweenMax;
            this.TimelineMax = window.TimelineMax;
            this.worldSpeed = 1;
            this.debug = true;
            this.isInitialLoading = true;
            this.assetsLoaded = 0;
            this.delta = 0;
            this.loadingCounter = 0;
            this.appScale = 1;
            this.timeScale = 1;
            this.deltaSec = 0.01;
            this.__DIR = location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1);
        }
        Main.prototype.setTimeScale = function (x) {
            exports._.TweenMax.globalTimeScale(x);
            this.timeScale = x;
        };
        Main.prototype.cm = function (s, layer, autoplay, times) {
            if (layer === void 0) { layer = null; }
            if (autoplay === void 0) { autoplay = false; }
            if (times === void 0) { times = null; }
            var textures = [];
            var keys = [];
            for (var key in PIXI.utils.TextureCache) {
                if (key.indexOf(s) == 0) {
                    keys.push(key);
                }
            }
            var inx = 0;
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if (times) {
                    textures.push({ texture: PIXI.utils.TextureCache[key], time: times[inx] ? times[inx] : 1 });
                }
                else {
                    textures.push(PIXI.utils.TextureCache[key]);
                }
                inx++;
            }
            var gfx = new PIXI.extras.AnimatedSprite(textures);
            gfx.anchor.x = 0.5;
            gfx.anchor.y = 0.5;
            if (layer)
                layer.addChild(gfx);
            if (autoplay) {
                gfx.gotoAndPlay(0);
            }
            return gfx;
        };
        Main.prototype.csproj = function (s, layer) {
            if (layer === void 0) { layer = null; }
            var texture = PIXI.Texture.fromFrame(s);
            var gfx = new PIXI.Sprite(texture);
            gfx.anchor.x = .5;
            gfx.anchor.y = .5;
            if (layer)
                layer.addChild(gfx);
            else {
            }
            return gfx;
        };
        Main.prototype.cs = function (s, layer) {
            if (layer === void 0) { layer = null; }
            if (!PIXI.utils.TextureCache[s]) {
                console.log("@@@@Can't find ", s);
                return null;
            }
            var texture = PIXI.Texture.fromFrame(s);
            texture = texture ? texture : PIXI.Texture.fromFrame(s + '.png');
            if (texture) {
                var gfx = new PIXI.Sprite(texture);
                gfx.anchor.x = .5;
                gfx.anchor.y = .5;
                if (layer)
                    layer.addChild(gfx);
                else {
                }
                return gfx;
            }
            else {
                console.log("@@@@Can't find ", s);
                return null;
            }
        };
        Main.prototype._ = function (s) {
            return this.sm.findStringId(s);
        };
        Main.GET = function (url, cb) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    cb(xmlHttp.responseText);
                }
            };
            xmlHttp.open("GET", url, true); // true for asynchronous
            xmlHttp.send(null);
        };
        Main.prototype.setScreenRes = function (baseW, baseH) {
            this.appScale = baseH / ClientSettings_1.MIN_SCR_HEIGHT;
            if (this.appScale > 1.28)
                this.appScale = 1.28;
            exports.SCR_WIDTH = baseW / this.appScale;
            exports.SCR_HEIGHT = baseH / this.appScale;
            exports.SCR_WIDTH_HALF = exports.SCR_WIDTH * .5;
            exports.SCR_HEIGHT_HALF = exports.SCR_HEIGHT * .5;
            this.screenCenterOffset = [(exports.SCR_WIDTH - ClientSettings_1.MIN_SCR_WIDTH) * .5, (exports.SCR_HEIGHT - ClientSettings_1.MIN_SCR_HEIGHT) * .5];
        };
        Main.prototype.start = function () {
            var _this = this;
            document.addEventListener('contextmenu', function (event) {
                if (_this.onContext)
                    _this.onContext();
                event.preventDefault();
            });
            this.setScreenRes(exports.SCR_WIDTH, exports.SCR_HEIGHT);
            //TweenMax.lagSmoothing(0);
            this.app = new PIXI.Application(exports.SCR_WIDTH, exports.SCR_HEIGHT, {
                autoStart: true,
                clearBeforeRender: false,
                resolution: this.appScale, antialias: false,
                preserveDrawingBuffer: false, forceFXAA: true, backgroundColor: 0xfffffff,
            });
            document.body.appendChild(this.app.view);
            this.camera = new PIXI.Container();
            this.camera.x = 0;
            this.camera.y = 0;
            // TODO: camera
            this.app.stage = new PIXI.Container();
            this.sm = new SM_1.SM();
            this.sm.init();
            this.lm = new lm_1.LM();
            this.sm.createCamera();
            this.lastLoop = (new Date()).getTime();
            this.lastNetworkPing = this.lastLoop;
            this.bindedAnimate = this.animate.bind(this);
            this.app.ticker.add(this.bindedAnimate);
        };
        ;
        Main.prototype.loadComplete = function () {
            var _this = this;
            this.isInitialLoading = false;
            this.loadTime = (new Date()).getTime() - window.startTime.getTime();
            this.clearPreloader();
            var interaction = this.app.renderer.plugins.interaction;
            document.addEventListener('mousedown', function (e) {
                if (_this.globalMouseDown)
                    _this.globalMouseDown(e), false;
            });
            /*interaction.cursorStyles["init"] = "url(/game/cursors/cursor.png), default";
            interaction.cursorStyles["default"] = "url(/game/cursors/cursor.png), default";
            interaction.cursorStyles["pointer"] = "url(/game/cursors/hand.png), pointer";
            interaction.cursorStyles["skill"] = "url(/game/cursors/cursor_skill.png), pointer";
            interaction.currentCursorMode = "init";
            this.app.stage.interactive = true;
            this.app.stage.cursor = "init";*/
            this.sm.openStage(this.menu);
        };
        Main.prototype.initPreloader = function () {
            this.preloadBar = new PIXI.Graphics();
            this.app.stage.addChild(this.preloadBar);
            var borderWidth = 3;
            this.preloadBar.beginFill(0x000000);
            this.preloadBar.moveTo(exports._.screenCenterOffset[0] + exports.SCR_WIDTH * 0.1 - borderWidth, exports.SCR_HEIGHT * 0.495 - borderWidth);
            this.preloadBar.lineTo(exports._.screenCenterOffset[0] + exports.SCR_WIDTH * 0.9 + borderWidth, exports.SCR_HEIGHT * 0.495 - borderWidth);
            this.preloadBar.lineTo(exports._.screenCenterOffset[0] + exports.SCR_WIDTH * 0.9 + borderWidth, exports.SCR_HEIGHT * 0.505 + borderWidth);
            this.preloadBar.lineTo(exports._.screenCenterOffset[0] + exports.SCR_WIDTH * 0.1 - borderWidth, exports.SCR_HEIGHT * 0.505 + borderWidth);
            this.preloadBar.endFill();
        };
        Main.prototype.drawPreloaderProgress = function (progressPercent) {
            this.preloadBar.beginFill(0xffffff);
            var progress = progressPercent / 100;
            this.preloadBar.moveTo(exports._.screenCenterOffset[0] + exports.SCR_WIDTH * 0.1, exports.SCR_HEIGHT * 0.495);
            this.preloadBar.lineTo(exports._.screenCenterOffset[0] + exports.SCR_WIDTH * 0.1 + exports.SCR_WIDTH * 0.8 * progress, exports.SCR_HEIGHT * 0.495);
            this.preloadBar.lineTo(exports._.screenCenterOffset[0] + exports.SCR_WIDTH * 0.1 + exports.SCR_WIDTH * 0.8 * progress, exports.SCR_HEIGHT * 0.505);
            this.preloadBar.lineTo(exports._.screenCenterOffset[0] + exports.SCR_WIDTH * 0.1, exports.SCR_HEIGHT * 0.505);
            this.preloadBar.endFill();
        };
        Main.prototype.clearPreloader = function () {
            this.app.stage.removeChild(this.preloadBar);
        };
        Main.prototype.load = function () {
            var _this = this;
            this.loadingCounter = 0;
            this.initPreloader();
            var onAssetsLoaded = function () {
                _this.loadingCounter++;
                if (_this.loadingCounter == 2)
                    _this.loadComplete();
            };
            console.log("ANUS");
            this.rm = new ResourceManager_1.ResourceManager();
            this.rm.loadAssets(GLOBAL_ASSETS.concat(ObjectsList_1.LevelNames), function (loader, evt) {
                _this.drawPreloaderProgress(loader.progress);
                _this.assetsLoaded++;
            }, onAssetsLoaded);
            this.sound = new Sound_1.Sound();
            this.sound.load(GLOBAL_MUSIC_ASSETS, GLOBAL_SOUND_ASSETS, onAssetsLoaded);
        };
        Main.prototype.animate = function () {
            // this.stats.begin();
            this.timer.process();
            this.random = Math.random();
            this.time = (new Date()).getTime();
            this.cursorPos = this.app.renderer.plugins.interaction.mouse.global;
            if (!this.isInitialLoading) {
                var timeD = (this.time - this.lastLoop);
                this.lastLoop = this.time;
                this.deltaSec = timeD / 1000.;
                this.delta = timeD / ClientSettings_1.FRAME_DELAY;
                this.totalDelta += this.delta;
                this.totalFrames++;
                this.sm.process();
            }
        };
        Main.prototype.killTween = function (tween) {
            if (tween && tween.totalProgress() != 1)
                tween.totalProgress(1).kill();
            return null;
        };
        Main.prototype.addFilter = function (m, x) {
            var mm = (m);
            if (!mm._filters)
                mm._filters = [];
            mm._filters.push(x);
        };
        Main.prototype.removeFilterByType = function (main, ftype) {
            var m = main;
            if (!m._filters)
                return;
            for (var x = m._filters.length - 1; x >= 0; x--) {
                if (m._filters[x] instanceof ftype) {
                    m._filters.splice(x, 1);
                }
            }
        };
        Main.prototype.removeFilter = function (main, f) {
            var m = main;
            m._filters.splice(exports._.sm.main.filters.indexOf(f), 1);
        };
        return Main;
    }());
    exports.Main = Main;
    exports._ = new Main();
    exports._.start();
    exports._.load();
});

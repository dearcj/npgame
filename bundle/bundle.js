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
/**
 * Created by Михаил on 27.06.2014.
 */
define("Math", ["require", "exports", "main"], function (require, exports, main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function binarySearch(array, target, comparator) {
        var l = 0, h = array.length - 1, m, comparison;
        comparator = comparator || function (a, b) {
            return (a < b ? -1 : (a > b ? 1 : 0)); /* default comparison method if one was not provided */
        };
        while (l <= h) {
            m = (l + h) >>> 1; /* equivalent to Math.floor((l + h) / 2) but faster */
            comparison = comparator(array[m], target);
            if (comparison < 0) {
                l = m + 1;
            }
            else if (comparison > 0) {
                h = m - 1;
            }
            else {
                return m;
            }
        }
        return ~l;
    }
    exports.binarySearch = binarySearch;
    function binaryInsert(array, target, duplicate, comparator) {
        var i = binarySearch(array, target, comparator);
        if (i >= 0) {
            if (!duplicate) {
                return i;
            }
        }
        else {
            i = ~i;
        }
        array.splice(i, 0, target);
        return i;
    }
    exports.binaryInsert = binaryInsert;
    var M = /** @class */ (function () {
        function M() {
        }
        ///asdasdasdasd
        /*  rectCircleColliding(circlePos: Vec2, radius: number,rectPos:Vec2, rectSize: Vec2): boolean{
              var distX = Math.abs(circlePos[0] - rect.x-rect.w/2);
              var distY = Math.abs(circlePos[1] - rect.y-rect.h/2);
      
              if (distX > (rect.w/2 + circle.r)) { return false; }
              if (distY > (rect.h/2 + circle.r)) { return false; }
      
              if (distX <= (rect.w/2)) { return true; }
              if (distY <= (rect.h/2)) { return true; }
      
              var dx=distX-rect.w/2;
              var dy=distY-rect.h/2;
              return (dx*dx+dy*dy<=(radius*radius));
          }*/
        M.prototype.v2cp = function (v) {
            return [v[0], v[1]];
        };
        M.prototype.perp = function (v) {
            return [-v[1], v[0]];
        };
        M.prototype.dot = function (v1, v2) {
            return v1[0] * v2[0] + v1[1] * v2[1];
        };
        M.prototype.v2len = function (v) {
            var l = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
            return l;
        };
        M.prototype.subv2 = function (v1, v2) {
            return [v1[0] - v2[0], v1[1] - v2[1]];
        };
        M.prototype.v2prod = function (v1, v2) {
            return [v1[0] * v2[0], v1[1] * v2[1]];
        };
        M.prototype.av2 = function (v, v2) {
            return [v[0] + v2[0], v[1] + v2[1]];
        };
        M.prototype.mv2 = function (v, delta) {
            return [v[0] * delta, v[1] * delta];
        };
        M.prototype.normalizeV2 = function (v) {
            var l = Math.sqrt(v[0] * v[0] + v[1] * v[1]) + 0.0000001;
            v[0] /= l;
            v[1] /= l;
            return v;
        };
        M.prototype.shuffle = function (a) {
            for (var i = a.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                _a = [a[j], a[i]], a[i] = _a[0], a[j] = _a[1];
            }
            return a;
            var _a;
        };
        M.prototype.numhexToRgb = function (numhex) {
            var r = numhex >> 16;
            var g = numhex >> 8 & 0xFF;
            var b = numhex & 0xFF;
            return [255, r, g, b];
        };
        M.prototype.decimalAdjust = function (type, value, exp) {
            // Если степень не определена, либо равна нулю...
            if (typeof exp === 'undefined' || +exp === 0) {
                return Math[type](value);
            }
            value = +value;
            exp = +exp;
            // Если значение не является числом, либо степень не является целым числом...
            if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
                return NaN;
            }
            // Сдвиг разрядов
            value = value.toString().split('e');
            value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
            // Обратный сдвиг
            value = value.toString().split('e');
            return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
        };
        M.prototype.rv2 = function (v, r) {
            var ca = Math.cos(r);
            var sa = Math.sin(r);
            return [ca * v[0] - sa * v[1], sa * v[0] + ca * v[1]];
        };
        // Десятичное округление к ближайшему
        M.prototype.round10 = function (value, exp) {
            if (exp === void 0) { exp = -1; }
            return this.decimalAdjust('round', value, exp);
        };
        M.prototype.lerp = function (a, b, d) {
            return a + (b - a) * d;
        };
        M.prototype.sign = function (v) {
            if (v == 0)
                return 0;
            if (v > 0)
                return 1;
            else
                return -1;
        };
        M.prototype.rint = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        M.prototype.getRand = function (obj) {
            return obj[Math.floor(Math.random() * obj.length)];
        };
        M.prototype.hexToRgb = function (hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16),
                parseInt(result[4], 16),
            ] : null;
        };
        M.prototype.hslToRgb = function (h, s, l) {
            var r, g, b;
            if (s == 0) {
                r = g = b = l; // achromatic
            }
            else {
                var hue2rgb = function hue2rgb(p, q, t) {
                    if (t < 0)
                        t += 1;
                    if (t > 1)
                        t -= 1;
                    if (t < 1 / 6)
                        return p + (q - p) * 6 * t;
                    if (t < 1 / 2)
                        return q;
                    if (t < 2 / 3)
                        return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }
            return this.rgbtoint(r * 255, g * 255, b * 255); // [Math.round(r* 255), Math.round(g * 255), Math.round(b * 255)];
        };
        M.prototype.rgbtoint = function (r, g, b) {
            return ((1 << 24) + (r << 16) + (g << 8) + b);
        };
        M.prototype.getAngles = function (a, b, c) {
            // calculate the angle between ab and ac
            var angleAB = Math.atan2(b[1] - a[1], b[0] - a[0]);
            var angleAC = Math.atan2(c[1] - a[1], c[0] - a[0]);
            var angleBC = Math.atan2(b[1] - c[1], b[0] - c[0]);
            var angleA = Math.abs((angleAB - angleAC) * (180 / Math.PI));
            var angleB = Math.abs((angleAB - angleBC) * (180 / Math.PI));
            return [angleA, angleB];
        };
        M.prototype.fastSin = function (inValue) {
            // See  for graph and equations
            // https://www.desmos.com/calculator/8nkxlrmp7a
            // logic explained here : http://devmaster.net/posts/9648/fast-and-accurate-sine-cosine
            var B = 1.27323954474; // 4/pi
            var C = -0.405284734569; // -4 / (pi²)
            //return B*inValue + C * inValue*Math.abs(inValue);
            if (inValue > 0) {
                return B * inValue + C * inValue * inValue;
            }
            return B * inValue - C * inValue * inValue;
        };
        M.prototype.rectCircleColliding = function (cPos, radius, rectPos, rectSize) {
            var distX = Math.abs(cPos[0] - rectPos[0] - rectSize[0] / 2);
            var distY = Math.abs(cPos[1] - rectPos[1] - rectSize[1] / 2);
            var res = false;
            if (distX > (rectSize[0] / 2 + radius)) {
                return null;
            }
            if (distY > (rectSize[1] / 2 + radius)) {
                return null;
            }
            if (distX <= (rectSize[0] / 2)) {
                res = true;
            }
            if (!res && distY <= (rectSize[1] / 2)) {
                res = true;
            }
            if (!res) {
                var dx = distX - rectSize[0] / 2;
                var dy = distY - rectSize[1] / 2;
                if (dx * dx + dy * dy <= (radius * radius))
                    res = true;
                else
                    res = false;
            }
            if (res == true) {
                if (cPos[1] < rectPos[1])
                    return (rectPos[1] - radius) - cPos[1];
                else {
                    return (rectPos[1] + rectSize[1] + radius) - cPos[1];
                }
            }
            else
                return null;
        };
        M.prototype.mul = function (v, n) {
            return [v[0] * n, v[1] * n];
        };
        M.prototype.rv2fast = function (anchorDelta, rotation) {
            var ca = main_1._.fMath.cos(rotation);
            var sa = main_1._.fMath.sin(rotation);
            var prev0 = anchorDelta[0];
            anchorDelta[0] = ca * anchorDelta[0] - sa * anchorDelta[1];
            anchorDelta[1] = sa * prev0 + ca * anchorDelta[1];
        };
        M.prototype.sqdist = function (pos, pos2) {
            return (pos[0] - pos2[0]) * (pos[0] - pos2[0]) + (pos[1] - pos2[1]) * (pos[1] - pos2[1]);
        };
        M.prototype.radiusOver = function (pos, rad) {
            return [pos[0] + (Math.random() - 0.5) * rad, pos[1] + (Math.random() - 0.5) * rad];
        };
        M.prototype.angleDist = function (pos, dist, angle) {
            return [pos[0] + dist * main_1._.fMath.cos(angle), pos[1] + dist * main_1._.fMath.sin(angle)];
        };
        return M;
    }());
    exports.m = new M();
});
define("Sound", ["require", "exports", "Math"], function (require, exports, Math_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SOUND_PATH = 'sound/';
    var MUSIC_PATH = 'music/';
    var Sound = /** @class */ (function () {
        function Sound() {
            this._enabled = true;
            this.loaded = 0;
            this.total = 0;
            this.musicInstance = null;
            this.ready = false;
            this.soundsPlaying = [];
            this.loadingCallbacks = [];
        }
        Object.defineProperty(Sound.prototype, "enabled", {
            get: function () {
                return this._enabled;
            },
            set: function (e) {
                this._enabled = e;
            },
            enumerable: true,
            configurable: true
        });
        Sound.prototype.lazyPlayMusic = function (fullName, volume, pos) {
            var _this = this;
            if (volume === void 0) { volume = null; }
            if (pos === void 0) { pos = null; }
            var o = { cb: null };
            var cb = function (sound) {
                var found = false;
                var inx = -1;
                for (var i = 0; i < _this.loadingCallbacks.length; ++i) {
                    if (_this.loadingCallbacks[i] == o) {
                        inx = i;
                        found = true;
                        break;
                    }
                }
                if (!found)
                    return;
                _this.loadingCallbacks.splice(inx, 1);
                if (pos)
                    sound.seek(pos);
                if (volume)
                    sound.volume(volume);
                _this.play(null, sound);
            };
            o.cb = cb;
            this.loadingCallbacks.push(o);
            this.loadOneSound(MUSIC_PATH + fullName, cb);
        };
        Sound.prototype.lazyPlaySound = function (fullName) {
            var _this = this;
            this.loadOneSound(SOUND_PATH + fullName, function (sound) {
                _this.play(null, sound);
            });
        };
        Sound.prototype.stopAll = function () {
            for (var _i = 0, _a = this.soundsPlaying; _i < _a.length; _i++) {
                var x = _a[_i];
                x.stop();
            }
            this.loadingCallbacks = [];
        };
        Sound.prototype.loadOneSound = function (s, cb) {
            var noExt = s.split("/").pop().replace(/\.[^/.]+$/, "");
            noExt = noExt.toLowerCase();
            var sound = new Howl({
                src: s,
                autoplay: false,
                loop: false,
                volume: 1,
            });
            this.sounds[noExt] = sound;
            this.sounds[noExt].once('load', function () {
                cb(sound);
            });
        };
        Sound.prototype.load = function (musicAssets, soundAssets, cb) {
            this.sounds = {};
            var c = 0;
            for (var _i = 0, musicAssets_1 = musicAssets; _i < musicAssets_1.length; _i++) {
                var x = musicAssets_1[_i];
                this.loadOneSound(MUSIC_PATH + x, function () {
                    c++;
                    if (c == soundAssets.length + musicAssets.length) {
                        cb();
                    }
                });
            }
            for (var _a = 0, soundAssets_1 = soundAssets; _a < soundAssets_1.length; _a++) {
                var x = soundAssets_1[_a];
                this.loadOneSound(SOUND_PATH + x, function () {
                    c++;
                    if (c == soundAssets.length + musicAssets.length) {
                        cb();
                    }
                });
            }
            if (c == soundAssets.length + musicAssets.length) {
                cb();
            }
            /*createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);
    
            createjs.Sound.alternateExtensions = ["mp3"];
    
            this.enabled = createjs.Sound.initializeDefaultPlugins();
    
    
            if (!this.enabled) {
                cb(this);
                return;
            }
    
            this.loaded = 0;
            this.total = manifest.length;
    
            createjs.Sound.on("fileload", () => {
                this.loaded++;
                console.log("ZSound loaded " + this.loaded.toString() + " / " + manifest.length.toString());
                if (this.loaded == manifest.length) {
                    this.ready = true;
                    cb();
                }
            }); // call handleLoad when each sound loads
    
            createjs.Sound.registerSounds(manifest, path);*/
        };
        Sound.prototype.playMusic = function (snd) {
            /*   if (this.musicInstanceName == snd && this.musicInstance) return;
               if (this.musicInstance) {
                   createjs.Sound.stop(this.musicInstance);
               }
       
               try {
                   this.musicInstanceName = snd;
                   this.musicInstance = createjs.Sound.play(snd, {interrupt: createjs.Sound.INTERRUPT_NONE, loop: 999999});
               } catch (e) {
               }*/
        };
        Sound.prototype.unmute = function () {
            /* if (this.enabled) return;
             this.enabled = true;
     
             createjs.Sound.setMute(false);*/
        };
        Sound.prototype.mute = function () {
            /*this.enabled = false;
    
            createjs.Sound.setMute(true);*/
        };
        Sound.prototype.playRandom = function (arr) {
            this.play(Math_1.m.getRand(arr));
        };
        Sound.prototype.play = function (snd, sndObj) {
            var _this = this;
            if (sndObj === void 0) { sndObj = null; }
            if (!this.enabled)
                return;
            snd = snd.toLowerCase();
            try {
                var soundObj_1 = sndObj ? sndObj : this.sounds[snd];
                soundObj_1.play();
                this.soundsPlaying.push(soundObj_1);
                soundObj_1.on('end', function () {
                    _this.soundsPlaying.splice(_this.soundsPlaying.indexOf(soundObj_1), 1);
                });
            }
            catch (e) {
            }
        };
        ;
        return Sound;
    }());
    exports.Sound = Sound;
});
define("PauseTimer", ["require", "exports", "main"], function (require, exports, main_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PauseTimer = /** @class */ (function () {
        function PauseTimer() {
            this.paused = false;
            this.pauseStart = 0;
            this.totalPauseTime = 0;
            this.intervals = [];
            this.timeouts = [];
        }
        PauseTimer.prototype.since = function (time) {
            return this.getTimer() - time;
        };
        PauseTimer.prototype.process = function () {
            /*     let i = 0;
                 let l = this.intervals.length;
                 while (i < l) {
                     let x = this.intervals[i];
                     if (this.getTimer() - x.start > x.delay) {
                         let r = x.f();
                         x.start = this.getTimer();
         
                         if (r < 0) {
                             console.log("Removed interval");
                             this.intervals.splice(i, 1);
                             i--;
                             l--;
                         }
                     }
         
                     i++
                 }
         
                 i = 0;
                 l = this.timeouts.length;
                 while (i < l) {
                     let x = this.timeouts[i];
                     if (this.getTimer() - x.start > x.delay) {
                         x.f();
         
                         this.timeouts.splice(i, 1);
                         i--;
                         l--;
                     }
                     i++
                 }*/
        };
        PauseTimer.prototype.removeListener = function (f) {
            for (var i = 0; i < this.intervals.length; ++i) {
                if (this.intervals[i] == f) {
                    this.intervals.splice(i, 1);
                    i--;
                }
            }
            for (var i = 0; i < this.timeouts.length; ++i) {
                if (this.timeouts[i] == f) {
                    this.timeouts.splice(i, 1);
                    i--;
                }
            }
        };
        /* public setTimeout(f: Function, delay: number): any {
             let obj = {f: f, delay: delay, start: this.getTimer()};
             this.timeouts.push(obj);
             return obj;
         }
     
         public setInterval(f: Function, delay: number): any {
             let obj = {f: f, delay: delay, start: this.getTimer()};
             this.intervals.push(obj);
             return obj;
         }
     */
        PauseTimer.prototype.getTimer = function () {
            return main_2._.time - this.totalPauseTime;
        };
        PauseTimer.prototype.isPaused = function () {
            return this.paused;
        };
        PauseTimer.prototype.pause = function () {
            this.pauseStart = main_2._.time;
            main_2._.TweenMax.pauseAll();
            this.paused = true;
        };
        PauseTimer.prototype.resume = function () {
            if (!this.paused)
                return;
            this.totalPauseTime += (main_2._.time - this.pauseStart);
            main_2._.TweenMax.resumeAll();
            this.paused = false;
        };
        return PauseTimer;
    }());
    exports.PauseTimer = PauseTimer;
});
/**
 * Created by MSI on 14.04.2017.
 */
define("utils/EventTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.events = {
        killed: 'killed',
        collided: 'collided',
    };
});
define("Objects/O", ["require", "exports", "main", "utils/EventTypes"], function (require, exports, main_3, EventTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Context = /** @class */ (function () {
        function Context(prev, prevF) {
            this.id = 0;
            this.f = function () {
            };
            this.c = prev;
            this.id = Context.globalID;
            Context.globalID++;
            if (prevF)
                this.c.f = this.nextF(prevF);
        }
        Context.prototype.nextF = function (cb) {
            var con = this;
            return function (params) {
                //all the previous goes here
                if (con.c)
                    con.c.f.bind(con.c);
                cb(con.f, params);
            };
        };
        Context.globalID = 0;
        return Context;
    }());
    var PhysStatic = 1;
    var PhysDynamic = 2;
    var EngineEvent = /** @class */ (function () {
        function EngineEvent(e, l) {
            this.event = e;
            this.listener = l;
        }
        return EngineEvent;
    }());
    var O = /** @class */ (function () {
        function O(pos, gfx) {
            if (pos === void 0) { pos = null; }
            if (gfx === void 0) { gfx = null; }
            this.scale = [1, 1];
            this.uid = -1;
            this.isClip = false;
            this.dynamic = false;
            this.doRemove = false;
            this.pos = [0, 0];
            this.v = [0, 0];
            this.offset = [0, 0, 0]; //x y a
            this.removeable = true;
            this.acl = 1;
            this.av = 0;
            this.a = 0;
            this.noCameraOffset = false;
            this.alwaysVisible = false;
            this._width = 0;
            this._height = 0;
            this.createTime = 0;
            this.trackObject = null;
            this.bounds = [0, 0];
            this.context = new Context(null, null);
            if (!pos) {
                this.pos = [0, 0];
            }
            else {
                this.pos = pos;
            }
            this.createTime = main_3._.timer.getTimer();
            if (gfx) {
                this._gfx = gfx;
            }
            if (this.stringID) {
                main_3._.sm.globalIds[this.stringID] = this;
            }
            main_3._.sm.objects.push(this);
        }
        O.cin = function (c, pos, gfx, props) {
            if (pos === void 0) { pos = null; }
            if (gfx === void 0) { gfx = null; }
            if (props === void 0) { props = {}; }
            var res = new c(pos, gfx);
            res.init(props);
            return res;
        };
        Object.defineProperty(O.prototype, "gfx", {
            get: function () {
                return this._gfx;
            },
            set: function (value) {
                if (value) {
                    this.scale[0] = value.scale.x;
                    this.scale[1] = value.scale.y;
                }
                this._gfx = value;
            },
            enumerable: true,
            configurable: true
        });
        O.prototype.updateLink = function (x, y) {
            this.x += x;
            this.y += y;
        };
        Object.defineProperty(O.prototype, "x", {
            get: function () {
                return this.pos[0];
            },
            set: function (v) {
                var d = v - this.pos[0];
                if (this.linkedObjects)
                    this.updateLinked(d, 0);
                this.pos[0] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(O.prototype, "y", {
            get: function () {
                return this.pos[1];
            },
            set: function (v) {
                var d = v - this.pos[1];
                if (this.linkedObjects)
                    this.updateLinked(0, d);
                this.pos[1] = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(O.prototype, "opacity", {
            get: function () {
                if (this._gfx)
                    return this._gfx.alpha;
            },
            set: function (v) {
                if (this._gfx)
                    this._gfx.alpha = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(O.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (v) {
                this._width = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(O.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (v) {
                this._height = v;
            },
            enumerable: true,
            configurable: true
        });
        O.prototype.intersects = function (o) {
            return ((Math.abs(o.x - this.x) < (o.width + this.width) / 2) &&
                (Math.abs(o.y - this.y) < (o.height + this.height) / 2));
        };
        O.prototype.linkObj = function () {
            var o = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                o[_i] = arguments[_i];
            }
            if (!this.linkedObjects)
                this.linkedObjects = [];
            for (var _a = 0, o_1 = o; _a < o_1.length; _a++) {
                var x = o_1[_a];
                this.linkedObjects.push(x);
            }
        };
        O.prototype.unlinkObj = function (o) {
            var inx = 0;
            for (var _i = 0, _a = this.linkedObjects; _i < _a.length; _i++) {
                var x = _a[_i];
                if (x == o) {
                    this.linkedObjects.splice(inx, 1);
                    break;
                }
                inx++;
            }
        };
        O.prototype.hasFlag = function (value, flag) {
            return ((value & flag) == value);
        };
        O.prototype.onCollide = function (b) {
        };
        O.rp = function (c) {
            if (c && c.parent) {
                var pp = c.parent;
                c.parent.removeChild(c);
            }
            return null;
        };
        O.hideList = function (list, visibility) {
            if (visibility === void 0) { visibility = false; }
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var x = list_1[_i];
                if (x.gfx)
                    x.gfx.visible = visibility;
            }
        };
        //calls only once
        O.prototype.onDestroy = function () {
            this.layer = null;
            this.linkedObjects = [];
            this.emmit(EventTypes_1.events.killed);
            if (this.trackObject) {
                main_3._.TweenMax.killTweensOf(this.trackObject);
                this.trackObject = null;
            }
            if (this._gfx && this._gfx.parent) {
                O.rp(this._gfx);
                this._gfx = null;
            }
            if (main_3._.debug && this.debugGfx) {
                O.rp(this.debugGfx);
                this.debugGfx = null;
            }
        };
        O.prototype.killNow = function () {
            this.doRemove = true;
            return null;
        };
        O.prototype.kill = function () {
            var _this = this;
            this.context = new Context(this.context, function (next) {
                _this.doRemove = true;
                next();
            });
            return this;
        };
        O.getSprite = function (texName) {
            if (texName.length > 4 && texName.charAt(texName.length - 4) != ".")
                var add = ".png";
            else
                add = "";
            var s = new main_3._.PIXI.Sprite(main_3._.PIXI.Texture.fromFrame(texName + add));
            s.anchor.x = 0.5;
            s.anchor.y = 0.5;
            return s;
        };
        O.prototype.overlapPoint = function (p) {
            if (p[0] > this.pos[0] - this.bounds[0] / 2 &&
                p[0] < this.pos[0] + this.bounds[0] / 2 &&
                p[1] > this.pos[1] - this.bounds[1] / 2 &&
                p[1] < this.pos[1] + this.bounds[1] / 2) {
                return true;
            }
            else {
                return false;
            }
        };
        O.prototype.updateBounds = function () {
            if (!this._gfx) {
                this.bounds = [this.width, this.height];
                return;
            }
            if (this._gfx.parent)
                this._gfx.updateTransform();
            var b = this._gfx.getBounds();
            this.bounds = [b.width, b.height];
        };
        O.prototype.init = function (props) {
            if (props === void 0) { props = null; }
            if (props) {
                if (props.color && this.gfx && this.gfx.color) {
                    this.gfx.tint = parseInt(props.color.replace('#', '0x'));
                }
                if (props.light && this.gfx && this.gfx.color) {
                    this.gfx.tint = parseInt(props.color.replace('#', '0x'));
                }
            }
            this.createTime = main_3._.timer.getTimer();
            if (this._gfx)
                main_3._.sm.camera.updateTransform(this, this._gfx, 0, 0);
            this.updateBounds();
        };
        O.prototype.call = function (func) {
            this.context = new Context(this.context, function (next, params) {
                func(params);
                next();
            });
            return this;
        };
        O.prototype.delayedCall = function (milliseconds, func) {
            var _this = this;
            this.context = new Context(this.context, function (next, params) {
                _this.setTimeout(function () {
                    func(params);
                    next();
                }, milliseconds);
            });
            return this;
        };
        O.prototype.emmit = function (event) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            if (!this.events)
                return;
            for (var i = 0, l = this.events.length; i < l; ++i) {
                if (this.events[i].event == event) {
                    (_a = this.events[i]).listener.apply(_a, params);
                    this.events.splice(i, 1);
                    i--;
                    l--;
                }
            }
            var _a;
        };
        O.prototype.on = function (event) {
            var _this = this;
            if (!this.events)
                this.events = [];
            this.context = new Context(this.context, function (next) {
                _this.events.push(new EngineEvent(event, function (p) {
                    next(p);
                }));
            });
            return this;
        };
        O.prototype.apply = function () {
            var initContext = this.context;
            var first = this.context;
            while (first.c)
                first = first.c;
            first.f(function () {
            });
            this.context = new Context(null, null);
            return initContext;
        };
        O.prototype.setTimeout = function (f, delaySecs) {
            var _this = this;
            if (delaySecs === void 0) { delaySecs = 0; }
            return main_3._.TweenMax.delayedCall(delaySecs, function () {
                if (_this.doRemove)
                    return -1;
                return f();
            });
        };
        O.prototype.setIntervalTimeout = function (f, delaySecs, timeoutSecs) {
            if (delaySecs < 0.03)
                delaySecs = 0.03;
            var ff = this.setInterval(f, delaySecs);
            main_3._.TweenMax.delayedCall(timeoutSecs, function () {
                ff = main_3._.killTween(ff);
            });
            return ff;
        };
        O.prototype.setInterval = function (f, delaySecs) {
            var _this = this;
            if (delaySecs === void 0) { delaySecs = 0.03; }
            if (delaySecs < 0.03)
                delaySecs = 0.03;
            var interval = new main_3._.TimelineMax({ repeat: -1 }).call(function () {
                if (_this.doRemove)
                    return main_3._.killTween(interval);
                return f();
            }, null, null, delaySecs);
            return interval;
        };
        O.prototype.wait = function (seconds) {
            var _this = this;
            this.context = new Context(this.context, function (next) {
                _this.setTimeout(function () {
                    next();
                }, seconds);
            });
            return this;
        };
        O.prototype.s = function (field, value) {
            var _this = this;
            var prev = this.context.f;
            this.context.f = function () {
                if (prev)
                    prev();
                _this[field] = value;
            };
            return this;
        };
        O.prototype.collide = function (evt) {
            //    o.set('pos', o.x+1, o.y+1).wait(1).set();
            //    o.u('pos', {x: o.x, y: 12, r}).update();
        };
        O.prototype.process = function () {
            if (this.trackObject) {
                this.pos[0] = this.trackObject.pos[0];
                this.pos[1] = this.trackObject.pos[1];
            }
            else {
                if (!this.physType) {
                    this.pos[0] += this.v[0]; // * _.worldSpeed * _.delta2;
                    this.pos[1] += this.v[1]; // * _.worldSpeed * _.delta2;
                }
            }
            if (this.av != 0)
                this.a += this.av * main_3._.worldSpeed * main_3._.delta;
            if (this._gfx)
                main_3._.sm.camera.updateTransform(this, this._gfx, 0, 0);
        };
        O.prototype.updateLinked = function (x, y) {
            for (var _i = 0, _a = this.linkedObjects; _i < _a.length; _i++) {
                var a = _a[_i];
                a.updateLink(x, y);
            }
        };
        O.prototype.changeGfxLayer = function (layer) {
            O.rp(this.gfx);
            layer.addChild(this.gfx);
        };
        O.prototype.extendProcess = function (f) {
            var oldprocess = this.process.bind(this);
            this.process = function () {
                oldprocess();
                f();
            };
        };
        O.totop = function (cl) {
            cl.parent.setChildIndex(cl, cl.parent.children.length - 1);
        };
        O.prototype.rotateTo = function (dest, deltaAngle) {
            var dx = this.pos[0] - dest[0];
            var dy = this.pos[1] - dest[1];
            var d = Math.sqrt(dx * dx + dy * dy);
            if (d < 1)
                return;
            dx /= d;
            dy /= d;
            this.a = Math.atan2(dy, dx) + deltaAngle;
        };
        return O;
    }());
    exports.O = O;
});
define("Objects/Camera", ["require", "exports", "Objects/O", "Math", "main"], function (require, exports, O_1, Math_2, main_4) {
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
            _this.rect = new PIXI.Rectangle(0, 0, main_4.SCR_WIDTH, main_4.SCR_HEIGHT);
            return _this;
        }
        Object.defineProperty(Camera.prototype, "zoom", {
            get: function () {
                return this._zoom;
            },
            set: function (value) {
                this._zoom = value;
                var ofsx = main_4.SCR_WIDTH * (1 - this._zoom) / 2;
                var ofsy = main_4.SCR_HEIGHT * (1 - this._zoom) / 2;
                main_4._.sm.main.x = ofsx;
                main_4._.sm.main.y = ofsy;
                main_4._.sm.main.scale.x = value;
                main_4._.sm.main.scale.y = value;
                main_4._.sm.olgui.scale.x = value;
                main_4._.sm.olgui.scale.y = value;
                main_4._.sm.olgui.x = ofsx;
                main_4._.sm.olgui.y = ofsy;
                main_4._.sm.effects.scale.x = value;
                main_4._.sm.effects.scale.y = value;
                main_4._.sm.effects.x = ofsx;
                main_4._.sm.effects.y = ofsy;
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
            var centrObjCoordX = this.pos[0] - main_4.SCR_WIDTH * 0.5;
            var centrObjCoordY = this.pos[1] - main_4.SCR_HEIGHT * 0.5;
            return [s[0] - centrObjCoordX, s[1] - centrObjCoordY];
        };
        Camera.prototype.screenToWorld = function (s) {
            var centrObjCoordX = this.pos[0] - main_4.SCR_WIDTH * 0.5;
            var centrObjCoordY = this.pos[1] - main_4.SCR_HEIGHT * 0.5;
            return [s[0] + centrObjCoordX, s[1] + centrObjCoordY];
        };
        Camera.prototype.focusPlace = function (worldPos) {
            var prevPos = [this.pos[0], this.pos[1]];
            TweenMax.killChildTweensOf(main_4._.camera, true);
            TweenMax.killChildTweensOf(this, true);
            console.log("FOCUS PLACE");
            new TweenMax(this, .6, { x: worldPos[0], y: worldPos[1] });
            new TweenMax(main_4._.camera, .6, { z: 20 });
            new TweenMax(this, 0.5, { delay: 0.6, x: prevPos[0], y: prevPos[1] });
            new TweenMax(main_4._.camera, 0.5, { delay: 0.6, z: 0 });
        };
        Camera.prototype.updateTransform = function (obj, clip, offsX, offsY) {
            if (offsX === void 0) { offsX = 0; }
            if (offsY === void 0) { offsY = 0; }
            if (obj.noCameraOffset) {
                clip.x = obj.pos[0] + offsX;
                clip.y = obj.pos[1] + offsY;
            }
            else {
                clip.x = obj.pos[0] + this.delta[0] + offsX;
                clip.y = obj.pos[1] + this.delta[1] + offsY;
            }
            //  if (!obj.alwaysVisible && !obj.noCameraOffset) {
            //     clip.visible = this.isVisible(clip);
            //  }
            if (clip.visible) {
                clip.rotation = obj.a + this.a;
            }
        };
        Camera.prototype.process = function () {
            if (this.operator) {
                this.delta[0] = main_4._.fMath.cos(this.deltaAngle) * this.deltaLen / 7;
                this.delta[1] = main_4._.fMath.sin(this.deltaAngle) * this.deltaLen;
                this.deltaLen = main_4._.fMath.cos(main_4._.time / 1000 + this.deltaLen / 20) * 2;
                this.deltaAngle = main_4._.fMath.sin(main_4._.time / 2000 + this.deltaLen / 100) * 2;
            }
            this.offset[0] = this.pos[0] - main_4.SCR_WIDTH_HALF;
            this.offset[1] = this.pos[1] - main_4.SCR_HEIGHT_HALF;
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
                Math_2.m.rv2fast(this.anchorDelta, g.rotation);
            }
            else {
                this.anchorDelta[0] = 0;
                this.anchorDelta[1] = 0;
            }
            return ((Math.abs(g.position.x - main_4.SCR_WIDTH_HALF - this.anchorDelta[0]) <= this.rect.width + main_4.SCR_WIDTH_HALF) && (Math.abs(g.position.y - main_4.SCR_HEIGHT_HALF - this.anchorDelta[1]) <= this.rect.height + main_4.SCR_HEIGHT_HALF));
        };
        Camera.prototype.hitAnimation = function (charPos) {
            var pos = [(charPos[0] - this.pos[0]) / 15, (charPos[1] - this.pos[1]) / 15];
            new TweenMax(this, 0.25, { x: this.pos[0] + pos[0], zoom: 1.05, yoyo: true, repeat: 1 });
        };
        Camera.prototype.worldScreenToUI = function (p) {
            p[0] -= main_4.SCR_WIDTH_HALF * (1 - this.zoom);
            p[1] -= main_4.SCR_HEIGHT_HALF * (1 - this.zoom);
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
define("Objects/IO", ["require", "exports", "main", "Objects/O"], function (require, exports, main_5, O_2) {
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
                            main_5._.sound.play(_this.soundName);
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
    }(O_2.O));
    exports.IO = IO;
});
define("Stages/Stage", ["require", "exports", "main"], function (require, exports, main_6) {
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
            main_6._.sm.removeObjects();
            main_6._.sm.main.removeChild(this.container);
        };
        ;
        Stage.prototype.onShow = function () {
            main_6._.sm.main.addChild(this.container);
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
define("ClientSettings", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MAX_SCR_WIDTH = 640;
    exports.MAX_SCR_HEIGHT = 1024;
    exports.DEBUG_EFFECTS = false;
    exports.SKIP_MENU = false; //!DEBUG_EFFECTS;
    exports.MIN_SCR_WIDTH = 1024;
    exports.MIN_SCR_HEIGHT = 768; //config.Client.ScreenHeight;
    exports.CAMERA_DEBUG = true;
    exports.SCR_SCALE = 1.0;
    exports.FRAME_RATE = 60;
    exports.FRAME_DELAY = 1000 / exports.FRAME_RATE;
    exports.DEBUG = false;
});
define("Objects/Aligner", ["require", "exports", "Objects/O", "ClientSettings", "main"], function (require, exports, O_3, ClientSettings_1, main_7) {
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
            if (this.x - this.width / 2 < main_7._.screenCenterOffset[0]) {
                this.crossed[0] = -1;
            }
            if (this.x + this.width / 2 > main_7._.screenCenterOffset[0] + ClientSettings_1.MIN_SCR_WIDTH) {
                this.crossed[0] = 1;
            }
            if (this.y - this.height / 2 < main_7._.screenCenterOffset[1]) {
                this.crossed[1] = -1;
            }
            if (this.y + this.height / 2 > main_7._.screenCenterOffset[1] + ClientSettings_1.MIN_SCR_HEIGHT) {
                this.crossed[1] = 1;
            }
            var objectsUnderAligner = this.collectObjectsUnder(this);
            console.log("Objects under: ", objectsUnderAligner.length);
            var deltaX = main_7._.screenCenterOffset[0] * this.crossed[0];
            var deltaY = main_7._.screenCenterOffset[1] * this.crossed[1];
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
            for (var _i = 0, _a = main_7._.lm.objectsList; _i < _a.length; _i++) {
                var x = _a[_i];
                if (x != o && (x.layer == main_7._.sm.gui || x.layer == main_7._.sm.gui2) && x.intersects(o)) {
                    res.push(x);
                }
            }
            return res;
        };
        return Aligner;
    }(O_3.O));
    exports.Aligner = Aligner;
});
define("Objects/BaseParticleSystem", ["require", "exports", "Objects/O", "main"], function (require, exports, O_4, main_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseParticleSystem = /** @class */ (function (_super) {
        __extends(BaseParticleSystem, _super);
        function BaseParticleSystem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.particles = [];
            _this.doOProcess = true;
            return _this;
        }
        BaseParticleSystem.prototype.add = function (p, gfx) {
            this.particles.push(p);
            this.gfx.addChild(gfx);
            this.processParticle(this.particles.length - 1, main_8._.delta);
            return p;
        };
        BaseParticleSystem.prototype.init = function (props) {
            _super.prototype.init.call(this, props);
            this.width = main_8.SCR_WIDTH;
            this.height = main_8.SCR_HEIGHT;
            this.gfx = new PIXI.particles.ParticleContainer(300, {
                scale: true,
                position: true,
                rotation: true,
                uvs: true,
                tint: true,
                alpha: true,
            });
            this.layer.addChild(this.gfx);
        };
        BaseParticleSystem.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
        };
        BaseParticleSystem.prototype.processParticle = function (i, delta) {
        };
        BaseParticleSystem.prototype.processParticles = function (timeDelta) {
            var len = this.particles.length;
            for (var i = 0; i < len; ++i) {
                var part = this.particles[i];
                part.lifeTime -= timeDelta;
                this.processParticle(i, timeDelta);
                if (part.lifeTime < 0) {
                    this.particles.splice(i, 1);
                    this.gfx.removeChildAt(i);
                    i--;
                    len--;
                }
            }
        };
        BaseParticleSystem.prototype.process = function () {
            if (this.doOProcess)
                _super.prototype.process.call(this);
            this.processParticles(main_8._.deltaSec * main_8._.timeScale);
            //TODO: WEIRD OVERRIDE VISIBLE
            this.gfx.visible = ((Math.abs(this.gfx.x - main_8.SCR_WIDTH_HALF + this.width / 2) <= this.width / 2 + main_8.SCR_WIDTH_HALF) &&
                (Math.abs(this.gfx.y - main_8.SCR_HEIGHT_HALF) <= this.height / 2 + main_8.SCR_HEIGHT_HALF));
        };
        return BaseParticleSystem;
    }(O_4.O));
    exports.BaseParticleSystem = BaseParticleSystem;
});
define("Objects/BlackScreen", ["require", "exports", "Objects/O", "main"], function (require, exports, O_5, main_9) {
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
                this.gfx = main_9._.cs(props.gfx);
                this.gfx.x = main_9.SCR_WIDTH / 2;
                this.gfx.y = main_9.SCR_HEIGHT / 2;
                this.gfx.width = main_9.SCR_WIDTH;
                this.gfx.height = main_9.SCR_HEIGHT;
                this.gfx.alpha = 0.;
                new main_9._.TweenMax(this.gfx, 0.35, { alpha: 0.98 });
            }
            else {
                this.gfx = new PIXI.Graphics();
                this.gfx.clear();
                this.gfx.alpha = 0;
                new main_9._.TweenMax(this.gfx, 0.35, { alpha: 0.8 });
                this.gfx.beginFill(0xfafafa, 1);
                this.gfx.drawRect(0, 0, main_9.SCR_WIDTH, main_9.SCR_HEIGHT);
                this.gfx.endFill();
                //this.gfx.blendMode = PIXI.BLEND_MODES.MULTIPLY;
            }
            this.gfx.interactive = true;
            this.layer.addChild(this.gfx);
        };
        BlackScreen.prototype.process = function () {
        };
        return BlackScreen;
    }(O_5.O));
    exports.BlackScreen = BlackScreen;
});
define("Objects/TextBox", ["require", "exports", "Objects/IO", "main"], function (require, exports, IO_1, main_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by KURWINDALLAS on 11.07.2014.
     */ ///
    var DEFAULT_FONT = 'main-export';
    var TextBox = /** @class */ (function (_super) {
        __extends(TextBox, _super);
        function TextBox() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextBox.hashCode = function (str) {
            var hash = 0;
            for (var i = 0; i < str.length; i++) {
                hash = str.charCodeAt(i) + ((hash << 5) - hash);
            }
            return hash;
        };
        TextBox.convertSpaces = function (a) {
            var c = a.match(/==/g);
            return a.replace(/==/g, '\n');
        };
        TextBox.createTextField = function (obj, props) {
            var fontName;
            if (props.fontName) {
                fontName = props.fontName;
            }
            else {
                fontName = DEFAULT_FONT;
            }
            obj.text = props.text;
            if (obj.text) {
                obj.text = this.convertSpaces(obj.text);
            }
            if (obj.text == undefined)
                obj.text = "";
            var pt = new PIXI.extras.BitmapText(obj.text, { font: fontName });
            pt.fontInitialSize = pt.font.size;
            pt.font.size = pt.fontInitialSize * 0.75;
            if (props.fontscale && props.fontscale != '') {
                pt.font.size = pt.fontInitialSize * parseFloat(props.fontscale);
            }
            pt.y = 0;
            pt.x = 0;
            //pt.bitmap = true;
            pt.scale.x = pt.scale.y;
            if (props.fontTint != "0xffffff" && props.fontTint != undefined)
                pt.tint = parseInt(props.fontTint);
            pt.anchor.x = 0.5;
            return pt;
        };
        TextBox.prototype.process = function () {
            _super.prototype.process.call(this);
        };
        TextBox.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
        };
        TextBox.prototype.init = function (props) {
            this.gfx = new PIXI.Container();
            this.pos[0] -= this.width / 2;
            this.pos[1] -= this.height / 2;
            this.noCameraOffset = true;
            _super.prototype.init.call(this, props);
            this.textField = TextBox.createTextField(this, props);
            this.fontInitialSize = this.textField.maxLineHeight;
            this.gfx.position.x = Math.round(this.gfx.position.x);
            this.gfx.position.y = Math.round(this.gfx.position.y);
            if (props.color && this.gfx) {
                this.textField.tint = parseInt(props.color.replace('#', '0x'));
            }
            this.gfx.addChild(this.textField);
            var gfx = this.layer ? this.layer : main_10._.sm.gui;
            gfx.addChild(this.gfx);
            this.text = this.text;
        };
        return TextBox;
    }(IO_1.IO));
    exports.TextBox = TextBox;
});
define("Objects/Button", ["require", "exports", "Objects/IO", "Objects/TextBox", "main"], function (require, exports, IO_2, TextBox_1, main_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UIEase = CubicBezier.config(0.46, 0.53, 0.93, 0.3);
    var CLICK_STEP = 3;
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.prevGfxTint = 0xffffff;
            _this.prevTextTint = 0xffffff;
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
                    main_11._.TweenMax.killTweensOf(this.gfx.scale);
                    new main_11._.TweenMax(this.gfx.scale, 0.08, { y: this.baseScale[1] + 0.015, ease: UIEase });
                    new main_11._.TweenMax(this.gfx.scale, 0.08, { x: this.baseScale[0] + 0.015, ease: UIEase });
                }
            }
            if (this._customOver)
                this._customOver();
        };
        Button.prototype.outAnimation = function (evt) {
            if (this.hoverMode) {
                if (this.doScale) {
                    new main_11._.TweenMax(this.gfx.scale, 0.15, {
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
                        _this.prevTextTint = _this.textField.tint;
                        _this.prevGfxTint = _this.gfx.tint;
                        _this.gfx.tint = 0x888888;
                        _this.textField.tint = 0x888888;
                    }
                    if (_this.clickAnimation) {
                        _this._upTween = main_11._.killTween(_this._upTween);
                        _this._downTween = new main_11._.TweenMax(_this, 0.1, { y: _this.y + CLICK_STEP, ease: Linear.easeIn });
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
            this._downTween = main_11._.killTween(this._downTween);
            this._upTween = main_11._.killTween(this._upTween);
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
                this.__highlight = main_11._.killTween(this.__highlight);
            this.__highlight = this.setInterval(function () {
                loop += 0.38;
                var angle = 0.5 * (main_11._.fMath.cos(loop) + 1);
                //this.gfx.color.setDark(0.4 * angle, 0.3 * angle, 0.05 * angle);
                //   this.gfx.color.setLight(1,1, 0.4*angle);
            }, 0);
            this.wait(0.12).call(function () {
                // this.gfx.color.setDark(0, 0, 0);
                //  this.gfx.color.setLight(1,1,1);
                _this.__highlight = main_11._.killTween(_this.__highlight);
            }).apply();
        };
        Button.prototype.resetFade = function () {
            if (this.clickAnimation) {
                if (this._downTween) {
                    this._downTween = main_11._.killTween(this._downTween);
                    this._upTween = new main_11._.TweenMax(this, 0.1, { y: this.y - CLICK_STEP, ease: Linear.easeOut });
                }
            }
            if (this.fadeOnMouseDown) {
                this.textField.tint = this.prevTextTint;
                this.gfx.tint = 0xffffff;
            }
        };
        return Button;
    }(IO_2.IO));
    exports.Button = Button;
});
define("Objects/Helper", ["require", "exports", "Objects/O", "main", "Objects/TextBox"], function (require, exports, O_6, main_12, TextBox_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Helper = /** @class */ (function (_super) {
        __extends(Helper, _super);
        function Helper() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Helper.prototype.init = function (props) {
            var _this = this;
            _super.prototype.init.call(this, props);
            this.gfx = new PIXI.Container();
            main_12._.sm.gui2.addChild(this.gfx);
            this.bg = main_12._.cs('barbg.png', this.gfx);
            this.bg.alpha = 0.6;
            this.bg.scale.x = 1.8;
            this.bg.scale.y = 0.6;
            if (main_12._.game.level == 1) {
                this.text1 = TextBox_2.TextBox.createTextField({}, { text: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0438\u0433\u0443\u0440\u044B \u0442\u0430\u043A,\n\u0447\u0442\u043E\u0431\u044B \u0438\u0445 \u043E\u0431\u0449\u0430\u044F \u043F\u043B\u043E\u0449\u0430\u0434\u044C \u0431\u044B\u043B\u0430 \u0440\u0430\u0432\u043D\u0430 " + main_12._.game.limit.toString(), fontscale: 0.5, align: 'center' });
                this.text1.x = 0;
                this.text1.y = -50;
            }
            if (main_12._.game.level == 2) {
                this.text1 = TextBox_2.TextBox.createTextField({}, { text: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0444\u0438\u0433\u0443\u0440\u0443, \u0447\u0442\u043E\u0431\u044B \u0440\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0435\u0435\n\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0443\u043C\u0435\u0441\u0442\u0438\u0442\u044C\u0441\u044F \u0432 " + main_12._.game.limit.toString() + ' клеток', fontscale: 0.5, align: 'center' });
                this.text1.x = 0;
                this.text1.y = -50;
            }
            this.text1.tint = 0x444444;
            this.gfx.addChild(this.text1);
            this.gfx.interactive = true;
            this.gfx.click = this.gfx.tap = function () {
                _this.killNow();
            };
            this.flowTween = new main_12.TweenMax(this.bg.scale, 0.8, { x: this.bg.scale.x * 1.04, y: this.bg.scale.y * 1.04, yoyo: true, repeat: -1 });
        };
        Helper.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            this.flowTween = main_12._.killTween(this.flowTween);
        };
        return Helper;
    }(O_6.O));
    exports.Helper = Helper;
});
define("Socials", ["require", "exports", "main"], function (require, exports, main_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function vkpost(text) {
        function authInfo(response) {
            main_13._.game.submitScore(main_13._.game.score, 'VK:' + response.session.mid, response.session.user.first_name, response.session.user.last_name);
            if (response.session) {
                VK.api('wall.post', {
                    message: text,
                    attachments: [window.VK_PHOTO_LINK]
                }, function (data) {
                    console.log(JSON.stringify(data));
                    if (data.response) {
                    }
                });
            }
            else {
            }
        }
        VK.Auth.login(authInfo);
    }
    exports.vkpost = vkpost;
    function okpost(t) {
        var attachtment = { "media": []
        };
        main_13.$.post("http://www.odnoklassniki.ru/oauth/authorize?client_id=" + OK_APP_ID.toString() + "&response_type=code&redirect_uri=" + encodeURIComponent(APP_ADDRESS)).done(function (data) {
        });
        //    $.get("http://www.odnoklassniki.ru/oauth/authorize?client_id=" + OK_APP_ID.toString() +"&response_type=code&redirect_uri=" + encodeURIComponent(APP_ADDRESS)).done(( data ) => {
        //  });
        //let atStr =encodeURIComponent(JSON.stringify(attachtment));
        //let sign =  CryptoJS.MD5(encodeURIComponent("st.attachment=") + atStr + encodeURIComponent("18DAB712D1473119BC78A7E6"));
        //window.open("http://www.ok.ru/dk?st.cmd=addShare&st.s=1&st._surl=" + window.LINK_GAME +"&st.comments=" + encodeURI(t));
        //        window.open("https://connect.ok.ru/oauth/authorize?client_id=1246674688&scope=VALUABLE_ACCESS;&response_type=token&redirect_uri=http://localhost/");
        /* $.post( "https://connect.ok.ru/oauth/authorize?client_id=1246674688&scope=VALUABLE_ACCESS;&response_type=token", function( data ) {
             console;
         });*/
        /*
                window.open("http://connect.ok.ru/dk?st.cmd=WidgetMediatopicPost&" +
                        "st.app=1246674688&" +
                        "st.attachment=" + atStr +"&" +
                        "st.signature=" + sign + "&" +
                       // "st.return={return_url}&" +
                      //  "st.popup=on&" +
                      //  "st.silent={silent}&" +
                        "st.utext="+ x);
        */
    }
    exports.okpost = okpost;
    function twpost(t, img, imgNo, hash) {
        var x = encodeURI(t);
        var href = "https://twitter.com/intent/tweet?" +
            "url" + APP_ADDRESS +
            "&text=" + x + hash;
        twttr.connect(function (data) {
            console.log(data);
        });
        window.open(href);
    }
    exports.twpost = twpost;
    function fbpost() {
        FB.login(function (response) {
            var accessToken = response.authResponse.accessToken;
            FB.api('/me', 'get', { fields: "name" }, function (x) {
                main_13._.game.submitScore(main_13._.game.score, 'FB:' + x.id, x.name, "");
                FB.ui({ method: 'feed',
                    link: window.LINK_TO_SOCIAL,
                    name: "Level",
                    caption: "",
                    description: "text",
                });
            });
            // Handle the response object, like in statusChangeCallback() in our demo
            // code.
        });
        /*  attachment: {
                         name: 'Name here',
                         caption: 'Caption here.',
                         description: (
                                 'description here'
                         ),
                         href: ''
                     },*/
        /* action_links: [
             { text: 'Code', href: 'action url here' }
         ],*/
        /* FB.ui(
             {  method: 'feed',
                 link: (<any>window).LINK_GAME,
                 picture: img,
                 name: "Игра «Волки и овцы: Бе-е-е-зумное превращение»",
                 caption: "SHEEPANDWOLVES.RU/GAME",
                 description: "Играй в игру, становись участником конкурса и получи шанс выиграть крутую майку от создателей мультфильма «Волки и овцы: Бе-е-е-зумное превращение»",
     
     
             },
     
     
     
             function(response) {
                 function loadScript(url, callback){
     
                     var script = document.createElement("script")
                     script.type = "text/javascript";
     
                     if (script.readyState){  //IE
                         script.onreadystatechange = function(){
                             if (script.readyState == "loaded" ||
                                 script.readyState == "complete"){
                                 script.onreadystatechange = null;
                                 callback();
                             }
                         };
                     } else {  //Others
                         script.onload = function(){
                             ///    callback();
                         };
                     }
     
                     script.src = url;
                     document.getElementsByTagName("head")[0].appendChild(script);
                 }
     
     
     
     
                 if (response && response.post_id) {
                     alert('Post was published.');
                 } else {
                     alert('Post was not published.');
                 }
             }
         );*/
    }
    exports.fbpost = fbpost;
});
define("Stages/Menu", ["require", "exports", "Stages/Stage", "main", "Objects/TextBox"], function (require, exports, Stage_1, main_14, TextBox_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.API_PHP_FILE = window.API_PHP_FILE;
    var Menu = /** @class */ (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Menu.prototype.addLine = function (inx, data) {
            if (main_14._.sm.stage != this)
                return;
            var tbname = new TextBox_3.TextBox([180, 580 + inx * 60]);
            tbname.init({ text: data.name + (data.lastname != "") ? (" " + data.lastname) : "" });
            var tbscore = new TextBox_3.TextBox([570, 580 + inx * 60]);
            tbscore.init({ align: "right", text: data.score.toString() });
        };
        Menu.prototype.getLeaderboard = function () {
            var _this = this;
            main_14.$.post(exports.API_PHP_FILE, { func: "leaderboard" })
                .done(function (data) {
                var d = JSON.parse(data);
                var inx = 0;
                for (var _i = 0, d_1 = d; _i < d_1.length; _i++) {
                    var x = d_1[_i];
                    if (inx > 10)
                        break;
                    _this.addLine(inx, d[inx]);
                    inx++;
                } ///
            });
        };
        Menu.prototype.onShow = function () {
            _super.prototype.onShow.call(this);
            main_14._.lm.load(this, 'menu', null);
            main_14._.sm.findStringId("btnnew").click = function () {
                // vkpost("lalalal");
                main_14._.sm.openStage(main_14._.game);
            };
            if (window.RESULT_MODAL_IN_MENU) {
                main_14._.game.score = 999;
                main_14._.game.ShowResModal();
            }
            this.getLeaderboard();
        };
        return Menu;
    }(Stage_1.Stage));
    exports.Menu = Menu;
});
define("Stages/Game", ["require", "exports", "Stages/Stage", "main", "Objects/O", "Objects/Button", "Objects/Helper", "Socials", "Stages/Menu"], function (require, exports, Stage_2, main_15, O_7, Button_1, Helper_1, Socials_1, Menu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LevelsShapes = [
        [
            {
                ShapeID: 5,
                Quantity: 1,
            },
            {
                ShapeID: 6,
                Quantity: 1,
            }
        ],
        [
            {
                ShapeID: 10,
                Quantity: 1,
            },
            {
                ShapeID: 5,
                Quantity: 1,
            },
            {
                ShapeID: 9,
                Quantity: 1,
            }
        ],
        [
            {
                ShapeID: 10,
                Quantity: 2,
            },
            {
                ShapeID: 12,
                Quantity: 2,
            },
            {
                ShapeID: 9,
                Quantity: 2,
            },
            {
                ShapeID: 5,
                Quantity: 1,
            }
        ]
    ];
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.score = 0;
            _this.secs = 0;
            _this.level = 3;
            _this.limit = 0;
            return _this;
        }
        Game.prototype.submitScore = function (s, social_id, name, last_name) {
            if (s == 0)
                return;
            main_15.$.post(Menu_1.API_PHP_FILE, { func: "submit", score: s.toString(), social_id: social_id, name: name, last_name: last_name })
                .done(function (data) {
            });
        };
        Game.prototype.onShow = function () {
            var _this = this;
            _super.prototype.onShow.call(this);
            main_15._.lm.load(this, 'game', null);
            var btnMenu = main_15._.sm.findStringId("menu");
            btnMenu.click = function () {
                main_15._.sm.openStage(main_15._.menu);
            };
            var btnSubmit = main_15._.sm.findStringId("btnsubmit");
            btnSubmit.textField.tint = 0x111111;
            btnSubmit.prevTextTint = 0x111111;
            var btnReset = main_15._.sm.findStringId("btnreset");
            btnReset.click = function () {
                main_15._.sm.openStage(main_15._.game);
            };
            O_7.O.rp(btnMenu.gfx);
            main_15._.sm.gui2.addChild(btnMenu.gfx);
            O_7.O.rp(btnReset.gfx);
            main_15._.sm.gui2.addChild(btnReset.gfx);
            btnSubmit.click = function () {
                if (_this.level == 3) {
                    main_15._.game.ShowResModal();
                }
                else {
                    _this.level++;
                    main_15._.sm.openStage(main_15._.game);
                }
            };
            var lev = main_15._.sm.findStringId("lev");
            lev.text = this.level.toString();
            this.secs = 0;
            this.updateTime();
            this.timeInterval = main_15._.sm.camera.setInterval(function () {
                _this.secs++;
                _this.updateTime();
            }, 1);
            this.limit = 1000;
            if (this.level == 1) {
                this.limit = 11;
            }
            if (this.level == 2) {
                this.limit = 18;
            }
            if (this.level == 1 || this.level == 2) {
                var helper = new Helper_1.Helper([main_15.SCR_WIDTH / 2, 180]);
                helper.init({});
            }
            this.whiteSpace = new PIXI.Graphics();
            this.whiteSpace.x = 0;
            this.whiteSpace.clear();
            this.whiteSpace.beginFill(0xffffff, 1);
            this.whiteSpace.drawRect(main_15.SCR_WIDTH, 0, 300, main_15.SCR_HEIGHT);
            this.whiteSpace.endFill();
            main_15._.sm.gui.addChild(this.whiteSpace);
            // _.game.ShowResModal();
        };
        Game.prototype.CloseResModal = function () {
            main_15._.sm.removeList(this.resModal);
        };
        Game.prototype.onHide = function (s) {
            this.whiteSpace = O_7.O.rp(this.whiteSpace);
            this.timeInterval = main_15._.killTween(this.timeInterval);
            _super.prototype.onHide.call(this, s);
        };
        Game.prototype.ShowResModal = function () {
            this.timeInterval = main_15._.killTween(this.timeInterval);
            this.resModal = main_15._.lm.load(main_15._.game, 'modal', null);
            var btnClose = main_15._.sm.findStringId("btncancel", this.resModal);
            var win = main_15._.sm.findStringId("scorewin", this.resModal);
            var ending = this.score % 10;
            var xxx = 'клеток';
            if (ending == 1)
                xxx = 'клетку';
            if (ending == 2 || ending == 3 || ending == 4)
                xxx = 'клетки';
            win.text = 'в ' + this.score.toString() + ' ' + xxx;
            var vk = main_15._.sm.findStringId("btnvk", this.resModal);
            var tw = main_15._.sm.findStringId("btntw", this.resModal);
            var ok = main_15._.sm.findStringId("btnok", this.resModal);
            var fb = main_15._.sm.findStringId("btnfb", this.resModal);
            vk.click = function () {
                Socials_1.vkpost("\u0423\u043F\u0430\u043A\u0443\u0439 \u043C\u0435\u043D\u044F, \u0435\u0441\u043B\u0438 \u0441\u043C\u043E\u0436\u0435\u0448\u044C!\n\u042D\u0442\u0430 \u043C\u0430\u0442\u0435\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u0433\u0440\u0430 \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u043A\u0440\u0443\u0447\u0435 2048");
            };
            fb.click = function () {
                Socials_1.fbpost("");
            };
            var g = main_15._.cs("btnton1.png");
            g.scale.x = 1.5;
            g.scale.y = 1.5;
            var btnTON = new Button_1.Button(main_15._.sm.findStringId("btntonpos").pos, g);
            btnTON.init({ text: "N+1", fontscale: 0.7, });
            btnTON.click = function () {
                window.open(window.LINK_TO_SOCIAL);
            };
            O_7.O.rp(btnTON);
            main_15._.sm.gui2.addChild(btnTON.gfx);
        };
        Game.prototype.SetScore = function (x) {
            this.score = x;
            if (x == 0)
                main_15._.sm.findStringId("score").text = '';
            else
                main_15._.sm.findStringId("score").text = this.AddZeroes(x);
        };
        Game.prototype.AddZeroes = function (x) {
            if (x < 10)
                return '00' + x.toString();
            if (x < 100)
                return '0' + x.toString();
            return x.toString();
        };
        Game.prototype.updateTime = function () {
            var mins = Math.floor(this.secs / 60);
            var secs = this.secs % 60;
            var time = main_15._.sm.findStringId("time");
            time.text = mins + ":" + (secs > 10 ? secs.toString() : "0" + secs.toString());
        };
        return Game;
    }(Stage_2.Stage));
    exports.Game = Game;
});
define("Objects/ToolBar", ["require", "exports", "Objects/O", "main", "Objects/Board", "Objects/TextBox", "Stages/Game", "Objects/Helper"], function (require, exports, O_8, main_16, Board_1, TextBox_4, Game_1, Helper_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ShapeList = {};
    exports.ShapeList[1] = {
        id: 1,
        textureName: "shape1.png",
        fields: [[1, 1, 1],
            [0, 0, 1],
            [0, 0, 1]]
    };
    exports.ShapeList[2] = {
        id: 2,
        textureName: "shape2.png",
        fields: [[1, 1, 1],
            [0, 1, 0],
            [0, 1, 0]]
    };
    exports.ShapeList[3] = {
        id: 3,
        textureName: "shape3.png",
        fields: [[1, 1, 1],
            [0, 0, 1],
            [0, 0, 1]]
    };
    exports.ShapeList[4] = {
        id: 4,
        textureName: "shape4.png",
        fields: [[1, 0],
            [1, 0],
            [1, 0],
            [1, 1]]
    };
    exports.ShapeList[5] = {
        id: 5,
        textureName: "shape5.png",
        fields: [[1, 1, 0],
            [0, 1, 1],
            [0, 0, 1]]
    };
    exports.ShapeList[6] = {
        id: 6,
        textureName: "shape6.png",
        fields: [[1, 1, 0],
            [1, 1, 1]]
    };
    exports.ShapeList[7] = {
        id: 7,
        textureName: "shape7.png",
        fields: [[1, 1, 1, 1, 1]]
    };
    exports.ShapeList[8] = {
        id: 8,
        textureName: "shape8.png",
        fields: [[0, 1, 0],
            [1, 1, 1],
            [0, 1, 0]]
    };
    exports.ShapeList[9] = {
        id: 9,
        textureName: "shape9.png",
        fields: [[1, 1, 0, 0],
            [0, 1, 1, 1],]
    };
    exports.ShapeList[10] = {
        id: 10,
        textureName: "shape10.png",
        fields: [[0, 1, 1],
            [1, 1, 0],
            [0, 1, 0],]
    };
    exports.ShapeList[11] = {
        id: 11,
        textureName: "shape11.png",
        fields: [[1, 1, 1, 1],
            [0, 1, 0, 0],]
    };
    exports.ShapeList[12] = {
        id: 12,
        textureName: "shape12.png",
        fields: [
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 1],
        ]
    };
    var ToolBar = /** @class */ (function (_super) {
        __extends(ToolBar, _super);
        function ToolBar(pos, gfx) {
            return _super.call(this, pos, gfx) || this;
        }
        ToolBar.prototype.check = function () {
            throw new Error("Method not implemented.");
        };
        ToolBar.prototype.init = function (props) {
            var _this = this;
            var prev = this.gfx;
            var p = this.gfx.parent;
            var inx = p.getChildIndex(prev);
            O_8.O.rp(prev);
            this.gfx = new PIXI.Container();
            this.gfx.addChild(prev);
            p.addChildAt(this.gfx, inx);
            this.itemWidth = (prev.width - 200) / 3;
            _super.prototype.init.call(this, props);
            this.toolsContainer = new PIXI.Container();
            this.toolsContainer.x = -this.gfx.width / 2;
            this.gfx.addChild(this.toolsContainer);
            var btnSubmit = main_16._.sm.findStringId("btnsubmit");
            btnSubmit.alwaysVisible = true;
            btnSubmit.gfx.visible = false;
            var level = main_16._.game.level;
            var levshapes = Game_1.LevelsShapes[level - 1];
            var shapes = [];
            for (var _i = 0, levshapes_1 = levshapes; _i < levshapes_1.length; _i++) {
                var x = levshapes_1[_i];
                shapes.push({
                    Gfx: null,
                    Text: null,
                    Shape: exports.ShapeList[x.ShapeID],
                    Amount: x.Quantity,
                    Rotation: 0,
                });
            }
            this.setTools(shapes);
            var btnNext = main_16._.sm.findStringId("next");
            var btnPrev = main_16._.sm.findStringId("prev");
            if (shapes.length <= 3) {
                btnNext.gfx.visible = false;
                btnPrev.gfx.visible = false;
            }
            this.page = 0;
            btnNext.click = function () {
                if (_this.page == 1) {
                    return;
                }
                _this.tween = main_16._.killTween(_this.tween);
                _this.page++;
                _this.tween = new main_16.TweenMax(_this, 0.3, { x: _this.x - main_16.SCR_WIDTH, ease: main_16.Quad.easeOut });
            };
            btnPrev.click = function () {
                if (_this.page == 0) {
                    return;
                }
                _this.tween = main_16._.killTween(_this.tween);
                _this.page--;
                _this.tween = new main_16.TweenMax(_this, 0.3, { x: _this.x + main_16.SCR_WIDTH, ease: main_16.Quad.easeOut });
            };
        };
        ToolBar.prototype.alighShapes = function () {
            var inx = 0;
            for (var _i = 0, _a = this.tools; _i < _a.length; _i++) {
                var x = _a[_i];
                var pos = 180 + Math.floor(inx / 3) * 130 + inx * this.itemWidth;
                if (x.Gfx) {
                    x.Gfx.x = pos;
                    x.Text.x = pos;
                    x.Text.y = 50;
                }
                inx++;
            }
        };
        ToolBar.prototype.setTools = function (t) {
            this.tools = t;
            this.updateList();
        };
        ToolBar.prototype.dropShape = function (shape) {
        };
        ToolBar.prototype.takeShape = function (shape) {
        };
        ToolBar.ResetListeners = function (gfx) {
            gfx.touchstart = null;
            gfx.mousedown = null;
            gfx.touchend = gfx.touchendoutside = null;
            gfx.mouseup = gfx.mouseupoutside = null;
            gfx.mousemove = null;
            gfx.touchmove = null;
        };
        ToolBar.prototype.updateList = function () {
            var _this = this;
            var board = (main_16._.sm.findStringId("board"));
            for (var _i = 0, _a = this.tools; _i < _a.length; _i++) {
                var x = _a[_i];
                (function (x) {
                    if (!x.Gfx) {
                        x.Gfx = main_16._.cs(x.Shape.textureName, _this.toolsContainer);
                        x.Gfx.rotation = x.Rotation;
                        var gfx_1 = x.Gfx;
                        var md = function (e) {
                            if (board.draggin && board.draggin.Gfx == gfx_1)
                                return;
                            _this.downPos = { x: e.data.global.x * main_16._.appScale, y: e.data.global.y * main_16._.appScale };
                            board.draggin = { Rotation: x.Rotation, InsideBoard: false, ShapeAmount: x, Shape: x.Shape, StartX: -1, StartY: -1, Gfx: gfx_1 };
                            if (x.Gfx) {
                                x.Gfx = null;
                                x.Amount--;
                            }
                            O_8.O.rp(gfx_1);
                            main_16._.sm.gui.addChild(gfx_1);
                            _this.updateList();
                            board.align(board.draggin, e);
                            if (e.stopPropegation)
                                e.stopPropegation();
                        };
                        gfx_1.touchstart = md;
                        gfx_1.mousedown = md;
                        var mm = function (e) {
                            if (board.doRemove) {
                                return;
                            }
                            if (board.draggin && board.draggin.Gfx == gfx_1) {
                                board.align(board.draggin, e);
                            }
                            //  board.draggin.draggin = true;
                            if (e.stopPropegation)
                                e.stopPropegation();
                        };
                        gfx_1.mousemove = mm;
                        gfx_1.touchmove = mm;
                        var mu = function (e) {
                            if (!board.draggin)
                                return;
                            //  board.draggin.draggin = false;
                            if (Math.sqrt((_this.downPos.x - e.data.global.x * main_16._.appScale) * (_this.downPos.x - e.data.global.x * main_16._.appScale) +
                                (_this.downPos.y - e.data.global.y * main_16._.appScale) * (_this.downPos.y - e.data.global.y * main_16._.appScale)) < 30) {
                                x.Rotation += Math.PI / 2;
                                if (x.Gfx)
                                    x.Gfx.rotation = x.Rotation;
                            }
                            if (board.tryToPut(board.draggin) == true) {
                            }
                            else {
                                _this.returnShape(board.draggin);
                            }
                            board.draggin = null;
                            _this.checkSubmit();
                            if (e.stopPropegation)
                                e.stopPropegation();
                        };
                        gfx_1.touchend = gfx_1.touchendoutside = mu;
                        gfx_1.mouseup = gfx_1.mouseupoutside = mu;
                    }
                    x.Gfx.scale.set(board.gfx.scale.x);
                    if (x.Amount > 0) {
                        x.Gfx.interactive = true;
                        x.Gfx.alpha = 1;
                        x.Gfx.tint = 0xffffff;
                    }
                    else {
                        x.Gfx.interactive = false;
                        x.Gfx.alpha = 0.5;
                        x.Gfx.tint = 0x555555;
                    }
                    if (!x.Text)
                        x.Text = TextBox_4.TextBox.createTextField({}, { fontscale: 1, text: "", align: "center" });
                    x.Text.tint = 0x020202;
                    x.Text.text = x.Amount.toString();
                    _this.toolsContainer.addChild(x.Text);
                })(x);
            }
            this.checkSubmit();
            this.alighShapes();
        };
        ToolBar.prototype.checkSubmit = function () {
            var allZeroes = true;
            for (var _i = 0, _a = this.tools; _i < _a.length; _i++) {
                var x = _a[_i];
                if (x.Amount > 0) {
                    allZeroes = false;
                }
            }
            var board = main_16._.sm.findByType(Board_1.Board)[0];
            var btnSubmit = main_16._.sm.findStringId("btnsubmit");
            console.log("Zeroes ", allZeroes, " drag ", board.draggin);
            if (allZeroes && !board.draggin && main_16._.game.score <= main_16._.game.limit) {
                if (this.tweenComplete) {
                    this.tweenComplete = main_16._.killTween(this.tweenComplete);
                }
                this.tweenComplete = new main_16.TweenMax(btnSubmit.gfx.scale, 0.18, { x: btnSubmit.gfx.scale.x * 1.07, y: btnSubmit.gfx.scale.y * 1.07, yoyo: true, repeat: 3 });
                main_16._.sm.removeList(main_16._.sm.findByType(Helper_2.Helper));
                btnSubmit.gfx.visible = true;
            }
            else {
                btnSubmit.gfx.visible = false;
            }
        };
        ToolBar.prototype.returnShape = function (draggin) {
            O_8.O.rp(draggin.Gfx);
            draggin.ShapeAmount.Amount++;
            this.updateList();
        };
        return ToolBar;
    }(O_8.O));
    exports.ToolBar = ToolBar;
});
define("Objects/Board", ["require", "exports", "Objects/O", "Objects/ToolBar", "main", "Math"], function (require, exports, O_9, ToolBar_1, main_17, Math_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Board = /** @class */ (function (_super) {
        __extends(Board, _super);
        function Board(p, g) {
            var _this = _super.call(this, p, g) || this;
            _this.offsetX = 0;
            _this.offsetY = 0;
            _this.cellsx = 12;
            _this.cellsy = 10;
            _this.cellSize = 100;
            _this.shapesOnBoard = [];
            _this.fields = [];
            _this.gfx = new PIXI.Container();
            main_17._.sm.gui.addChild(_this.gfx);
            return _this;
        }
        Board.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            for (var _i = 0, _a = this.shapesOnBoard; _i < _a.length; _i++) {
                var x = _a[_i];
                ToolBar_1.ToolBar.ResetListeners(x.Gfx);
                O_9.O.rp(x.Gfx);
            }
        };
        Board.prototype.getRotatedShape = function (shape, rotation) {
            var f = shape.fields;
            var c = Math.cos(rotation);
            var s = Math.sin(rotation);
            var rotateClockWise = function (f) {
                var maxwh = Math.max(f.length, f[0].length);
                var newf = new Array(maxwh);
                for (var i = 0; i < newf.length; i++) {
                    newf[i] = new Array(maxwh);
                }
                for (var y = 0; y < f[0].length; y++) {
                    for (var x = 0; x < f.length; x++) {
                        var newx = y;
                        var newy = (maxwh - 1) - x;
                        newf[newx][newy] = f[x][y];
                    }
                }
                return newf;
            };
            var a = 0;
            while (c != Math.cos(a) || s != Math.sin(a)) {
                a += Math.PI / 2;
                f = rotateClockWise(f);
            }
            while (true) {
                var res = this.removeEmptyRowsCols(f);
                if (res) {
                    f = res;
                }
                else {
                    break;
                }
            }
            return { fields: f, id: shape.id,
                textureName: shape.textureName };
        };
        Board.prototype.init = function (props) {
            _super.prototype.init.call(this, props);
            for (var x = 0; x < this.cellsy; x++) {
                this.fields[x] = [];
                for (var y = 0; y < this.cellsx; y++) {
                    this.fields[x].push(0);
                }
            }
            this.graphics = new PIXI.Graphics();
            this.gfx.addChild(this.graphics);
            this.graphics.x = this.offsetX;
            this.graphics.y = this.offsetY;
            this.gfx.anchor.x = 0;
            this.x -= this.gfx.width / 2;
            this.gfx.anchor.y = 0;
            this.y -= this.gfx.height / 2;
            this.graphics.alpha = 0.5;
            new main_17._.TweenMax(this.graphics, 1.4, { yoyo: true, repeat: -1, alpha: 0.3, ease: main_17.Linear.easeNone });
        };
        Board.prototype.tryToPut = function (draggin) {
            if (this.canPutHere(draggin.StartX, draggin.StartY, draggin.Shape, draggin.Rotation)) {
                this.SetDragHandlers(draggin);
                this.shapesOnBoard.push(draggin);
                this.putShapeInField(draggin.StartX, draggin.StartY, draggin.Shape, draggin.Rotation);
                draggin.InsideBoard = true;
                this.updateSquare();
                main_17._.sm.findByType(ToolBar_1.ToolBar)[0].checkSubmit();
                return true;
            }
            else {
                main_17._.sm.findByType(ToolBar_1.ToolBar)[0].checkSubmit();
                return false;
            }
        };
        Board.prototype.pullShape = function (s) {
            console.log("Pulling shape, ", s.StartX, '  ', s.StartY);
            s.InsideBoard = false;
            this.pullShapeFromField(s.StartX, s.StartY, s.Shape, s.Rotation);
            this.updateSquare();
            return true;
        };
        Board.prototype.align = function (draggin, e) {
            var loc = this.gfx.toLocal(new PIXI.Point(e.data.global.x / main_17._.appScale, e.data.global.y / main_17._.appScale), main_17._.sm.gui);
            var cx = this.cellSize;
            loc.x = Math.floor((loc.x) / cx) * (cx);
            loc.y = Math.floor((loc.y) / cx) * (cx);
            var v = [draggin.Gfx.width / 2, draggin.Gfx.height / 2];
            var x = Math_3.m.rv2(v, draggin.Gfx.rotation);
            var dragstartx = Math.round((loc.x - Math.abs(x[0])) / cx);
            var dragstarty = Math.round((loc.y - Math.abs(x[1])) / cx);
            console.log(dragstartx, "    ", dragstarty);
            draggin.StartX = dragstartx;
            draggin.StartY = dragstarty;
            this.UpdateGFXPos(draggin.Gfx, dragstartx, dragstarty);
        };
        Board.prototype.putShapeInField = function (dragstartx, dragstarty, Shape, rot) {
            var s = this.getRotatedShape(Shape, rot);
            console.log("Put shape, ", dragstartx, '  ', dragstarty);
            for (var i = 0; i < s.fields.length; i++) {
                for (var j = 0; j < s.fields[i].length; j++) {
                    if (s.fields[i][j] > 0)
                        this.fields[i + dragstarty][j + dragstartx] = 1;
                }
            }
        };
        Board.prototype.pullShapeFromField = function (dragstartx, dragstarty, Shape, rot) {
            var s = this.getRotatedShape(Shape, rot);
            for (var i = 0; i < s.fields.length; i++) {
                for (var j = 0; j < s.fields[i].length; j++) {
                    if (s.fields[i][j] > 0)
                        this.fields[i + dragstarty][j + dragstartx] = 0;
                }
            }
        };
        Board.prototype.cross = function (p, q, r) {
            var val = (q.y - p.y) * (r.x - q.x) -
                (q.x - p.x) * (r.y - q.y);
            if (val == 0)
                return 0; // colinear
            return (val > 0) ? 1 : 2; // clock or counterclock wise
        };
        Board.prototype.updateSquare = function () {
            main_17._.game.SetScore(0);
            this.graphics.clear();
            var pointsMap = {};
            var points = [];
            for (var x = 0; x < this.cellsy; x++) {
                for (var y = 0; y < this.cellsx; y++) {
                    if (this.fields[x][y] == 1) {
                        for (var i = 0; i < 2; i++) {
                            for (var j = 0; j < 2; j++) {
                                if (!pointsMap[(x + i).toString() + ';' + (y + j).toString()]) {
                                    var p_1 = { x: x + i, y: y + j };
                                    points.push(p_1);
                                    pointsMap[p_1.x.toString() + ';' + p_1.y.toString()] = true;
                                }
                            }
                        }
                    }
                }
            }
            if (points.length == 0)
                return;
            //console.log(points);
            var minPointInx = 0;
            var minPoint = points[0];
            var minInx = 0;
            for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
                var x = points_1[_i];
                if (x.x < minPoint.x || (x.x == minPoint.x && minPoint.y > x.y)) {
                    minPoint = x;
                    minPointInx = minInx;
                }
                minInx++;
            }
            var result = []; //[minPoint];
            //let inx = points.indexOf(minPoint);
            //points.splice(inx, 1);
            //points.push(minPoint);
            var p = minPointInx;
            var n = points.length;
            while (true) {
                result.push(points[p]);
                var q = (p + 1) % n;
                for (var i = 0; i < n; i++) {
                    // If i is more counterclockwise than current q, then
                    // update q
                    if (this.cross(points[p], points[i], points[q]) == 2)
                        q = i;
                }
                p = q;
                if (p == minPointInx) {
                    break;
                }
            }
            this.redrawConvexHull(result);
            var area = 0;
            result.push(result[0]);
            //if (result.length % 2 != 0) {
            result.push(result[1]);
            //     }
            for (var i = 1; i < result.length - 1; i++)
                area += result[i].x * (result[i + 1].y - result[i - 1].y);
            area /= 2;
            main_17._.game.SetScore((Math.round(area)));
            console.log('Area ', area);
        };
        Board.prototype.dist2 = function (p, a) {
            return (p.x - a.x) * (p.x - a.x) + (p.y - a.y) * (p.y - a.y);
        };
        Board.prototype.redrawConvexHull = function (result) {
            this.graphics.clear();
            this.graphics.beginFill(0x222222, 0.3);
            var points = [];
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var x = result_1[_i];
                points.push(new PIXI.Point(x.y * this.cellSize, x.x * this.cellSize));
            }
            this.graphics.drawPolygon(points);
            this.graphics.endFill();
        };
        Board.prototype.SetDragHandlers = function (draggin) {
            var _this = this;
            draggin.Gfx.mousedown = draggin.Gfx.touchstart = function (e) {
                if (_this.draggin) {
                    _this.draggin.Gfx.mouseup(e);
                }
                _this.startDrag = (new Date()).getTime();
                if (draggin.InsideBoard) {
                    _this.pullShape(draggin);
                }
                _this.draggin = draggin;
                draggin.Gfx.position.x = main_17._.cursorPos.x;
                draggin.Gfx.position.y = main_17._.cursorPos.y;
                _this.align(_this.draggin, e);
                main_17._.sm.findByType(ToolBar_1.ToolBar)[0].checkSubmit();
            };
            draggin.Gfx.mousemove = draggin.Gfx.touchmove = function (e) {
                if (_this.draggin)
                    _this.align(_this.draggin, e);
            };
            draggin.Gfx.mouseup = draggin.Gfx.mouseupoutside = draggin.Gfx.touchend = draggin.Gfx.touchendoutside = function (e) {
                if (_this.draggin) {
                    if ((new Date()).getTime() - _this.startDrag < 320) {
                        var oldRot = _this.draggin.Rotation;
                        _this.draggin.Rotation += Math.PI / 2;
                        if (_this.draggin.Gfx)
                            _this.draggin.Gfx.rotation = _this.draggin.Rotation;
                        _this.UpdateGFXPos(draggin.Gfx, _this.draggin.StartX, _this.draggin.StartY);
                        if (_this.findRotPlaceFor(_this.draggin)) {
                        }
                        else {
                            _this.draggin.Rotation = oldRot;
                            if (_this.draggin.Gfx)
                                _this.draggin.Gfx.rotation = _this.draggin.Rotation;
                        }
                        _this.UpdateGFXPos(draggin.Gfx, _this.draggin.StartX, _this.draggin.StartY);
                    }
                    //this.UpdateGFXPos(draggin.Gfx, this.draggin.StartX, this.draggin.StartY);
                    if (_this.tryToPut(_this.draggin) == false) {
                        var toolbar_1 = main_17._.sm.findByType(ToolBar_1.ToolBar)[0];
                        toolbar_1.returnShape(_this.draggin);
                    }
                    //this.align(this.draggin, e);
                    _this.draggin = null;
                }
                main_17._.sm.findByType(ToolBar_1.ToolBar)[0].checkSubmit();
            };
        };
        Board.prototype.canPutHere = function (dragstartx, dragstarty, Shape, rotation) {
            var s = this.getRotatedShape(Shape, rotation);
            for (var i = 0; i < s.fields.length; i++) {
                for (var j = 0; j < s.fields[i].length; j++) {
                    if (s.fields[i][j] > 0) {
                        var dx = i + dragstarty;
                        if (dx < 0 || dx >= this.fields.length)
                            return false;
                        var dy = j + dragstartx;
                        if (dy < 0 || dy >= this.fields[dx].length)
                            return false;
                        if (this.fields[dx][dy] > 0)
                            return false;
                    }
                }
            }
            return true;
        };
        Board.prototype.removeEmptyRowsCols = function (f) {
            var isEmptyRow = true;
            for (var y = 0; y < f[0].length; y++) {
                if (f[0][y] != undefined) {
                    isEmptyRow = false;
                }
            }
            if (isEmptyRow) {
                f.splice(0, 1);
            }
            var isEmptyCol = true;
            for (var x = 0; x < f.length; x++) {
                if (f[x][0] != undefined) {
                    isEmptyCol = false;
                }
            }
            if (isEmptyCol) {
                for (var x = 0; x < f.length; x++) {
                    f[x].splice(0, 1);
                }
            }
            if (isEmptyCol || isEmptyRow)
                return f;
            else {
                return null;
            }
        };
        Board.prototype.findRotPlaceFor = function (draggin) {
            var _this = this;
            var defaultx = draggin.StartX;
            var defaulty = draggin.StartY;
            var depth = 0;
            var BestDepth = 20;
            var BestResX = null;
            var BestResY = null;
            var recursiveCheck = function (defX, defY, depth) {
                if (depth > 8 || defX < 0 || defY < 0 || defX > _this.fields.length || defY > _this.fields[0].length)
                    return;
                if (_this.canPutHere(defX, defY, draggin.Shape, draggin.Rotation)) {
                    if (BestDepth > depth) {
                        BestDepth = depth;
                        BestResX = defX;
                        BestResY = defY;
                    }
                    console.log("true!!!!!");
                    return true;
                }
                if (depth + 1 > BestDepth)
                    return;
                recursiveCheck(defX - 1, defY, depth + 1);
                recursiveCheck(defX + 1, defY, depth + 1);
                recursiveCheck(defX, defY - 1, depth + 1);
                recursiveCheck(defX, defY + 1, depth + 1);
            };
            recursiveCheck(draggin.StartX, draggin.StartY, 0);
            if (BestResX != null) {
                draggin.StartX = BestResX;
                draggin.StartY = BestResY;
                return true;
            }
            else {
                draggin.StartX = defaultx;
                draggin.StartY = defaulty;
                return false;
            }
        };
        Board.prototype.UpdateGFXPos = function (Gfx, dragstartx, dragstarty) {
            var v = [Gfx.width / 2, Gfx.height / 2];
            var x = Math_3.m.rv2(v, Gfx.rotation);
            var cx = this.cellSize;
            var b = Gfx.getBounds();
            Gfx.position.x = this.gfx.x + cx * this.gfx.scale.x * (dragstartx) + Math.abs(x[0]);
            Gfx.position.y = this.gfx.y + cx * this.gfx.scale.y * (dragstarty) + Math.abs(x[1]);
        };
        return Board;
    }(O_9.O));
    exports.Board = Board;
});
define("Objects/ParticleSystem", ["require", "exports", "Math", "main", "Objects/BaseParticleSystem"], function (require, exports, Math_4, main_18, BaseParticleSystem_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ParticleSystem = /** @class */ (function (_super) {
        __extends(ParticleSystem, _super);
        function ParticleSystem() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.includeWind = false;
            _this.partScale = [1, 1];
            return _this;
        }
        ParticleSystem.prototype.addParticle = function (x, y) {
            var s = "part1";
            if (Math.random() > 0.5) {
                s = "part2";
            }
            var p = main_18._.cm(s);
            p.x = x - this.pos[0];
            p.y = y - this.pos[1];
            //TODO: SLOW PART
            var baseScaleX = 0.3 + Math.random() * 0.8;
            var baseScaleY = 0.3 + Math.random() * 0.8;
            p.scale.x = baseScaleX;
            p.scale.y = baseScaleY;
            var po = {
                alpha: 1,
                av: 0,
                baseScaleX: baseScaleX,
                baseScaleY: baseScaleY,
                v: [0, 0],
                lifeTime: 20 + 22 * Math.random(),
                x: p.x,
                y: p.y,
                angle: Math.random() * Math.PI * 2,
                mass: Math.random() * 2 + 5
            };
            _super.prototype.add.call(this, po, p);
            return po;
        };
        ParticleSystem.prototype.init = function (props) {
            var _this = this;
            this.pos[0] -= main_18._.screenCenterOffset[0];
            this.pos[1] -= main_18._.screenCenterOffset[1];
            _super.prototype.init.call(this, props);
            this.gfx.width = main_18.SCR_WIDTH;
            this.gfx.height = main_18.SCR_HEIGHT;
            this.wind = [0, 0];
            var addPart = function (fixy) {
                if (fixy === void 0) { fixy = 0; }
                _this.addParticle(_this.pos[0] + Math.random() * main_18.SCR_WIDTH, _this.pos[1] + main_18._.screenCenterOffset[1] + 50 + fixy);
            };
            this.setInterval(function () {
                addPart();
            }, 0.8);
            for (var x = 0; x < 50; x++) {
                addPart(Math.random() * 700);
            }
            this.includeWind = true;
            for (var x = 0; x < 30; x++) {
                this.processParticles(0.5);
            }
        };
        ParticleSystem.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
        };
        ParticleSystem.prototype.explode = function (p) {
            var sqdist = 450 * 450;
            for (var _i = 0, _a = this.particles; _i < _a.length; _i++) {
                var x = _a[_i];
                var part = x;
                var worldx = this.pos[0] + x.x - main_18.SCR_WIDTH / 2;
                var worldy = this.pos[1] + x.y - main_18.SCR_HEIGHT / 2;
                var sqd = ((p[0] - worldx) * (p[0] - worldx) +
                    (p[1] - worldy) * (p[1] - worldy));
                if (sqd < sqdist) {
                    var d = Math.sqrt(sqd);
                    var dx = (p[0] - worldx) / d;
                    var dy = (p[1] - worldy) / d;
                    var power = 0 + 2000 / (d + 100);
                    part.v[0] -= power * dx;
                    part.v[1] -= power * dy;
                }
            }
        };
        ParticleSystem.prototype.processParticle = function (i, delta) {
            var p = this.gfx.children[i];
            var pobj = this.particles[i];
            pobj.y += 0.15;
            var v = Math_4.m.rv2(this.wind, pobj.angle);
            pobj.av = pobj.av * 0.8 + 0.2 * ((Math.random() + 1) / 100);
            pobj.angle += pobj.av;
            //TODO: slow place
            var dx = main_18._.fMath.cos(pobj.angle);
            var dy = main_18._.fMath.sin(pobj.angle);
            pobj.alpha = (dy + 1) * 0.5;
            if (dy > 0.2 && dy < 0.35) {
                p.gotoAndStop(2);
            }
            else if (dy > 0 && dy < 0.5) {
                p.gotoAndStop(1);
            }
            else
                p.gotoAndStop(0);
            if (p.lifeTime < 0.5) {
                pobj.alpha = pobj.lifeTime / 0.5;
            }
            p.alpha = pobj.alpha;
            p.scale.x = pobj.baseScaleX * (1 + dx * 0.3) * this.partScale[0];
            p.scale.y = pobj.baseScaleY * (1 + dy * 0.3) * this.partScale[1];
            pobj.v[0] = pobj.v[0] * 0.8 + v[0] * 0.2;
            pobj.v[1] = pobj.v[1] * 0.8 + v[1] * 0.2;
            pobj.x += (pobj.v[0] / pobj.mass) * delta;
            pobj.y += (pobj.v[1] / pobj.mass) * delta;
            p.x = pobj.x; // - (_.sm.camera.offset[0]);
            p.y = pobj.y; // - (_.sm.camera.offset[1]);
            pobj.y += (main_18.SCR_HEIGHT - p.y) / 10000;
            this.alwaysVisible = true;
        };
        ParticleSystem.prototype.process = function () {
            this.wind[0] = main_18._.fMath.cos(main_18._.time / 4000) * 60.8;
            this.wind[1] = main_18._.fMath.sin(main_18._.time / 4000) * 15.8;
            _super.prototype.process.call(this);
        };
        return ParticleSystem;
    }(BaseParticleSystem_1.BaseParticleSystem));
    exports.ParticleSystem = ParticleSystem;
});
define("ObjectsList", ["require", "exports", "Objects/Aligner", "Objects/BaseParticleSystem", "Objects/BlackScreen", "Objects/Board", "Objects/Button", "Objects/Camera", "Objects/IO", "Objects/O", "Objects/ParticleSystem", "Objects/TextBox", "Objects/ToolBar"], function (require, exports, Aligner_1, BaseParticleSystem_2, BlackScreen_1, Board_2, Button_2, Camera_1, IO_3, O_10, ParticleSystem_1, TextBox_5, ToolBar_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ObjectNames = {
        Aligner: Aligner_1.Aligner,
        BaseParticleSystem: BaseParticleSystem_2.BaseParticleSystem,
        BlackScreen: BlackScreen_1.BlackScreen,
        Board: Board_2.Board,
        Button: Button_2.Button,
        Camera: Camera_1.Camera,
        IO: IO_3.IO,
        O: O_10.O,
        ParticleSystem: ParticleSystem_1.ParticleSystem,
        TextBox: TextBox_5.TextBox,
        ToolBar: ToolBar_2.ToolBar,
    };
    exports.LevelNames = [
        "levels/game.tmx",
        "levels/helplevel1.tmx",
        "levels/menu.tmx",
        "levels/modal.tmx",
        "levels/npgame.tsx",
    ];
});
define("lm", ["require", "exports", "Objects/O", "main", "Math", "ObjectsList"], function (require, exports, O_11, main_19, Math_5, ObjectsList_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FLIPPED_HORIZONTALLY_FLAG = 0x80000000;
    var FLIPPED_VERTICALLY_FLAG = 0x40000000;
    var FLIPPED_DIAGONALLY_FLAG = 0x20000000;
    for (var x in ObjectsList_1.ObjectNames) {
        ObjectsList_1.ObjectNames[x.toLowerCase()] = ObjectsList_1.ObjectNames[x];
    }
    var Frame = /** @class */ (function () {
        function Frame(src) {
            this.hotspot = [0, 0];
            this.src = src;
        }
        return Frame;
    }());
    var ImageTile = /** @class */ (function () {
        function ImageTile() {
        }
        return ImageTile;
    }());
    var BigTileset = /** @class */ (function () {
        function BigTileset() {
        }
        return BigTileset;
    }());
    var LM = /** @class */ (function () {
        function LM() {
            this.loading = false;
            this.levels = {};
            this.tilesets = {};
        }
        LM.prototype.add = function (name, data) {
            this.levels[name] = data;
        };
        LM.extractShortSrc = function (src) {
            src = src.substring(src.lastIndexOf("\\") + 1);
            return src;
        };
        LM.XMLtoJSON = function (x) {
            if (!x)
                return {};
            var o = {};
            for (var _i = 0, _a = x.children; _i < _a.length; _i++) {
                var c = _a[_i];
                o[c.tagName] = c.textContent;
            }
            return o;
        };
        LM.addGfxToWorld = function (stage, layerName) {
            if (layerName == 'gui')
                return main_19._.sm.gui;
            if (layerName == 'gui2')
                return main_19._.sm.gui2;
            if (layerName == 'olgui')
                return main_19._.sm.olgui;
            return stage.layers[layerName.toLowerCase()];
        };
        LM.val = function (obj, tag) {
            var el = obj.getElementsByTagName(tag);
            if (!el.length)
                return;
            return el[0].textContent;
        };
        LM.prototype.loadToContainer = function (stage, name, cb, noCameraOffset, offs) {
            if (noCameraOffset === void 0) { noCameraOffset = false; }
            if (offs === void 0) { offs = null; }
            var c = new PIXI.Container();
            var a = this.load(stage, name, cb, noCameraOffset, offs);
            for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
                var x = a_1[_i];
                if (x.gfx) {
                    O_11.O.rp(x.gfx);
                    c.addChild(x.gfx);
                }
            }
            return { list: a, container: c };
        };
        LM.prototype.shouldAppear = function (c) {
            var properties = c.getElementsByTagName('properties')[0];
            if (properties) {
                var propertyArray = properties.getElementsByTagName('property');
                for (var _i = 0, propertyArray_1 = propertyArray; _i < propertyArray_1.length; _i++) {
                    var p = propertyArray_1[_i];
                    if (p.attributes.name.value.toLowerCase() == 'appear') {
                        var prob = parseFloat(p.attributes.value.value);
                        if (Math.random() * 100 > prob)
                            return false;
                    }
                }
            }
            return true;
        };
        LM.prototype.load = function (stage, name, cb, noCameraOffset, offs, restrictGroup, addObjects, doInit) {
            var _this = this;
            if (noCameraOffset === void 0) { noCameraOffset = false; }
            if (offs === void 0) { offs = null; }
            if (restrictGroup === void 0) { restrictGroup = null; }
            if (addObjects === void 0) { addObjects = true; }
            if (doInit === void 0) { doInit = true; }
            this.loading = true;
            var data = this.levels[name];
            if (!data) {
                console.log('No such level as ' + name);
                return;
            }
            var bigtilesets = [];
            var images = {};
            var map = this.levels[name].getElementsByTagName("map")[0];
            var tw = parseFloat(map.attributes['tilewidth'].value);
            var th = parseFloat(map.attributes['tileheight'].value);
            var objectsList = [];
            var globalProperties = this.getProps(map);
            var tilesets = map.getElementsByTagName("tileset");
            for (var _i = 0, tilesets_1 = tilesets; _i < tilesets_1.length; _i++) {
                var t = tilesets_1[_i];
                var firstgid = t.attributes['firstgid'] ? t.attributes['firstgid'].value : 0;
                if (t.attributes['source']) {
                    var source = t.attributes['source'].value;
                    var sourceNoExt = source.substring(0, source.length - 4);
                    t = this.tilesets[sourceNoExt].children[0];
                }
                var tilecount = t.attributes['tilecount'].value;
                var columns = t.attributes['columns'].value;
                var tiles = t.getElementsByTagName('tile');
                if (!tiles[0]) {
                    var img = t.getElementsByTagName('image')[0];
                    if (img)
                        bigtilesets.push({
                            firstgid: firstgid,
                            tilecount: tilecount,
                            tw: tw,
                            th: th,
                            columns: columns,
                            texname: img.attributes.source.value,
                        });
                }
                else {
                    for (var _a = 0, tiles_1 = tiles; _a < tiles_1.length; _a++) {
                        var t_1 = tiles_1[_a];
                        var img = t_1.getElementsByTagName('image')[0];
                        if (!img)
                            continue;
                        images[parseInt(t_1.attributes.id.value) + parseInt(firstgid)] = {
                            tilesetWidth: tw,
                            tilesetHeight: th,
                            width: img.attributes.width ? img.attributes.width.value : 0,
                            height: img.attributes.height ? img.attributes.height.value : 0,
                            source: img.attributes.source.value.replace(/^.*[\\\/]/, ''),
                        };
                    }
                }
            }
            var addObjectsFunc = function (c, ox, oy) {
                if (c.nodeName == 'layer') {
                    var name_1 = c.attributes.name.value.toLowerCase();
                    var offset = [c.attributes.offsetx ? parseFloat(c.attributes.offsetx.value) : 0, c.attributes.offsety ? parseFloat(c.attributes.offsety.value) : 0];
                    offset[0] += ox;
                    offset[1] += oy;
                    if (!stage.layers[name_1]) {
                        stage.addLayer(name_1, null);
                    }
                    if (!_this.shouldAppear(c)) {
                        return;
                    }
                    if (addObjects)
                        objectsList = objectsList.concat(_this.addLayer(stage, c, bigtilesets, images, offset));
                }
                if (c.nodeName == 'objectgroup') {
                    var name_2 = c.attributes.name.value.toLowerCase();
                    if (!stage.layers[name_2]) {
                        stage.addLayer(name_2, null);
                    }
                    if (!_this.shouldAppear(c)) {
                        return;
                    }
                    if (addObjects)
                        objectsList = objectsList.concat(_this.addObjectGroup(stage, c, images));
                }
            };
            for (var _b = 0, _c = map.childNodes; _b < _c.length; _b++) {
                var c = _c[_b];
                if (c.nodeName == 'group' && (!restrictGroup || c.attributes.name.value.toLowerCase() == restrictGroup.toLowerCase())) {
                    var ox = c.attributes.offsetx ? parseFloat(c.attributes.offsetx.value) : 0;
                    var oy = c.attributes.offsety ? parseFloat(c.attributes.offsety.value) : 0;
                    for (var _d = 0, _e = c.childNodes; _d < _e.length; _d++) {
                        var x = _e[_d];
                        addObjectsFunc(x, ox, oy);
                    }
                }
                else {
                    addObjectsFunc(c, 0, 0);
                }
            }
            if (offs != null) {
                for (var _f = 0, objectsList_1 = objectsList; _f < objectsList_1.length; _f++) {
                    var x = objectsList_1[_f];
                    x.pos[0] += offs[0];
                    x.pos[1] += offs[1];
                }
            }
            this.objectsList = objectsList;
            var startLoad = (new Date()).getTime();
            if (doInit)
                this.init(objectsList, noCameraOffset);
            var total = ((new Date()).getTime() - startLoad) / 1000.;
            console.log(objectsList.length, " objects. Load level ", total);
            this.objectsList = null;
            this.loading = false;
            if (cb)
                cb(objectsList);
            return objectsList;
        };
        LM.prototype.getProps = function (node) {
            var globalProperties = [];
            var props;
            for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
                var pchildren = _a[_i];
                if (pchildren.tagName == 'properties') {
                    props = pchildren;
                    break;
                }
            }
            if (props) {
                var propertyArray = props.getElementsByTagName('property');
                for (var _b = 0, propertyArray_2 = propertyArray; _b < propertyArray_2.length; _b++) {
                    var p = propertyArray_2[_b];
                    if (p.attributes.value)
                        globalProperties[p.attributes.name.value] = p.attributes.value.value;
                }
            }
            return globalProperties;
        };
        LM.prototype.addObjectGroup = function (stage, objectGroup, images) {
            var objectsList = [];
            var name = objectGroup.attributes.name.value;
            var offsetx = objectGroup.attributes.offsetx ? parseFloat(objectGroup.attributes.offsetx.value) : 0;
            var offsety = objectGroup.attributes.offsety ? parseFloat(objectGroup.attributes.offsety.value) : 0;
            var objects = objectGroup.getElementsByTagName('object');
            var globalProperties = this.getProps(objectGroup);
            for (var _i = 0, objects_1 = objects; _i < objects_1.length; _i++) {
                var o = objects_1[_i];
                var gid = o.attributes.gid ? parseInt(o.attributes.gid.value) : -1;
                var flipped_horizontally = false;
                var flipped_vertically = false;
                var textureName = void 0;
                var image = void 0;
                if (gid > 0) {
                    flipped_horizontally = (gid & FLIPPED_HORIZONTALLY_FLAG) == -FLIPPED_HORIZONTALLY_FLAG;
                    flipped_vertically = (gid & FLIPPED_VERTICALLY_FLAG) == FLIPPED_VERTICALLY_FLAG;
                    if (flipped_horizontally)
                        gid &= ~FLIPPED_HORIZONTALLY_FLAG;
                    if (flipped_vertically)
                        gid &= ~FLIPPED_VERTICALLY_FLAG;
                    image = images[gid];
                    if (!image) {
                        console.log("Can't load texture with Tile Id: ", gid);
                    }
                    else {
                        textureName = image.source;
                    }
                }
                var oo = this.createObject(stage, o, textureName, offsetx, offsety, image ? image.source : null, name, globalProperties, flipped_horizontally, flipped_vertically);
                if (oo)
                    objectsList.push(oo);
            }
            if (globalProperties["color"])
                this.setLayerColor(objectsList, parseInt(globalProperties["color"].replace('#', '0x')));
            if (globalProperties["light"])
                this.setLayerLightColor(objectsList, parseInt(globalProperties["light"].replace('#', '0x')));
            return objectsList;
        };
        LM.prototype.createGfx = function (o, textureName, x, y, frameName, properties) {
            var w = o.attributes.width.value;
            var h = o.attributes.height.value;
            var gfx;
            if (properties['movieclip'] == 'true') {
                var noExtensionFrameName = frameName.replace(/\.[^/.]+$/, "");
                var noDigitsFrameName = noExtensionFrameName.replace(/[0-9]/g, '');
                gfx = main_19._.cm(noDigitsFrameName);
                if (properties['randomstart'] == 'true') {
                    gfx.gotoAndPlay(Math_5.m.rint(0, gfx.totalFrames - 1));
                }
                else {
                    gfx.gotoAndPlay(0);
                }
                gfx.loop = true;
                gfx.animationSpeed = 0.35;
            }
            else {
                //TODO: camera
                gfx = main_19._.cs(textureName);
            }
            gfx.anchor.x = .5;
            gfx.anchor.y = .5;
            gfx.width = w;
            gfx.height = h;
            gfx.position.x = 0;
            gfx.position.y = 0;
            gfx.alpha = properties['alpha'] ? properties['alpha'] : 1;
            var blendMode = properties['blendMode'] ? properties['blendMode'].toLowerCase() : '';
            if (blendMode || blendMode == 'normal')
                gfx.blendMode = PIXI.BLEND_MODES.NORMAL;
            if (blendMode == 'add')
                gfx.blendMode = PIXI.BLEND_MODES.ADD;
            if (blendMode == 'multiply')
                gfx.blendMode = PIXI.BLEND_MODES.MULTIPLY;
            if (blendMode == 'screen')
                gfx.blendMode = PIXI.BLEND_MODES.SCREEN;
            if (blendMode == 'overlay')
                gfx.blendMode = PIXI.BLEND_MODES.OVERLAY;
            if (blendMode == 'darken')
                gfx.blendMode = PIXI.BLEND_MODES.DARKEN;
            if (blendMode == 'lighten')
                gfx.blendMode = PIXI.BLEND_MODES.LIGHTEN;
            if (blendMode == 'dodge')
                gfx.blendMode = PIXI.BLEND_MODES.COLOR_DODGE;
            if (blendMode == 'burn')
                gfx.blendMode = PIXI.BLEND_MODES.COLOR_BURN;
            if (blendMode == 'hardLight')
                gfx.blendMode = PIXI.BLEND_MODES.HARD_LIGHT;
            if (blendMode == 'softLight')
                gfx.blendMode = PIXI.BLEND_MODES.SOFT_LIGHT;
            if (blendMode == 'difference')
                gfx.blendMode = PIXI.BLEND_MODES.DIFFERENCE;
            if (blendMode == 'exclusion')
                gfx.blendMode = PIXI.BLEND_MODES.EXCLUSION;
            if (blendMode == 'hue')
                gfx.blendMode = PIXI.BLEND_MODES.HUE;
            if (blendMode == 'saturation')
                gfx.blendMode = PIXI.BLEND_MODES.SATURATION;
            if (blendMode == 'color')
                gfx.blendMode = PIXI.BLEND_MODES.COLOR;
            if (blendMode == 'luminosity')
                gfx.blendMode = PIXI.BLEND_MODES.LUMINOSITY;
            return gfx;
        };
        LM.prototype.createObject = function (stage, o, textureName, offsetx, offsety, frameName, layerName, groupProps, flipX, flipY) {
            var id = o.attributes.id.value;
            var x = parseFloat(o.attributes.x.value);
            var y = parseFloat(o.attributes.y.value);
            var w = o.attributes.width ? parseFloat(o.attributes.width.value) : 0;
            var h = o.attributes.height ? parseFloat(o.attributes.height.value) : 0;
            var name = o.attributes.name ? o.attributes.name.value : '';
            var type = o.attributes.type ? o.attributes.type.value : '';
            var rot = o.attributes.rotation ? o.attributes.rotation.value : 0;
            rot = Math.PI * (rot / 180);
            //DO THIS ONLY FOR GFX SPRITES
            var offsetVec;
            if (textureName) {
                offsetVec = [w / 2, -h / 2];
            }
            else {
                offsetVec = [w / 2, h / 2];
            }
            offsetVec = Math_5.m.rv2(offsetVec, rot);
            x += offsetVec[0];
            y += offsetVec[1];
            var polygons = o.getElementsByTagName('polygon');
            var polygon;
            if (polygons.length > 0)
                polygon = polygons[0];
            var props = o.getElementsByTagName('property');
            var properties = {};
            for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
                var x_1 = props_1[_i];
                properties[x_1.attributes.name.value] = x_1.attributes.value ? x_1.attributes.value.value : x_1.textContent;
            }
            for (var x_2 in groupProps) {
                properties[x_2] = groupProps[x_2];
            }
            if (properties.server)
                return;
            var className = '';
            if (properties["type"])
                className = properties["type"];
            if (type != '') {
                className = type;
            }
            if (properties["singleton"] == 'true') {
                //UniqueCheck
                if (ObjectsList_1.ObjectNames[className] && main_19._.sm.findByType(ObjectsList_1.ObjectNames[className]).length > 0) {
                    return null;
                }
            }
            var obj;
            var startPos = [x + offsetx, y + offsety];
            if (className != '') {
                if (!ObjectsList_1.ObjectNames[className]) {
                    console.log('[LevelManager] Cant find class: ', className);
                }
                obj = new (ObjectsList_1.ObjectNames[className])(startPos);
            }
            else {
                obj = new O_11.O(startPos);
            }
            obj.stringID = name;
            if (polygon) {
                obj.gfx = this.createPolygon(o, polygon, properties);
            }
            if (textureName) {
                obj.gfx = this.createGfx(o, textureName, 0, 0, frameName, properties);
            }
            var visibility = properties['visible'] == 'false' ? false : true;
            if (obj.gfx)
                obj.gfx.visible = visibility;
            var layer = LM.addGfxToWorld(stage, layerName);
            obj.layer = layer;
            if (obj.gfx)
                layer.addChild(obj.gfx);
            if (obj.gfx) {
                if (flipX)
                    obj.gfx.scale.x = -obj.gfx.scale.x;
                if (flipY) {
                    obj.gfx.scale.y = -obj.gfx.scale.y;
                }
                obj.gfx.rotation = rot;
            }
            obj.a = rot;
            obj.width = w;
            obj.height = h;
            obj.properties = properties;
            return obj;
        };
        LM.prototype.addLayer = function (stage, layer, bigtilesets, images, offset) {
            var objectsList = [];
            var data = layer.getElementsByTagName('data')[0];
            var str = data.textContent;
            str = str.replace(/\r?\n|\r/g, '');
            var name = layer.attributes.name.value;
            var arr = str.split(',');
            var len = arr.length;
            var layerWidth = layer.attributes.width.value;
            var layerHeight = layer.attributes.height.value;
            var globalProperties = this.getProps(layer);
            for (var i = 0; i < len; i++) {
                if (arr[i] > 0) {
                    var textureName = void 0;
                    var tileID = arr[i];
                    if (images[tileID]) {
                        textureName = images[tileID].source;
                    }
                    else {
                        for (var _i = 0, bigtilesets_1 = bigtilesets; _i < bigtilesets_1.length; _i++) {
                            var bt = bigtilesets_1[_i];
                            if (bt.firstgid >= tileID && tileID < bt.firstgid + bt.tilecount) {
                                break;
                            }
                        }
                        if (!bt)
                            continue;
                        textureName = bt.texname;
                    }
                    var col = Math.floor(i % layerWidth);
                    var row = Math.floor(i / layerWidth);
                    var posX = col * images[tileID].tilesetWidth;
                    var posY = row * images[tileID].tilesetHeight - (parseFloat(images[tileID].height) - images[tileID].tilesetHeight);
                    var type = globalProperties['type'];
                    var layername = globalProperties['name'];
                    var o = this.spawnTile(stage, textureName, posX + offset[0], posY + offset[1], name, type, layername);
                    o.properties = globalProperties;
                    objectsList.push(o);
                }
            }
            if (globalProperties["color"])
                this.setLayerColor(objectsList, parseInt(globalProperties["color"].replace('#', '0x')));
            if (globalProperties["light"])
                this.setLayerLightColor(objectsList, parseInt(globalProperties["light"].replace('#', '0x')));
            return objectsList;
        };
        LM.prototype.spawnTile = function (stage, textureName, posX, posY, layerName, type, layerStringID) {
            var sprite = main_19._.cs(textureName);
            sprite.anchor.x = 0.;
            sprite.anchor.y = 0.;
            var o;
            if (type && type != '') {
                o = new ObjectsList_1.ObjectNames[type.toLowerCase()]([posX, posY]);
            }
            else {
                o = new O_11.O([posX, posY]);
            }
            o.stringID = layerStringID;
            o.gfx = sprite;
            var layer = LM.addGfxToWorld(stage, layerName);
            o.layer = layer;
            layer.addChild(sprite);
            return o;
        };
        LM.prototype.init = function (list, noCameraOffset) {
            for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                var o = list_2[_i];
                o.noCameraOffset = noCameraOffset;
                var start = (new Date()).getTime();
                o.init(o.properties);
                var end = (new Date()).getTime();
                if ((end - start) / 1000 > 0.05) {
                    console.log("ANUS");
                }
            }
        };
        LM.prototype.getGroups = function (level, filter) {
            if (filter === void 0) { filter = null; }
            var map = this.levels[level].getElementsByTagName("map")[0];
            var arr = [];
            for (var _i = 0, _a = map.childNodes; _i < _a.length; _i++) {
                var c = _a[_i];
                if (c.nodeName == 'group') {
                    var name_3 = c.attributes.name.value.toLowerCase();
                    if (!filter) {
                        arr.push(name_3);
                    }
                    else {
                        if (~name_3.indexOf(filter)) {
                            arr.push(name_3);
                        }
                    }
                }
            }
            return arr;
        };
        LM.prototype.setLayerLightColor = function (objectsList, color) {
            for (var _i = 0, objectsList_2 = objectsList; _i < objectsList_2.length; _i++) {
                var x = objectsList_2[_i];
                if (x.gfx && x.gfx.color) {
                    var col = Math_5.m.numhexToRgb(color);
                    x.gfx.color.setDark(col[1] / 255, col[2] / 255, col[3] / 255);
                }
            }
        };
        LM.prototype.setLayerColor = function (objectsList, color) {
            for (var _i = 0, objectsList_3 = objectsList; _i < objectsList_3.length; _i++) {
                var x = objectsList_3[_i];
                if (x.gfx && x.gfx.color) {
                    var col = Math_5.m.numhexToRgb(color);
                    x.gfx.color.setLight(col[1] / 255, col[2] / 255, col[3] / 255);
                }
            }
        };
        LM.prototype.loadLayersFromLevelGroup = function (stage, level, group) {
            this.load(stage, level, null, false, null, group, false);
        };
        LM.prototype.loadGFXonly = function (stage, level, offs, container) {
            var list = this.load(stage, level, null, false, offs, null, true, false);
            var retList = [];
            for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
                var x = list_3[_i];
                if (x.gfx) {
                    O_11.O.rp(x.gfx);
                    x.gfx.x = x.x;
                    x.gfx.y = x.y;
                    container.addChild(x.gfx);
                    retList.push(x.gfx);
                    x.gfx = null;
                }
            }
            main_19._.sm.removeList(list);
            return retList;
        };
        LM.prototype.addTileset = function (result, data) {
            /* let tileset = data.children[0];
             for (let tile of tileset.getElementsByTagName('tile')) {
                 let id = parseInt(tile.attributes.id.value);
                 tile.attributes.id.value = id + 1
             }*/
            this.tilesets[result] = data;
        };
        LM.prototype.createPolygon = function (o, polygon, properties) {
            var g = new PIXI.Graphics();
            var points = polygon.attributes.points.value;
            var pointsArr = points.split(' ');
            g.clear();
            g.beginFill(properties.color ? parseInt(properties.color.replace('#', '0x')) : 0xffffff, properties.alpha ? properties.alpha : 1);
            var arr = [];
            var minx = Infinity;
            var miny = Infinity;
            for (var _i = 0, pointsArr_1 = pointsArr; _i < pointsArr_1.length; _i++) {
                var x = pointsArr_1[_i];
                var p = x.split(',');
                var xx = parseFloat(p[0]);
                var yy = parseFloat(p[1]);
                minx = minx > xx ? xx : minx;
                miny = miny > yy ? yy : miny;
                arr.push(xx, yy);
            }
            g.drawPolygon(arr);
            var b = g.getBounds();
            var dx = g.width * 0.4;
            var dy = g.height * 0.4;
            g.x = -minx + dx / 2;
            g.y = -miny + dy / 2;
            g.endFill();
            var bf = new PIXI.filters.BlurFilter(1, 3);
            bf.blurX = properties.blurx ? parseFloat(properties.blurx) : 1;
            bf.blurY = properties.blury ? parseFloat(properties.blury) : 1;
            g.filters = [bf];
            var renderTexture = PIXI.RenderTexture.create(b.width + dx, b.height + dy);
            main_19._.app.renderer.render(g, renderTexture);
            var container = new PIXI.Container();
            var spr = new PIXI.Sprite(renderTexture);
            // spr.anchor.x = 0.5;
            // spr.anchor.y = 0.5;
            spr.x = minx - dx / 2;
            spr.y = miny - dy / 2;
            container.addChild(spr);
            return container;
        };
        return LM;
    }());
    exports.LM = LM;
});
define("ResourceManager", ["require", "exports", "main"], function (require, exports, main_20) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Created by MSI on 08.11.2017.
     */
    var ResourceManager = /** @class */ (function () {
        function ResourceManager() {
            this.shaders = {};
            this.spineData = {};
            this.spineLoaderListneners = {};
        }
        ResourceManager.prototype.requestSpine = function (spineName, cb) {
            var _this = this;
            if (this.spineData[spineName]) {
                return cb(this.spineData[spineName]);
            }
            if (!this.spineLoaderListneners[spineName]) {
                this.spineLoaderListneners[spineName] = [cb];
            }
            else {
                this.spineLoaderListneners[spineName].push(cb);
                return;
            }
            var loader = new PIXI.loaders.Loader();
            loader
                .add(spineName, 'animations/' + spineName + '.json')
                .load(function (loader, resources) {
                _this.spineData[spineName] = resources[spineName].spineData;
                for (var x in _this.spineLoaderListneners[spineName]) {
                    _this.spineLoaderListneners[spineName][x](_this.spineData[spineName]);
                }
                _this.spineLoaderListneners[spineName] = null;
            });
        };
        ResourceManager.prototype.loadAssets = function (assets, onProcess, onComplete) {
            var _this = this;
            var loader = new PIXI.loaders.Loader(window.PIXILoaderBaseUrl);
            loader.add(assets);
            loader.on('complete', function () {
                onComplete();
            });
            loader.on('progress', function (loader, evt) {
                if (evt.name.indexOf('shaders') >= 0) {
                    var result = evt.name.substring(evt.name.lastIndexOf("/") + 1);
                    _this.shaders[result] = evt.data;
                }
                if (evt.name.indexOf('/') > 0 && evt.type == PIXI.loaders.Resource.TYPE.XML) {
                    var ext = evt.name.substr(evt.name.lastIndexOf('.') + 1);
                    var result = evt.name.substring(evt.name.lastIndexOf("/") + 1);
                    result = result.substring(0, result.length - 4);
                    if (ext == 'tsx') {
                        main_20._.lm.addTileset(result, evt.data);
                    }
                    if (ext == 'tmx') {
                        main_20._.lm.add(result, evt.data);
                    }
                }
                onProcess(loader, evt);
            });
            loader.load();
        };
        return ResourceManager;
    }());
    exports.ResourceManager = ResourceManager;
});
define("Stages/SM", ["require", "exports", "main", "Objects/Camera", "Math"], function (require, exports, main_21, Camera_2, Math_6) {
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
            var l = Math_6.binarySearch(container.children, c, function (a, b) {
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
            for (var _i = 0, list_4 = list; _i < list_4.length; _i++) {
                var o = list_4[_i];
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
            for (var _i = 0, list_5 = list; _i < list_5.length; _i++) {
                var o = list_5[_i];
                if (o.stringID == stringId)
                    res.push(o);
            }
            return res;
        };
        SM.prototype.findStringId = function (stringId, list) {
            if (list === void 0) { list = null; }
            if (!list)
                list = this.objects;
            for (var _i = 0, list_6 = list; _i < list_6.length; _i++) {
                var o = list_6[_i];
                if (o.stringID == stringId)
                    return o;
            }
        };
        SM.prototype.findByType = function (constructor, list) {
            if (list === void 0) { list = null; }
            if (!list)
                list = this.objects;
            var res = [];
            for (var _i = 0, list_7 = list; _i < list_7.length; _i++) {
                var o = list_7[_i];
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
            this.superstage.addChild(this.effects);
            this.superstage.addChild(this.olgui);
            this.superstage.addChild(this.gui);
            this.superstage.addChild(this.gui2);
            this.superstage.addChild(this.fonts);
            this.superstage.addChild(this.cursorlayer);
            main_21._.app.stage.addChild(this.superstage);
        };
        SM.prototype.createCamera = function () {
            this.camera = new Camera_2.Camera([0, 0]);
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
            this.camera.reset(main_21.SCR_WIDTH / 2, main_21.SCR_HEIGHT / 2, false);
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
                for (var _i = 0, objects_2 = objects; _i < objects_2.length; _i++) {
                    var x = objects_2[_i];
                    if (x != this.camera)
                        x.killNow();
                }
            }
        };
        return SM;
    }());
    exports.SM = SM;
});
define("main", ["require", "exports", "Sound", "PauseTimer", "lm", "ResourceManager", "ObjectsList", "ClientSettings", "Stages/SM", "Stages/Menu", "Stages/Game"], function (require, exports, Sound_1, PauseTimer_1, lm_1, ResourceManager_1, ObjectsList_2, ClientSettings_2, SM_1, Menu_2, Game_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.$ = window.$;
    var GLOBAL_MUSIC_ASSETS = [];
    var GLOBAL_SOUND_ASSETS = []; //
    var GLOBAL_ASSETS = [
        ///////////////////////////////////////////
        // Spine
        ///////////////////////////////////////////
        ///////////////////////////////////////////
        // Atlases
        ///////////////////////////////////////////
        'atlas/tiles1.json',
        ///////////////////////////////////////////
        // Fonts
        ///////////////////////////////////////////
        'fonts/main-export.xml',
        'fonts/font2-export.xml',
    ];
    exports.Bounce = window.Bounce;
    exports.Linear = window.Linear;
    exports.Quad = window.Quad;
    exports.Power3 = window.Power3;
    exports.Power2 = window.Power2;
    exports.Sine = window.Sine;
    exports.Elastic = window.Elastic;
    exports.FMath = window.FMath;
    exports.SCR_WIDTH = 720; //SCR_WIDTH;
    exports.SCR_HEIGHT = 1280; //SCR_HEIGHT;
    exports.TweenMax = window.TweenMax;
    var Main = /** @class */ (function () {
        function Main() {
            this.activeTab = true;
            this.timer = new PauseTimer_1.PauseTimer();
            this.lastLoop = 0;
            this.totalFrames = 0;
            this.totalDelta = 0;
            this.fMath = new exports.FMath(null);
            this.menu = new Menu_2.Menu();
            this.game = new Game_2.Game();
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
            //this.appScale = baseH / MIN_SCR_HEIGHT;
            //if (this.appScale > 1.28) this.appScale = 1.28;
            //SCR_WIDTH = baseW / this.appScale;
            //SCR_HEIGHT = baseH / this.appScale;
            //SCR_WIDTH_HALF = SCR_WIDTH * .5;
            //SCR_HEIGHT_HALF = SCR_HEIGHT * .5;
            //this.screenCenterOffset = [(SCR_WIDTH - MIN_SCR_WIDTH) * .5, (SCR_HEIGHT - MIN_SCR_HEIGHT) * .5];
            this.screenCenterOffset = [0, 0];
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
            this.appScale = window.PIXIRatio ? window.PIXIRatio : 1;
            this.app = new PIXI.Application(exports.SCR_WIDTH, exports.SCR_HEIGHT, {
                autoStart: true,
                clearBeforeRender: true,
                resolution: 1, antialias: false,
                preserveDrawingBuffer: false, forceFXAA: true, backgroundColor: 0xffffff,
            });
            document.body.appendChild(this.app.view);
            this.camera = new PIXI.Container();
            this.camera.x = 0;
            this.camera.y = 0;
            // TODO: camera
            this.app.stage = new PIXI.Container();
            this.sm = new SM_1.SM();
            this.sm.init();
            this.app.stage.scrollRect = new PIXI.Rectangle(10, 10, 100, 100);
            //this.app.stage.position.set(this.app.renderer.width/2, this.app.renderer.height/2);
            this.app.stage.scale.set(this.appScale, this.appScale);
            //        this.app.renderer.plugins.interaction = new PIXI.interaction.InteractionManager(this.app.renderer, {autoPreventDefault: false});
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
            // this.app.stage.pivot.set(this.app.renderer.width, this.app.renderer.height);
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
            this.preloadBar.moveTo(exports.SCR_WIDTH * 0.1 - borderWidth, exports.SCR_HEIGHT * 0.495 - borderWidth);
            this.preloadBar.lineTo(exports.SCR_WIDTH * 0.9 + borderWidth, exports.SCR_HEIGHT * 0.495 - borderWidth);
            this.preloadBar.lineTo(exports.SCR_WIDTH * 0.9 + borderWidth, exports.SCR_HEIGHT * 0.505 + borderWidth);
            this.preloadBar.lineTo(exports.SCR_WIDTH * 0.1 - borderWidth, exports.SCR_HEIGHT * 0.505 + borderWidth);
            this.preloadBar.endFill();
        };
        Main.prototype.drawPreloaderProgress = function (progressPercent) {
            this.preloadBar.beginFill(0x000000);
            var progress = progressPercent / 100;
            this.preloadBar.moveTo(exports.SCR_WIDTH * 0.1, exports.SCR_HEIGHT * 0.495);
            this.preloadBar.lineTo(exports.SCR_WIDTH * 0.1 + exports.SCR_WIDTH * 0.8 * progress, exports.SCR_HEIGHT * 0.495);
            this.preloadBar.lineTo(exports.SCR_WIDTH * 0.1 + exports.SCR_WIDTH * 0.8 * progress, exports.SCR_HEIGHT * 0.505);
            this.preloadBar.lineTo(exports.SCR_WIDTH * 0.1, exports.SCR_HEIGHT * 0.505);
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
            this.rm = new ResourceManager_1.ResourceManager();
            this.rm.loadAssets(GLOBAL_ASSETS.concat(ObjectsList_2.LevelNames), function (loader, evt) {
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
                this.delta = timeD / ClientSettings_2.FRAME_DELAY;
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

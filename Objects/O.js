define(["require", "exports", "../main", "../utils/EventTypes"], function (require, exports, main_1, EventTypes_1) {
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
            this.createTime = main_1._.timer.getTimer();
            if (gfx) {
                this._gfx = gfx;
            }
            if (this.stringID) {
                main_1._.sm.globalIds[this.stringID] = this;
            }
            main_1._.sm.objects.push(this);
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
                main_1._.TweenMax.killTweensOf(this.trackObject);
                this.trackObject = null;
            }
            if (this._gfx && this._gfx.parent) {
                O.rp(this._gfx);
                this._gfx = null;
            }
            if (main_1._.debug && this.debugGfx) {
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
            var s = new main_1._.PIXI.Sprite(main_1._.PIXI.Texture.fromFrame(texName + add));
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
            this.createTime = main_1._.timer.getTimer();
            if (this._gfx)
                main_1._.sm.camera.updateTransform(this, this._gfx, 0, 0);
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
            return main_1._.TweenMax.delayedCall(delaySecs, function () {
                if (_this.doRemove)
                    return -1;
                return f();
            });
        };
        O.prototype.setIntervalTimeout = function (f, delaySecs, timeoutSecs) {
            if (delaySecs < 0.03)
                delaySecs = 0.03;
            var ff = this.setInterval(f, delaySecs);
            main_1._.TweenMax.delayedCall(timeoutSecs, function () {
                ff = main_1._.killTween(ff);
            });
            return ff;
        };
        O.prototype.setInterval = function (f, delaySecs) {
            var _this = this;
            if (delaySecs === void 0) { delaySecs = 0.03; }
            if (delaySecs < 0.03)
                delaySecs = 0.03;
            var interval = new main_1._.TimelineMax({ repeat: -1 }).call(function () {
                if (_this.doRemove)
                    return main_1._.killTween(interval);
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
                this.a += this.av * main_1._.worldSpeed * main_1._.delta;
            if (this._gfx)
                main_1._.sm.camera.updateTransform(this, this._gfx, 0, 0);
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

import {_, PIXIContainer} from "../main";
import {m, Vec2} from "../Math";
import {events} from "../utils/EventTypes";



class Context {
    c: Context;
    static globalID: number = 0;
    id: number = 0;
    f: Function = function () {

    };

    nextF(cb: (end: Function, params: any) => any) {
        let con = this;
        return function (params: any) {
            //all the previous goes here
            if (con.c)
                con.c.f.bind(con.c);
            cb(con.f, params);
        };
    }

    constructor(prev: Context, prevF: (end: Function, params: any) => any) {
        this.c = prev;
        this.id = Context.globalID;
        Context.globalID++;
        if (prevF)
            this.c.f = this.nextF(prevF);
    }
}

interface Contextable {
    context: Context;

    call(milliseconds: number, func: Function)

    wait(milliseconds: number)

    apply()
}


const PhysStatic = 1;
const PhysDynamic = 2;

class EngineEvent {
    event: string;
    listener: Function;

    constructor(e, l) {
        this.event = e;
        this.listener = l;
    }
}

export class O implements Contextable {

    static cin<T extends O>(c: { new(p: Vec2, gfx: any): T; }, pos: Vec2 = null, gfx: PIXI.DisplayObject = null, props = {}): T {
        let res = new c(pos, gfx);
        res.init(props);
        return res;
    }



    get gfx(): any {
        return this._gfx;
    }

    updateLink(x: number, y: number) {
        this.x += x;
        this.y += y;
    }

    set gfx(value: any) {
        if (value) {
            this.scale[0] = value.scale.x;
            this.scale[1] = value.scale.y;
        }
        this._gfx = value;
    }

    layer: PIXI.Container;
    scale: Vec2 = [1, 1];
    properties: any;
    private physType: number;
    stringID: string;
    uid: number = -1;
    isClip: boolean = false;
    colMask: number;
    type: number;
    dynamic: boolean = false;
    debugGfx: any;
    doRemove: boolean = false;
    pos: Vec2 = [0, 0];
    v: Vec2 = [0, 0];
    offset: Array<number> = [0, 0, 0]; //x y a
    z: number;
    removeable: boolean = true;
    acl: number = 1;
    av: number = 0;
    a: number = 0;
    noCameraOffset: boolean = false;
    public alwaysVisible: boolean = false;


    private linkedObjects: O[];
    private _width: number = 0;
    private _height: number = 0;
    public createTime: number = 0;
    private events: Array<EngineEvent>;

    public set x(v) {
        let d = v - this.pos[0];
        if (this.linkedObjects)
        this.updateLinked(d, 0);
        this.pos[0] = v
    }

    public set y(v) {
        let d = v - this.pos[1];
        if (this.linkedObjects)
            this.updateLinked(0, d);
        this.pos[1] = v
    }

    public get x(): number {
        return this.pos[0]
    }

    public get y(): number {
        return this.pos[1]
    }

    public set opacity(v) {
        if (this._gfx) this._gfx.alpha = v;
    }

    public get opacity(): number {
        if (this._gfx) return this._gfx.alpha
    }


    public set width(v) {
        this._width = v;
    }

    public get width(): number {
        return this._width;
    }

    public set height(v) {
        this._height = v;
    }

    public get height(): number {
        return this._height;
    }

    public intersects(o: O): boolean {
        return ((Math.abs(o.x - this.x) < (o.width + this.width) / 2) &&
            (Math.abs(o.y - this.y) < (o.height + this.height) / 2));
    }

    public trackObject: O = null;
    protected _gfx: PIXIContainer;
    bounds: Array<number> = [0, 0];
    context: Context = new Context(null, null);

    linkObj(...o: O[]) {
        if (!this.linkedObjects) this.linkedObjects= [];
        for (let x of o) {
            this.linkedObjects.push(x);
        }
    }

    unlinkObj(o: O) {
        let inx = 0;
        for (let x of this.linkedObjects) {
            if (x == o) {
                this.linkedObjects.splice(inx, 1);
                break;
            }
            inx++;
        }
    }
    private _body: Body;


    hasFlag(value, flag) {
        return ((value & flag) == value)
    }


    onCollide(b: O) {

    }

    static rp(c: PIXIContainer): null {
        if (c && c.parent) {
            let pp = c.parent;
            c.parent.removeChild(c);
        }

        return null;
    }

    static hideList(list: O[], visibility: boolean = false): void {
        for (let x of list) {
            if (x.gfx)
                x.gfx.visible = visibility;
        }
    }

    //calls only once
    onDestroy() {

        this.layer = null;
        this.linkedObjects = [];
        this.emmit(events.killed);

        if (this.trackObject) {
            _.TweenMax.killTweensOf(this.trackObject);
            this.trackObject = null;
        }

        if (this._gfx && this._gfx.parent) {
            O.rp(this._gfx);
            this._gfx = null;
        }

        if (_.debug && this.debugGfx) {
            O.rp(this.debugGfx);
            this.debugGfx = null;
        }
    }

    killNow(): null {
        this.doRemove = true;
        return null
    }


    kill(): O {
        this.context = new Context(this.context, (next: Function) => {
            this.doRemove = true;

            next()
        });

        return this;
    }

    constructor(pos: Vec2 = null, gfx: PIXI.DisplayObject = null) {
        if (!pos) {
            this.pos = [0, 0]
        } else {
            this.pos = pos;
        }

        this.createTime = _.timer.getTimer();

        if (gfx) {
            this._gfx = gfx;
        }
        if (this.stringID) {
            _.sm.globalIds[this.stringID] = this;
        }
        _.sm.objects.push(this);
    }


    static getSprite(texName) {
        if (texName.length > 4 && texName.charAt(texName.length - 4) != ".")
            var add = ".png"; else add = "";
        let s = new _.PIXI.Sprite(_.PIXI.Texture.fromFrame(texName + add));
        s.anchor.x = 0.5;
        s.anchor.y = 0.5;
        return s;
    }

    overlapPoint(p: Vec2) {
        if (p[0] > this.pos[0] - this.bounds[0] / 2 &&
            p[0] < this.pos[0] + this.bounds[0] / 2 &&
            p[1] > this.pos[1] - this.bounds[1] / 2 &&
            p[1] < this.pos[1] + this.bounds[1] / 2) {
            return true
        } else {
            return false
        }
    }

    updateBounds() {
        if (!this._gfx) {
            this.bounds = [this.width, this.height];
            return;
        }

        if (this._gfx.parent)
            this._gfx.updateTransform();

        let b = this._gfx.getBounds();
        this.bounds = [b.width, b.height];
    }

    init(props: any = null) {
        if (props) {
            if (props.color && this.gfx && this.gfx.color) {
                (<PIXI.Sprite>this.gfx).tint = parseInt(props.color.replace('#', '0x'));
            }

            if (props.light && this.gfx && this.gfx.color) {
                (<PIXI.Sprite>this.gfx).tint = parseInt(props.color.replace('#', '0x'));
            }
        }
        this.createTime = _.timer.getTimer();

        if (this._gfx)
           _.sm.camera.updateTransform(this, this._gfx, 0, 0);

        this.updateBounds();
    }

    call(func) {
        this.context = new Context(this.context, (next: Function, params: any) => {
            func(params);
            next();
        });

        return this;
    }

    delayedCall(milliseconds, func) {
        this.context = new Context(this.context, (next: Function, params: any) => {
            this.setTimeout(() => {
                func(params);
                next();
            }, milliseconds);
        });

        return this;
    }

    emmit(event, ...params) {
        if (!this.events) return;
        for (let i = 0, l = this.events.length; i < l; ++i) {
            if (this.events[i].event == event) {
                this.events[i].listener(...params);
                this.events.splice(i, 1);
                i--;
                l--;
            }
        }
    }

    on(event: string): O {
        if (!this.events) this.events = [];
        this.context = new Context(this.context, (next: Function) => {
            this.events.push(new EngineEvent(event, (p: any) => {
                next(p);
            }));
        });

        return this;
    }

    apply() {
        let initContext = this.context;
        let first = this.context;

        while (first.c) first = first.c;

        first.f(() => {
        });
        this.context = new Context(null, null);
        return initContext;
    }

    setTimeout(f: Function, delaySecs: number = 0): Function {
        return _.TweenMax.delayedCall(delaySecs, () => {
            if (this.doRemove) return -1;
            return f();
        })
    }

    setIntervalTimeout(f: Function, delaySecs: number, timeoutSecs: number): Function{
        if (delaySecs < 0.03) delaySecs = 0.03;

        let ff = this.setInterval(f, delaySecs);

        _.TweenMax.delayedCall(timeoutSecs, () => {
            ff = _.killTween(ff);
        });
        return ff;
    }

    setInterval(f: Function, delaySecs: number = 0.03): any {
        if (delaySecs < 0.03) delaySecs = 0.03;
        let interval = new _.TimelineMax({ repeat: -1 }).call(() => {
            if (this.doRemove) return _.killTween(interval);
            return f();
        }, null, null, delaySecs);

        return interval;
    }

    wait(seconds: number): O {
        this.context = new Context(this.context, (next: Function) => {
            this.setTimeout(
                () => {
                    next();
                }, seconds
            )
        });

        return this;
    }

    s(field: string, value: any): O {
        let prev = this.context.f;
        this.context.f = () => {
            if (prev)
                prev();
            this[field] = value;
        };

        return this;
    }


    collide(evt: any) {
        //    o.set('pos', o.x+1, o.y+1).wait(1).set();
        //    o.u('pos', {x: o.x, y: 12, r}).update();
    }

    process() {
        if (this.trackObject) {
            this.pos[0] = this.trackObject.pos[0];
            this.pos[1] = this.trackObject.pos[1];
        } else {
            if (!this.physType) {
                this.pos[0] += this.v[0];// * _.worldSpeed * _.delta2;
                this.pos[1] += this.v[1];// * _.worldSpeed * _.delta2;
            }
        }

           if (this.av != 0)
              this.a += this.av * _.worldSpeed * _.delta;
        if (this._gfx)
            _.sm.camera.updateTransform(this, this._gfx, 0, 0);
    }

    private updateLinked(x: number, y: number) {
        for (let a of this.linkedObjects) {
            a.updateLink(x,y);
        }
    }

    changeGfxLayer(layer: PIXI.Container) {
        O.rp(this.gfx);
        layer.addChild(this.gfx);
    }

    extendProcess(f: () => void) {
        let oldprocess = this.process.bind(this);

        this.process = () => {
            oldprocess();
            f();
        }
    }

    static totop(cl: PIXI.DisplayObject) {
        cl.parent.setChildIndex(cl, cl.parent.children.length - 1);
    }

    rotateTo(dest: Vec2, deltaAngle: number) {
        let dx = this.pos[0] - dest[0];
        let dy = this.pos[1] - dest[1];
        let d = Math.sqrt(dx*dx + dy*dy);
        if (d < 1) return;
        dx/=d;
        dy/=d;
        this.a = Math.atan2(dy, dx) + deltaAngle;
    }
}
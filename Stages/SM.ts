import {Main, PIXIContainer, _, SCR_WIDTH, SCR_HEIGHT, TweenMax} from "../main";
import {Stage} from "./stage"
import {O} from "../Objects/O";
import {Camera} from "../Objects/Camera";
import {m, binarySearch, Vec2} from "../Math";
//asdasdasd

export class SM {
    public superstage: PIXI.Container;
    public pixiUiStage: any;

    public main: PIXI.Container;
    public gui: PIXI.Container;
    public gui2: PIXI.Container;
    public olgui: PIXI.Container;
    public fonts: PIXI.Container;

    public giuPixiUiContainer: any;
    //fonts only
    public camera: Camera;
    public stage: Stage = null;
    private prevStage: any = null;
    private inTransit: boolean = false;
    public loading: boolean = false;
    public objects: Array<O> = [];
    public static: Array<PIXI.Container> = [];
    public walls: Array<O> = [];
    public dynamic: Array<O> = [];
    public cursorlayer: PIXI.Container;
    public particlesPlaces = [];
    public effects: PIXI.Container;
    globalIds:  { [key:string]:O; } = {};



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

    public ZOrderContainer(c: PIXI.Container): void {
        c.children.sort(function(a,b){
            return a.position.y - b.position.y
        })
    }

    public ZUpdate(container: PIXI.Container, c: PIXI.Sprite): void {
      //  this.ZOrderContainer(container)
        let l: number = binarySearch(container.children, c, function(a, b) {
            return a.position.y - b.position.y
        });
        if (l < 0) { // if the binarySearch return value was zero or positive, a matching object was found
            l = ~l;
        }

        container.setChildIndex(c, Math.min(l + 1, container.children.length - 1))
    }


    public addStatic(gfx: PIXIContainer): void{
        this.static.push(gfx);
    }

    public findByProp(prop: string, list: Array<O> = null): Array<O> {
        if (!list) list = this.objects;
        let res: Array<O> = [];
        for (let o of list)
            if (o.properties[prop]) res.push(o);

        return res
    }


    public findStringIdMultiple(stringId: string, list: Array<O> = null): Array<O> {
        if (!list) list = this.objects;
        let res: Array<O> = [];
        for (let o of list)
            if (o.stringID == stringId) res.push(o);

        return res
    }

    public findStringId(stringId: string, list: Array<O> = null): O {
        if (!list) list = this.objects;
        for (let o of list)
            if (o.stringID == stringId) return o;
    }

    public findByType<T extends O>(constructor: {new (p: Vec2, gfx: any):T}, list: Array<O> = null): Array<T> {
        if (!list) list = this.objects;
        let res: Array<T> = [];
        for (let o of list) {
            if (o instanceof constructor) {
                res.push(<T>o)
            }
        }
        return res
    }

    public find(uid: number): O {
        for (let o of this.objects)
            if (o.uid == uid) return o;
    }

    init() {
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
        let w: any = window;
        let ui: any = w.PIXI.UI;
        this.pixiUiStage = new ui.Stage(SCR_WIDTH, SCR_HEIGHT);
        this.superstage.addChild(this.pixiUiStage);
        this.superstage.addChild(this.effects);
        this.superstage.addChild(this.olgui);

        this.superstage.addChild(this.gui);
        this.superstage.addChild(this.gui2);
        this.superstage.addChild(this.fonts);
        this.superstage.addChild(this.cursorlayer);

        _.app.stage.addChild(this.superstage);

    }

    constructor () {

    }

    createCamera(): Camera {
        this.camera = new Camera([0, 0]);
        return this.camera;
    }

    removeObjects() {
        let len = this.objects.length;

        for (let i = 0; i < len; i++) {
            let obji:O = this.objects[i];
            if (obji.removeable) {
                obji.killNow();
                obji.onDestroy();

                if (this.globalIds[obji.stringID]) {
                    this.globalIds[obji.stringID] = null
                }
                this.objects.splice(i, 1);
                i--;
                len--;
            }
        }

        len = this.static.length;
        for (let i = 0; i < len; i++) {
            let gfx: PIXIContainer = this.static[i];
            gfx.parent.removeChild(gfx);
        }

        this.dynamic = [];
        this.walls = [];
        this.static = [];
    }

    fadeBegin(newStage: any) {
        if (this.stage) {
            this.stage.onHide(newStage);
            this.stage.layers = {};
            this.stage.doProcess = false;
        }

        this.stage = newStage;
        this.stage.layers = {};
        newStage.doProcess = true;
        this.camera.reset(SCR_WIDTH / 2, SCR_HEIGHT / 2,false);
        newStage.onShow();
    }

    openStage(newStage) {
        if (this.inTransit) return;
        newStage.prevStage = this.stage;

        if (this.stage) {
            if (!this.stage.doProcess) return;
            this.stage.doProcess = false;
            this.fadeBegin(newStage);
        } else {
            this.stage = newStage;
            this.stage.doProcess = true;
            newStage.onShow();
        }

    }

    process() {
        let len = this.objects.length;

        //phys.update(this.objects);

        for (let i = 0; i < len; i++) {
            let obji: O = this.objects[i];

            if (!obji.doRemove) {
                obji.process();
            }

            if (obji.doRemove)
            {
                obji.onDestroy();
                this.objects.splice(i, 1);
                i--;
                len--;
            }
        }

        if (this.stage && this.stage.doProcess)
            this.stage.process();
        }

    removeList(objects: O[]): void {
        if (objects) {
            for (let x of objects) {
                if (x != this.camera)
                    x.killNow()
            }
        }
    }
}
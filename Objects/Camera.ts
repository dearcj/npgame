/**
 * Created by MSI on 04.01.2017.
 */
import {O} from "./O";
import {IO} from "./IO";
import {m, Vec2} from "../Math";
import {_, SCR_WIDTH, SCR_HEIGHT, PIXIRectangle, SCR_WIDTH_HALF, SCR_HEIGHT_HALF} from "../main";

declare var TweenMax: any;

export class Camera extends O {
    private deltaAngle: number = 0;
    private deltaLen: number = 0;
    private delta: Vec2 = [0, 0];
    public moveToX: number;
    private anchorDelta: Vec2 = [0,0];

    get zoom(): number {
        return this._zoom;
    }

    set zoom(value: number) {
        this._zoom = value;
        let ofsx = SCR_WIDTH * (1 - this._zoom) / 2;
        let ofsy = SCR_HEIGHT * (1 - this._zoom) / 2;
        _.sm.main.x = ofsx;
        _.sm.main.y = ofsy;
        _.sm.main.scale.x = value;
        _.sm.main.scale.y = value;

        _.sm.olgui.scale.x = value;
        _.sm.olgui.scale.y = value;
        _.sm.olgui.x = ofsx;
        _.sm.olgui.y = ofsy;

        _.sm.effects.scale.x = value;
        _.sm.effects.scale.y = value;
        _.sm.effects.x = ofsx;
        _.sm.effects.y = ofsy;

    }
    private baseY: number;
    get yflow(): boolean {
        return this._yflow;
    }

    set yflow(value: boolean) {
        this._yflow = value;
        if (!value) {
            this.baseY = null;
        }
    }

    public operator: boolean = false;
    private voX:number = 0;
    private voY:number = 0;
    private followObj: O;
    private rect: PIXI.Rectangle;
    private boardLU: Vec2 = [0, 0];
    private boardRD: Vec2 = [0, 0];
    private _zoom: number = 1;
    private camScale:number = 1;
    private sina:number;
    private cosa:number;
    private _yflow: boolean = false;

    follow(o: O) {
        this.followObj = o;
    }

    constructor(pos: Vec2) {
        super(pos);
        this.zoom = 1;
        this.removeable = false;
        this.rect = new PIXI.Rectangle(0, 0, SCR_WIDTH, SCR_HEIGHT);
    }

    stop() {
        this.v[0] = 0;
        this.v[1] = 0;
    }

    t(oldP:Array<number>) {
        return [oldP[0] - this.pos[0], oldP[1] - this.pos[1]];
    }

    onDestroy() {
        super.onDestroy();

        this.followObj = null;
    }

    boundaryCheck(p: Vec2) {
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
    }

    reset(x, y, doBoundaryCheck) {
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
    }

    worldToScreen(s: Vec2): Vec2 {
        let centrObjCoordX = this.pos[0] - SCR_WIDTH * 0.5;
        let centrObjCoordY = this.pos[1] - SCR_HEIGHT * 0.5;

        return [s[0] - centrObjCoordX, s[1] - centrObjCoordY];
    }

    screenToWorld(s: Vec2): Vec2 {
        let centrObjCoordX = this.pos[0] - SCR_WIDTH * 0.5;
        let centrObjCoordY = this.pos[1] - SCR_HEIGHT * 0.5;

        return [s[0] + centrObjCoordX, s[1] + centrObjCoordY];
    }

    focusPlace(worldPos:Vec2) {
        let prevPos = [this.pos[0], this.pos[1]];
        TweenMax.killChildTweensOf(_.camera, true);
        TweenMax.killChildTweensOf(this, true);
        console.log("FOCUS PLACE");
        new TweenMax(this, .6, {x: worldPos[0], y: worldPos[1]});
        new TweenMax(_.camera, .6, {z : 20});
        new TweenMax(this, 0.5, {delay: 0.6, x: prevPos[0], y: prevPos[1]});
        new TweenMax(_.camera, 0.5, {delay: 0.6, z: 0});
    }

    updateTransform(obj:O, clip: PIXI.Container, offsX:number = 0, offsY:number = 0) {
        if (obj.noCameraOffset) {
            clip.x = obj.pos[0]  + offsX ;
            clip.y = obj.pos[1]  + offsY;
        } else {
            clip.x = obj.pos[0] + this.delta[0] + offsX ;
            clip.y = obj.pos[1] + this.delta[1] + offsY;
        }

      //  if (!obj.alwaysVisible && !obj.noCameraOffset) {
      //     clip.visible = this.isVisible(clip);
      //  }

        if (clip.visible) {
            clip.rotation = obj.a + this.a;
        }
    }

    process() {
        if (this.operator) {
            this.delta[0] = _.fMath.cos(this.deltaAngle)*this.deltaLen / 7;
            this.delta[1] = _.fMath.sin(this.deltaAngle)*this.deltaLen ;
            this.deltaLen = _.fMath.cos(_.time / 1000 + this.deltaLen / 20)*2;
            this.deltaAngle = _.fMath.sin(_.time / 2000 + this.deltaLen / 100)*2;
        }

        this.offset[0] = this.pos[0] - SCR_WIDTH_HALF;
        this.offset[1] = this.pos[1] - SCR_HEIGHT_HALF;

     /*   if (this.a != 0) {
            this.sina = Math.sin(this.a);
            this.cosa = Math.cos(this.a);
        }*/
    }

    public isVisible(g: PIXI.DisplayObject) {
        g.getBounds(false, this.rect);
        let gg: any = g;
        if (gg.anchor && gg.anchor.x != 0.5 && gg.anchor.y != 0.5) {
            this.anchorDelta[0] = (gg.anchor.x - 0.5)*gg.width;
            this.anchorDelta[1] = (gg.anchor.y - 0.5)*gg.height;
            m.rv2fast(this.anchorDelta, g.rotation);
        } else {
            this.anchorDelta[0] = 0;
            this.anchorDelta[1] = 0;
        }
        return ((Math.abs(g.position.x - SCR_WIDTH_HALF - this.anchorDelta[0]) <= this.rect.width + SCR_WIDTH_HALF) && (Math.abs(g.position.y - SCR_HEIGHT_HALF - this.anchorDelta[1]) <= this.rect.height + SCR_HEIGHT_HALF))
    }

    hitAnimation(charPos: Vec2) {
        let pos = [(charPos[0] - this.pos[0]) / 15, (charPos[1] - this.pos[1]) / 15];

        new TweenMax(this, 0.25, {x: this.pos[0] + pos[0], zoom: 1.05, yoyo: true, repeat: 1});
    }


    worldScreenToUI(p: Vec2): Vec2 {
        p[0] -= SCR_WIDTH_HALF * (1 - this.zoom);
        p[1] -= SCR_HEIGHT_HALF * (1 - this.zoom);
        return p;
    }

    transformPoint(point: Vec2, dir: number, pos2: any) {
        pos2[0] = point[0] + (this.delta[0] - this.offset[0])*dir;
        pos2[1] = point[1] + (this.delta[1] - this.offset[1])*dir;
    }
}


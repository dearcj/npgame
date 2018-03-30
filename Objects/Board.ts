import {IO} from "./IO";
import {O} from "./O";
import {Shape, ShapeAmount, ToolBar} from "./ToolBar";
import {_, Linear} from "../main";
import {TextBox} from "./TextBox";
import {Vec2} from "../Math";

export type ShapeOnBoard = {
    Shape: Shape;
    Gfx: PIXI.Sprite;
    StartX: number;
    StartY: number;
    InsideBoard: boolean;
    ShapeAmount: ShapeAmount;
    Rotation: number;
}

export type Point = {
    x: number;
    y: number;
}

export class Board extends O {
    public offsetX: number = 100;
    public offsetY: number = 100;
    public cellsx: number = 12;
    public cellsy: number = 10;
    public cellSize: number = 100;
    draggin: ShapeOnBoard;
    private shapesOnBoard: ShapeOnBoard[] = [];
    private fields: number[][] = [];
    public graphics: PIXI.Graphics;

    getRotatedShape(shape: Shape, rotation: number): Shape {
        let f = shape.fields;
        let c = Math.cos(rotation);
        let s = Math.sin(rotation);

        let rotateClockWise = (f: number[][]): number[][]=> {
            let maxwh = Math.max(f.length, f[0].length);
            let newf = new Array(maxwh);
            for (let i = 0; i < newf.length; i++) {
                newf[i] = new Array(maxwh);
            }

            for (let y = 0; y < f[0].length; y++) {
                for (let x = 0; x < f.length; x++) {
                    let newx = y;
                    let newy = (maxwh - 1) - x;
                    newf[newx][newy] = f[x][y];
                }
            }

            return newf;
        };
        let a = 0;
        while (c != Math.cos(a) || s != Math.sin(a)) {
            a += Math.PI / 2;
            f = rotateClockWise(f);
        }
        return {fields: f, id: shape.id,
            textureName: shape.textureName}
    }

    constructor(p: Vec2, g: any) {
        super(p, g);

        this.gfx = new PIXI.Container();
        _.sm.gui.addChild(this.gfx);
    }

    init(props) {
        super.init(props);

        for (let x = 0; x < this.cellsx; x++) {
            this.fields[x] = [];
            for (let y = 0; y < this.cellsy; y++) {
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

        new _.TweenMax(this.graphics, 1.4, {yoyo: true, repeat: -1, alpha: 0.6, ease: Linear.easeNone})
    }

    tryToPut(draggin: ShapeOnBoard): boolean {
        if (this.canPutHere(draggin.StartX, draggin.StartY, draggin.Shape, draggin.Rotation)) {
            this.SetDragHandlers(draggin);
            this.shapesOnBoard.push(draggin);
            this.putShapeInField(draggin.StartX, draggin.StartY, draggin.Shape, draggin.Rotation);
            draggin.InsideBoard = true;
            this.updateSquare();
            _.sm.findByType(ToolBar)[0].checkSubmit();
            return true;
        } else {
            _.sm.findByType(ToolBar)[0].checkSubmit();
            return false;
        }
    }

    pullShape(s: ShapeOnBoard): boolean {
        console.log("Pulling shape, ", s.StartX, '  ', s.StartY);
        s.InsideBoard = false;
        this.pullShapeFromField(s.StartX, s.StartY, s.Shape, s.Rotation);
        this.updateSquare();
        return true
    }

    align(draggin: ShapeOnBoard) {
        let loc = this.gfx.toLocal(_.cursorPos, _.sm.gui);
        let cx = this.cellSize;
        loc.x = Math.round((loc.x) / cx) * (cx) - cx*0.5;
        loc.y = Math.round((loc.y) / cx) * (cx) - cx*0.5;
        let dragstartx = Math.round((loc.x) / cx ) ;
        let dragstarty = Math.round((loc.y) / cx ) ;

        draggin.StartX = dragstartx;
        draggin.StartY = dragstarty;
        console.log(dragstartx);
        console.log(dragstarty);
        let loc2 = this.gfx.toGlobal(loc);

        draggin.Gfx.position.x = loc2.x;
        draggin.Gfx.position.y = loc2.y;
    }

    private putShapeInField(dragstartx: number, dragstarty: number, Shape: Shape, rot: number) {
        let s = this.getRotatedShape(Shape, rot);
        console.log("Put shape, ", dragstartx, '  ', dragstarty);
        for (let i = 0; i < s.fields.length; i++) {
            for (let j = 0; j < s.fields[i].length; j++) {
                if (s.fields[i][j] > 0)
                this.fields[i + dragstarty][j + dragstartx] = 1;
            }
        }
    }

    private pullShapeFromField(dragstartx: number, dragstarty: number, Shape: Shape, rot: number) {
        let s = this.getRotatedShape(Shape, rot);
        for (let i = 0; i < s.fields.length; i++) {
            for (let j = 0; j < s.fields[i].length; j++) {
                if (s.fields[i][j] > 0)
                    this.fields[i + dragstarty][j + dragstartx] = 0;
            }
        }
    }

    private cross(p:Point, q :Point, r :Point): number {
        let val = (q.y - p.y) * (r.x - q.x) -
            (q.x - p.x) * (r.y - q.y);

        if (val == 0) return 0;  // colinear
        return (val > 0)? 1: 2; // clock or counterclock wise
    }

    private updateSquare() {
        _.game.SetScore(0);
        this.graphics.clear();
        let pointsMap: {[key: string]: boolean} = {};
        let points: Point[] = [];
        for (let x = 0; x < this.cellsx; x++) {
            for (let y = 0; y < this.cellsy; y++) {
                if (this.fields[x][y] == 1) {
                    for (let i = 0; i < 2; i++) {
                        for (let j = 0; j < 2; j++) {
                            if (!pointsMap[(x + i).toString() + ';' + (y + j).toString()]) {
                                let p = {x: x + i, y : y + j};
                                points.push(p);
                                pointsMap[p.x.toString() + ';' + p.y.toString()] = true;
                            }
                        }
                    }
                }
            }
        }
        if (points.length == 0) return;
        //console.log(points);
        let minPointInx = 0;
        let minPoint = points[0];
        let minInx = 0;
        for (let x of points) {
            if (x.x < minPoint.x || (x.x == minPoint.x && minPoint.y > x.y)) {
                minPoint = x;
                minPointInx = minInx;
            }
            minInx ++;
        }
        let result = [];//[minPoint];
        //let inx = points.indexOf(minPoint);
        //points.splice(inx, 1);
        //points.push(minPoint);

        let p = minPointInx;
        let n = points.length;
        while (true) {
            result.push(points[p]);

            let q = (p+1) % n;
            for (let i = 0; i < n; i++)
            {
                // If i is more counterclockwise than current q, then
                // update q
                if (this.cross(points[p], points[i], points[q]) == 2)
                    q = i;
            }

            p = q;

            if (p == minPointInx) {
                break
            }

        }

        this.redrawConvexHull(result);
        let area = 0;
        result.push(result[0]);
        //if (result.length % 2 != 0) {
        result.push(result[1]);
   //     }
        for(let i = 1; i < result.length - 1; i++ )
            area += result[i].x*(result[i+1].y-result[i - 1].y);
        area /= 2;
        _.game.SetScore((Math.round(area)));
        console.log('Area ',area);
    }

    private dist2(p: Point, a: Point) {
        return (p.x - a.x)*(p.x - a.x) + (p.y - a.y)*(p.y - a.y)
    }

    private redrawConvexHull(result: Point[]) {
        this.graphics.clear();
        this.graphics.beginFill(0x222222, 0.3);
        let points :PIXI.Point[] = [];
        for (let x of result) {
            points.push(new PIXI.Point(x.y *this.cellSize, x.x*this.cellSize))
        }
        this.graphics.drawPolygon( points);
        this.graphics.endFill();
    }

    private SetDragHandlers(draggin: ShapeOnBoard) {
        draggin.Gfx.mousedown = () => {
            if (draggin.InsideBoard) {
                this.pullShape(draggin);
            }
            this.draggin = draggin;

            draggin.Gfx.position.x = _.cursorPos.x;
            draggin.Gfx.position.y = _.cursorPos.y;
            this.align(this.draggin);
            _.sm.findByType(ToolBar)[0].checkSubmit();
        };

        draggin.Gfx.mousemove = ()=>{
            if (this.draggin)
            this.align(this.draggin)
        };

        draggin.Gfx.mouseup = (e)=>{
            if (this.tryToPut(this.draggin) == false) {
                let toolbar = _.sm.findByType(ToolBar)[0];
                toolbar.returnShape(this.draggin);
            }
            this.draggin = null;
            _.sm.findByType(ToolBar)[0].checkSubmit();
        };
    }

    private canPutHere(dragstartx: number, dragstarty: number, Shape: Shape, rotation: number): boolean {
        let s = this.getRotatedShape(Shape, rotation);
        for (let i = 0; i < s.fields.length; i++) {
            for (let j = 0; j < s.fields[i].length; j++) {
                if (s.fields[i][j] > 0) {
                    let dx = i + dragstarty;
                    if (dx < 0 || dx >= this.fields.length) return false;
                    let dy = j + dragstartx;
                    if (dy < 0 || dy >= this.fields[dx].length) return false;

                    if (this.fields[dx][dy] > 0) return false;
                }
            }
        }

        return true;
    }
}
import {O} from "./O";
import {Vec2} from "../Math";
import {_, Quad, SCR_WIDTH, TweenMax} from "../main";
import {Board, ShapeOnBoard} from "./Board";
import {TextBox} from "./TextBox";
import {Button} from "./Button";
import {LevelsShapes} from "../Stages/Game";
import {Helper} from "./Helper";

export type Shape = {
    id: number,
    textureName: string;
    fields: number[][];
}

export let ShapeList: { [key: number]: Shape; } = {};

ShapeList[1] = {
    id: 1,
    textureName: "shape1.png",
    fields: [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 1]]
};

ShapeList[2] = {
    id: 2,
    textureName: "shape2.png",
    fields: [[1, 1, 1],
        [0, 1, 0],
        [0, 1, 0]]
};

ShapeList[3] = {
    id: 3,
    textureName: "shape3.png",
    fields: [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 1]]
};

ShapeList[4] = {
    id: 4,
    textureName: "shape4.png",
    fields: [[1, 0],
        [1, 0],
        [1, 0],
        [1, 1]]
};

ShapeList[5] = {
    id: 5,
    textureName: "shape5.png",
    fields: [[1, 1, 0],
             [0, 1, 1],
             [0, 0, 1]]
};

ShapeList[6] = {
    id: 6,
    textureName: "shape6.png",
    fields: [[1, 1, 0],
        [1, 1, 1]]
};


ShapeList[7] = {
    id: 7,
    textureName: "shape7.png",
    fields: [[1,1,1,1,1]]
};

ShapeList[8] = {
    id: 8,
    textureName: "shape8.png",
    fields: [[0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]]};

ShapeList[9] = {
    id: 9,
    textureName: "shape9.png",
    fields: [[1, 1, 0, 0],
        [0, 1, 1, 1],]};

ShapeList[10] = {
    id: 10,
    textureName: "shape10.png",
    fields: [[0, 1, 1],
             [1, 1, 0],
             [0, 1, 0],]};

ShapeList[11] = {
    id: 11,
    textureName: "shape11.png",
    fields: [ [1, 1, 1, 1],
        [0, 1, 0, 0],]};

ShapeList[12] = {
    id: 12,
    textureName: "shape12.png",
    fields: [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 1],]};


export type ShapeAmount = {
    Gfx: PIXI.Sprite,
    Text: PIXI.extras.BitmapText,
    Shape: Shape,
    Amount: number,
    Rotation: number,
}

export class ToolBar extends O {
    toolsContainer: PIXI.Container;
    tween: null;
    itemWidth: number;
    private downPos: { x: number; y: number };
    private page: number;
    check(): any {
        throw new Error("Method not implemented.");
    }

    private tools: ShapeAmount[];

    constructor(pos: Vec2, gfx: PIXI.DisplayObject) {
        super(pos, gfx);
    }

    init(props: any) {
        let prev = this.gfx;
        let p = this.gfx.parent;
        let inx = p.getChildIndex(prev);
        O.rp(prev);
        this.gfx = new PIXI.Container();

        this.gfx.addChild(prev);
        p.addChildAt(this.gfx, inx);
        this.itemWidth = (prev.width - 200) / 3;

        super.init(props);
        this.toolsContainer = new PIXI.Container();
        this.toolsContainer.x = -this.gfx.width / 2;
        this.gfx.addChild(this.toolsContainer);
        let btnSubmit = _.sm.findStringId("btnsubmit");
        btnSubmit.alwaysVisible = true;
        btnSubmit.gfx.visible = false;




        let level = _.game.level;
        let levshapes = LevelsShapes[level - 1];
        let shapes :ShapeAmount[] = [];
        for (let x of levshapes) {
            shapes.push({
                Gfx: null,
                Text: null,
                Shape: ShapeList[x.ShapeID],
                Amount: x.Quantity,
                Rotation: 0,
            })
        }

        this.setTools(shapes);

        let btnNext = <Button>_.sm.findStringId("next");
        let btnPrev = <Button>_.sm.findStringId("prev");

        if (shapes.length <= 3) {
            btnNext.gfx.visible = false;
            btnPrev.gfx.visible = false;
        }
        this.page = 0;

        btnNext.click = () => {
            if (this.page == 1) {
                return
            }
            this.tween = _.killTween(this.tween);
            this.page++;
            this.tween = new TweenMax(this, 0.3, {x: this.x - SCR_WIDTH, ease: Quad.easeOut});
        };

        btnPrev.click = () => {
            if (this.page == 0) {
                return
            }
            this.tween = _.killTween(this.tween);
            this.page--;
            this.tween = new TweenMax(this, 0.3, {x: this.x + SCR_WIDTH, ease: Quad.easeOut});
        };
    }

    alighShapes() {
        let inx = 0;
        for (let x of this.tools) {
            let pos = 180 + Math.floor(inx / 3)*130 + inx * this.itemWidth;
            if (x.Gfx) {
                x.Gfx.x = pos;
                x.Text.x = pos;
                x.Text.y = 50;
            }

            inx++;
        }
    }

    setTools(t: ShapeAmount[]) {
        this.tools = t;
        this.updateList();
    }

    dropShape(shape: Shape) {
    }

    takeShape(shape: Shape) {

    }

    static ResetListeners(gfx: PIXI.Sprite) {
        gfx.touchstart = null;
        gfx.mousedown = null;

        gfx.touchend = gfx.touchendoutside = null;
        gfx.mouseup = gfx.mouseupoutside = null;

        gfx.mousemove = null;
        gfx.touchmove = null;
    }

    private updateList() {
        let board = <Board>(_.sm.findStringId("board"));
        for (let x of this.tools) {
            ((x: ShapeAmount) => {
                if (!x.Gfx) {
                    x.Gfx = _.cs(x.Shape.textureName, this.toolsContainer);
                    x.Gfx.rotation = x.Rotation;
                    let gfx = x.Gfx;
                    let md = (e) => {
                        if (board.draggin && board.draggin.Gfx == gfx) return;
                        this.downPos = {x: e.data.global.x*_.appScale, y: e.data.global.y*_.appScale};
                        board.draggin = {Rotation: x.Rotation, InsideBoard: false, ShapeAmount:x, Shape: x.Shape, StartX: -1, StartY: -1, Gfx: gfx};
                        if (x.Gfx) {
                            x.Gfx = null;
                            x.Amount--;
                        }
                        O.rp(gfx);
                        _.sm.gui.addChild(gfx);
                        this.updateList();
                        board.align(board.draggin, e);
                    };

                    gfx.touchstart = md;
                    gfx.mousedown = md;
                    let mm = (e)=>{
                        if (board.doRemove) {
                            return
                        }
                        if (board.draggin && board.draggin.Gfx == gfx) {
                            board.align(board.draggin, e)
                        }
                      //  board.draggin.draggin = true;

                    };
                    gfx.mousemove = mm;
                    gfx.touchmove = mm;
                    let mu = (e)=>{
                        if (!board.draggin) return;
                      //  board.draggin.draggin = false;
                        if  (Math.sqrt((this.downPos.x - e.data.global.x*_.appScale)*(this.downPos.x - e.data.global.x*_.appScale) +
                            (this.downPos.y - e.data.global.y*_.appScale)*(this.downPos.y - e.data.global.y*_.appScale)) < 30) {
                            x.Rotation += Math.PI/ 2;
                            if (x.Gfx)
                                x.Gfx.rotation = x.Rotation;
                        }
                        if (board.tryToPut(board.draggin) == true) {
                        } else {
                            this.returnShape(board.draggin);
                        }
                        board.draggin = null;
                        this.checkSubmit();
                    };
                    gfx.touchend = gfx.touchendoutside = mu;
                    gfx.mouseup = gfx.mouseupoutside = mu;
                }
                x.Gfx.scale.set(board.gfx.scale.x);
                if (x.Amount > 0) {
                    x.Gfx.interactive = true;
                    x.Gfx.alpha = 1;
                    x.Gfx.tint = 0xffffff;
                } else {
                    x.Gfx.interactive = false;
                    x.Gfx.alpha = 0.5;
                    x.Gfx.tint = 0x555555;
                }

                if (!x.Text)
                    x.Text = TextBox.createTextField({}, {fontscale: 1, text: "", align: "center"});
                x.Text.tint = 0x020202;
                x.Text.text = x.Amount.toString();

                this.toolsContainer.addChild(x.Text)
            })(x);
        }
        this.checkSubmit();

        this.alighShapes();
    }

    public checkSubmit() {
        let allZeroes = true;
        for (let x of this.tools) {
            if (x.Amount > 0) {
                allZeroes = false;
            }
        }
        let board = _.sm.findByType(Board)[0];

        let btnSubmit = _.sm.findStringId("btnsubmit");
        console.log("Zeroes ", allZeroes, " drag ", board.draggin);
        if (allZeroes && !board.draggin && _.game.score <= _.game.limit) {

            new TweenMax(btnSubmit.gfx.scale, 0.18, {x: btnSubmit.gfx.scale.x*1.07, y: btnSubmit.gfx.scale.y*1.07, yoyo: true, repeat: 3});
            _.sm.removeList(_.sm.findByType(Helper));

            btnSubmit.gfx.visible = true;
        } else {
            btnSubmit.gfx.visible = false;
        }
    }

    public returnShape(draggin: ShapeOnBoard) {
        O.rp(draggin.Gfx);
        draggin.ShapeAmount.Amount++;
        this.updateList();
    }
}
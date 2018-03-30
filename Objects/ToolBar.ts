import {O} from "./O";
import {Vec2} from "../Math";
import {_} from "../main";
import {Board, ShapeOnBoard} from "./Board";
import {TextBox} from "./TextBox";
import {Button} from "./Button";

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


export type ShapeAmount = {
    Gfx: PIXI.Sprite,
    Text: PIXI.extras.BitmapText,
    Shape: Shape,
    Amount: number,
    Rotation: number,
}

export class ToolBar extends O {
    private downPos: { x: number; y: number };
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

        super.init(props);

        let btnSubmit = _.sm.findStringId("btnsubmit");
        btnSubmit.alwaysVisible = true;
        btnSubmit.gfx.visible = false;

        (<Button>btnSubmit).click = () => {
            _.game.ShowResModal();
        };
        this.setTools([{
            Gfx: null,
            Text: null,
            Shape: ShapeList[5],
            Amount: 2,
            Rotation: 0,
        }, {
            Gfx: null,
            Text: null,
            Shape: ShapeList[6],
            Amount: 2,
            Rotation: 0,
        }]);
    }

    alighShapes() {
        let inx = 1;
        for (let x of this.tools) {
            if (x.Gfx) {
                x.Gfx.x = inx * 150 - x.Gfx.parent.width / 2;
                x.Text.x = inx * 150 - x.Gfx.parent.width / 2;
                x.Text.y = 30;
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

    private updateList() {
        let board = <Board>(_.sm.findStringId("board"));
        for (let x of this.tools) {
            ((x: ShapeAmount) => {
                if (x.Amount > 0) {
                    if (!x.Gfx) {
                        x.Gfx = _.cs(x.Shape.textureName, this.gfx);
                        x.Gfx.rotation = x.Rotation;
                        let gfx = x.Gfx;
                        gfx.mousedown = () => {
                            this.downPos = {x: _.cursorPos.x, y: _.cursorPos.y};
                            board.draggin = {Rotation: x.Rotation, InsideBoard: false, ShapeAmount:x, Shape: x.Shape, StartX: -1, StartY: -1, Gfx: gfx};
                            if (x.Gfx) {
                                x.Gfx = null;
                                x.Amount--;
                            }
                            O.rp(gfx);
                            _.sm.gui.addChild(gfx);
                            this.updateList();
                            board.align(board.draggin)
                        };

                        gfx.mousemove = ()=>{
                            if (board.draggin && board.draggin.Gfx == gfx) {
                                board.align(board.draggin)
                            }
                        };

                        gfx.mouseup = ()=>{
                            if  (Math.sqrt((this.downPos.x - _.cursorPos.x)*(this.downPos.x - _.cursorPos.x) +
                            (this.downPos.y - _.cursorPos.y)*(this.downPos.y - _.cursorPos.y)) < 30) {
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
                    }
                    x.Gfx.interactive = true;
                    x.Gfx.scale.set(board.gfx.scale.x);
                }

                if (!x.Text)
                    x.Text = TextBox.createTextField({}, {text: "", align: "center"});
                x.Text.tint = 0x020202;
                x.Text.text = x.Amount.toString();

                this.gfx.addChild(x.Text)
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
        if (allZeroes && !board.draggin) {
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
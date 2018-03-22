import {O} from "./Objects/O";
import {Vec2} from "./Math";

export class TileObject {
    public occupiedBy: O;
    rectPos: Vec2;
    rectSize: Vec2;
    x: number;
    y: number;
    typeShortcut: number; //used only if occupied by == null
}


export class TileMap{
    public tileWidth: number;
    public tileHeigth: number;
    public tileOffsetX: number;
    public tileOffsetY: number;
    public offset: Vec2; //level coordinate offset offset

    public columns: number = 0;
    public rows: number = 0;
    private objects: Array<TileObject> = [];

    public changeOccupy(x: number, y: number, obj: O){
        this.objects[x*this.columns + y].occupiedBy = obj
    }

    public get(x: number, y: number): TileObject{
        return this.objects[y*this.columns + x]
    }

    constructor (columns: number, rows: number, tw: number, th: number, offset){
        this.offset = offset;
        this.tileWidth = tw;
        this.tileHeigth = th;
        this.columns = columns;
        this.rows = rows;
        for (let i = 0; i < rows*columns; ++i) {
            let o  = new TileObject();
            o.x = Math.floor(i% this.columns);
            o.y = Math.floor(i / this.columns);
            o.rectPos = [o.x * tw + offset[0], o.y * th + offset[1]];
            o.rectSize = [tw, th];

            this.objects[i] = o;
        }

    }

}



import {IO} from "../Objects/IO";
import {_} from "../main";
import DisplayObject = PIXI.DisplayObject;
import {O} from "../Objects/O";
/**
 * Created by MSI on 04.01.2017.
 */

export class Stage {
    visible: boolean;
    doProcess: boolean;
    public currentFocus: number = null;
    private focusable: Array<IO> = [];
    private container: PIXI.Container = new PIXI.Container();
    public layers: Object = {}; //MAP OF PIXI CONTAINERS

    setFocusable(f: Array<IO>): void {
        this.focusable = f;
    }

    addControllerHandlers(): void{

    }

    process() {
    };

    onHide(newStage: Stage) {
        _.sm.removeObjects();
        _.sm.main.removeChild(this.container);
    };

    onShow() {
        _.sm.main.addChild(this.container);
        //this.addControllerHalders();
    };

    addLayer(name: string, l: any): any {
        if (l) {
            this.layers[name] = l;
        } else {
            this.layers[name] = new PIXI.Container();
        }

        this.container.addChild(this.layers[name]);
        return this.layers[name];
    }

    addToLayer(s: string, d: DisplayObject) {
        let l = this.layers[s];
        if (!l) {
            l = this.addLayer(s, null);
        }
        l.addChild(d);
    }
}
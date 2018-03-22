import {O} from "./O";
import {Vec2} from "../Math";
import { MIN_SCR_HEIGHT, MIN_SCR_WIDTH} from "../ClientSettings";
import {_} from "../main";

/**
 * Created by KURWINDALLAS on 17.11.2014.
 */
export class Aligner extends O {
    private crossed: Vec2 = [0, 0];

    init(props: any) {
        super.init(props);


        if (this.x - this.width / 2 < _.screenCenterOffset[0]) {
            this.crossed[0] = -1;
        }

        if (this.x + this.width / 2 > _.screenCenterOffset[0] + MIN_SCR_WIDTH) {
            this.crossed[0] = 1;
        }

        if (this.y - this.height / 2 < _.screenCenterOffset[1]) {
            this.crossed[1] = -1;
        }

        if (this.y + this.height / 2 > _.screenCenterOffset[1] + MIN_SCR_HEIGHT) {
            this.crossed[1] = 1;
        }

        let objectsUnderAligner = this.collectObjectsUnder(this);
        console.log("Objects under: ", objectsUnderAligner.length);

        let deltaX = _.screenCenterOffset[0] * this.crossed[0];
        let deltaY = _.screenCenterOffset[1] * this.crossed[1];

        for (let x of objectsUnderAligner) {
            x.x += deltaX;
            x.y += deltaY;
        }

    }

    process() {
        //this.gfx.x = 0;//c.offset[0] + this.initPos[0];
        //this.gfx.y = 0;//c.offset[1] + this.initPos[1];
    }

    private collectObjectsUnder(o: O): O[] {
        let res = [];

        for (let x of _.lm.objectsList) {
            if (x != o && (x.layer == _.sm.gui || x.layer == _.sm.gui2) && x.intersects(o)) {
                res.push(x);
            }
        }

        return res;
    }
}
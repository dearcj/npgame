import {Stage} from "./Stage";
import {_} from "../main";
import {Button} from "../Objects/Button";

export class Menu extends Stage {
    onShow() {
        super.onShow();
        _.lm.load(this, 'menu', null);
        (<Button>_.sm.findStringId("btnnew")).click = ()=>{
            _.sm.openStage(_.game)
        };
    }
}
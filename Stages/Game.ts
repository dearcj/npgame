import {Stage} from "./Stage";
import {_} from "../main";
import {O} from "../Objects/O";
import {Button} from "../Objects/Button";
import {TextBox} from "../Objects/TextBox";

export class Game extends Stage {
    private resModal: Array<O>;
    private score: number = 0;
    secs: number = 0;
    private timeInterval: any;
    onShow() {
        super.onShow();
        _.lm.load(this, 'game', null);

        this.secs = 0;
        this.updateTime();
        this.timeInterval = _.sm.camera.setInterval(()=>{
            this.secs++;
            this.updateTime();
        }, 1);
    }
    CloseResModal() {
        _.sm.removeList(this.resModal);
    }

    onHide(s: Stage) {
        super.onHide(s);

        this.timeInterval = _.killTween(this.timeInterval)
    }
    ShowResModal() {
        this.resModal = _.lm.load(_.game, 'modal', null);
        let btnClose = _.sm.findStringId("btncancel", this.resModal);
        let win = _.sm.findStringId("scorewin", this.resModal);
        (<TextBox>win).text = this.score.toString();
        (<Button>btnClose).click = () => {
            this.CloseResModal();
        };

        let btnSubmit = _.sm.findStringId("btnsubmit", this.resModal);
        (<Button>btnSubmit).click = () => {
            this.CloseResModal();
        };


    }

    SetScore(x: number) {
        this.score = x;
        if (x == 0)
            (<TextBox>_.sm.findStringId("score")).text = ''; else
        (<TextBox>_.sm.findStringId("score")).text = this.AddZeroes(x);
    }

    private AddZeroes(x: number) : string {
        if (x < 10) return '00' + x.toString();
        if (x < 100) return '0' + x.toString();
        return x.toString();
    }

    private updateTime() {
        let mins = Math.floor(this.secs / 60);
        let secs = this.secs % 60;
        (<TextBox>_.sm.findStringId("time")).text = mins + ":" +  (secs > 10 ? secs.toString() : "0" + secs.toString());

    }
}
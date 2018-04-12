import {Stage} from "./Stage";
import {$, _, SCR_WIDTH, SCR_WIDTH_HALF} from "../main";
import {O} from "../Objects/O";
import {Button} from "../Objects/Button";
import {TextBox} from "../Objects/TextBox";
import {Helper} from "../Objects/Helper";
import {okpost, twpost, vkpost} from "../Socials";

type LevelShape = {
    ShapeID: number,
    Quantity: number,
}

export let LevelsShapes: Array<Array<LevelShape>> = [
    [
        {
            ShapeID: 5,
            Quantity: 1,
        },
        {
            ShapeID: 6,
            Quantity: 1,
        }
    ],
    [
        {
            ShapeID: 10,
            Quantity: 1,
        },
        {
            ShapeID: 5,
            Quantity: 1,
        },
        {
            ShapeID: 9,
            Quantity: 1,
        }
    ],
    [
        {
            ShapeID: 1,
            Quantity: 1,
        },
        {
            ShapeID: 2,
            Quantity: 1,
        },
        {
            ShapeID: 3,
            Quantity: 1,
        },
        {
            ShapeID: 4,
            Quantity: 1,
        }
    ]];

export class Game extends Stage {
    private resModal: Array<O>;
    public score: number = 0;
    secs: number = 0;
    level: number = 1;
    private timeInterval: any;
    public limit: number = 0;


    submitScore(s: number, social_id: string, name: string, last_name: string) {
        if (s == 0) return;
        $.post( "http://localhost:80/index.php", { func: "submit", score: s.toString(), social_id: social_id, name: name, last_name: last_name   })
            .done(( data ) => {

            });
    }

    onShow() {
        super.onShow();
        _.lm.load(this, 'game', null);

        let btnSubmit = _.sm.findStringId("btnsubmit");
        (<Button>btnSubmit).textField.tint = 0x111111;
        (<Button>btnSubmit).prevTextTint = 0x111111;
        (<Button>btnSubmit).click = () => {
            if (this.level == 3) {
                _.game.ShowResModal();
            } else {
                this.level++;
                _.sm.openStage(_.game);
            }
        };

        let btnReset = _.sm.findStringId("btnreset", this.resModal);
        (<Button>btnReset).click = () => {
            _.sm.openStage(_.game);
        };
        let lev = _.sm.findStringId("lev", this.resModal);
        (<TextBox>lev).text = this.level.toString();
        this.secs = 0;
        this.updateTime();
        this.timeInterval = _.sm.camera.setInterval(() => {
            this.secs++;
            this.updateTime();
        }, 1);
        this.limit = 1000;

        if (this.level == 1) {
            this.limit = 11;
        }

        if (this.level == 2) {
            this.limit = 18;
        }


        if (this.level == 1 || this.level == 2) {
            let helper = new Helper([SCR_WIDTH / 2, 180]);
            helper.init({})
        }
    }

    CloseResModal() {
        _.sm.removeList(this.resModal);
    }

    onHide(s: Stage) {
        this.timeInterval = _.killTween(this.timeInterval);
        super.onHide(s);

    }

    ShowResModal() {
        this.timeInterval = _.killTween(this.timeInterval);

        this.resModal = _.lm.load(_.game, 'modal', null);
        let btnClose = _.sm.findStringId("btncancel", this.resModal);
        let win = _.sm.findStringId("scorewin", this.resModal);
        let ending = this.score % 10;
        let xxx = 'клеток';
        if (ending == 1) xxx = 'клетку';
        if (ending == 2 || ending == 3 || ending == 4 ) xxx = 'клетки';
        (<TextBox>win).text = 'в ' + this.score.toString() + ' ' + xxx;

        let vk = <Button>_.sm.findStringId("btnvk", this.resModal);
        let tw = <Button>_.sm.findStringId("btntw", this.resModal);
        let ok = <Button>_.sm.findStringId("btnok", this.resModal);
        let fb = <Button>_.sm.findStringId("btnfb", this.resModal);
        vk.click = () => {
            vkpost("tessssst");
        };

        ok.click = () => {
            okpost("tessssst");
        }

        tw.click = () => {
            twpost("tessssst");
        }

        /*(<Button>btnClose).click = () => {
            this.CloseResModal();
        };*/

        //    let btnSubmit = _.sm.findStringId("btnsubmit", this.resModal);
        //    (<Button>btnSubmit).click = () => {
        //        this.CloseResModal();
        //    };
    }

    SetScore(x: number) {
        this.score = x;
        if (x == 0)
            (<TextBox>_.sm.findStringId("score")).text = ''; else
            (<TextBox>_.sm.findStringId("score")).text = this.AddZeroes(x);
    }

    private AddZeroes(x: number): string {
        if (x < 10) return '00' + x.toString();
        if (x < 100) return '0' + x.toString();
        return x.toString();
    }

    private updateTime() {
        let mins = Math.floor(this.secs / 60);
        let secs = this.secs % 60;
        let time = _.sm.findStringId("time");
        (<TextBox>time).text = mins + ":" + (secs > 10 ? secs.toString() : "0" + secs.toString());
    }
}
import {Stage} from "./Stage";
import {$, _, SCR_HEIGHT, SCR_WIDTH, SCR_WIDTH_HALF} from "../main";
import {O} from "../Objects/O";
import {Button} from "../Objects/Button";
import {TextBox} from "../Objects/TextBox";
import {Helper} from "../Objects/Helper";
import {fbpost, okpost, twpost, vkpost} from "../Socials";
import {API_PHP_FILE} from "./Menu";

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
            ShapeID: 10,
            Quantity: 2,
        },
        {
            ShapeID: 12,
            Quantity: 2,
        },
        {
            ShapeID: 9,
            Quantity: 2,
        },
        {
            ShapeID: 5,
            Quantity: 1,
        }
    ]];

export class Game extends Stage {
    whiteSpace: PIXI.Graphics;
    private resModal: Array<O>;
    public score: number = 0;
    secs: number = 0;
    level: number = 1;
    private timeInterval: any;
    public limit: number = 0;


    submitScore(s: number, social_id: string, name: string, last_name: string) {
        if (s == 0) return;
        $.post( API_PHP_FILE, { func: "submit", score: s.toString(), social_id: social_id, name: name, last_name: last_name   })
            .done(( data ) => {

            });
    }

    onShow() {
        super.onShow();
        _.lm.load(this, 'game', null);
        let btnMenu = _.sm.findStringId("menu");
       (<Button>btnMenu).click = () => {
            _.sm.openStage(_.menu);
        };
        let btnSubmit = _.sm.findStringId("btnsubmit");
        (<Button>btnSubmit).textField.tint = 0x111111;
        (<Button>btnSubmit).prevTextTint = 0x111111;

        let btnReset = _.sm.findStringId("btnreset");
        (<Button>btnReset).click = () => {
            _.sm.openStage(_.game);
        };

        O.rp(btnMenu.gfx);
        _.sm.gui2.addChild(btnMenu.gfx);
        O.rp(btnReset.gfx);
        _.sm.gui2.addChild(btnReset.gfx);

        (<Button>btnSubmit).click = () => {
            if (this.level == 3) {
                _.game.ShowResModal();
            } else {
                this.level++;
                _.sm.openStage(_.game);
            }
        };

        let lev = _.sm.findStringId("lev");
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


        if (this.level == 1 || this.level == 2 || this.level == 3) {
            let helper = new Helper([SCR_WIDTH / 2, 180]);
            helper.init({})
        }

        this.whiteSpace= new PIXI.Graphics();
        this.whiteSpace.x = 0;
        this.whiteSpace.clear();
        this.whiteSpace.beginFill(0xffffff,1);
        this.whiteSpace.drawRect(SCR_WIDTH, 0, 300, SCR_HEIGHT);
        this.whiteSpace.endFill();
        _.sm.gui.addChild(this.whiteSpace);



        // _.game.ShowResModal();
    }

    CloseResModal() {
        _.sm.removeList(this.resModal);
    }

    onHide(s: Stage) {
        this.whiteSpace = O.rp(this.whiteSpace);
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
            vkpost(`Упакуй меня, если сможешь!
Эта математическая игра будет покруче 2048`);
        };

        fb.click = () => {
            fbpost("");
        };

        let g = _.cs("btnton1.png");
        g.scale.x = 1.5;
        g.scale.y = 1.5;
        let btnTON = new Button(_.sm.findStringId("btntonpos").pos, g);
        btnTON.init({text:"N+1", fontscale: 0.7,});
        (<Button>btnTON).click = () => {
            window.open((<any>window).LINK_TO_SOCIAL);
        };

        _.sm.gui2.addChild(btnTON.gfx);
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
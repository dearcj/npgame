import {Stage} from "./Stage";
import {$, _} from "../main";
import {Button} from "../Objects/Button";
import {TextBox} from "../Objects/TextBox";
import {vkpost} from "../Socials";

export let API_PHP_FILE = (<any>window).API_PHP_FILE;
export class Menu extends Stage {

    addLine(inx: number, data: any) {
        if (_.sm.stage != this) return;
        let tbname = new TextBox([180, 580 + inx * 60]);
        tbname.init({ text: data.name + (data.lastname != "")?(" " + data.lastname):""});
        let tbscore = new TextBox([570, 580 + inx * 60]);
        tbscore.init({align: "right", text: data.score.toString()});

    }

    getLeaderboard() {
        $.post( API_PHP_FILE, { func: "leaderboard" })
            .done(( data ) => {
                let d = JSON.parse(data);
                let inx = 0;
                for (let x of d) {
                    if (inx > 10) break;
                    this.addLine(inx, d[inx]);
                    inx++;
                }///
            });
    }

    onShow() {
        super.onShow();
        _.lm.load(this, 'menu', null);
        (<Button>_.sm.findStringId("btnnew")).click = ()=>{
           // vkpost("lalalal");
            _.sm.openStage(_.game)
        };
        if ((<any>window).RESULT_MODAL_IN_MENU) {
            _.game.score = 999;
            _.game.ShowResModal();
        }

        this.getLeaderboard();
    }
}
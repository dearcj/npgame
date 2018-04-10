import {Stage} from "./Stage";
import {$, _} from "../main";
import {Button} from "../Objects/Button";
import {TextBox} from "../Objects/TextBox";

export class Menu extends Stage {
    addLine(inx: number, data: any) {
        let tbname = new TextBox([180, 580 + inx * 60]);
        tbname.init({ text: data.name + (data.lastname != "")?(" " + data.lastname):""});
        let tbscore = new TextBox([570, 580 + inx * 60]);
        tbscore.init({align: "right", text: data.score.toString()});

    }

    getLeaderboard() {
        $.post( "http://localhost:80/index.php", { func: "leaderboard" })
            .done(( data ) => {
                let d = JSON.parse(data);
                let inx = 0;
                for (let x of d) {
                    this.addLine(inx, d[inx]);
                    inx++;
                }///

                //    alert( "Data Loaded: " + data );
            });
    }

    onShow() {
        _.game.submitScore(22, "test", "test", "test");
        super.onShow();
        _.lm.load(this, 'menu', null);
        (<Button>_.sm.findStringId("btnnew")).click = ()=>{
            _.sm.openStage(_.game)
        };

        this.getLeaderboard();
    }
}
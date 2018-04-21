import {O} from "./O";
import {_, TweenMax} from "../main";
import {TextBox} from "./TextBox";

export class Helper extends O {
    bg: PIXI.Sprite;
    private text1: PIXI.extras.BitmapText;
    private flowTween: any;

    init(props: any) {
        super.init(props);

        this.gfx = new PIXI.Container();
        _.sm.gui2.addChild(this.gfx);
        this.bg = _.cs('barbg.png', this.gfx);
        this.bg.alpha = 0.6;
        this.bg.scale.x = 1.8;
        this.bg.scale.y = 0.6;
        if (_.game.level == 1) {
            this.text1 = TextBox.createTextField({}, {text: `Перетащите фигуры так,
чтобы их общая площадь была равна ` + _.game.limit.toString(), fontscale: 0.5, align: 'center'});
            this.text1.x = 0;
            this.text1.y = -50;

        }

        if (_.game.level == 2) {
            this.text1 = TextBox.createTextField({}, {text: `Нажмите на фигуру, чтобы развернуть ее
и попробуйте уместиться в ` + _.game.limit.toString() + ' клеток', fontscale: 0.5, align: 'center'});
            this.text1.x = 0;
            this.text1.y = -50;
        }


        if (_.game.level == 3) {
            this.text1 = TextBox.createTextField({}, {text: `А теперь разложи фигуры как можно компактнее
и поделись результатом с друзьями` , fontscale: 0.5, align: 'center'});
            this.text1.x = 0;
            this.text1.y = -50;
        }

        this.text1.tint = 0x444444;
        this.gfx.addChild(this.text1);
        this.gfx.interactive = true;
        this.gfx.click = this.gfx.tap = ()=>{
            this.killNow();
        }
        this.flowTween = new TweenMax(this.bg.scale, 0.8, {x: this.bg.scale.x*1.04, y: this.bg.scale.y*1.04, yoyo: true,repeat: -1});
    }

    onDestroy() {
        super.onDestroy();

        this.flowTween = _.killTween(this.flowTween)
    }
}
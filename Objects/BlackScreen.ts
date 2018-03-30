import {O} from "./O";
import {_, SCR_HEIGHT, SCR_WIDTH} from "../main";
/**
 * Created by KURWINDALLAS on 17.11.2014.
 */
export class BlackScreen extends O{

    init(props: any) {
        if (props.gfx) {
            this.gfx = _.cs(props.gfx);
            this.gfx.x = SCR_WIDTH / 2;
            this.gfx.y = SCR_HEIGHT / 2;
            this.gfx.width = SCR_WIDTH;
            this.gfx.height = SCR_HEIGHT;
            this.gfx.alpha = 0.;
            new _.TweenMax(this.gfx, 0.35, {alpha: 0.9});
        } else {
            this.gfx = new PIXI.Graphics();
            this.gfx.clear();
            this.gfx.alpha = 0;
            new _.TweenMax(this.gfx, 0.35, {alpha: 0.7});
            this.gfx.beginFill(0x222222, 1);
            this.gfx.drawRect(0,0,SCR_WIDTH,SCR_HEIGHT);
            this.gfx.endFill();
            this.gfx.blendMode = PIXI.BLEND_MODES.MULTIPLY;
        }
        this.gfx.interactive = true;
        this.layer.addChild(this.gfx);
    }

    process() {

    }
}
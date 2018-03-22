import {O} from "./O";
import {Camera} from "./Camera";
import {m, Vec2} from "../Math";
import {_, SCR_WIDTH, SCR_HEIGHT, SCR_HEIGHT_HALF, SCR_WIDTH_HALF} from "../main";
import DisplayObject = PIXI.DisplayObject;


interface BaseParticle  {
    lifeTime: number,
    x: number,
    y: number
    alpha: number;
}

export class BaseParticleSystem extends O{
    protected particles: BaseParticle[] = [];
    public doOProcess: boolean = true;

    add<T extends BaseParticle>(p: T, gfx: DisplayObject): any {
        this.particles.push(p);
        this.gfx.addChild(gfx);
        this.processParticle(this.particles.length - 1, _.delta);

        return p;
    }

    init( props: any): void{
        super.init(props);
        this.width = SCR_WIDTH;
        this.height = SCR_HEIGHT;
        this.gfx = new PIXI.particles.ParticleContainer(300, {
            scale: true,
            position: true,
            rotation: true,
            uvs: true,
            tint: true,
            alpha: true,
        });

        this.layer.addChild(this.gfx);
    }

    onDestroy(): void{
        super.onDestroy();
    }

    processParticle(i: number, delta: number) {

    }

    processParticles(timeDelta: number) {
        let len = this.particles.length;
        for (let i = 0; i < len; ++i) {
            let part = this.particles[i];
            part.lifeTime -= timeDelta;
            this.processParticle(i, timeDelta);

            if (part.lifeTime < 0) {
                this.particles.splice(i, 1);
                this.gfx.removeChildAt(i);
                i--;
                len--;
            }
        }
    }

    process() {
        if (this.doOProcess)
        super.process();

        this.processParticles(_.deltaSec * _.timeScale);

        //TODO: WEIRD OVERRIDE VISIBLE
        this.gfx.visible = ((Math.abs(this.gfx.x- SCR_WIDTH_HALF + this.width / 2) <= this.width / 2 + SCR_WIDTH_HALF) &&
            (Math.abs(this.gfx.y - SCR_HEIGHT_HALF) <= this.height / 2 + SCR_HEIGHT_HALF));
    }
}
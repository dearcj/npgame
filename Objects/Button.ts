import {IO} from "./IO";
import {TextBox} from "./TextBox";
import {_} from "../main";

/**
 * Created by MSI on 08.01.2017.
 */

declare let Elastic: any;
declare let Linear: any;
declare let TweenMax: any;
declare let CubicBezier: any;
const UIEase = CubicBezier.config(0.46, 0.53, 0.93, 0.3);
const CLICK_STEP = 3;
export class Button extends IO {
    prevGfxTint: number = 0xffffff;
    prevTextTint: number = 0xffffff;
    public fadeOnMouseDown: boolean = true;
    private _downTween: any;
    private _upTween: any;
    private __highlight: any;

    get customOut(): Function {
        return this._customOut;
    }

    set customOut(value: Function) {
        this._customOut = value;
        this.toggleHoverAnimation(this.hoverMode);
    }

    get customOver(): Function {
        return this._customOver;
    }

    set customOver(value: Function) {
        this.toggleHoverAnimation(this.hoverMode);
        this._customOver = value;
    }

    private baseScale: Array<number> = [0, 0];
    private _customOver: Function;
    private _customOut: Function;
    public doScale: boolean = true;
    public clickAnimation: boolean = true;
    public customMouseDown: Function;
    public customMouseUp: Function;

    process() {
        super.process();
    }

    toggleHoverAnimation(m: boolean) {
        super.toggleHoverAnimation(m);

        this.gfx.mouseover = this.overAnimation.bind(this);
        this.gfx.mouseout = this.outAnimation.bind(this);

    }

    overAnimation(evt) {
        if (this.hoverMode) {
            if (this.doScale) {
                _.TweenMax.killTweensOf(this.gfx.scale);

                new _.TweenMax(this.gfx.scale, 0.08, {y: this.baseScale[1] + 0.015, ease: UIEase});
                new _.TweenMax(this.gfx.scale, 0.08, {x: this.baseScale[0] + 0.015, ease: UIEase});
            }


        }
        if (this._customOver) this._customOver();

    }

    outAnimation(evt) {
        if (this.hoverMode) {
            if (this.doScale) {
                new _.TweenMax(this.gfx.scale, 0.15, {
                    x: this.baseScale[0],
                    y: this.baseScale[1],
                    ease: Linear.easeOut
                });
            }

            this.resetFade();
        }
        if (this._customOut) this._customOut();

    }

    init(props: any) {
        super.init(props);

        if (!props) props = {text: "", align: "center"};

        this.gfx.interactive = true;
        props.align = 'center';
        if (this.gfx.anchor) {
            this.gfx.anchor.x = 0.5;
            this.gfx.anchor.y = 0.5;
        }
        this.textField = TextBox.createTextField(this, props);
        this.text = this.text;
        let b = this.textField.getLocalBounds();
        this.textFieldOffsetX = -this.width / 2;
        this.textFieldOffsetY = 0 - this.textField.textHeight * .25;

        if (this.isClip)
            (<PIXI.extras.MovieClip>this.gfx).gotoAndStop(0);

        let tf = this.textField;
        let f = this.gfx;

        this.baseScale[0] = f.scale.x;
        this.baseScale[1] = f.scale.y;

        this.gfx.mousedown = (evt) => {
            if (this.hoverMode) {
                if (this.customMouseDown) this.customMouseDown();

                if (this.fadeOnMouseDown) {

                    this.prevTextTint = this.textField.tint;
                    this.prevGfxTint = this.gfx.tint;

                    this.gfx.tint = 0x888888;
                    this.textField.tint = 0x888888;
                }

                if (this.clickAnimation) {
                    this._upTween = _.killTween( this._upTween);
                    this._downTween = new _.TweenMax(this, 0.1, {y: this.y + CLICK_STEP, ease: Linear.easeIn});
                }
            }
        };

        this.gfx.mouseup = (evt) => {
            if (this.hoverMode) {
                if (this.customMouseUp) this.customMouseUp();

                this.resetFade();
            }
        };

        this.toggleHoverAnimation(true);
        this.gfx.addChild(this.textField);
        this.gfx.cursor = "pointer";
        this.text = this.text;
      //  this.gfx.position.x = this.x;
      //  this.gfx.position.y = this.y;
    }

    onDestroy() {
        super.onDestroy();

        this._downTween = _.killTween(this._downTween);
        this._upTween = _.killTween(this._upTween);

        if (this.gfx) {
            this.gfx.mouseover = null;
            this.gfx.mouseout = null;
            this.gfx.mousedown = null;
        }
    }

    updateHitArea(w: number = null, h: number = null) {
        let p = this.gfx.getGlobalPosition();
        this.gfx.hitArea = new PIXI.Rectangle(-w / 2, -h / 2, w ? w : this.gfx.width, h ? h : this.gfx.height);
    }

    highlight() {
        let loop = 0;
        if (this.__highlight)
            this.__highlight = _.killTween(this.__highlight);

        this.__highlight = this.setInterval(() => {
            loop += 0.38;
            let angle = 0.5 * (_.fMath.cos(loop) + 1);
            //this.gfx.color.setDark(0.4 * angle, 0.3 * angle, 0.05 * angle);
            //   this.gfx.color.setLight(1,1, 0.4*angle);
        }, 0);
        this.wait(0.12).call(() => {
           // this.gfx.color.setDark(0, 0, 0);
            //  this.gfx.color.setLight(1,1,1);
            this.__highlight = _.killTween(this.__highlight);
        }).apply();
    }

    private resetFade() {
        if (this.clickAnimation) {
            if (this._downTween) {
                this._downTween = _.killTween(this._downTween);
                this._upTween = new _.TweenMax(this, 0.1, {y: this.y-CLICK_STEP, ease: Linear.easeOut});
            }
        }

        if (this.fadeOnMouseDown) {
            this.textField.tint = this.prevTextTint;
            this.gfx.tint = 0xffffff;
        }
    }
}
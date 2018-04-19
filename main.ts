import {Sound} from "./Sound";
import {PauseTimer} from "./PauseTimer";
import {LM} from "./lm";
import {Vec2} from "./Math";
import {ResourceManager} from "./ResourceManager";
import {LevelNames} from "./ObjectsList";
import {CAMERA_DEBUG, DEBUG_EFFECTS, FRAME_DELAY, MIN_SCR_HEIGHT, MIN_SCR_WIDTH, SKIP_MENU} from "./ClientSettings";
import {SM} from "./Stages/SM";
import {Menu} from "./Stages/Menu";
import {Game} from "./Stages/Game";
//asdasdasd
declare let window: any;
declare let Stats: any;
export type PIXIContainer = any;
export type PIXIRectangle = any;
declare let Playtomic: any;
export let $: any = window.$;

const GLOBAL_MUSIC_ASSETS = [];

const GLOBAL_SOUND_ASSETS = [
    //////////////////////////////////////////
    //  Music
    //////////////////////////////////////////
];//

const GLOBAL_ASSETS = [
    ///////////////////////////////////////////
    // Spine
    ///////////////////////////////////////////


    ///////////////////////////////////////////
    // Atlases
    ///////////////////////////////////////////

    'atlas/tiles1.json',

    ///////////////////////////////////////////
    // Fonts
    ///////////////////////////////////////////
    'fonts/main-export.xml',
    'fonts/font2-export.xml',


    ///////////////////////////////////////////
    //  Shaders
    ///////////////////////////////////////////
];

export let Bounce = window.Bounce;
export let Linear = window.Linear;
export let Quad = window.Quad;
export let Power3 = window.Power3;
export let Power2 = window.Power2;
export let Sine = window.Sine;
export let Elastic = window.Elastic;

export let FMath = window.FMath;

export let SCR_WIDTH = 720;//SCR_WIDTH;
export let SCR_HEIGHT = 1280;//SCR_HEIGHT;

export let SCR_WIDTH_HALF; //recalc later
export let SCR_HEIGHT_HALF; //recalc later
export let TweenMax = window.TweenMax;

export class Main {
    engine: any;
    public activeTab: boolean = true;
    public timer: PauseTimer = new PauseTimer();


    private lastLoop: number = 0;
    private totalFrames: number = 0;
    private totalDelta: number = 0;
    public time: number;

    //analytics
    private country: string;
    private avgFPS: number;
    private avgPing: number;
    private loadTime: number;
    public fMath = new FMath(null);

    private preloadBar: PIXI.Graphics;
    menu: Menu = new Menu();
    game: Game = new Game();

    public onContext: Function;
    public __DIR: string;
    public TweenMax: any = window.TweenMax;
    public TimelineMax: any = window.TimelineMax;
    public PIXI: any;
    public rm: ResourceManager;
    public sm: SM;
    public lm: LM;
    public renderer: any;
    public camera: any;
    public app: PIXI.Application;
    public worldSpeed: number = 1;
    public debug: boolean = true;
    public sound: Sound;
    public cursor: PIXI.Sprite;
    isInitialLoading: boolean = true;
    assets: Array<string>;
    assetsLoaded: number = 0;
    delta: number = 0;
    public random: number;
    public stats: any;
    private loadingCounter: number = 0;
    screenCenterOffset: Vec2;
    public cursorPos: PIXI.Point;
    public globalMouseDown: Function;
    private bindedAnimate: FrameRequestCallback;
    public appScale = 1;
    public lastNetworkPing: number;
    public timeScale: number = 1;
    private statsPIXIHook: any;
    lostFocus: number;
    public deltaSec: number = 0.01;


    constructor() {
        this.__DIR = location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1);
    }

    cm(s: string, layer: PIXIContainer = null, autoplay: boolean = false, times: number[] = null): PIXI.extras.AnimatedSprite { //create sprite from frame and add to default layer
        let textures = [];
        let keys: Array<string> = [];
        for (let key in PIXI.utils.TextureCache) {
            if (key.indexOf(s) == 0) {
                keys.push(key);
            }
        }

        let inx = 0;
        for (let key of keys) {
            if (times) {
                textures.push({texture: PIXI.utils.TextureCache[key], time: times[inx] ? times[inx] : 1});
            } else {
                textures.push(PIXI.utils.TextureCache[key]);
            }
            inx++;
        }

        let gfx = new PIXI.extras.AnimatedSprite(textures);
        gfx.anchor.x = 0.5;
        gfx.anchor.y = 0.5;

        if (layer)
            layer.addChild(gfx);

        if (autoplay) {
            gfx.gotoAndPlay(0)
        }

        return gfx;
    }

    csproj(s: string, layer: PIXIContainer = null): any {
        let texture = PIXI.Texture.fromFrame(s);
        let gfx = new PIXI.Sprite(texture);
        gfx.anchor.x = .5;
        gfx.anchor.y = .5;
        if (layer)
            layer.addChild(gfx); else {
        }

        return gfx
    }

    cs(s: string, layer: PIXIContainer = null): PIXI.Sprite { //create sprite from frame and add to default layer
        if (!PIXI.utils.TextureCache[s]) {
            console.log("@@@@Can't find ", s);
            return null;
        }

        let texture = PIXI.Texture.fromFrame(s);
        texture = texture ? texture : PIXI.Texture.fromFrame(s + '.png');
        if (texture) {
            let gfx = new PIXI.Sprite(texture);
            gfx.anchor.x = .5;
            gfx.anchor.y = .5;
            if (layer)
                layer.addChild(gfx); else {
            }
            return gfx
        } else {
            console.log("@@@@Can't find ", s);
            return null;
        }

    }

    _(s: string) {
        return this.sm.findStringId(s)
    }

    static GET(url: string, cb: Function) {
        let xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                cb(xmlHttp.responseText);
            }
        };
        xmlHttp.open("GET", url, true); // true for asynchronous
        xmlHttp.send(null);
    }

    setScreenRes(baseW: number, baseH: number) {
        //this.appScale = baseH / MIN_SCR_HEIGHT;
        //if (this.appScale > 1.28) this.appScale = 1.28;
        //SCR_WIDTH = baseW / this.appScale;
        //SCR_HEIGHT = baseH / this.appScale;
        //SCR_WIDTH_HALF = SCR_WIDTH * .5;
        //SCR_HEIGHT_HALF = SCR_HEIGHT * .5;
        //this.screenCenterOffset = [(SCR_WIDTH - MIN_SCR_WIDTH) * .5, (SCR_HEIGHT - MIN_SCR_HEIGHT) * .5];
        this.screenCenterOffset = [0, 0];
    }


    start() {
        document.addEventListener('contextmenu', (event) => {
            if (this.onContext) this.onContext();
            event.preventDefault()
        });


        this.setScreenRes(SCR_WIDTH, SCR_HEIGHT);
        //TweenMax.lagSmoothing(0);
        let ratio = window.PIXIRatio ? window.PIXIRatio : 1;

        this.app = new PIXI.Application(SCR_WIDTH, SCR_HEIGHT, {
            autoStart: true,
            clearBeforeRender: true,
            resolution: ratio, antialias: false,
            preserveDrawingBuffer: false, forceFXAA: true, backgroundColor: 0xffffff,
        });
        document.body.appendChild(this.app.view);


        this.camera = new PIXI.Container();
        this.camera.x = 0;
        this.camera.y = 0;
        // TODO: camera


        this.app.stage = new PIXI.Container();
        this.sm = new SM();
        this.sm.init();
        //this.app.stage.position.set(this.app.renderer.width/2, this.app.renderer.height/2);
        //this.app.stage.scale.set(ratio, ratio);

        this.lm = new LM();
        this.sm.createCamera();
        this.lastLoop = (new Date()).getTime();
        this.lastNetworkPing = this.lastLoop;

        this.bindedAnimate = this.animate.bind(this);
        this.app.ticker.add(this.bindedAnimate);
    };

    loadComplete(): void {
        this.isInitialLoading = false;
        this.loadTime = (new Date()).getTime() - window.startTime.getTime();

        this.clearPreloader();

        const interaction = this.app.renderer.plugins.interaction;
        document.addEventListener('mousedown', (e) => {
            if (this.globalMouseDown) this.globalMouseDown(e), false
        });

       // this.app.stage.pivot.set(this.app.renderer.width, this.app.renderer.height);

        /*interaction.cursorStyles["init"] = "url(/game/cursors/cursor.png), default";
        interaction.cursorStyles["default"] = "url(/game/cursors/cursor.png), default";
        interaction.cursorStyles["pointer"] = "url(/game/cursors/hand.png), pointer";
        interaction.cursorStyles["skill"] = "url(/game/cursors/cursor_skill.png), pointer";
        interaction.currentCursorMode = "init";
        this.app.stage.interactive = true;
        this.app.stage.cursor = "init";*/

        this.sm.openStage(this.menu);
    }

    initPreloader() {
        this.preloadBar = new PIXI.Graphics();
        this.app.stage.addChild(this.preloadBar);

        const borderWidth = 3;
        this.preloadBar.beginFill(0x000000);
        this.preloadBar.moveTo(SCR_WIDTH * 0.1 - borderWidth, SCR_HEIGHT * 0.495 - borderWidth);
        this.preloadBar.lineTo(SCR_WIDTH * 0.9 + borderWidth, SCR_HEIGHT * 0.495 - borderWidth);
        this.preloadBar.lineTo(SCR_WIDTH * 0.9 + borderWidth, SCR_HEIGHT * 0.505 + borderWidth);
        this.preloadBar.lineTo(SCR_WIDTH * 0.1 - borderWidth, SCR_HEIGHT * 0.505 + borderWidth);
        this.preloadBar.endFill();
    }

    drawPreloaderProgress(progressPercent: number): void {
        this.preloadBar.beginFill(0x000000);
        const progress = progressPercent / 100;
        this.preloadBar.moveTo(SCR_WIDTH * 0.1, SCR_HEIGHT * 0.495);
        this.preloadBar.lineTo(SCR_WIDTH * 0.1 + SCR_WIDTH * 0.8 * progress, SCR_HEIGHT * 0.495);
        this.preloadBar.lineTo(SCR_WIDTH * 0.1 + SCR_WIDTH * 0.8 * progress, SCR_HEIGHT * 0.505);
        this.preloadBar.lineTo(SCR_WIDTH * 0.1, SCR_HEIGHT * 0.505);
        this.preloadBar.endFill();
    }

    clearPreloader() {
        this.app.stage.removeChild(this.preloadBar);
    }

    load(): void {
        this.loadingCounter = 0;
        this.initPreloader();
        let onAssetsLoaded = () => {
            this.loadingCounter++;
            if (this.loadingCounter == 2) this.loadComplete()
        };

        this.rm = new ResourceManager();
        this.rm.loadAssets(GLOBAL_ASSETS.concat(LevelNames), (loader: any, evt: any) => {
            this.drawPreloaderProgress(loader.progress);

            this.assetsLoaded++;

        }, onAssetsLoaded);

        this.sound = new Sound();
        this.sound.load(GLOBAL_MUSIC_ASSETS, GLOBAL_SOUND_ASSETS, onAssetsLoaded);
    }

    animate(): void {
        // this.stats.begin();
        this.timer.process();
        this.random = Math.random();
        this.time = (new Date()).getTime();

        this.cursorPos = this.app.renderer.plugins.interaction.mouse.global;

        if (!this.isInitialLoading) {
            let timeD = (this.time - this.lastLoop);
            this.lastLoop = this.time;
            this.deltaSec = timeD / 1000.;
            this.delta = timeD / FRAME_DELAY;
            this.totalDelta += this.delta;
            this.totalFrames++;
            this.sm.process();
        }
    }

    killTween(tween: any): null {
        if (tween && tween.totalProgress() != 1)
            tween.totalProgress(1).kill();
        return null
    }



    addFilter(m: PIXI.Container, x: PIXI.Filter<any>) {
        let mm: any = <any>(m);
        if (!mm._filters) mm._filters = [];
        mm._filters.push(x);
    }
    removeFilterByType(main: PIXI.Container, ftype: any) {
        let m = <any>main;
        if (!m._filters) return;
        for (let x = m._filters.length - 1; x>=0; x--) {
            if (m._filters[x] instanceof ftype) {
                m._filters.splice(x, 1);
            }
        }
    }

    removeFilter(main: PIXI.Container, f: PIXI.Filter<any>) {
        let m = <any>main;
        m._filters.splice(_.sm.main.filters.indexOf(f), 1);
    }
}


export var _: Main = new Main();

_.start();
_.load();
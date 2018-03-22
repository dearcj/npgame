/**
 * Created by MSI on 04.01.2017.
 */
import {m} from "./Math";

declare var Howl:any;
const SOUND_PATH = 'sound/';
const MUSIC_PATH = 'music/';

type LazyLoadRequest = {
    cb: Function
}

export class Sound {
    constructor() {

    }

    private sounds: Object;
    private _enabled:boolean = true;
    private loaded:number = 0;
    private total:number = 0;
    private musicInstanceName:string;
    private musicInstance:any = null;
    public ready:boolean = false;
    public soundsPlaying: Array<any> = [];
    public loadingCallbacks: Array<any> = [];

    public get enabled() {
        return this._enabled;
    }

    public set enabled(e) {
        this._enabled = e;
    }

    lazyPlayMusic(fullName: string, volume: number = null, pos: number = null): any {
        let o: LazyLoadRequest = {cb: null};

        let cb = (sound) => {
            let found = false;
            let inx: number = -1;
            for (let i = 0; i < this.loadingCallbacks.length; ++i) {
                if (this.loadingCallbacks[i] == o) {
                    inx = i;
                    found = true;
                    break;
                }
            }
            if (!found) return;
            this.loadingCallbacks.splice(inx, 1);


            if (pos) sound.seek(pos);
            if (volume) sound.volume(volume);

            this.play(null, sound);
        };

        o.cb = cb;
        this.loadingCallbacks.push(o);

        this.loadOneSound(MUSIC_PATH + fullName, cb)
    }

    lazyPlaySound(fullName: string): any {
        this.loadOneSound(SOUND_PATH + fullName, (sound) => {
            this.play(null, sound);
        })
    }

    stopAll(){
        for (let x of this.soundsPlaying) {
            x.stop()
        }

        this.loadingCallbacks = [];
    }


    loadOneSound(s: string, cb: Function): void{
        let noExt = s.split("/").pop().replace(/\.[^/.]+$/, "");
        noExt = noExt.toLowerCase();
        let sound = new Howl({
            src: s,
            autoplay: false,
            loop: false,
            volume: 1,
        });

        this.sounds[noExt] = sound;

        this.sounds[noExt].once('load', () => {
            cb(sound);
        });
    }

    load(musicAssets:Array<string>, soundAssets:Array<string>, cb:Function) {
        this.sounds = {};
        let c = 0;
        for (let x of musicAssets) {
            this.loadOneSound(MUSIC_PATH + x, function(){
                c ++;
                if (c == soundAssets.length + musicAssets.length) {
                    cb();
                }
            })
        }

        for (let x of soundAssets) {
            this.loadOneSound(SOUND_PATH + x, function(){
                c ++;
                if (c == soundAssets.length + musicAssets.length) {
                    cb();
                }
            })
        }


        if (c == soundAssets.length + musicAssets.length) {
            cb();
        }

        /*createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);

        createjs.Sound.alternateExtensions = ["mp3"];

        this.enabled = createjs.Sound.initializeDefaultPlugins();


        if (!this.enabled) {
            cb(this);
            return;
        }

        this.loaded = 0;
        this.total = manifest.length;

        createjs.Sound.on("fileload", () => {
            this.loaded++;
            console.log("ZSound loaded " + this.loaded.toString() + " / " + manifest.length.toString());
            if (this.loaded == manifest.length) {
                this.ready = true;
                cb();
            }
        }); // call handleLoad when each sound loads

        createjs.Sound.registerSounds(manifest, path);*/
    }


    playMusic(snd:string) {
     /*   if (this.musicInstanceName == snd && this.musicInstance) return;
        if (this.musicInstance) {
            createjs.Sound.stop(this.musicInstance);
        }

        try {
            this.musicInstanceName = snd;
            this.musicInstance = createjs.Sound.play(snd, {interrupt: createjs.Sound.INTERRUPT_NONE, loop: 999999});
        } catch (e) {
        }*/
    }

    unmute() {
       /* if (this.enabled) return;
        this.enabled = true;

        createjs.Sound.setMute(false);*/
    }

    mute() {
        /*this.enabled = false;

        createjs.Sound.setMute(true);*/
    }

    playRandom(arr: string[]){
        this.play(m.getRand(arr))
    }

    play(snd: string, sndObj: any = null) {
        if (!this.enabled) return;
        snd = snd.toLowerCase();
        try {
            let soundObj = sndObj ? sndObj : this.sounds[snd];
            soundObj.play();
            this.soundsPlaying.push(soundObj);
            soundObj.on('end', () => {
                this.soundsPlaying.splice(this.soundsPlaying.indexOf(soundObj) , 1);
            });
        } catch (e) {
        }
    };

}



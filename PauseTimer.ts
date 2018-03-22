import {_, Main} from "./main";

export class PauseTimer {
    private paused: boolean = false;
    private pauseStart: number = 0;
    private totalPauseTime: number = 0;
    private intervals: Array<any> = [];
    private timeouts: Array<any> = [];

    public since(time: number): number {
        return this.getTimer() - time
    }

    public process() {
   /*     let i = 0;
        let l = this.intervals.length;
        while (i < l) {
            let x = this.intervals[i];
            if (this.getTimer() - x.start > x.delay) {
                let r = x.f();
                x.start = this.getTimer();

                if (r < 0) {
                    console.log("Removed interval");
                    this.intervals.splice(i, 1);
                    i--;
                    l--;
                }
            }

            i++
        }

        i = 0;
        l = this.timeouts.length;
        while (i < l) {
            let x = this.timeouts[i];
            if (this.getTimer() - x.start > x.delay) {
                x.f();

                this.timeouts.splice(i, 1);
                i--;
                l--;
            }
            i++
        }*/
    }

    public removeListener(f: any) {
        for (let i = 0; i < this.intervals.length; ++i) {
            if (this.intervals[i] == f) {
                this.intervals.splice(i, 1);
                i--;
            }
        }

        for (let i = 0; i < this.timeouts.length; ++i) {
            if (this.timeouts[i] == f) {
                this.timeouts.splice(i, 1);
                i--;
            }
        }
    }

   /* public setTimeout(f: Function, delay: number): any {
        let obj = {f: f, delay: delay, start: this.getTimer()};
        this.timeouts.push(obj);
        return obj;
    }

    public setInterval(f: Function, delay: number): any {
        let obj = {f: f, delay: delay, start: this.getTimer()};
        this.intervals.push(obj);
        return obj;
    }
*/

    public getTimer() {
        return _.time - this.totalPauseTime;
    }

    public isPaused() {
        return this.paused;
    }

    public pause() {
        this.pauseStart = _.time;
        _.TweenMax.pauseAll();
        this.paused= true;
    }

    public resume() {
        if (!this.paused) return;
        this.totalPauseTime += (_.time - this.pauseStart);
        _.TweenMax.resumeAll();
        this.paused = false;
    }
}




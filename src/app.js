class Stopwatch {
    duration = 0;
    durationMs = 0;
    interval;

    get duration() {
        return this.duration;
    }

    start = () => {
        this.interval = setInterval(() => {
            this.durationMs += 100;
            // Get seconds with milliseconds for output
            this.duration = `${Math.floor(this.durationMs / 1000)}.${
                (this.durationMs % 1000) / 100
            }s`;
            console.log(this.duration);
        }, 100);
    };

    stop = () => {
        clearInterval(this.interval);
    };

    reset = () => {
        this.stop();
        this.duration = 0;
    };
}

// test

const sw = new Stopwatch();
sw.start();

setTimeout(() => {
    console.log(sw.duration);
    setTimeout(() => {
        sw.stop();
        setTimeout(() => {
            sw.start();
            setTimeout(() => {
                sw.reset();
                console.log(sw.duration);
            }, 5000);
        }, 5000);
    }, 5000);
}, 5000);

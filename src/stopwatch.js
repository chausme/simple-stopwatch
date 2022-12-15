class Stopwatch {
    #timerDuration = 0;

    #durationMs = 0;

    #interval;

    #timeEl = document.querySelector('.time');

    #btnStart = document.querySelector('.actions .btn[data-action="start"]');

    #btnStop = document.querySelector('.actions .btn[data-action="stop"]');

    #btnReset = document.querySelector('.actions .btn[data-action="reset"]');

    get duration() {
        return this.timerDuration;
    }

    init = () => {
        // @todo refactor
        this.#btnStart.addEventListener('click', this.start);
        this.#btnStop.addEventListener('click', this.stop);
        this.#btnReset.addEventListener('click', this.reset);
    };

    start = () => {
        this.#btnStart.setAttribute('disabled', 'disabled');
        this.#btnStop.removeAttribute('disabled');
        this.#interval = setInterval(() => {
            this.#durationMs += 100;
            // get seconds with milliseconds for output
            this.#timerDuration = `${Math.floor(this.#durationMs / 1000)}.${
                (this.#durationMs % 1000) / 100
            }`;
            this.#timeEl.textContent = this.#timerDuration;
        }, 100);
    };

    stop = () => {
        clearInterval(this.#interval);
        this.#btnStart.removeAttribute('disabled');
        this.#btnStop.setAttribute('disabled', 'disabled');
    };

    reset = () => {
        this.stop();
        this.#timerDuration = 0;
        this.#durationMs = 0;
        this.#timeEl.textContent = '0.0';
        this.#btnStart.removeAttribute('disabled');
        this.#btnStop.removeAttribute('disabled');
    };
}

export default Stopwatch;

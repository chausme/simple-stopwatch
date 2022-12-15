class Stopwatch {
    #timerDuration = 0;

    #durationMs = 0;

    #interval;

    #timeEl = document.querySelector('.time');

    #actions = ['start', 'stop', 'reset'];

    #btns = this.#actions.reduce(
        (acc = {}, action) => ({
            ...acc,
            [action]: document.querySelector(`.actions .btn[data-action="${action}"]`),
        }),
        []
    );

    get duration() {
        return this.timerDuration;
    }

    init = () => {
        for (const [action, el] of Object.entries(this.#btns)) {
            el.addEventListener('click', this[action]);
        }
    };

    start = () => {
        this.#btns['start'].setAttribute('disabled', 'disabled');
        this.#btns['stop'].removeAttribute('disabled');
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
        this.#btns['start'].removeAttribute('disabled');
        this.#btns['stop'].setAttribute('disabled', 'disabled');
    };

    reset = () => {
        this.stop();
        this.#timerDuration = 0;
        this.#durationMs = 0;
        this.#timeEl.textContent = '0.0';
        this.#btns['start'].removeAttribute('disabled');
        this.#btns['stop'].removeAttribute('disabled');
    };
}

export default Stopwatch;

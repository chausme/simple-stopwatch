class Stopwatch {
    #timerDuration = 0;

    #durationMs = 0;

    #interval;

    #is_started = false;

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
        try {
            if (this.#is_started) {
                throw new Error('Stopwatch already started');
            }
            // start and set interval
            this.#interval = setInterval(() => {
                this.#durationMs += 100;
                // get seconds with milliseconds for output
                this.#timerDuration = `${Math.floor(this.#durationMs / 1000)}.${
                    (this.#durationMs % 1000) / 100
                }`;
                this.#timeEl.textContent = this.#timerDuration;
            }, 100);
            this.#is_started = true;
            // update action buttons
            this.#btns['start'].setAttribute('disabled', 'disabled');
            this.#btns['stop'].removeAttribute('disabled');
        } catch (e) {
            console.error(e);
        }
    };

    stop = () => {
        try {
            if (!this.#is_started) {
                throw new Error('Stopwatch is stopped already');
            }
            // stop and remove interval
            clearInterval(this.#interval);
            this.#is_started = false;
            // update action buttons
            this.#btns['start'].removeAttribute('disabled');
            this.#btns['stop'].setAttribute('disabled', 'disabled');
        } catch (e) {
            console.error(e);
        }
    };

    reset = () => {
        try {
            // stop and remove interval
            clearInterval(this.#interval);
            this.#is_started = false;
            // reset to defaults
            this.#timerDuration = 0;
            this.#durationMs = 0;
            this.#timeEl.textContent = '0.0';
            // update action buttons
            this.#btns['start'].removeAttribute('disabled');
            this.#btns['stop'].removeAttribute('disabled');
        } catch (e) {
            console.error(e);
        }
    };
}

export default Stopwatch;

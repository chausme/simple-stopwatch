class Stopwatch {
    #duration = 0;

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
                this.#duration += 100;
                // get minutes
                let minutes = this.#duration / 1000 / 60;
                // output time
                this.#timeEl.innerHTML = `${
                    minutes > 1 ? `${Math.floor(minutes)}<span>m</span>` : ''
                }${Math.floor(
                    minutes > 1 ? (this.#duration % (60 * 1000)) / 1000 : this.#duration / 1000
                )}.${(this.#duration % 1000) / 100}<span>s</span>`;
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
            this.#duration = 0;
            this.#timeEl.innerHTML = '0.0<span>s</span>';
            // update action buttons
            this.#btns['start'].removeAttribute('disabled');
            this.#btns['stop'].removeAttribute('disabled');
        } catch (e) {
            console.error(e);
        }
    };
}

export default Stopwatch;

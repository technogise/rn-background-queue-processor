/**
 * Queue processor will handle all the queue related functions
 */
export default class QueueProcessor {
    /**
     * Initialize queue
     */
    constructor() {
        this.queue = null;
        this.currentJob = null;
    }

    /**
     * Starting point of queue processing
     *
     * @param queueObj  Queue object
     */
    start(queueObj) {
        this.queue = queueObj;
        this.currentJob = !this.queue.isEmpty() ? this.queue.peek() : null;
        if (!this.queue.isEmpty()) {
            this.processJob();
        }
    }

    /**
     * Execute the current job
     */
    processJob() {
        if (this.currentJob) {
            this.currentJob.execute(
                this.onJobSuccess.bind(this),
                this.onJobFail.bind(this)
            );
        }
    }

    /**
     * Define job success behaviour
     */
    onJobSuccess() {
        this.queue.dequeue();
        if (this.queue.isEmpty()) {
            this.currentJob = null;
            return;
        }
        this.currentJob = this.queue.peek();
        this.processJob();
    }

    /**
     * Handle on failure event for job execution
     */
    onJobFail(response) {
        this.queue.dequeue();
        // eslint-disable-next-line no-console
        console.error('error', response);
        if (this.queue.isEmpty()) {
            this.currentJob = null;
            return;
        }
        this.currentJob = this.queue.peek();
        this.processJob();
    }
}

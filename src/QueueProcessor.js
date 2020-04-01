import defaultConfigs from '../config/defaultConfigs';
import Queue from "./Queue";

/**
 * Queue processor will handle all the allQueues related functions
 */
export default class QueueProcessor {
    /**
     * Initialize allQueues
     */
    constructor() {
        this.queue = null;
        this.currentJob = null;
        this.failedQueue = null;
    }

    /**
     * Starting point of allQueues processing
     *
     * @param queueObj  Queue object
     */
    start(queueObj) {
        this.queue = queueObj;
        if (this.failedQueue === null) {
            const failedQueueDbAdapter = queueObj.adapter.__proto__.constructor;
            this.failedQueue = new Queue(new failedQueueDbAdapter());
        }
        this.currentJob = !this.queue.isEmpty() ? this.queue.peek() : null;
        if (!this.queue.isEmpty()) {
            this.processJob();
        }
    }

    /**
     * Execute the current job
     */
    processJob(tryCount = 1) {
        if (this.currentJob) {
            this.currentJob.execute(
                this.onJobSuccess.bind(this),
                this.onJobFail.bind(this, tryCount)
            );
        }
    }

    /**
     * Define job success behaviour
     */
    onJobSuccess(response) {
        this.currentJob.jobSuccess(response);
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
    onJobFail(retryCount, response) {
        const {maxRetries,retryInterval} = defaultConfigs;
        if (retryCount < maxRetries) {
            retryCount += 1;
            setTimeout(() => this.processJob(retryCount), retryInterval);
            return;
        }
        if (retryCount >= maxRetries){
            this.currentJob.jobFail(response);
            //enqueue in failed queue and then dequeue
            this.failedQueue.enqueue(this.currentJob);
            this.queue.dequeue();
            console.log('error response on fail:- ', response);
            if (this.queue.isEmpty()) {
                this.currentJob = null;
                return;
            }
            this.currentJob = this.queue.peek();
            this.processJob();
        }
    }
}

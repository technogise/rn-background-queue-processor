import QueueProcessor from "./QueueProcessor";

/**
 * Worker class
 */
export default class Worker {

    /**
     * Constructor for worker
     */
    constructor() {
        if (Worker.instance) {
            // throw new Error('Instance already exists');
            return Worker.instance;
        }

        Worker.instance = this;
        this.queueProcessor = new QueueProcessor();
        return this;
    }

    /**
     * Process method
     * @param queue
     */
    process(queue) {
        this.queueProcessor.start(queue);
    }

}

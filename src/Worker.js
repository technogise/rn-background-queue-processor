import QueueProcessor from "./QueueProcessor";

/**
 * Worker class
 */
export default class Worker {

    /**
     * Constructor for worker
     */
    constructor(queue=[]) {
        if (Worker.instance) {
            return Worker.instance;
        }

        Worker.instance = this;
        this.allQueues = queue;
        this.queueProcessor = new QueueProcessor();
        return this;
    }

    /**
     * Process method
     */
    process() {
        this.allQueues.forEach((currentQueue) => this.queueProcessor.start(currentQueue));
    }

    /**
     * Method to add allQueues
     * @param queue
     */
    addQueue(queue){
        this.allQueues.push(queue);
    }

}

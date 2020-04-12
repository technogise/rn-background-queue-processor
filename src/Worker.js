import QueueProcessor from "./QueueProcessor";
import { DeviceEventEmitter, NativeModules } from 'react-native';
import {EVENT_START_PROCESSING_QUEUE} from "./utils/Common";

const { SyncModule } = NativeModules;
/**
 * Worker class
 */
export default class Worker {

    /**
     * Start processing job type
     *
     * @return {string}
     * @constructor
     */
    static get START_PROCESSING_JOB() {
        return 'STARTPROCESSINGJOB';
    }

    /**
     * Constructor for worker
     */
    constructor(queue=[]) {
        DeviceEventEmitter.addListener(EVENT_START_PROCESSING_QUEUE, this.syncPackagesUpListener.bind(this));
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
        this.scheduleJob(Worker.START_PROCESSING_JOB);
    }

    /**
     * Schedule job
     * @param job
     */
    scheduleJob(job) {
        SyncModule.scheduleJob(job);
    }

    /**
     * Sync packages up listener
     */
    syncPackagesUpListener() {
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

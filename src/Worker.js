import QueueProcessor from "./QueueProcessor";
import { DeviceEventEmitter, NativeModules } from 'react-native';
import {EVENT_START_PUSH_SYNC} from "./utils/Common";

const { SyncModule } = NativeModules;
/**
 * Worker class
 */
export default class Worker {

    /**
     * Sync up job type
     *
     * @return {string}
     * @constructor
     */
    static get SYNC_UP_JOB_TYPE() {
        return 'SYNCUPJOB';
    }
    /**
     * Constructor for worker
     */
    constructor(queue=[]) {
        DeviceEventEmitter.addListener(EVENT_START_PUSH_SYNC, this.syncPackagesUpListener);
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
        this.scheduleJob(Worker.SYNC_UP_JOB_TYPE);
    }

    /**
     * Schedule job type
     * @param jobType
     */
    scheduleJob(jobType) {
        SyncModule.scheduleJob(jobType);
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

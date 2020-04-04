import Common from "./utils/Common";

/**
 * Job class
 */
export default class Job {
    /**
     * Job constructor
     * @constructor
     */
    constructor(dbJob) {
        this.initializeJob(dbJob);
    }

    /**
     * job initialization
     *
     * @param dbJob
     */
    initializeJob(dbJob) {
        this.job = dbJob;
        this.job.id = dbJob.id ? dbJob.id : Common.generateUUID();
        this.job.priority = dbJob.priority
            ? ( (dbJob.priority >= 1 && dbJob.priority <= 10) ? dbJob.priority : 10)
            : 10;
        this.job.retryInterval = dbJob.retryInterval ? dbJob.retryInterval : 2000;
        this.job.maxRetries = dbJob.maxRetries ? dbJob.maxRetries : 5;
    }

    /**
     * Get Job primary key
     */
    getId() {
        return this.job.id;
    }

    /**
     * Get Job name
     */
    getName() {
        return this.job.name;
    }

    /**
     * Get Param name
     */
    getParam(){
        return this.job.param;
    }

    /**
     * Get Job priority
     */
    getPriority(){
        return this.job.priority;
    }

    /**
     * Get retry interval
     */
    getRetryInterval() {
        return this.job.retryInterval;
    }

    /**
     * get max retries
     */
    getMaxRetries() {
        return this.job.maxRetries;
    }

    /**
     * job execute method
     */
    execute() {
        throw new Error('execute method not defined for this job');
    }

    /**
     * job success method
     */
    jobSuccess() {

    }

    /**
     * job fail method
     */
    jobFail() {

    }
}

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
        this.job = dbJob;
        this.job.id = dbJob.id ? dbJob.id : Common.generateUUID();
        this.job.priority = dbJob.priority
            ? ( (dbJob.priority >= 1 && dbJob.priority <= 10) ? dbJob.priority : 10)
            : 10;
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

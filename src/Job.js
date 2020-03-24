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
        this.job.id = Common.generateUUID();
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

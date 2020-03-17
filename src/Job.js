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
    execute(successCallback, failureCallback) {
        throw new Error('execute method not defined for this job');
    }

}


import Realm from 'realm';

/**
 * Schema for Job
 */
export default class FailedJobSchema extends Realm.Object {
    /**
     * Table name
     *
     * @return {string} table name
     * @constructor
     */
    static get NAME() {
        return 'FailedJobs';
    }

    /**
     * Job id column
     *
     * @return {string}
     * @constructor
     */
    static get COLUMN_ID() {
        return 'id';
    }

    /**
     * Priority column
     *
     * @return {string}
     * @constructor
     */
    static get COLUMN_PRIORITY() {
        return 'priority';
    }

    /**
     * Job name column
     *
     * @return {string}
     * @constructor
     */
    static get COLUMN_NAME() {
        return 'name';
    }


    /**
     * param column
     *
     * @return {string}
     * @constructor
     */
    static get COLUMN_PARAM() {
        return 'param';
    }
}

FailedJobSchema.schema = {
    name: FailedJobSchema.NAME,
    primaryKey: FailedJobSchema.COLUMN_ID,
    properties: {
        [FailedJobSchema.COLUMN_ID]: 'string',
        [FailedJobSchema.COLUMN_NAME]: 'string',
        [FailedJobSchema.COLUMN_PARAM]: 'string',
        [FailedJobSchema.COLUMN_PRIORITY]: 'int',
    },
};

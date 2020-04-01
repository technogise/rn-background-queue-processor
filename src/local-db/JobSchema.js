import Realm from 'realm';

/**
 * Schema for Job
 */
export default class JobSchema extends Realm.Object {
    /**
     * Table name
     *
     * @return {string} table name
     * @constructor
     */
    static get NAME() {
        return 'jobs';
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

JobSchema.schema = {
    name: JobSchema.NAME,
    primaryKey: JobSchema.COLUMN_ID,
    properties: {
        [JobSchema.COLUMN_ID]: 'string',
        [JobSchema.COLUMN_NAME]: 'string',
        [JobSchema.COLUMN_PARAM]: 'string',
        [JobSchema.COLUMN_PRIORITY]: 'int',
    },
};

import _ from 'underscore';
/**
 * Realm mock
 */
export default class Realm {
    /**
     * Realm mock constructor
     * @param schema
     */
    constructor(schema) {
        this.schema = schema;
        this.schemaName = null;
        this.sorted = jest.fn();
        this.objectMethodImpl = {
            filtered: jest.fn().mockReturnValue({}),
        };
        this.create = jest.fn();
        this.delete = jest.fn();
    }

    /**
     * Set sorted mock collection
     *
     * @param unsortedCollection Collection to be sorted
     * @param sortBy  Column name on which sorting should be performed
     */
    setSortedMockCollection(unsortedCollection, sortBy) {
        this.objectMethodImpl = {
            sorted: jest.fn().mockReturnValue(_.sortBy(unsortedCollection, sortBy)),
        };
    }

    /**
     * Objects mock method
     *
     * @param schemaName
     * @return {{filtered: JestMockFn.<*, *>}|*}
     */
    objects(schemaName) {
        this.schemaName = schemaName;
        return this.objectMethodImpl;
    }

    /**
     * set realm db objects
     * @param objects
     */
    setObjects(objects) {
        this.objectMethodImpl = objects;
    }

    /**
     * Write mock method
     *
     * @param transactionCallback
     */
    write(transactionCallback) {
        transactionCallback();
    }

    /**
     * Clear mock for all the methods
     */
    mockClear() {
        _.mapObject(this.objectMethodImpl, (value) => {
            value.mockClear();
        });
        this.create.mockClear();
        this.delete.mockClear();
    }
}
Realm.Object = class Object {};

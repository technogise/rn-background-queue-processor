import RealmAdapter from "../../../src/DbAdapter/RealmAdapter";
import Job from "../../../src/Job";
import realmdb from '../../../realmConfig';
import JobSchema from "../../../src/local-db/JobSchema";

describe('Test RealmAdapter', () => {
    test('should test addItem', (done) => {
        const adapter = new RealmAdapter();
        const jobToBeCreated1 = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
            priority: 1,
        };
        const job1 = new Job(jobToBeCreated1);
        const jobToBeCreated2 = {
            id: 'testid',
            name: 'testJob2',
            param: {'a':1},
        };
        const job2 = new Job(jobToBeCreated2);
        adapter.addItem(job1);
        adapter.addItem(job2);
        const entity1 = {
            [JobSchema.COLUMN_ID]: jobToBeCreated1.id,
            [JobSchema.COLUMN_NAME]: jobToBeCreated1.name,
            [JobSchema.COLUMN_PARAM]: JSON.stringify(jobToBeCreated1.param),
            [JobSchema.COLUMN_PRIORITY]: jobToBeCreated1.priority,
        };
        const entity2 = {
            [JobSchema.COLUMN_ID]: jobToBeCreated2.id,
            [JobSchema.COLUMN_NAME]: jobToBeCreated2.name,
            [JobSchema.COLUMN_PARAM]: JSON.stringify(jobToBeCreated2.param),
            [JobSchema.COLUMN_PRIORITY]: jobToBeCreated2.priority,
        };
        setTimeout(() => {
            expect(realmdb.create).toHaveBeenCalledTimes(2);
            expect(realmdb.create).toHaveBeenCalledWith(
                JobSchema.NAME, entity1
            );
            expect(realmdb.create).toHaveBeenCalledWith(
                JobSchema.NAME, entity2
            );
            done();
        });
    });

    test('should test remove', () => {
        const adapter = new RealmAdapter();
        const jobToBeCreated1 = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
            priority: 1,
        };
        const job1 = new Job(jobToBeCreated1);
        const jobToBeCreated2 = {
            id: 'testid',
            name: 'testJob2',
            param: {'a':1},
        };
        const job2 = new Job(jobToBeCreated2);
        adapter.addItem(job1);
        adapter.addItem(job2);
        adapter.remove(jobToBeCreated1.id);
        expect(realmdb.delete).toHaveBeenCalledTimes(1);
    });

    test('should test getLength', () => {
        realmdb.setObjects([{
            id: '87897',
            name: 'test',
            param: 'jhhggfh',
            priority: 1,
        }, {
            id: '877',
            name: 'test',
            param: 'jhhggfh',
            priority: 1,
        }]);
        const adapter = new RealmAdapter();
        const len = adapter.getLength();
        expect(len).toBe(2);
    });

    test('should getAllItem', () => {
        const jobToBeCreated1 = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
            priority: 1,
        };
        const jobToBeCreated2 = {
            id: 'testid',
            name: 'testJob2',
            param: {'a':1},
            priority: 2,
        };
        realmdb.setObjects([jobToBeCreated1, jobToBeCreated2]);
        const adapter = new RealmAdapter();
        const items = adapter.getAllItems();
        expect(items).toEqual([jobToBeCreated1, jobToBeCreated2]);
    });
});


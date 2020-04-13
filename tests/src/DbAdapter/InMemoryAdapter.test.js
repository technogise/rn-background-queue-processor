import InMemoryAdapter from "../../../src/DbAdapter/InMemoryAdapter";
import Job from "../../../src/Job";

describe('Test InMemoryAdapter', () => {
    test('should test getAllItems', () => {
        const adapter = new InMemoryAdapter();
        const actual = adapter.getAllItems();
        expect(actual).toEqual([]);
    });

    test('should test remove', () => {
        const adapter = new InMemoryAdapter();
        const jobToBeCreated1 = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
        };
        const job1 = new Job(jobToBeCreated1);
        const jobToBeCreated2 = {
            id: 'testid',
            name: 'testJob2',
            param: {'a':1},
        };
        const job2 = new Job(jobToBeCreated2);
        const jobToBeCreated3 = {
            id: 'testid',
            name: 'testJob3',
            param: {'a':1},
        };
        const job3 = new Job(jobToBeCreated3);
        adapter.addItem(job1);
        adapter.addItem(job2);
        adapter.addItem(job3);
        adapter.remove();
        const remainingItems = adapter.getAllItems();
        expect(remainingItems).toEqual([job2, job3]);
        expect(remainingItems).not.toContain(job1);
    });

    test('should test addItem', () => {
        const adapter = new InMemoryAdapter();
        const jobToBeCreated1 = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
        };
        const job1 = new Job(jobToBeCreated1);
        const jobToBeCreated2 = {
            id: 'testid',
            name: 'testJob2',
            param: {'a':1},
        };
        const job2 = new Job(jobToBeCreated2);
        const jobToBeCreated3 = {
            id: 'testid',
            name: 'testJob3',
            param: {'a':1},
        };
        const job3 = new Job(jobToBeCreated3);
        adapter.addItem(job1);
        adapter.addItem(job2);
        adapter.addItem(job3);
        const actual = adapter.getAllItems();
        expect(actual).toEqual([job1, job2, job3]);
    });

    test('should test addFailedItem', () => {
        const adapter = new InMemoryAdapter();
        const jobToBeCreated1 = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
        };
        const job1 = new Job(jobToBeCreated1);
        const jobToBeCreated2 = {
            id: 'testid',
            name: 'testJob2',
            param: {'a':1},
        };
        const job2 = new Job(jobToBeCreated2);
        const jobToBeCreated3 = {
            id: 'testid',
            name: 'testJob3',
            param: {'a':1},
        };
        const job3 = new Job(jobToBeCreated3);
        adapter.addFailedItem(job1);
        adapter.addFailedItem(job2);
        adapter.addFailedItem(job3);
        const actual = adapter.failedItems;
        expect(actual).toEqual([job1, job2, job3]);
    });

    test('should test getLength', () => {
        const adapter = new InMemoryAdapter();
        const jobToBeCreated1 = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
        };
        const job1 = new Job(jobToBeCreated1);
        const jobToBeCreated2 = {
            id: 'testid',
            name: 'testJob2',
            param: {'a':1},
        };
        const job2 = new Job(jobToBeCreated2);
        const jobToBeCreated3 = {
            id: 'testid',
            name: 'testJob3',
            param: {'a':1},
        };
        const job3 = new Job(jobToBeCreated3);
        adapter.addItem(job1);
        adapter.addItem(job2);
        adapter.addItem(job3);
        const actual = adapter.getLength();
        expect(actual).toBe(3);
    });

    test('should test getTopItem', () => {
        const adapter = new InMemoryAdapter();
        const jobToBeCreated1 = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
        };
        const job1 = new Job(jobToBeCreated1);
        const jobToBeCreated2 = {
            id: 'testid',
            name: 'testJob2',
            param: {'a':1},
        };
        const job2 = new Job(jobToBeCreated2);
        const jobToBeCreated3 = {
            id: 'testid',
            name: 'testJob3',
            param: {'a':1},
        };
        const job3 = new Job(jobToBeCreated3);
        adapter.addItem(job1);
        adapter.addItem(job2);
        adapter.addItem(job3);
        const actual = adapter.getTopItem();
        expect(actual).toEqual(job1);
    });

    test('should add item according to priority', () => {
        const adapter = new InMemoryAdapter();
        const jobToBeCreated1 = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
            priority: 3,
        };
        const job1 = new Job(jobToBeCreated1);
        const jobToBeCreated2 = {
            id: 'testid',
            name: 'testJob2',
            param: {'a':1},
            priority: 1,
        };
        const job2 = new Job(jobToBeCreated2);
        const jobToBeCreated3 = {
            id: 'testid',
            name: 'testJob3',
            param: {'a':1},
            priority: 2,
        };
        const job3 = new Job(jobToBeCreated3);
        adapter.addItem(job1);
        adapter.addItem(job2);
        adapter.addItem(job3);
        const actual = adapter.getAllItems();
        expect(actual).toEqual([job2, job3, job1]);
    });

    test('should test addFailedItems', () => {
        const adapter = new InMemoryAdapter();
        const jobToBeCreated1 = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
        };
        const job1 = new Job(jobToBeCreated1);
        const jobToBeCreated2 = {
            id: 'testid',
            name: 'testJob2',
            param: {'a':1},
        };
        const job2 = new Job(jobToBeCreated2);
        const jobToBeCreated3 = {
            id: 'testid',
            name: 'testJob3',
            param: {'a':1},
        };
        const job3 = new Job(jobToBeCreated3);
        adapter.addFailedItem(job1);
        adapter.addFailedItem(job2);
        adapter.addFailedItem(job3);
        adapter.addFailedItems();
        expect(adapter.items).toContain(job1);
        expect(adapter.items).toContain(job2);
        expect(adapter.items).toContain(job3);
        expect(adapter.failedItems.length).toBe(0);
    });
});

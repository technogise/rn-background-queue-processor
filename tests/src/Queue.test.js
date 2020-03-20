import Queue from '../../src/Queue';
import InMemoryAdapter from "../../src/DbAdapter/InMemoryAdapter";
import Job from "../../src/Job";

describe('Test allQueues file', () => {
    test('should test getSize', () => {
        const dbAdapter = new InMemoryAdapter();
        const queue = new Queue(dbAdapter);
        const actual = queue.getSize();
        expect(actual).toBe(0);
    });

    test('should test getItems', () => {
        const dbAdapter = new InMemoryAdapter();
        const queue = new Queue(dbAdapter);
        const actual = queue.getItems();
        expect(actual).toEqual([]);
    });

    test('should test isEmpty to be truthy', () => {
        const dbAdapter = new InMemoryAdapter();
        const queue = new Queue(dbAdapter);
        const actual = queue.isEmpty();
        expect(actual).toBeTruthy();
    });

    test('should test isEmpty to be falsy', () => {
        const dbAdapter = new InMemoryAdapter();
        const queue = new Queue(dbAdapter);
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        const actual = queue.isEmpty();
        expect(actual).toBeFalsy();
    });

    test('should test peek', () => {
        const dbAdapter = new InMemoryAdapter();
        const queue = new Queue(dbAdapter);
        queue.enqueue(1);
        queue.enqueue(2);
        queue.enqueue(3);
        const actual = queue.peek();
        expect(actual).toBe(1);
    });

    test('should test dequeue', () => {
        const jobToBeCreated1 = {
            id: 11,
            name: 'testJob1',
            param: {},
        };
        const jobToBeCreated2 = {
            id: 22,
            name: 'testJob2',
            param: {},
        };
        const jobToBeCreated3 = {
            id: 33,
            name: 'testJob3',
            param: {},
        };
        const job1 = new Job(jobToBeCreated1);
        const job2 = new Job(jobToBeCreated2);
        const job3 = new Job(jobToBeCreated3);
        const dbAdapter = new InMemoryAdapter();
        const queue = new Queue(dbAdapter);
        queue.enqueue(job1);
        queue.enqueue(job2);
        queue.enqueue(job3);
        queue.dequeue();
        const queueSize = queue.getSize();
        expect(queueSize).toEqual(2);
    });

    test('should test enqueue', () => {
        const dbAdapter = new InMemoryAdapter();
        const queue = new Queue(dbAdapter);
        queue.enqueue(12);
        queue.enqueue(22);
        queue.enqueue(32);
        const actual = queue.getItems();
        expect(actual).toContain(12);
        expect(actual).toContain(22);
        expect(actual).toContain(32);
    });
});

import Worker from "../../src/Worker";
import Queue from "../../src/Queue";
import InMemoryAdapter from "../../src/DbAdapter/InMemoryAdapter";
import Job from "../../src/Job";

describe('Test worker class', () => {
    test('should test worker class to be singleton', () => {
        const instance1 = new Worker();
        const instance2 = new Worker();
        expect(instance1).toBe(instance2);
        expect(instance1 === instance2).toBeTruthy();
    });

    test('should test process', () => {
        const workerInstance = new Worker();
        const dbAdapter = new InMemoryAdapter();
        const queue1 = new Queue(dbAdapter);
        const queue2 = new Queue(dbAdapter);
        queue2.enqueue(new Job({execute: () => {console.log('in execute 1')}, 'b': 2}));
        queue2.enqueue(new Job({execute: () => {console.log('in execute 3')}, 'd': 4}));
        queue1.enqueue(new Job({execute: () => {console.log('in execute 5')}, 'f': 6}));

        workerInstance.queueProcessor.start = jest.fn();
        workerInstance.addQueue(queue1);
        workerInstance.addQueue(queue2);
        workerInstance.process();
        expect(workerInstance.queueProcessor.start).toHaveBeenCalled();
        expect(workerInstance.queueProcessor.start).toHaveBeenCalledTimes(2);
    });

    test('should test addQueue', () => {
        const instance = new Worker();
        const dbAdapter = new InMemoryAdapter();
        const queue1 = new Queue(dbAdapter);
        const queue2 = new Queue(dbAdapter);
        instance.allQueues.push = jest.fn();
        instance.addQueue(queue1);
        instance.addQueue(queue2);
        expect(instance.allQueues.push).toHaveBeenCalled();
        expect(instance.allQueues.push).toHaveBeenCalledTimes(2);
    });
});

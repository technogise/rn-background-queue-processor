import Worker from "../../src/Worker";
import Queue from "../../src/Queue";
import InMemoryAdapter from "../../src/DbAdapter/InMemoryAdapter";

describe('Test worker class', () => {
    test('should test worker class to be singleton', () => {
        const instance1 = new Worker();
        const instance2 = new Worker();
        expect(instance1).toBe(instance2);
    });

    test('should test process', () => {
        const instance = new Worker();
        const dbAdapter = new InMemoryAdapter();
        const queue = new Queue(dbAdapter);
        queue.enqueue({execute: () => {console.log('in execute 1')}, 'b': 2});
        queue.enqueue({execute: () => {console.log('in execute 3')}, 'd': 4});
        instance.queueProcessor.start = jest.fn();
        instance.process(queue);
        expect(instance.queueProcessor.start).toHaveBeenCalled();
        expect(instance.queueProcessor.start).toHaveBeenCalledWith(queue);
    });
});

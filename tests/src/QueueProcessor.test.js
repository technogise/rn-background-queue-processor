import InMemoryAdapter from '../../src/DbAdapter/InMemoryAdapter';
import Queue from "../../src/Queue";
import QueueProcessor from "../../src/QueueProcessor";
import Job from "../../src/Job";

describe('Test QueueProcessor', () => {

    test('should start processing queue when invoked start',() => {
        const response = { errors: 'ERROR' };
        const jobSuccessCallback = (onSuccess, onFail) => {
            onFail(response);
        };
        const mockedAllJobs = jest.fn();
        const jobToBeCreated = {
            id: 123,
            name: 'testJob',
            param: {},
        };
        const job = new Job(jobToBeCreated);
        mockedAllJobs.mockReturnValue({});
        job.execute = jest.fn(jobSuccessCallback);
        const dbAdapter = new InMemoryAdapter();
        const queueObj = new Queue(dbAdapter);
        queueObj.enqueue(job);
        const queueProcessor = new QueueProcessor();
        queueProcessor.start(queueObj);
        expect(queueProcessor.queue.getSize()).toBe(1);
    });

});

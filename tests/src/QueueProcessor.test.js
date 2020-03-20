import InMemoryAdapter from '../../src/DbAdapter/InMemoryAdapter';
import Queue from "../../src/Queue";
import QueueProcessor from "../../src/QueueProcessor";
import Job from "../../src/Job";

describe('Test QueueProcessor', () => {

    test('should start processing queue when invoked start',(done) => {
        const jobSuccessCallback = (onSuccess) => {
            onSuccess();
        };
        const jobToBeCreated1 = {
            name: 'testJob1',
            param: {},
        };
        const jobToBeCreated2 = {
            name: 'testJob2',
            param: {},
        };
        const job1 = new Job(jobToBeCreated1);
        const job2 = new Job(jobToBeCreated2);
        job1.execute = jest.fn(jobSuccessCallback);
        job2.execute = jest.fn(jobSuccessCallback);
        const dbAdapter = new InMemoryAdapter();
        const queueObj = new Queue(dbAdapter);
        queueObj.enqueue(job1);
        queueObj.enqueue(job2);
        const queueProcessor = new QueueProcessor();
        queueProcessor.start(queueObj);
        setTimeout(() => {
            expect(job1.execute).toHaveBeenCalled();
            expect(job2.execute).toHaveBeenCalled();
            expect(queueObj.getSize()).toBe(0);
            done();
        });
    });

    it('should not start processing queue when no jobs found', (done) => {
        const dbAdapter = new InMemoryAdapter();
        const queueObj = new Queue(dbAdapter);
        const queueProcessor = new QueueProcessor();
        queueProcessor.start(queueObj);
        setTimeout(() => {
            expect(queueObj.getSize()).toBe(0);
            done();
        });
    });

    test('should dequeue and log error if any job fails',(done) => {
        const response = "JOB_FAIL";
        const jobFailCallback = (onSuccess, onFail) => {
            onFail(response);
        };
        const jobSuccessCallback = (onSuccess) => {
            onSuccess();
        };
        const jobToBeCreated1 = {
            name: 'testJob1',
            param: {},
        };
        const jobToBeCreated2 = {
            name: 'testJob2',
            param: {},
        };
        const job1 = new Job(jobToBeCreated1);
        const job2 = new Job(jobToBeCreated2);
        job1.execute = jest.fn(jobSuccessCallback);
        job2.execute = jest.fn(jobFailCallback);
        const dbAdapter = new InMemoryAdapter();
        const queueObj = new Queue(dbAdapter);
        queueObj.enqueue(job1);
        queueObj.enqueue(job2);
        const queueProcessor = new QueueProcessor();
        queueProcessor.start(queueObj);
        setTimeout(() => {
            expect(job1.execute).toHaveBeenCalled();
            expect(job2.execute).toHaveBeenCalled();
            expect(queueObj.getSize()).toBe(0);
            done();
        });
    });
});

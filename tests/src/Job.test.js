import Job from "../../src/Job";
import Common from "../../src/utils/Common";

Common.generateUUID = jest.fn().mockReturnValue('testid');

describe('Test job class', () => {
    test('getId function', () => {
        const jobToBeCreated = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
        };
        const job = new Job(jobToBeCreated);
        const id = job.getId();
        expect(id).toBe('testid');
    });

    test('getName function', () => {
        const jobToBeCreated = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
        };
        const job = new Job(jobToBeCreated);
        const name = job.getName();
        expect(name).toBe('testJob1');
    });

    test('getParam function', () => {
        const jobToBeCreated = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
        };
        const job = new Job(jobToBeCreated);
        const param = job.getParam();
        expect(param).toEqual({'a':1});
    });

    test('getPriority function', () => {
        const jobToBeCreated = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
            priority: 4,
        };
        const job = new Job(jobToBeCreated);
        const priority = job.getPriority();
        expect(priority).toEqual(4);
    });

    test('getRetryInterval function', () => {
        const jobToBeCreated = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
            priority: 4,
            retryInterval: 1000,
        };
        const job = new Job(jobToBeCreated);
        const retryInterval = job.getRetryInterval();
        expect(retryInterval).toEqual(1000);
    });

    test('getMaxRetries function', () => {
        const jobToBeCreated = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
            priority: 4,
            retryInterval: 1000,
            maxRetries: 2,
        };
        const job = new Job(jobToBeCreated);
        const retryInterval = job.getMaxRetries();
        expect(retryInterval).toEqual(2);
    });

    test('default priority should be 1 for job', () => {
        const jobToBeCreated = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
        };
        const job = new Job(jobToBeCreated);
        const priority = job.getPriority();
        expect(priority).toEqual(10);
    });

    test('default retryInterval should be 2000 for job', () => {
        const jobToBeCreated = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
        };
        const job = new Job(jobToBeCreated);
        const priority = job.getRetryInterval();
        expect(priority).toEqual(2000);
    });

    test('default maxRetries should be 5 for job', () => {
        const jobToBeCreated = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
        };
        const job = new Job(jobToBeCreated);
        const priority = job.getMaxRetries();
        expect(priority).toEqual(5);
    });

    test('execute function', () => {
        const jobToBeCreated = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
        };
        const job = new Job(jobToBeCreated);
        expect(job.execute).toThrow('execute method not defined for this job');
    });
});


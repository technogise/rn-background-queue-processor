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


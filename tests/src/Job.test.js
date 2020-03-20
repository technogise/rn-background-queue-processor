import Job from "../../src/Job";
import Common from "../../src/utils/Common";

Common.generateUUID = jest.fn().mockReturnValue('testid');

describe('Test job class', () => {
    test('getId function', () => {
        const jobToBeCreated1 = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
        };
        const job = new Job(jobToBeCreated1);
        const id = job.getId();
        expect(id).toBe('testid');
    });

    test('getName function', () => {
        const jobToBeCreated1 = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
        };
        const job = new Job(jobToBeCreated1);
        const name = job.getName();
        expect(name).toBe('testJob1');
    });

    test('getParam function', () => {
        const jobToBeCreated1 = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
        };
        const job = new Job(jobToBeCreated1);
        const param = job.getParam();
        expect(param).toEqual({'a':1});
    });

    test('execute function', () => {
        const jobToBeCreated1 = {
            id: 'testid',
            name: 'testJob1',
            param: {'a':1},
        };
        const job = new Job(jobToBeCreated1);
        expect(job.execute).toThrow('execute method not defined for this job');
    });
});

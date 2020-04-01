import Adapter from "../../../src/DbAdapter/Adapter";
import Job from "../../../src/Job";

describe('Test Adapter class', () => {
    test('getAllItems function', () => {
        const adapter = new Adapter();
        expect(adapter.getAllItems).toThrow('get method not defined for this adapter');
    });

    test('remove function', () => {
        const adapter = new Adapter();
        expect(adapter.remove).toThrow('slice method not defined for this adapter');
    });

    test('addItem function', () => {
        const adapter = new Adapter();
        expect(adapter.addItem).toThrow('addItem method not defined for this adapter');
    });

    test('getLength function', () => {
        const adapter = new Adapter();
        expect(adapter.getLength).toThrow('getLength method not defined for this adapter');
    });

    test('getTopItem function', () => {
        const adapter = new Adapter();
        expect(adapter.getTopItem).toThrow('getTopItem method not defined for this adapter');
    });

    test('getJobInstance function', () => {
        const job = [{
            id: 'testid',
            name: 'testJob',
            param: 'testParam',
            priority: 1,
        }];
        const adapter = new Adapter(Job.prototype);
        const jobInstance = adapter.getJobInstance(job);
        expect(jobInstance instanceof Job).toBeTruthy();
        expect(jobInstance.job.id).toBe('testid');
        expect(jobInstance.job.name).toBe('testJob');
        expect(jobInstance.job.param).toBe('testParam');
        expect(jobInstance.job.priority).toBe(1);
    })
});

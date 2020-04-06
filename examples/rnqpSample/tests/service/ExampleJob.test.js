import ExampleJob from '../../app/service/ExampleJob';

describe('Test ExampleJob', () => {
  test('test jobSuccess function', () => {
    const jobSuccessCallback = onSuccess => {
      onSuccess();
    };
    const jobToBeCreated = {
      id: 1,
      name: 'testJob1',
      param: {},
    };
    const job = new ExampleJob(jobToBeCreated);
    job.execute = jest.fn(jobSuccessCallback);
    job.jobSuccess = jest.fn();
    setTimeout(() => {
      expect(job.jobSuccess).toHaveBeenCalled();
    });
  });

  test('test jobFail function', () => {
    const response = 'JOB_FAIL';
    const jobFailCallback = (onSuccess, onFail) => {
      onFail(response);
    };
    const jobToBeCreated = {
      id: 1,
      name: 'testJob1',
      param: {},
    };
    const job = new ExampleJob(jobToBeCreated);
    job.execute = jest.fn(jobFailCallback);
    job.jobFail = jest.fn();
    setTimeout(() => {
      expect(job.jobFail).toHaveBeenCalled();
    });
  });
});

import {Job} from '@technogise/rn-background-queue-processor';

export default class ExampleJob extends Job {
  execute(
    successCallback = data => {
      this.jobSuccess(data);
    },
    failCallback = data => {
      this.jobFail(data);
    },
  ) {
    const {url} = this.job.param;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        successCallback(data);
      })
      .catch(error => {
        failCallback(error);
      });
  }

  jobSuccess(data) {
    console.log('job success', this.job.name, this.job.id, 'response', data);
  }

  jobFail(data) {
    console.log('job Fail', this.job.name, this.job.id, data, 'response', data);
  }
}

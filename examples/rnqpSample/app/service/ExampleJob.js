import {Job} from 'rn-background-queue-processor';

export default class ExampleJob extends Job {
  execute(
    successCallback1 = data => {
      this.jobSuccess(data);
    },
    failCallback1 = data => {
      this.jobFail(data);
    },
  ) {
    const {url} = this.job.param;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        successCallback1(data);
      })
      .catch(error => {
        failCallback1(error);
      });
  }

  jobSuccess(data) {
    console.log('job success', this.job.name, this.job.id, 'response', data);
  }

  jobFail(data) {
    console.log('job Fail', this.job.name, this.job.id, data, 'response', data);
  }
}

import React from 'react';
import _ from 'underscore';
import {View, Alert} from 'react-native';
import {Queue} from '@technogise/rn-background-queue-processor';
import {
  RealmAdapter,
  realmConfig,
  FailedJobSchema,
} from '@technogise/rn-background-queue-processor-realm-adapter';
import Button from '../components/Button';
import styles from '../styles/MainScreenStyle';
import ExampleJob from '../service/ExampleJob';
import {worker} from '../../util/Common';

export default class MainScreen extends React.Component {
  constructor() {
    super();
    const dbAdapter = new RealmAdapter(ExampleJob.prototype);
    this.queue = new Queue(dbAdapter);
    _.bindAll(
      this,
      'onAdd',
      'onProcess',
      'onAddFail',
      'getNumberOfFailedJob',
      'onProcessFailedJobs',
    );
  }

  onAdd() {
    const jobToBeCreated = {
      name: 'testJob',
      param: {
        url: 'http://dummy.restapiexample.com/api/v1/employees',
      },
    };
    const job = new ExampleJob(jobToBeCreated);
    this.queue.enqueue(job);
  }

  onAddFail() {
    const jobToBeCreated = {
      name: 'fail job',
      param: {
        url: 'http://dummy.restapiexample.com/api/v1/emple',
      },
    };
    const job = new ExampleJob(jobToBeCreated);
    this.queue.enqueue(job);
  }

  onProcess() {
    worker.addQueue(this.queue);
    worker.process();
  }
  onProcessFailedJobs() {
    worker.processFailedJobs();
  }

  getNumberOfFailedJob() {
    const failedJobLength = JSON.stringify(
      realmConfig.objects(FailedJobSchema.NAME).length,
    );
    Alert.alert('Number of failed Jobs', failedJobLength);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button onClick={this.onAdd}>1. ADD JOB</Button>
          <Button onClick={this.onAddFail}>2. ADD JOB (to test Fail)</Button>
          <Button onClick={this.onProcessFailedJobs}>
            PROCESS FAILED JOBS
          </Button>
          <Button onClick={this.onProcess}>PROCESS</Button>
          <Button onClick={this.getNumberOfFailedJob}>
            Get Number of Failed Jobs
          </Button>
        </View>
      </View>
    );
  }
}

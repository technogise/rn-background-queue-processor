import React from 'react';
import _ from 'underscore';
import {View, Alert} from 'react-native';
import Button from '../components/Button';
import styles from '../styles/MainScreenStyle';
import ExampleJob from '../service/ExampleJob';
import {worker} from '../../util/Common';
import {Queue} from '@technogise/rn-background-queue-processor';
import {
  RealmAdapter,
  realmConfig,
  FailedJobSchema,
} from 'rn-background-queue-processor-realm-adapter';

export default class MainScreen extends React.Component {
  constructor() {
    super();
    const dbAdapter = new RealmAdapter(ExampleJob.prototype);
    this.queue = new Queue(dbAdapter);
    _.bindAll(this, 'onAdd', 'onProcess', 'onAddFail', 'getNumberOfFailedJob');
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
          <Button onClick={this.onProcess}>PROCESS</Button>
          <Button onClick={this.getNumberOfFailedJob}>
            Get Number of Failed Jobs
          </Button>
        </View>
      </View>
    );
  }
}

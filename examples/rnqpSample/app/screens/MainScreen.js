import React from 'react';
import _ from 'underscore';
import {View} from 'react-native';
import Button from '../components/Button';
import styles from '../styles/MainScreenStyle';
import ExampleJob from '../service/ExampleJob';
import {worker} from '../../util/Common';
import {
  InMemoryAdapter,
  Queue,
} from '@technogise/rn-background-queue-processor';

export default class MainScreen extends React.Component {
  constructor() {
    super();
    const dbAdapter = new InMemoryAdapter();
    this.queue = new Queue(dbAdapter);
    _.bindAll(this, 'onAdd', 'onProcess');
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

  onProcess() {
    worker.addQueue(this.queue);
    worker.process();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button onClick={this.onAdd}>ADD</Button>
          <Button onClick={this.onProcess}>PROCESS</Button>
        </View>
      </View>
    );
  }
}

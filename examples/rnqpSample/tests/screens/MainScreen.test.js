import {shallow} from 'enzyme';
import React from 'react';
import {realmConfig} from 'rn-background-queue-processor-realm-adapter';
import {Alert} from 'react-native';
import MainScreen from '../../app/screens/MainScreen';
import ExampleJob from '../../app/service/ExampleJob';
import {worker} from '../../util/Common';

describe('Test MainScreen', () => {
  test('Render with all the elements', () => {
    const wrapper = shallow(<MainScreen />);
    expect(wrapper.find('Button').exists()).toBeTruthy();
  });

  test('test onAdd', () => {
    const jobToBeCreated = {
      name: 'testJob',
      param: {
        url: 'http://dummy.restapiexample.com/api/v1/employees',
      },
    };
    const job = new ExampleJob(jobToBeCreated);
    this.queue = jest.fn();
    this.queue.enqueue = jest.fn();
    const mainScreen = new MainScreen();
    mainScreen.onAdd();
    setTimeout(() => {
      expect(this.queue.enqueue).toHaveBeenCalled();
      expect(this.queue.enqueue).toHaveBeenCalledWith(job);
    });
  });

  test('test onAddFail', () => {
    const jobToBeCreated = {
      name: 'FailJob',
      param: {
        url: 'http://dummy.restapiexample.com/api/v1/employees',
      },
    };
    const job = new ExampleJob(jobToBeCreated);
    this.queue = jest.fn();
    this.queue.enqueue = jest.fn();
    const mainScreen = new MainScreen();
    mainScreen.onAddFail();
    setTimeout(() => {
      expect(this.queue.enqueue).toHaveBeenCalled();
      expect(this.queue.enqueue).toHaveBeenCalledWith(job);
    });
  });

  test('test onProcess', () => {
    worker.addQueue = jest.fn();
    worker.process = jest.fn();
    this.queue = jest.fn();
    const mainScreen = new MainScreen();
    mainScreen.onProcess();
    setTimeout(() => {
      expect(worker.addQueue).toHaveBeenCalled();
      expect(worker.enqueue).toHaveBeenCalledWith(this.queue);
      expect(worker.process).toHaveBeenCalled();
    });
  });

  test('test getNumberOfFailedJob', () => {
    Alert.alert = jest.fn();
    const jobToBeCreated1 = {
      id: 'testid',
      name: 'testJob1',
      param: {a: 1},
      priority: 1,
    };
    const jobToBeCreated2 = {
      id: 'testid',
      name: 'testJob2',
      param: {a: 1},
      priority: 2,
    };
    realmConfig.setObjects([jobToBeCreated1, jobToBeCreated2]);
    const mainScreen = new MainScreen();
    mainScreen.getNumberOfFailedJob();
    expect(Alert.alert).toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith('Number of failed Jobs', '2');
  });
});

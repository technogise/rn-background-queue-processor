[![CircleCI](https://circleci.com/gh/technogise/rn-background-queue-processor.svg?style=shield)](https://app.circleci.com/pipelines/github/technogise/rn-background-queue-processor)
[![Coverage Status](https://coveralls.io/repos/github/technogise/rn-background-queue-processor/badge.svg?branch=https%3A//github.com/technogise/rn-background-queue-processor.git)](https://coveralls.io/github/technogise/rn-background-queue-processor?branch=https%3A//github.com/technogise/rn-background-queue-processor.git)
[![npm version](https://badge.fury.io/js/%40technogise%2Frn-background-queue-processor.svg)](https://badge.fury.io/js/%40technogise%2Frn-background-queue-processor)

# React Native Queue Processor

A package with the help of which users will be able to add and process different kind of jobs in a queues with background persistent queue processing

## Prerequisite

This package does not have any prerequisites that need to be installed.

## Features

- A React Native Queue Processor with persistent queues using [rn-background-queue-processor-realm-adapter](https://github.com/technogise/rn-background-queue-processor-realm-adapter)
- Jobs will be executed according to priorities using the queues. 
- Job will retry until the failed count matches job's number of retry attempts with retryInterval.
- Has functionality for Worker instances as well. 
- Background Persistent queue processing using [WorkManager](https://developer.android.com/topic/libraries/architecture/workmanager).
- It also plays well with Workers so your jobs can be thrown on the queue, then processed in dedicated worker threads for improved processing performance.
- Failed Jobs can also be processed.

## Compatibility

While we ensure to keep the library updated with newer and improved upcoming releases for React Native, our current version works well for `React Native: v0.62.1`

## Installation steps

`npm i @technogise/rn-background-queue-processor`

## Usage

- Here is a [Sample Application](https://github.com/technogise/rn-background-queue-processor/tree/master/examples/rnqpSample)
         
 - Example import
```
import { Queue } from '@technogise/rn-background-queue-processor';
import { RealmAdapter } from '@technogise/rn-background-queue-processor-realm-adapter';

const dbAdapter = new RealmAdapter(ExampleJob.prototype);
    this.queue = new Queue(dbAdapter);
```

 - To add job in a queue
 ```
 const jobToBeCreated = {
       name: 'testJob',
       param: {
         url: 'http://dummy.restapiexample.com/api/v1/employees',
       },
       priority: 2,
     };
     const job = new ExampleJob(jobToBeCreated);
     this.queue.enqueue(job);
```

 - To add the queue and process them using worker class instance 
 ```
   onProcess() {
     worker.addQueue(queue);
     worker.process();
   }
```

 - add worker instance in common file
```
import {Worker} from '@technogise/rn-background-queue-processor';

export const worker = new Worker();
```

 - [Queue](src/Queue.js)
    
```
constructor(dbAdapter) {
         this.adapter = dbAdapter;
     }
```
   The dbAdapter here is an additional feature with which we enable our developers to use this queue with any db of their choice.
   
   - `enqueue(job)`: Enqueues the job in the queue
   - `dequeue()`: Dequeues the job from queue on successful execution 
   - `peek()`: To get the top job from Queue
   - `getSize()`: Returns the length of Queue
   - `getItems()`: Gives all items of Queue
   - `failedJobsEnqueue()` Enqueue all the Failed Jobs for processing
   
 - [Adapter](src/DbAdapter/InMemoryAdapter.js)
 
    It is an abstract class which needs to be implemented by users of this package for easy use of any database for storing and processing the queues.
    
    For the easier understanding and reference, we have added an `InMemoryAdapter.js`. Here is a list of all functions available in the Adapter class which can be used,
   
   - `getAllItems()`: To get all jobs in current queue
   - `remove()`: Method to remove a job from current queue 
   - `addItem(item)`: Method to add a job in the current queue
   - `getLength()`: Method to get length of current queue
   - `getTopItem()`: Method to get the current job for processing
   - `addFailedItems()` Method to add failed items
   
 - [Job](src/Job.js)
    While Job class has methods to get id, name and param of current job, we have made the `execute`, `jobSuccess` and `jobFail` function to be abstract for the developer so that he/she decides what to do on execute call.
   
    The `execute` method can be used for performing the action in current job. For example, if the current job is an API call then developer can add the steps to fetch data from API in this `execute` ,method.
   
    The `jobSuccess` method tells the developer defined action that needs to be taken if the API response is 200.
   
    The `jobFail` method tells the developer defined action that needs to be taken if the API response is 4XX.

 - [Worker](src/Worker.js)
 
    Worker class is a singleton class. In this class, user can process queue using `process()` 
    
 - Communication with native
    
    - Process function in worker class schedule a job(STARTPROCESSINGJOB) which calls native module
    - Native module emits events which are listened on the Js side, based on the event emitted queueProcessor will start processing.

Made with :heart: from [Technogise](https://technogise.com/)

You can explore our other works on [GitHub](https://github.com/technogise/)

import Queue from './Queue';
import InMemoryAdapter from "./DbAdapter/InMemoryAdapter";
// import Job from './Job';

/**
 * To be made available to user for making DB adapter
 */
export default class JobQueue extends Queue {
    static fromCollection(collection) {
    const dbAdapter = new InMemoryAdapter();
        const queue = new Queue(dbAdapter);
        if (!collection) {
            return queue;
        }
        collection.forEach((entity) => {
            queue.enqueue(new Job(entity));
        });
        return queue;
    }
}

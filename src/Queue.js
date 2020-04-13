/**
 * Queue class
 */
export default class Queue {
    /**
     * Queue constructor
     * @param dbAdapter
     */
    constructor(dbAdapter) {
        this.adapter = dbAdapter;
    }

    /**
     * Enqueue method
     * @param item
     */
    enqueue(item) {
        this.adapter.addItem(item);
    }

    /**
     * enqueue failed items
     */
    failedJobsEnqueue(){
        this.adapter.addFailedItems();
    }

    /**
     * Failed Job Enqueue method
     * @param item
     */
    failedJobEnqueue(item) {
        this.adapter.addFailedItem(item);
    }

    /**
     * Dequeue method
     */
    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        const returnElement = this.adapter.getTopItem();
        this.adapter.remove(returnElement.job.id);
    }

    /**
     * Peek method to get top item
     */
    peek() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.adapter.getTopItem();
    }

    /**
     * Method to get size of allQueues
     * @returns {void|number}
     */
    getSize() {
        return this.adapter.getLength();
    }

    /**
     * Method to check for empty allQueues
     * @returns {boolean}
     */
    isEmpty() {
        return this.getSize() === 0;
    }

    /**
     * Method to get items
     * @returns {void|*[]}
     */
    getItems() {
        return this.adapter.getAllItems();
    }
}

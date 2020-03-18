/**
 * Queue class
 */
export default class Queue {
    /**
     * Queue constructor
     * @param dbAdapter
     */
    constructor(dbAdapter) {
        this.items = dbAdapter;
    }

    /**
     * Enqueue method
     * @param item
     */
    enqueue(item) {
        this.items.addItem(item);
    }

    /**
     * Dequeue method
     */
    dequeue() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        const returnElement = this.items.getTopItem();
        this.items = this.items.slice();
        return returnElement;
    }

    /**
     * Peek method to get top item
     */
    peek() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.items.getTopItem();
    }

    /**
     * Method to get size of queue
     * @returns {void|number}
     */
    getSize() {
        return this.items.getLength();
    }

    /**
     * Method to check for empty queue
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
        return this.items.getAllItems();
    }
}

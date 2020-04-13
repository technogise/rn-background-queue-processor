import Adapter from "./Adapter";

/**
 * InMemoryAdapter class
 */
export default class InMemoryAdapter extends Adapter {
    /**
     * InMemoryAdapter constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.items = [];
        this.failedItems = [];
    }

    /**
     * Method to get all items
     * @returns {[]|*[]}
     */
    getAllItems(){
        return this.items;
    }

    /**
     * Method to slice top most element
     */
    remove(){
        // const index = this.items.findIndex(obj => obj.id == id);
        this.items.shift();
    }

    /**
     * Method to add item
     * @param item
     */
    addItem(item){
        this.items.splice(this.findIndex(item.job.priority, this.items) + 1, 0, item);
    }

    /**
     * enqueue failed items in items array
     */
    addFailedItems() {
        while(this.failedItems.length > 0) {
            let item = 0;
            this.items.push(this.failedItems[item]);
            this.failedItems.splice(item, 1);
            item += 1;
        }
    }

    /**
     * Method to add failed item
     * @param item
     */
    addFailedItem(item){
        this.failedItems.push(item);
    }

    /**
     * find index to enqueue job in queue
     *
     * @param jobPriority
     * @param array
     * @param start
     * @param end
     * @returns {number|*}
     */
    findIndex(jobPriority, array, start, end) {
        if(array[0]) {
            if(jobPriority < array[0].job.priority)
                return -1;
        }
        start = start || 0;
        end = end || array.length;
        const pivot = Math.floor(start + (end - start) / 2);
        if (end - start <= 1 || array[pivot].job.priority === jobPriority) return pivot;
        if (array[pivot].job.priority < jobPriority) {
            return this.findIndex(jobPriority, array, pivot, end);
        } else {
            return this.findIndex(jobPriority, array, start, pivot);
        }
    }

    /**
     * Method to get length
     * @returns {number}
     */
    getLength(){
        return this.items.length;
    }

    /**
     * Method to get top element
     * @returns {*}
     */
    getTopItem(){
        return this.items[0];
    }
}

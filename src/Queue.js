export default class Queue {
    constructor(dbAdapter) {
        this.items = dbAdapter;
    }

    enqueue(item) {
        this.items.addItem(item);
    }

    dequeue(){
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        const returnElement = this.items.getTopItem();
        this.items = this.items.slice();
        return returnElement;
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error('Queue is empty');
        }
        return this.items.getTopItem();
    }

    getSize() {
        return this.items.getLength();
    }

    isEmpty() {
        return this.items.getSize === 0;
    }

    getItems() {
        return this.items.getAllItems();
    }
}

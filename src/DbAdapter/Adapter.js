/**
 * Adapter abstract class
 */
export default class Adapter {
    /**
     * Adapter constructor
     */
    constructor() {
    }

    /**
     * Method to get all items
     */
    getAllItems(){
        throw new Error('get method not defined for this adapter');
    }

    /**
     * Method to slice items from top
     */
    remove() {
        throw new Error('slice method not defined for this adapter');
    }

    /**
     * Method to add items
     */
    addItem(){
        throw new Error('addItem method not defined for this adapter');
    }

    /**
     * Method to get length of elements
     */
    getLength(){
        throw new Error('getLength method not defined for this adapter');
    }

    /**
     * Method to get top element
     */
    getTopItem(){
        throw new Error('getTopItem method not defined for this adapter');
    }
}
